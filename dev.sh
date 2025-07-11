#!/bin/bash

echo "🚀 Starting IMM Media Production development servers..."

# Function to cleanup background processes
cleanup() {
    echo "🛑 Stopping servers..."
    pkill -f "next dev"
    pkill -f "node src/server.js"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server in background
echo "🔧 Starting backend server on port 5001..."
cd backend
node src/server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server in background
echo "🌐 Starting frontend server on port 3000..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "✅ Development servers started!"
echo "📊 Admin Panel: http://localhost:5001/admin"
echo "🌐 Frontend: http://localhost:3000"
echo "🔗 API: http://localhost:5001/api"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID 