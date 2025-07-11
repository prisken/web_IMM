const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { importMockData } = require('../utils/dataImport');
const { db } = require('../database/init');

const router = express.Router();

// Get dashboard statistics (alias for /stats)
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Get total counts
    const [totalPosts] = await db('blog_posts').count('* as count');
    const [publishedPosts] = await db('blog_posts').where('status', 'published').count('* as count');
    const [draftPosts] = await db('blog_posts').where('status', 'draft').count('* as count');
    const [totalUsers] = await db('users').count('* as count');
    const [totalMedia] = await db('media').count('* as count');

    res.json({
      totalPosts: totalPosts.count,
      publishedPosts: publishedPosts.count,
      draftPosts: draftPosts.count,
      totalUsers: totalUsers.count,
      totalMedia: totalMedia.count
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
});

// Get all users
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await db('users')
      .select('id', 'username', 'email', 'role', 'created_at')
      .orderBy('created_at', 'desc');
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Import mock data from main website
router.post('/import-data', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await importMockData();
    res.json(result);
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user
router.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Don't allow deleting the last admin
    const [user] = await db('users').where('id', id).select('role');
    if (user.role === 'admin') {
      const [adminCount] = await db('users').where('role', 'admin').count('* as count');
      if (adminCount.count <= 1) {
        return res.status(400).json({ error: 'Cannot delete the last admin user' });
      }
    }
    
    await db('users').where('id', id).del();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Get dashboard statistics (original route)
router.get('/dashboard', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Get total counts
    const [totalPosts] = await db('blog_posts').count('* as count');
    const [publishedPosts] = await db('blog_posts').where('status', 'published').count('* as count');
    const [draftPosts] = await db('blog_posts').where('status', 'draft').count('* as count');
    const [totalUsers] = await db('users').count('* as count');
    const [totalMedia] = await db('media').count('* as count');

    // Get recent posts
    const recentPosts = await db('blog_posts')
      .select('id', 'title', 'status', 'created_at', 'author')
      .orderBy('created_at', 'desc')
      .limit(5);

    // Get recent users
    const recentUsers = await db('users')
      .select('id', 'username', 'email', 'role', 'created_at')
      .orderBy('created_at', 'desc')
      .limit(5);

    // Get posts by category
    const postsByCategory = await db('blog_posts')
      .select('category')
      .count('* as count')
      .groupBy('category')
      .orderBy('count', 'desc');

    // Get posts by status
    const postsByStatus = await db('blog_posts')
      .select('status')
      .count('* as count')
      .groupBy('status');

    // Get monthly post count for the last 6 months
    const monthlyPosts = await db('blog_posts')
      .select(db.raw('strftime("%Y-%m", created_at) as month'))
      .count('* as count')
      .groupBy('month')
      .orderBy('month', 'desc')
      .limit(6);

    res.json({
      statistics: {
        totalPosts: totalPosts.count,
        publishedPosts: publishedPosts.count,
        draftPosts: draftPosts.count,
        totalUsers: totalUsers.count,
        totalMedia: totalMedia.count
      },
      recentPosts,
      recentUsers,
      postsByCategory,
      postsByStatus,
      monthlyPosts
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
});

// Get system information
router.get('/system-info', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const os = require('os');
    const fs = require('fs').promises;
    const path = require('path');

    // Get disk usage
    const uploadsDir = path.join(__dirname, '../../uploads');
    let diskUsage = 0;
    try {
      const files = await fs.readdir(uploadsDir);
      for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        const stats = await fs.stat(filePath);
        diskUsage += stats.size;
      }
    } catch (error) {
      console.error('Failed to calculate disk usage:', error);
    }

    // Get database size
    const dbPath = path.join(__dirname, '../../data/blog_crm.db');
    let dbSize = 0;
    try {
      const stats = await fs.stat(dbPath);
      dbSize = stats.size;
    } catch (error) {
      console.error('Failed to get database size:', error);
    }

    res.json({
      system: {
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: os.cpus(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem()
      },
      storage: {
        uploadsSize: diskUsage,
        databaseSize: dbSize,
        totalSize: diskUsage + dbSize
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('System info error:', error);
    res.status(500).json({ error: 'Failed to get system information' });
  }
});

// Get activity log
router.get('/activity', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    // This is a simplified activity log - in a real system you'd have a separate activity table
    const recentPosts = await db('blog_posts')
      .select('id', 'title', 'status', 'created_at', 'updated_at', 'author')
      .orderBy('updated_at', 'desc')
      .limit(limit)
      .offset(offset);

    const recentUsers = await db('users')
      .select('id', 'username', 'email', 'role', 'created_at')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const recentMedia = await db('media')
      .select('id', 'original_name', 'created_at', 'uploaded_by')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    res.json({
      posts: recentPosts,
      users: recentUsers,
      media: recentMedia
    });
  } catch (error) {
    console.error('Activity log error:', error);
    res.status(500).json({ error: 'Failed to get activity log' });
  }
});

// Backup database
router.post('/backup', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    
    const dbPath = path.join(__dirname, '../../data/blog_crm.db');
    const backupDir = path.join(__dirname, '../../backups');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `backup-${timestamp}.db`);

    // Create backup directory if it doesn't exist
    await fs.mkdir(backupDir, { recursive: true });

    // Copy database file
    await fs.copyFile(dbPath, backupPath);

    res.json({
      message: 'Database backup created successfully',
      backupPath: backupPath,
      timestamp: timestamp
    });
  } catch (error) {
    console.error('Backup error:', error);
    res.status(500).json({ error: 'Failed to create backup' });
  }
});

