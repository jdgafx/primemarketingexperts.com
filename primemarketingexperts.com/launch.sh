#!/bin/bash

# Configuration
PROJECT_DIR="/home/chris/dev/primemarketingexperts.com_antigravity/primemarketingexperts.com"
PORT=3060

echo "🚀 Starting Prime Marketing Experts Clone + AI Services Launch Sequence..."

# Step 1: Navigate to project directory
cd "$PROJECT_DIR" || { echo "❌ Error: Project directory not found"; exit 1; }

# Step 2: Check for existing processes running on the target port
echo "🔍 Checking for existing processes on port $PORT..."
PID=$(lsof -t -i:$PORT)

if [ -n "$PID" ]; then
    echo "⚠️ Found process(es) $PID running on port $PORT. Shutting them down..."
    kill -9 $PID
    sleep 2
    echo "✅ Processes terminated."
else
    echo "✨ No existing processes found on port $PORT."
fi

# Step 3: Check for any other dangling node processes related to this project (careful not to kill unrelated stuff if possible, but pkill -f next-dev is usually okay for this user)
echo "🔍 Cleaning up any other related Node processes..."
pkill -f "next-dev" 2>/dev/null
# pkill -f "next-server" 2>/dev/null # Commented out to avoid killing production servers if any

# Step 4: Install dependencies (optional but recommended)
echo "📦 Ensuring dependencies are up to date..."
npm install --quiet

# Step 5: Start the application
echo "🌟 Launching at http://localhost:$PORT..."
echo "---------------------------------------------------"
# Pass the port explicitly to Next.js
npm run dev -- -p $PORT
