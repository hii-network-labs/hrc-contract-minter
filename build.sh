#!/bin/bash

# HRC-20 Token Minter Build Script
# Tự động build frontend với Bun

set -e

echo "🚀 Bắt đầu build HRC-20 Token Minter Frontend..."

# Kiểm tra Bun có được cài đặt không
if ! command -v bun &> /dev/null; then
    echo "❌ Bun chưa được cài đặt. Vui lòng cài đặt Bun trước:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun đã được cài đặt: $(bun --version)"

# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies nếu chưa có
if [ ! -d "node_modules" ]; then
    echo "📦 Cài đặt dependencies..."
    bun install
else
    echo "✅ Dependencies đã được cài đặt"
fi

# Build project
echo "🔨 Đang build project..."
bun run build

echo "✅ Build hoàn thành!"
echo "📁 Output được lưu trong: frontend/dist/"
echo ""
echo "🌐 Để chạy development server:"
echo "   cd frontend && bun run dev"
echo ""
echo "📦 Để preview build:"
echo "   cd frontend && bun run preview" 