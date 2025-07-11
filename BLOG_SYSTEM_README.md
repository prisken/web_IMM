# IMM Media Production Blog System

A complete blog system for IMM Media Production with a modern frontend and robust backend API.

## 🚀 Features

### Frontend (Next.js + TypeScript)
- **Modern Design**: Clean, responsive blog interface with Tailwind CSS
- **Search & Filtering**: Advanced search with category and tag filtering
- **Internationalization**: Support for English and Chinese locales
- **SEO Optimized**: Meta tags, structured data, and SEO-friendly URLs
- **Performance**: Fast loading with optimized images and lazy loading

### Backend (Node.js + Express + SQLite)
- **RESTful API**: Complete CRUD operations for blog posts
- **Authentication**: JWT-based authentication with role-based access
- **Admin Panel**: React-based admin interface for content management
- **Media Management**: File upload and media library
- **Database**: SQLite with Knex.js ORM

## 📁 Project Structure

```
web_IMM/
├── src/app/[locale]/blog/          # Frontend blog pages
│   ├── page.tsx                    # Blog listing page
│   ├── BlogClient.tsx              # Blog client component
│   └── [slug]/                     # Individual blog post pages
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── blog.js             # Blog API routes
│   │   │   ├── auth.js             # Authentication routes
│   │   │   └── media.js            # Media upload routes
│   │   ├── database/
│   │   │   └── init.js             # Database initialization
│   │   └── utils/
│   │       ├── sampleBlogData.js   # Sample blog content
│   │       └── populateBlogData.js # Database population script
│   └── client/                     # React admin panel
└── messages/                       # Internationalization files
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd web_IMM
npm install
cd backend
npm install
```

### 2. Start the Backend Server
```bash
cd backend
node src/server.js
```

The backend will:
- Initialize the database with tables
- Create default admin user
- Populate sample blog posts
- Start the server on port 5001

### 3. Start the Frontend
```bash
# In a new terminal
npm run dev
```

The frontend will start on port 3000.

## 🔐 Admin Access

### Default Admin Credentials
- **Email**: `admin@immmedia.hk`
- **Password**: `admin123`

### Admin Panel Features
- Create, edit, and delete blog posts
- Manage categories and tags
- Upload and manage media files
- User management
- Analytics dashboard

## 📝 Blog Management

### Creating Blog Posts
1. Login to admin panel: `http://localhost:5001/admin`
2. Navigate to "Blog Posts"
3. Click "Create New Post"
4. Fill in the required fields:
   - Title
   - Excerpt
   - Content (supports HTML)
   - Category
   - Tags
   - Featured Image
   - Status (draft/published)

### Blog Post Fields
- **Title**: The post title (auto-generates slug)
- **Excerpt**: Short description for listings
- **Content**: Full post content (HTML supported)
- **Category**: Post category (Technology, TV Commercials, etc.)
- **Tags**: Array of tags for filtering
- **Featured Image**: URL for the post image
- **Read Time**: Estimated reading time in minutes
- **SEO Description**: Meta description for SEO
- **Status**: Draft, Published, or Archived
- **Locale**: Language (en/zh)

## 🌐 API Endpoints

### Public Endpoints
```
GET  /api/health                    # Health check
GET  /api/blog                      # List blog posts
GET  /api/blog/:slug                # Get single post
GET  /api/blog/categories           # List categories
GET  /api/blog/tags                 # List tags
```

### Protected Endpoints (Admin)
```
POST   /api/auth/login              # Login
GET    /api/auth/me                 # Get current user
POST   /api/blog                    # Create post
PUT    /api/blog/:id                # Update post
DELETE /api/blog/:id                # Delete post
POST   /api/media                   # Upload media
```

## 🎨 Frontend Features

### Blog Listing Page
- **Hero Section**: Eye-catching header with gradient background
- **Search & Filters**: Advanced filtering by search term, category, and tags
- **Responsive Grid**: Beautiful card layout for blog posts
- **Hover Effects**: Smooth animations and transitions
- **Loading States**: Professional loading indicators

### Individual Blog Posts
- **Rich Content**: Full HTML content support
- **Related Posts**: Suggestions for similar content
- **Social Sharing**: Easy sharing options
- **SEO Optimized**: Meta tags and structured data

## 🔧 Development

### Adding New Blog Posts
1. **Via Admin Panel** (Recommended):
   - Use the web interface at `http://localhost:5001/admin`

2. **Via API**:
   ```bash
   curl -X POST http://localhost:5001/api/blog \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{
       "title": "Your Post Title",
       "excerpt": "Post excerpt...",
       "content": "<p>Your content...</p>",
       "category": "Technology",
       "tags": ["AI", "Innovation"],
       "status": "published"
     }'
   ```

3. **Via Database Script**:
   - Add to `backend/src/utils/sampleBlogData.js`
   - Run `node src/utils/populateBlogData.js`

### Customizing the Design
- **Colors**: Modify Tailwind classes in components
- **Layout**: Edit `BlogClient.tsx` for layout changes
- **Styling**: Update CSS classes and Tailwind utilities

### Adding New Categories/Tags
1. **Via Admin Panel**: Use the categories/tags management
2. **Via Database**: Add to `backend/src/database/init.js`
3. **Via API**: Use the categories/tags endpoints

## 🧪 Testing

### Run Integration Tests
```bash
node test-blog-integration.js
```

This will test:
- Backend API health
- Blog posts retrieval
- Frontend accessibility
- Individual post access
- Categories API

### Manual Testing
1. **Frontend**: Visit `http://localhost:3000/en/blog`
2. **Backend API**: Test endpoints with curl or Postman
3. **Admin Panel**: Login at `http://localhost:5001/admin`

## 📊 Sample Data

The system comes with 6 sample blog posts covering:
- AI in Media Production
- KOL Marketing Trends
- TV Commercial Production
- Digital Marketing Strategies
- Creative Storyboarding
- Industry Insights

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Role-based Access**: Admin, Editor, Author roles
- **Input Validation**: Server-side validation with express-validator
- **SQL Injection Protection**: Knex.js ORM
- **XSS Protection**: HTML sanitization with sanitize-html

## 🚀 Deployment

### Backend Deployment
1. Set environment variables:
   ```bash
   export JWT_SECRET=your-secret-key
   export NODE_ENV=production
   ```
2. Start the server:
   ```bash
   cd backend
   node src/server.js
   ```

### Frontend Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `out` directory to your hosting service

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**:
   ```bash
   # Kill processes on ports
   lsof -ti:3000 | xargs kill -9
   lsof -ti:5001 | xargs kill -9
   ```

2. **Database Issues**:
   ```bash
   # Reset database
   rm backend/data/blog_crm.db
   cd backend && node src/server.js
   ```

3. **Frontend Not Loading**:
   - Check if backend is running
   - Verify API endpoints are accessible
   - Check browser console for errors

4. **Admin Login Issues**:
   - Verify admin user exists in database
   - Check JWT secret configuration
   - Clear browser cache and cookies

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check server logs for error messages
4. Test individual components

## 🎯 Next Steps

Potential enhancements:
- [ ] Add pagination for large blog lists
- [ ] Implement comment system
- [ ] Add newsletter subscription
- [ ] Create RSS feeds
- [ ] Add analytics tracking
- [ ] Implement caching layer
- [ ] Add image optimization
- [ ] Create mobile app

---

**IMM Media Production Blog System** - A modern, scalable blog platform for creative professionals. 