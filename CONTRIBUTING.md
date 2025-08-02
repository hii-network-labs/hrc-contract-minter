# Contributing to Hii Token Minter

Cảm ơn bạn đã quan tâm đến việc đóng góp cho Hii Token Minter! 🚀

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## 🤝 Code of Conduct

Dự án này và những người đóng góp của nó tuân theo [Code of Conduct](CODE_OF_CONDUCT.md). Bằng cách tham gia, bạn được mong đợi sẽ tuân thủ code này.

## 💡 How Can I Contribute?

### 🐛 Reporting Bugs

- Sử dụng [GitHub Issues](https://github.com/your-username/hii-token-minter-v2/issues)
- Kiểm tra xem bug đã được báo cáo chưa
- Cung cấp thông tin chi tiết về bug:
  - Mô tả rõ ràng về vấn đề
  - Các bước để tái tạo bug
  - Screenshots (nếu có)
  - Browser và OS version

### ✨ Suggesting Enhancements

- Tạo feature request trên GitHub Issues
- Mô tả chi tiết tính năng mong muốn
- Giải thích lý do tại sao tính năng này hữu ích
- Đề xuất cách implement (nếu có)

### 🔧 Pull Requests

- Fork repository
- Tạo feature branch: `git checkout -b feature/amazing-feature`
- Commit changes: `git commit -m 'Add amazing feature'`
- Push to branch: `git push origin feature/amazing-feature`
- Tạo Pull Request

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ hoặc Bun
- MetaMask extension
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/hii-token-minter-v2.git
cd hii-token-minter-v2

# Install dependencies
bun install

# Copy contract artifacts
./copy-contracts.sh

# Start development server
bun run dev
```

### Project Structure

```
hii-token-minter-v2/
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/           # API services
│   │   ├── hooks/              # Custom hooks
│   │   ├── config/             # Network configs
│   │   ├── contracts/          # Contract ABIs
│   │   └── types/              # TypeScript types
│   └── package.json
├── copy-contracts.sh           # Copy contract artifacts
├── build.sh                    # Build script
└── README.md
```

## 📝 Pull Request Process

1. **Fork và clone** repository
2. **Tạo branch** cho feature/fix của bạn
3. **Code changes** theo coding standards
4. **Test** changes của bạn
5. **Commit** với message rõ ràng
6. **Push** lên branch của bạn
7. **Tạo Pull Request** với description chi tiết

### Commit Message Format

```
type(scope): description

feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

### Code Standards

- Sử dụng TypeScript
- Tuân thủ ESLint rules
- Viết comments cho code phức tạp
- Test changes của bạn
- Cập nhật documentation nếu cần

## 🧪 Testing

```bash
# Run tests
bun test

# Run linting
bun run lint

# Build project
bun run build
```

## 📚 Documentation

- Cập nhật README.md nếu cần
- Thêm comments cho code mới
- Cập nhật API documentation
- Thêm examples nếu cần

## 🎯 Areas for Contribution

### Frontend
- UI/UX improvements
- New features
- Bug fixes
- Performance optimizations
- Accessibility improvements

### Smart Contracts
- Contract optimizations
- Security improvements
- New token standards
- Gas optimizations

### Documentation
- README improvements
- Code comments
- API documentation
- Tutorials and guides

## 🏷️ Release Process

1. Update version trong `package.json`
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to production

## 📞 Getting Help

- [GitHub Issues](https://github.com/your-username/hii-token-minter-v2/issues)
- [Discussions](https://github.com/your-username/hii-token-minter-v2/discussions)
- [Documentation](https://github.com/your-username/hii-token-minter-v2#readme)

## 🙏 Acknowledgments

Cảm ơn tất cả contributors đã đóng góp cho dự án này!

---

**Happy Contributing! 🎉** 