// Get backup files
router.get('/backups', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    
    const backupDir = path.join(__dirname, '../../backups');
    
    try {
      const files = await fs.readdir(backupDir);
      const backups = [];

      for (const file of files) {
        if (file.endsWith('.db')) {
          const filePath = path.join(backupDir, file);
          const stats = await fs.stat(filePath);
          backups.push({
            filename: file,
            size: stats.size,
            created: stats.birthtime,
            path: filePath
          });
        }
      }

      backups.sort((a, b) => b.created - a.created);

      res.json({ backups });
    } catch (error) {
      // Backup directory doesn't exist
      res.json({ backups: [] });
    }
  } catch (error) {
    console.error('Get backups error:', error);
    res.status(500).json({ error: 'Failed to get backup files' });
  }
});

// Restore database from backup
router.post('/restore/:filename', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    
    const { filename } = req.params;
    const backupPath = path.join(__dirname, '../../backups', filename);
    const dbPath = path.join(__dirname, '../../data/blog_crm.db');

    // Check if backup file exists
    try {
      await fs.access(backupPath);
    } catch (error) {
      return res.status(404).json({ error: 'Backup file not found' });
    }

    // Create a backup of current database before restoring
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const currentBackupPath = path.join(__dirname, '../../backups', `pre-restore-${timestamp}.db`);
    await fs.copyFile(dbPath, currentBackupPath);

    // Restore from backup
    await fs.copyFile(backupPath, dbPath);

    res.json({
      message: 'Database restored successfully',
      restoredFrom: filename,
      currentBackup: `pre-restore-${timestamp}.db`
    });
  } catch (error) {
    console.error('Restore error:', error);
    res.status(500).json({ error: 'Failed to restore database' });
  }
});

// Delete backup file
router.delete('/backups/:filename', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    
    const { filename } = req.params;
    const backupPath = path.join(__dirname, '../../backups', filename);

    // Check if backup file exists
    try {
      await fs.access(backupPath);
    } catch (error) {
      return res.status(404).json({ error: 'Backup file not found' });
    }

    // Delete backup file
    await fs.unlink(backupPath);

    res.json({
      message: 'Backup file deleted successfully',
      deletedFile: filename
    });
  } catch (error) {
    console.error('Delete backup error:', error);
    res.status(500).json({ error: 'Failed to delete backup file' });
  }
});

// ===== BLOG MANAGEMENT ROUTES =====

