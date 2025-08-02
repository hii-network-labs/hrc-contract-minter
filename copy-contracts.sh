#!/bin/bash

# Script copy contract artifacts từ HRC-20 project
# Tự động copy ABI và bytecode cho frontend

set -e

echo "📋 Copying contract artifacts from HRC-20 project..."

# Kiểm tra thư mục HRC-20 có tồn tại không
if [ ! -d "../HRC-20" ]; then
    echo "❌ Thư mục ../HRC-20 không tồn tại"
    echo "   Vui lòng đảm bảo HRC-20 project đã được clone"
    exit 1
fi

# Kiểm tra artifacts đã được compile chưa
if [ ! -d "../HRC-20/artifacts" ]; then
    echo "❌ Thư mục artifacts không tồn tại trong HRC-20 project"
    echo "   Vui lòng compile contracts trước:"
    echo "   cd ../HRC-20 && bun run compile"
    exit 1
fi

# Tạo thư mục contracts nếu chưa có
mkdir -p frontend/src/contracts

# Copy HRC-20 Token Standard
if [ -f "../HRC-20/artifacts/contracts/HRC20TokenStandard.sol/HRC20TokenStandard.json" ]; then
    cp "../HRC-20/artifacts/contracts/HRC20TokenStandard.sol/HRC20TokenStandard.json" "frontend/src/contracts/"
    echo "✅ Copied HRC20TokenStandard.json"
else
    echo "⚠️  HRC20TokenStandard.json không tồn tại"
fi

# Copy HRC-20 Token Full
if [ -f "../HRC-20/artifacts/contracts/HRC20TokenFull.sol/HRC20TokenFull.json" ]; then
    cp "../HRC-20/artifacts/contracts/HRC20TokenFull.sol/HRC20TokenFull.json" "frontend/src/contracts/"
    echo "✅ Copied HRC20TokenFull.json"
else
    echo "⚠️  HRC20TokenFull.json không tồn tại"
fi

# Copy MyNFT
if [ -f "../HRC-20/artifacts/contracts/nft/MyNFT.sol/MyNFT.json" ]; then
    cp "../HRC-20/artifacts/contracts/nft/MyNFT.sol/MyNFT.json" "frontend/src/contracts/"
    echo "✅ Copied MyNFT.json"
else
    echo "⚠️  MyNFT.json không tồn tại"
fi

echo ""
echo "🎉 Copy contracts hoàn thành!"
echo "📁 Contracts được lưu trong: frontend/src/contracts/"
echo ""
echo "🔨 Bây giờ bạn có thể build project:"
echo "   ./build.sh" 