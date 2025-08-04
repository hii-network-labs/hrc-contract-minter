#!/bin/bash

# HRC-20 Token Minter Build Script
# Automatically build frontend with Bun

set -e

echo "🚀 Starting HRC-20 Token Minter Frontend build..."

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install Bun first:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun is installed: $(bun --version)"

# Move to frontend directory
cd frontend

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    bun install
else
    echo "✅ Dependencies installed"
fi

# Build project
echo "🔨 Building project..."
bun run build

echo "✅ Build completed!"
echo "📁 Output saved in: frontend/dist/"
echo ""
echo "🌐 To run development server:"
echo "   cd frontend && bun run dev"
echo ""
echo "📦 To preview build:"
echo "   cd frontend && bun run preview"