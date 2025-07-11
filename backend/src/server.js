const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const mediaRoutes = require('./routes/media');
const adminRoutes = require('./routes/admin');
const { initializeDatabase } = require('./database/init');

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve admin panel static files
app.use('/admin/static', express.static(path.join(__dirname, '../client/build/static')));

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, '../client/build')));

// Catch-all for admin routes - serve React app for all non-API routes
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Serve main website static files (if built)
const mainWebsitePath = path.join(__dirname, '../../out');
if (require('fs').existsSync(mainWebsitePath)) {
  app.use(express.static(mainWebsitePath));
  
  // Handle client-side routing for main website
  app.get('*', (req, res, next) => {
    // Skip API routes and admin routes
    if (req.path.startsWith('/api/') || req.path.startsWith('/admin/')) {
      return next();
    }
    
    // Try to serve static file first
    const filePath = path.join(mainWebsitePath, req.path);
    if (require('fs').existsSync(filePath) && require('fs').statSync(filePath).isFile()) {
      return res.sendFile(filePath);
    }
    
    // Fallback to index.html for client-side routing
    res.sendFile(path.join(mainWebsitePath, 'index.html'));
  });
} else {
  // If main website is not built, redirect to admin
  app.get('/', (req, res) => {
    res.redirect('/admin');
  });
  
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/') && !req.path.startsWith('/admin/')) {
      res.redirect('/admin');
    } else {
      res.status(404).json({ error: 'Route not found' });
    }
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    console.log('✅ Database initialized successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 IMM Media Production Server running on port ${PORT}`);
      console.log(`📊 Admin Panel: http://localhost:${PORT}/admin`);
      console.log(`🌐 Main Website: http://localhost:${PORT}`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 