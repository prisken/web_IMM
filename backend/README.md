# IMM Backend CRM System

A comprehensive backend CRM system for IMM Media Production House, built with Node.js, Express, and SQLite.

## 🚀 Features

- **Authentication System**: JWT-based authentication with role-based access control
- **Content Management**: Blog post creation, editing, and publishing
- **Media Management**: File upload and management system
- **User Management**: Admin user management with roles
- **RESTful API**: Complete API for frontend integration
- **Admin Panel**: React-based admin interface

## 📁 Structure

```
backend/
├── src/
│   ├── routes/           # API route handlers
│   │   ├── auth.js       # Authentication routes
│   │   ├── blog.js       # Blog post routes
│   │   ├── media.js      # Media management routes
│   │   └── admin.js      # Admin-specific routes
│   ├── middleware/       # Express middleware
│   │   ├── auth.js       # JWT authentication middleware
│   │   └── upload.js     # File upload middleware
│   ├── database/         # Database setup and migrations
│   │   ├── init.js       # Database initialization
│   │   └── migrations/   # Database migrations
│   └── server.js         # Main server file
├── client/               # React admin panel
│   ├── src/
│   │   ├── components/   # Admin components
│   │   ├── pages/        # Admin pages
│   │   └── App.js        # Main app component
│   └── public/           # Static assets
├── uploads/              # File upload directory
└── package.json          # Dependencies and scripts
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Initialize database**
   ```bash
   node src/database/init.js
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build admin panel**
   ```bash
   cd client
   npm install
   npm run build
   ```

## 🔧 Configuration

### Environment Variables (.env)
```env
PORT=5001
JWT_SECRET=your-secret-key-here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Database
The system uses SQLite for simplicity. The database file is created automatically at `database.sqlite`.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Blog Posts
- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Create new blog post
- `GET /api/blog/:id` - Get specific blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post

### Media Management
- `GET /api/media` - Get all media files
- `POST /api/media` - Upload media file
- `DELETE /api/media/:id` - Delete media file

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `POST /api/admin/import-data` - Import mock data

## 👤 Default Admin User

- **Email**: `admin@immmedia.hk`
- **Password**: `admin123`
- **Role**: `admin`

## 🚀 Admin Panel

The admin panel is served at `http://localhost:5001/admin` and provides:

- Dashboard with statistics
- Blog post management
- Media file management
- User management
- Data import functionality

## 🔒 Security

- JWT-based authentication
- Role-based access control
- File upload validation
- CORS configuration
- Input validation and sanitization

## 📝 Development

### Scripts
```bash
npm run dev          # Start development server with nodemon
npm run start        # Start production server
npm run build        # Build admin panel
```

### Database Migrations
```bash
# Create new migration
npx knex migrate:make migration_name

# Run migrations
npx knex migrate:latest

# Rollback migrations
npx knex migrate:rollback
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill existing process
   pkill -f "node src/server.js"
   ```

2. **Database errors**
   ```bash
   # Remove database and reinitialize
   rm database.sqlite
   node src/database/init.js
   ```

3. **Admin panel not loading**
   ```bash
   # Rebuild admin panel
   cd client
   npm run build
   ```

## 📄 License

This project is proprietary software for IMM Media Production House. 