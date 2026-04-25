#!/bin/bash

echo "🚀 Starting MedMeal AI..."
echo ""

# Check if .env exists
if [ ! -f backend/.env ]; then
    echo "⚠️  No .env file found in backend/"
    echo "Please create backend/.env and add your ANTHROPIC_API_KEY"
    echo ""
    echo "Example:"
    echo "ANTHROPIC_API_KEY=your_api_key_here"
    echo "PORT=3001"
    echo "FRONTEND_URL=http://localhost:5173"
    exit 1
fi

echo "Starting backend server..."
cd backend && npm start &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo "Starting frontend server..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ MedMeal AI is running!"
echo ""
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

wait
