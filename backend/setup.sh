#!/bin/bash

# IMM Backend CRM Setup Script
echo "🚀 Setting up IMM Backend CRM System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
PORT=5001
JWT_SECRET=imm-media-secret-key-2024
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
EOF
    echo "✅ Created .env file with default configuration"
else
    echo "✅ .env file already exists"
fi

# Initialize database
echo "🗄️ Initializing database..."
node src/database/init.js

if [ $? -ne 0 ]; then
    echo "❌ Failed to initialize database"
    exit 1
fi

# Setup admin panel
echo "🎨 Setting up admin panel..."
cd client

# Install client dependencies
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi

# Build admin panel
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build admin panel"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📊 Server Information:"
echo "   - Backend API: http://localhost:5001/api"
echo "   - Admin Panel: http://localhost:5001/admin"
echo "   - Health Check: http://localhost:5001/api/health"
echo ""
echo "👤 Default Admin Account:"
echo "   - Email: admin@immmedia.hk"
echo "   - Password: admin123"
echo ""
echo "🚀 To start the server:"
echo "   npm run dev"
echo ""
echo "⚠️  Remember to change the default admin password!" 