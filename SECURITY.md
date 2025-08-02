# Security Policy

## Supported Versions

Dự án này hỗ trợ các phiên bản sau với các bản cập nhật bảo mật:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

Chúng tôi coi trọng bảo mật và hoan nghênh báo cáo về các lỗ hổng bảo mật từ cộng đồng.

### 🔒 How to Report

**KHÔNG** tạo issue công khai cho các lỗ hổng bảo mật. Thay vào đó:

1. **Email**: Gửi email đến [security@hii.network](mailto:security@hii.network)
2. **Subject**: `[SECURITY] Hii Token Minter v2 - [Brief Description]`
3. **Include**:
   - Mô tả chi tiết về lỗ hổng
   - Các bước để tái tạo
   - Tác động tiềm năng
   - Đề xuất fix (nếu có)

### 📋 What to Include

- **Mô tả lỗ hổng**: Chi tiết về vấn đề bảo mật
- **Severity**: Mức độ nghiêm trọng (Low/Medium/High/Critical)
- **Proof of Concept**: Code hoặc steps để tái tạo
- **Impact**: Tác động tiềm năng đến users
- **Environment**: Browser, OS, version

### ⏱️ Response Timeline

- **Initial Response**: 24-48 hours
- **Assessment**: 3-5 business days
- **Fix Development**: 1-2 weeks (tùy thuộc vào complexity)
- **Public Disclosure**: Sau khi fix được deploy

### 🏆 Recognition

Contributors báo cáo lỗ hổng bảo mật hợp lệ sẽ được:

- Ghi nhận trong [SECURITY.md](SECURITY.md)
- Thêm vào [Hall of Fame](#hall-of-fame)
- Nhận credit trong release notes

## Hall of Fame

Cảm ơn các security researchers đã đóng góp:

<!-- Add security researchers here -->

## Best Practices

### For Users

- Luôn verify contract addresses trước khi deploy
- Sử dụng MetaMask với các network đáng tin cậy
- Không chia sẻ private keys hoặc seed phrases
- Test trên testnet trước khi deploy lên mainnet

### For Developers

- Audit smart contracts trước khi deploy
- Sử dụng latest versions của dependencies
- Implement proper access controls
- Test edge cases và error conditions

## Security Checklist

- [ ] Smart contracts được audit
- [ ] Dependencies được update thường xuyên
- [ ] Access controls được implement đúng cách
- [ ] Error handling được test kỹ lưỡng
- [ ] Input validation được implement
- [ ] Gas limits được set phù hợp

---

**Thank you for helping keep Hii Token Minter secure! 🔒** 