# Hii Token Minter v2

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-orange.svg)](https://bun.sh/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-purple.svg)](https://vitejs.dev/)

Frontend application để deploy HRC-20 tokens và HRC-721 NFTs trên Hii Network.

[![Hii Token Minter](https://img.shields.io/badge/Hii%20Network-Testnet%20%7C%20Mainnet-green.svg)](https://hii.network)

## 📋 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Usage](#-usage)
- [Networks](#-networks)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Tính năng

- ✅ Kết nối MetaMask wallet
- ✅ Deploy HRC-20 tokens (Standard & Full)
- ✅ Deploy HRC-721 NFT collections
- ✅ Hỗ trợ Hii Testnet và Mainnet
- ✅ UI/UX hiện đại với Tailwind CSS

## 📋 Yêu cầu

- Node.js 18+ hoặc Bun
- MetaMask wallet
- API key cho explorer (tùy chọn)

## 🛠️ Cài đặt

### 1. Clone và cài đặt dependencies

```bash
git clone <repository-url>
cd hii-token-minter-v2
bun install
```

### 2. Copy contract artifacts

```bash
# Copy ABI và bytecode từ HRC-20 project
./copy-contracts.sh
```



### 3. Chạy development server

```bash
bun run dev
```

Truy cập: http://localhost:3000

## 🌐 Networks

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| Hii Testnet | 22988 | http://103.69.98.80:8545 | https://explorer.testnet.hii.network |
| Hii Mainnet | 7000 | https://rpc.hii.network | https://explorer.hii.network |

## 📁 Cấu trúc Project

```
hii-token-minter-v2/
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/           # API services
│   │   ├── hooks/              # Custom hooks
│   │   ├── config/             # Network configs
│   │   ├── contracts/          # Contract ABIs & bytecodes
│   │   └── types/              # TypeScript types
│   └── package.json
├── copy-contracts.sh           # Copy contract artifacts
├── build.sh                    # Build script
├── package.json                # Root package.json
└── README.md
```

## 🔍 Troubleshooting

### Lỗi "MetaMask không được cài đặt"
- Cài đặt MetaMask extension
- Refresh trang web

### Lỗi "Network không được hỗ trợ"
- Thêm network vào MetaMask
- Hoặc chuyển sang network được hỗ trợ

### Lỗi "Insufficient balance"
- Đảm bảo có đủ HII tokens để trả gas fee
- Kiểm tra balance trong MetaMask

### Lỗi "Contract deployment failed"
- Kiểm tra network connection
- Đảm bảo có đủ gas fee
- Thử deploy lại sau vài phút

## 🎯 Ví dụ sử dụng

### Deploy HRC-20 Token

1. Kết nối MetaMask
2. Chọn network (Testnet/Mainnet)
3. Điền thông tin token:
   - Name: "My Token"
   - Symbol: "MTK"
   - Total Supply: 1000000
   - Decimals: 18
4. Click "Deploy Token"
5. Confirm transaction trong MetaMask
6. Copy contract address để sử dụng

### Deploy HRC-721 NFT

1. Kết nối MetaMask
2. Chọn network (Testnet/Mainnet)
3. Thông tin collection (được hardcode):
   - Name: "MyNFT" (fixed)
   - Symbol: "MNFT" (fixed)
   - Base URI: Optional (có thể set sau)
4. Click "Deploy NFT Collection"
5. Confirm transaction trong MetaMask
6. Copy contract address để sử dụng

## 📝 Scripts

```bash
# Development
bun run dev              # Start development server
bun run build            # Build for production
bun run preview          # Preview production build
```

## 🤝 Contributing

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết về cách đóng góp cho dự án này.

### Quick Start

1. Fork project
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

### Code of Conduct

Dự án này tuân theo [Code of Conduct](CODE_OF_CONDUCT.md). Bằng cách tham gia, bạn được mong đợi sẽ tuân thủ code này.

## 📄 License

Dự án này được cấp phép theo MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Acknowledgments

- [Hii Network](https://hii.network) - Blockchain platform
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Ethers.js](https://docs.ethers.org/) - Ethereum library
- [MetaMask](https://metamask.io/) - Wallet integration

## 📞 Support

- [GitHub Issues](https://github.com/your-username/hii-token-minter-v2/issues)
- [GitHub Discussions](https://github.com/your-username/hii-token-minter-v2/discussions)
- [Documentation](https://github.com/your-username/hii-token-minter-v2#readme)

---

**Made with ❤️ for the Hii Network community** 