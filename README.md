# IMM Media Production House Website

A professional website for IMM Media Production House featuring a modern frontend built with Next.js and a comprehensive backend CRM system for content management.

## 🚀 Features

### Frontend (Next.js)
- **Multi-language Support**: English and Chinese (Traditional)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Blog System**: Dynamic blog posts with categories and tags
- **AI Storyboard Generator**: Interactive AI-powered storyboard creation
- **Portfolio Showcase**: Professional portfolio display
- **Contact Forms**: Lead generation and contact management

### Backend CRM (Node.js + Express)
- **Authentication System**: JWT-based authentication with role-based access
- **Content Management**: Blog post creation, editing, and publishing
- **Media Management**: File upload and management system
- **User Management**: Admin user management with roles
- **API Endpoints**: RESTful API for frontend integration
- **Database**: SQLite with Knex.js ORM

## 📁 Project Structure

```
web_IMM/
├── src/                          # Next.js frontend source
│   ├── app/                     # App router pages
│   │   ├── [locale]/           # Internationalized routes
│   │   │   ├── about/          # About page
│   │   │   ├── ai-generator/   # AI storyboard generator
│   │   │   ├── blog/           # Blog listing and detail pages
│   │   │   ├── contact/        # Contact page
│   │   │   ├── portfolio/      # Portfolio page
│   │   │   └── services/       # Services page
│   │   └── api/                # API routes
│   ├── components/              # Reusable React components
│   └── lib/                     # Utility functions and configurations
├── backend/                     # Backend CRM system
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── middleware/         # Express middleware
│   │   ├── database/           # Database setup and migrations
│   │   └── server.js           # Main server file
│   └── client/                 # React admin panel
│       ├── src/
│       │   ├── components/     # Admin components
│       │   └── pages/          # Admin pages
│       └── public/             # Static assets
├── messages/                    # Internationalization files
│   ├── en.json                 # English translations
│   └── zh.json                 # Chinese translations
└── public/                     # Static assets
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **next-intl**: Internationalization
- **React Hook Form**: Form handling
- **Axios**: HTTP client

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **SQLite**: Database
- **Knex.js**: SQL query builder
- **JWT**: Authentication
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
node src/server.js
```

### Admin Panel
The admin panel is served at `http://localhost:5001/admin`

**Default Admin Credentials:**
- Email: `admin@immmedia.hk`
- Password: `admin123`

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

## 🌐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
```env
PORT=5001
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## 🔧 Development

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use conventional commit messages

### Database
The backend uses SQLite for simplicity. For production, consider using PostgreSQL or MySQL.

### File Uploads
Media files are stored in the `backend/uploads/` directory. Ensure proper permissions and consider using cloud storage for production.

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for IMM Media Production House.

## 🤝 Support

For support or questions, please contact the development team.

---

**Built with ❤️ for IMM Media Production House**
