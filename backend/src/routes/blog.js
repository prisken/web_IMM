const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { db } = require('../database/init');
const { authenticateToken } = require('../middleware/auth');
const slugify = require('slugify');
const sanitizeHtml = require('sanitize-html');

const router = express.Router();

// Get all blog posts (public)
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('category').optional().trim(),
  query('tag').optional().trim(),
  query('search').optional().trim(),
  query('locale').optional().isIn(['en', 'zh']),
  query('status').optional().isIn(['draft', 'published', 'archived'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      locale = 'en',
      status = 'published'
    } = req.query;

    let query = db('blog_posts')
      .select('*')
      .where('locale', locale);

    // Filter by status (only show published for public, all for authenticated)
    if (!req.user) {
      query = query.where('status', 'published');
    } else if (status !== 'all') {
      query = query.where('status', status);
    }

    // Filter by category
    if (category) {
      query = query.where('category', category);
    }

    // Filter by tag
    if (tag) {
      query = query.whereRaw("JSON_EXTRACT(tags, '$') LIKE ?", [`%${tag}%`]);
    }

    // Search functionality
    if (search) {
      query = query.where(function() {
        this.where('title', 'like', `%${search}%`)
          .orWhere('excerpt', 'like', `%${search}%`)
          .orWhere('content', 'like', `%${search}%`);
      });
    }

    // Get total count for pagination
    const countQuery = query.clone();
    const total = await countQuery.count('* as count').first();

    // Apply pagination and ordering
    const posts = await query
      .orderBy('published_at', 'desc')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset((page - 1) * limit);

    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.count,
        pages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Failed to get blog posts' });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const { locale = 'en' } = req.query;
    
    const categories = await db('categories')
      .where('locale', locale)
      .orderBy('name');

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

// Get tags
router.get('/tags', async (req, res) => {
  try {
    const { locale = 'en' } = req.query;
    
    const tags = await db('tags')
      .where('locale', locale)
      .orderBy('name');

    res.json({ tags });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ error: 'Failed to get tags' });
  }
});

// Get single blog post by ID (for admin/edit)
router.get('/id/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await db('blog_posts')
      .where('id', id)
      .first();

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get blog post by ID error:', error);
    res.status(500).json({ error: 'Failed to get blog post' });
  }
});

// Get single blog post (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { locale = 'en' } = req.query;

    const post = await db('blog_posts')
      .where('slug', slug)
      .where('locale', locale)
      .where('status', 'published')
      .first();

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Failed to get blog post' });
  }
});

// Create blog post (authenticated)
router.post('/', authenticateToken, [
  body('title').isLength({ min: 3, max: 200 }).trim().escape(),
  body('excerpt').isLength({ min: 10, max: 500 }).trim().escape(),
  body('content').isLength({ min: 50 }).trim(),
  body('category').isLength({ min: 2, max: 50 }).trim().escape(),
  body('tags').isArray(),
  body('read_time').optional().isInt({ min: 1, max: 60 }),
  body('seo_description').optional().isLength({ max: 300 }).trim().escape(),
  body('locale').optional().isIn(['en', 'zh']),
  body('status').optional().isIn(['draft', 'published', 'archived']),
  body('featured_image_url').optional().isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      excerpt,
      content,
      category,
      tags = [],
      read_time = 5,
      seo_description,
      locale = 'en',
      status = 'draft',
      featured_image_url
    } = req.body;

    // Generate slug from title
    const slug = slugify(title, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });

    // Check if slug already exists
    const existingPost = await db('blog_posts')
      .where('slug', slug)
      .where('locale', locale)
      .first();

    if (existingPost) {
      return res.status(400).json({ error: 'A post with this title already exists' });
    }

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'strong', 'em', 'u', 's',
        'ul', 'ol', 'li', 'blockquote', 'code',
        'pre', 'a', 'img', 'div', 'span'
      ],
      allowedAttributes: {
        'a': ['href', 'target', 'rel'],
        'img': ['src', 'alt', 'width', 'height'],
        '*': ['class', 'id']
      }
    });

    // Create blog post
    const [postId] = await db('blog_posts').insert({
      title,
      excerpt,
      content: sanitizedContent,
      author: req.user.full_name || req.user.username,
      category,
      slug,
      seo_description,
      read_time,
      tags: JSON.stringify(tags),
      featured_image_url,
      locale,
      status,
      author_id: req.user.userId,
      published_at: status === 'published' ? new Date() : null
    });

    const newPost = await db('blog_posts').where('id', postId).first();

    res.status(201).json({
      message: 'Blog post created successfully',
      post: newPost
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// Update blog post (authenticated)
router.put('/:id', authenticateToken, [
  body('title').optional().isLength({ min: 3, max: 200 }).trim().escape(),
  body('excerpt').optional().isLength({ min: 10, max: 500 }).trim().escape(),
  body('content').optional().isLength({ min: 50 }).trim(),
  body('category').optional().isLength({ min: 2, max: 50 }).trim().escape(),
  body('tags').optional().isArray(),
  body('read_time').optional().isInt({ min: 1, max: 60 }),
  body('seo_description').optional().isLength({ max: 300 }).trim().escape(),
  body('status').optional().isIn(['draft', 'published', 'archived']),
  body('featured_image_url').optional().isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updateData = req.body;

    // Check if post exists and user has permission
    const existingPost = await db('blog_posts').where('id', id).first();
    if (!existingPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check permissions (admin/editor can edit any post, author can only edit their own)
    if (req.user.role !== 'admin' && req.user.role !== 'editor') {
      if (existingPost.author_id !== req.user.userId) {
        return res.status(403).json({ error: 'Permission denied' });
      }
    }

    // Generate new slug if title changed
    if (updateData.title && updateData.title !== existingPost.title) {
      const newSlug = slugify(updateData.title, { 
        lower: true, 
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });

      // Check if new slug already exists
      const slugExists = await db('blog_posts')
        .where('slug', newSlug)
        .where('locale', existingPost.locale)
        .whereNot('id', id)
        .first();

      if (slugExists) {
        return res.status(400).json({ error: 'A post with this title already exists' });
      }

      updateData.slug = newSlug;
    }

    // Sanitize HTML content if provided
    if (updateData.content) {
      updateData.content = sanitizeHtml(updateData.content, {
        allowedTags: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 's',
          'ul', 'ol', 'li', 'blockquote', 'code',
          'pre', 'a', 'img', 'div', 'span'
        ],
        allowedAttributes: {
          'a': ['href', 'target', 'rel'],
          'img': ['src', 'alt', 'width', 'height'],
          '*': ['class', 'id']
        }
      });
    }

    // Convert tags array to JSON if provided
    if (updateData.tags) {
      updateData.tags = JSON.stringify(updateData.tags);
    }

    // Set published_at if status changes to published
    if (updateData.status === 'published' && existingPost.status !== 'published') {
      updateData.published_at = new Date();
    }

    // Update post
    await db('blog_posts')
      .where('id', id)
      .update(updateData);

    const updatedPost = await db('blog_posts').where('id', id).first();

    res.json({
      message: 'Blog post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// Delete blog post (authenticated)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists
    const post = await db('blog_posts').where('id', id).first();
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && req.user.role !== 'editor') {
      if (post.author_id !== req.user.userId) {
        return res.status(403).json({ error: 'Permission denied' });
      }
    }

    // Delete post
    await db('blog_posts').where('id', id).del();

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

module.exports = router; 