// Get all blog posts for admin (with status filter)
router.get('/blog-posts', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { 
      status, 
      page = 1, 
      limit = 20, 
      search, 
      category, 
      locale = 'en' 
    } = req.query;

    let query = db('blog_posts')
      .select('*')
      .where('locale', locale);

    // Filter by status
    if (status && status !== 'all') {
      query = query.where('status', status);
    }

    // Filter by category
    if (category) {
      query = query.where('category', category);
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
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset((page - 1) * limit);

    // Parse tags JSON for each post
    const postsWithParsedTags = posts.map(post => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : []
    }));

    res.json({
      posts: postsWithParsedTags,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.count,
        pages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    console.error('Get admin blog posts error:', error);
    res.status(500).json({ error: 'Failed to get blog posts' });
  }
});

// Get draft and archived posts specifically
router.get('/blog-posts/drafts', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { locale = 'en' } = req.query;

    const draftPosts = await db('blog_posts')
      .where('status', 'draft')
      .where('locale', locale)
      .orderBy('created_at', 'desc');

    const archivedPosts = await db('blog_posts')
      .where('status', 'archived')
      .where('locale', locale)
      .orderBy('created_at', 'desc');

    // Parse tags JSON for each post
    const parseTags = (posts) => posts.map(post => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : []
    }));

    res.json({
      drafts: parseTags(draftPosts),
      archived: parseTags(archivedPosts)
    });
  } catch (error) {
    console.error('Get draft/archived posts error:', error);
    res.status(500).json({ error: 'Failed to get draft and archived posts' });
  }
});

// Get single blog post for editing
router.get('/blog-posts/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await db('blog_posts')
      .where('id', id)
      .first();

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Parse tags JSON
    const postWithParsedTags = {
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : []
    };

    res.json({ post: postWithParsedTags });
  } catch (error) {
    console.error('Get blog post for editing error:', error);
    res.status(500).json({ error: 'Failed to get blog post' });
  }
});

// Update blog post status (publish, archive, etc.)
router.patch('/blog-posts/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const post = await db('blog_posts').where('id', id).first();
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const updateData = { status };
    
    // Set published_at if status changes to published
    if (status === 'published' && post.status !== 'published') {
      updateData.published_at = new Date();
    }

    await db('blog_posts')
      .where('id', id)
      .update(updateData);

    const updatedPost = await db('blog_posts').where('id', id).first();

    res.json({
      message: `Blog post status updated to ${status}`,
      post: updatedPost
    });
  } catch (error) {
    console.error('Update blog post status error:', error);
    res.status(500).json({ error: 'Failed to update blog post status' });
  }
});

// Bulk update blog posts status
router.patch('/blog-posts/bulk-status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { postIds, status } = req.body;

    if (!Array.isArray(postIds) || postIds.length === 0) {
      return res.status(400).json({ error: 'Post IDs array is required' });
    }

    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = { status };
    
    // Set published_at if status changes to published
    if (status === 'published') {
      updateData.published_at = new Date();
    }

    await db('blog_posts')
      .whereIn('id', postIds)
      .update(updateData);

    const updatedPosts = await db('blog_posts')
      .whereIn('id', postIds)
      .select('*');

    res.json({
      message: `Updated ${updatedPosts.length} blog posts to ${status}`,
      posts: updatedPosts
    });
  } catch (error) {
    console.error('Bulk update blog posts status error:', error);
    res.status(500).json({ error: 'Failed to update blog posts status' });
  }
});

// Get blog categories for admin
router.get('/blog-categories', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { locale = 'en' } = req.query;
    
    const categories = await db('categories')
      .where('locale', locale)
      .orderBy('name');

    res.json({ categories });
  } catch (error) {
    console.error('Get blog categories error:', error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

// Get blog tags for admin
router.get('/blog-tags', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { locale = 'en' } = req.query;
    
    const tags = await db('tags')
      .where('locale', locale)
      .orderBy('name');

    res.json({ tags });
  } catch (error) {
    console.error('Get blog tags error:', error);
    res.status(500).json({ error: 'Failed to get tags' });
  }
});

module.exports = router; 