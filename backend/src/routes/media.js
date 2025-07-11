const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const { authenticateToken } = require('../middleware/auth');
const { db } = require('../database/init');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1
  }
});

// Upload single image
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { alt_text } = req.body;
    const file = req.file;

    // Process image with Sharp
    const processedImagePath = path.join(uploadsDir, file.filename);
    
    // Create different sizes
    const sizes = {
      thumbnail: { width: 150, height: 150 },
      small: { width: 300, height: 300 },
      medium: { width: 600, height: 600 },
      large: { width: 1200, height: 1200 }
    };

    const imageUrls = {};

    for (const [size, dimensions] of Object.entries(sizes)) {
      const sizeFilename = `${path.parse(file.filename).name}-${size}${path.extname(file.filename)}`;
      const sizePath = path.join(uploadsDir, sizeFilename);

      await sharp(processedImagePath)
        .resize(dimensions.width, dimensions.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80 })
        .toFile(sizePath);

      imageUrls[size] = `/uploads/${sizeFilename}`;
    }

    // Save to database
    const [mediaId] = await db('media').insert({
      filename: file.filename,
      original_name: file.originalname,
      mime_type: file.mimetype,
      size: file.size,
      url: imageUrls.medium, // Use medium as default
      alt_text: alt_text || '',
      uploaded_by: req.user.userId
    });

    const media = await db('media').where('id', mediaId).first();

    res.status(201).json({
      message: 'Image uploaded successfully',
      media: {
        ...media,
        urls: imageUrls
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded file if processing failed
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Failed to delete uploaded file:', unlinkError);
      }
    }

    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Get all media (paginated)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (page - 1) * limit;

    let query = db('media')
      .select('*')
      .orderBy('created_at', 'desc');

    if (search) {
      query = query.where(function() {
        this.where('original_name', 'like', `%${search}%`)
          .orWhere('alt_text', 'like', `%${search}%`);
      });
    }

    const media = await query
      .limit(limit)
      .offset(offset);

    const total = await db('media').count('* as count').first();

    res.json({
      media,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.count,
        pages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({ error: 'Failed to get media' });
  }
});

// Get single media item
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const media = await db('media').where('id', id).first();

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    res.json({ media });
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({ error: 'Failed to get media' });
  }
});

// Update media metadata
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { alt_text } = req.body;

    const media = await db('media').where('id', id).first();

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Check if user uploaded this media or is admin
    if (media.uploaded_by !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    await db('media')
      .where('id', id)
      .update({ alt_text });

    const updatedMedia = await db('media').where('id', id).first();

    res.json({
      message: 'Media updated successfully',
      media: updatedMedia
    });
  } catch (error) {
    console.error('Update media error:', error);
    res.status(500).json({ error: 'Failed to update media' });
  }
});

// Delete media
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const media = await db('media').where('id', id).first();

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Check if user uploaded this media or is admin
    if (media.uploaded_by !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    // Delete file from filesystem
    const filePath = path.join(uploadsDir, media.filename);
    try {
      await fs.unlink(filePath);
    } catch (unlinkError) {
      console.error('Failed to delete file:', unlinkError);
    }

    // Delete from database
    await db('media').where('id', id).del();

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

// Bulk upload multiple images
router.post('/bulk-upload', authenticateToken, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedMedia = [];

    for (const file of req.files) {
      try {
        // Process image with Sharp
        const processedImagePath = path.join(uploadsDir, file.filename);
        
        // Create different sizes
        const sizes = {
          thumbnail: { width: 150, height: 150 },
          small: { width: 300, height: 300 },
          medium: { width: 600, height: 600 },
          large: { width: 1200, height: 1200 }
        };

        const imageUrls = {};

        for (const [size, dimensions] of Object.entries(sizes)) {
          const sizeFilename = `${path.parse(file.filename).name}-${size}${path.extname(file.filename)}`;
          const sizePath = path.join(uploadsDir, sizeFilename);

          await sharp(processedImagePath)
            .resize(dimensions.width, dimensions.height, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .jpeg({ quality: 80 })
            .toFile(sizePath);

          imageUrls[size] = `/uploads/${sizeFilename}`;
        }

        // Save to database
        const [mediaId] = await db('media').insert({
          filename: file.filename,
          original_name: file.originalname,
          mime_type: file.mimetype,
          size: file.size,
          url: imageUrls.medium,
          alt_text: '',
          uploaded_by: req.user.userId
        });

        const media = await db('media').where('id', mediaId).first();
        uploadedMedia.push({
          ...media,
          urls: imageUrls
        });
      } catch (fileError) {
        console.error(`Failed to process file ${file.originalname}:`, fileError);
        
        // Clean up failed file
        try {
          await fs.unlink(file.path);
        } catch (unlinkError) {
          console.error('Failed to delete failed file:', unlinkError);
        }
      }
    }

    res.status(201).json({
      message: `Successfully uploaded ${uploadedMedia.length} images`,
      media: uploadedMedia
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

module.exports = router; 