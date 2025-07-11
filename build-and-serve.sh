#!/bin/bash

echo "🚀 Building and serving IMM Media Production website..."

# Build the Next.js frontend with static export
echo "📦 Building Next.js frontend..."
cd /Users/priskenlo/web_IMM
npm run build

# Build the React admin panel
echo "📦 Building React admin panel..."
cd backend/client
npm run build

# Go back to backend and start server
echo "🚀 Starting server..."
cd /Users/priskenlo/web_IMM/backend
node src/server.js 