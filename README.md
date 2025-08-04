# Hii Token Minter v2

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-orange.svg)](https://bun.sh/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-purple.svg)](https://vitejs.dev/)

Frontend application to deploy HRC-20 tokens and HRC-721 NFTs on Hii Network.

[![Hii Token Minter](https://img.shields.io/badge/Hii%20Network-Testnet%20%7C%20Mainnet-green.svg)](https://hii.network)

## 📋 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Usage](#-usage)
- [Networks](#-networks)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Documentation](#-documentation)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

- ✅ Connect MetaMask wallet
- ✅ Deploy HRC-20 tokens (Standard & Full)
- ✅ Deploy HRC-721 NFT collections
- ✅ Support Hii Testnet and Mainnet
- ✅ Modern UI/UX with Tailwind CSS

## 📋 Requirements

- Node.js 18+ or Bun
- MetaMask wallet
- API key for explorer (optional)

## 🛠️ Installation

### 1. Clone and install dependencies

```bash
git clone https://github.com/hii-network-labs/hrc-contract-minter.git
cd hii-token-minter-v2
bun install
```

### 2. Copy contract artifacts

```bash
# Copy ABI and bytecode from HRC-20 project
./copy-contracts.sh
```



### 3. Run development server

```bash
bun run dev
```

Access: http://localhost:3000

## 🌐 Networks

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| Hii Testnet | 22988 | http://103.69.98.80:8545 | https://explorer.testnet.hii.network |
| Hii Mainnet | 7000 | https://rpc.hii.network | https://explorer.hii.network |

## 📁 Project Structure

```
hii-token-minter-v2/
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/           # API services
│   │   ├── hooks/              # Custom hooks
│   │   ├── config/             # Network configs
│   │   ├── contracts/          # Contract ABIs & bytecodes
│   │   ├── contexts/           # React contexts
│   │   └── types/              # TypeScript types
│   ├── .eslintrc.json          # ESLint configuration
│   ├── .prettierrc             # Prettier configuration
│   └── package.json
├── docs/                       # Documentation
├── .github/                    # GitHub templates & workflows
├── copy-contracts.sh           # Copy contract artifacts
├── build.sh                    # Build script
├── package.json                # Root package.json
└── README.md
```

## 🔍 Troubleshooting

### Error "MetaMask not installed"
- Install MetaMask extension
- Refresh the webpage

### Error "Network not supported"
- Add network to MetaMask
- Or switch to a supported network

### Error "Insufficient balance"
- Ensure you have enough HII tokens for gas fees
- Check balance in MetaMask

### Error "Contract deployment failed"
- Check network connection
- Ensure sufficient gas fees
- Try deploying again after a few minutes

## 🎯 Usage Examples

### Deploy HRC-20 Token

1. Connect MetaMask
2. Select network (Testnet/Mainnet)
3. Fill token information:
   - Name: "My Token"
   - Symbol: "MTK"
   - Total Supply: 1000000
   - Decimals: 18
4. Click "Deploy Token"
5. Confirm transaction in MetaMask
6. Copy contract address for use

### Deploy HRC-721 NFT

1. Connect MetaMask
2. Select network (Testnet/Mainnet)
3. Collection information (hardcoded):
   - Name: "MyNFT" (fixed)
   - Symbol: "MNFT" (fixed)
   - Base URI: Optional (can be set later)
4. Click "Deploy NFT Collection"
5. Confirm transaction in MetaMask
6. Copy contract address for use

## 🛠️ Development

### Scripts

```bash
# Development
bun run dev              # Start development server
bun run build            # Build for production
bun run preview          # Preview production build
bun run test             # Run tests

# Code Quality
cd frontend
bun run lint             # Run ESLint
bun run lint:fix         # Fix ESLint errors
bun run format           # Format code with Prettier
bun run format:check     # Check code formatting
bun run type-check       # TypeScript type checking
```

### Code Quality Standards

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **EditorConfig**: Consistent coding style

### Pre-commit Hooks (Khuyến nghị)

```bash
# Install husky for git hooks
bun add -D husky lint-staged

# Setup pre-commit hook
echo '#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

lint-staged' > .husky/pre-commit
```

## 📚 Documentation

- **[API Documentation](API.md)** - Details about interfaces and services
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment guide
- **[Contract Verification](docs/VERIFICATION.md)** - Guide to verify contracts
- **[Contributing Guide](CONTRIBUTING.md)** - Contribution process
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Code of conduct
- **[Security Policy](SECURITY.md)** - Security policy
- **[Changelog](CHANGELOG.md)** - Change history

## 🤝 Contributing

We welcome all contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details on how to contribute to this project.

### Quick Start

1. Fork the project
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code of Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hii Network](https://hii.network) - Blockchain platform
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Ethers.js](https://docs.ethers.org/) - Ethereum library
- [MetaMask](https://metamask.io/) - Wallet integration

## 📞 Support

- [GitHub Issues](https://github.com/hii-network-labs/hrc-contract-minter/issues)
- [GitHub Discussions](https://github.com/hii-network-labs/hrc-contract-minter/discussions)
- [Documentation](https://github.com/hii-network-labs/hrc-contract-minter#readme)

---

**Made with ❤️ for the Hii Network community**