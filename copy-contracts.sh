#!/bin/bash

# Script to copy contract artifacts from HRC-20 project
# Automatically copy ABI and bytecode for frontend

set -e

echo "📋 Copying contract artifacts from HRC-20 project..."

# Check if HRC-20 directory exists
if [ ! -d "../HRC-20" ]; then
    echo "❌ Directory ../HRC-20 does not exist"
echo "   Please ensure HRC-20 project has been cloned"
    exit 1
fi

# Check if artifacts have been compiled
if [ ! -d "../HRC-20/artifacts" ]; then
    echo "❌ Artifacts directory does not exist in HRC-20 project"
echo "   Please compile contracts first:"
echo "   cd ../HRC-20 && bun run compile"
    exit 1
fi

# Create contracts directory if it doesn't exist
mkdir -p frontend/src/contracts

# Copy HRC-20 Token Standard
if [ -f "../HRC-20/artifacts/contracts/HRC20TokenStandard.sol/HRC20TokenStandard.json" ]; then
    cp "../HRC-20/artifacts/contracts/HRC20TokenStandard.sol/HRC20TokenStandard.json" "frontend/src/contracts/"
    echo "✅ Copied HRC20TokenStandard.json"
else
    echo "⚠️  HRC20TokenStandard.json does not exist"
fi

# Copy HRC-20 Token Full
if [ -f "../HRC-20/artifacts/contracts/HRC20TokenFull.sol/HRC20TokenFull.json" ]; then
    cp "../HRC-20/artifacts/contracts/HRC20TokenFull.sol/HRC20TokenFull.json" "frontend/src/contracts/"
    echo "✅ Copied HRC20TokenFull.json"
else
    echo "⚠️  HRC20TokenFull.json does not exist"
fi

# Copy MyNFT
if [ -f "../HRC-20/artifacts/contracts/nft/MyNFT.sol/MyNFT.json" ]; then
    cp "../HRC-20/artifacts/contracts/nft/MyNFT.sol/MyNFT.json" "frontend/src/contracts/"
    echo "✅ Copied MyNFT.json"
else
    echo "⚠️  MyNFT.json does not exist"
fi

echo ""
echo "🎉 Copy contracts completed!"
echo "📁 Contracts saved in: frontend/src/contracts/"
echo ""
echo "🔨 Now you can build the project:"
echo "   ./build.sh"