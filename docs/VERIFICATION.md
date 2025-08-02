# Contract Verification Documentation

## Tổng quan

Tính năng Contract Verification cho phép verify smart contract đã deploy trên Hii Network explorer. Điều này giúp hiển thị source code và ABI trên explorer, tăng tính minh bạch và khả năng tương tác với contract.

## Tại sao cần verify contract?

### Lý do chính:
1. **Hiển thị source code**: Người dùng có thể xem source code trực tiếp trên explorer
2. **Tương tác dễ dàng**: Có thể gọi các function trực tiếp từ explorer
3. **Tính minh bạch**: Xác nhận contract hoạt động đúng như source code
4. **Bảo mật**: Người dùng có thể audit code trước khi tương tác

### Tại sao contract không được verify tự động?

**Contract có cùng bytecode/ABI như contract mẫu KHÔNG được verify tự động vì:**

1. **Constructor Parameters**: Mỗi contract có parameters khác nhau
   ```solidity
   // Contract A
   constructor("Token A", "TKA", 1000000, owner1)
   
   // Contract B  
   constructor("Token B", "TKB", 2000000, owner2)
   ```
   → Tạo ra bytecode khác nhau

2. **Metadata Hash**: Solidity compiler thêm metadata vào bytecode
   ```javascript
   // Metadata chứa thông tin về compiler, optimization, etc.
   // Làm cho bytecode khác nhau ngay cả khi source code giống nhau
   ```

3. **Compiler Settings**: Version, optimization, runs có thể khác nhau
4. **Explorer Logic**: Hầu hết explorer không có auto-verify dựa trên bytecode tương tự

## Cách hoạt động

### 1. Tự động kiểm tra verification status
```typescript
// Khi deploy thành công, hệ thống tự động kiểm tra
const status = await verifyService.checkVerificationStatus(
  contractAddress,
  chainId
);
```

### 2. Verify thủ công
```typescript
// User click "Verify Contract" button
const result = await verifyService.verifyContract(
  contractAddress,
  tokenType,
  constructorArgs,
  chainId
);
```

### 3. Xử lý BigInt
```typescript
// Custom JSON serializer để handle BigInt
const customStringify = (obj: any): string => {
  return JSON.stringify(obj, (_key, value) => {
    if (typeof value === 'bigint') {
      return value.toString(); // Convert BigInt to string
    }
    return value;
  });
};
```

## API Endpoints

### Hii Mainnet
- **Explorer**: https://explorer.hii.network
- **API**: https://explorer.hii.network/api
- **Chain ID**: 7000

### Hii Testnet  
- **Explorer**: https://explorer.testnet.hii.network
- **API**: https://explorer.testnet.hii.network/api
- **Chain ID**: 22988

### Localhost
- **Explorer**: http://localhost:8545
- **API**: http://localhost:8545/api
- **Chain ID**: 31337

## Request Format

### Verify Contract Request
```json
{
  "contractAddress": "0x...",
  "sourceCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;...",
  "abi": "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]",
  "constructorArguments": [
    "Token Name",
    "TKN", 
    "1000000000000000000000000",
    "0x..."
  ],
  "compilerVersion": "v0.8.20+commit.a1b79de6",
  "optimizationUsed": true,
  "runs": 200
}
```

### Response Format
```json
{
  "success": true,
  "message": "Contract đã được verify thành công!",
  "explorerUrl": "https://explorer.hii.network/address/0x..."
}
```

## Source Code Management

### Copy Source Code
```bash
# Copy từ HRC-20 project
./copy-source-code.sh
```

### Source Code Structure
```
frontend/src/source-code/
├── HRC20TokenStandard.sol
├── HRC20TokenFull.sol
├── MyNFT.sol
├── HRC20Base.sol
├── HRC721.sol
├── extensions/
│   ├── HRC20Burnable.sol
│   ├── HRC20Pausable.sol
│   └── HRC20Permit.sol
├── utils/
│   ├── Ownable.sol
│   ├── Context.sol
│   ├── Pausable.sol
│   └── Nonces.sol
└── interfaces/
    ├── IHRC20.sol
    ├── IHRC20Metadata.sol
    ├── IHRC20Permit.sol
    ├── IHRC721.sol
    └── IHRC721Metadata.sol
```

## Constructor Arguments

### HRC-20 Token Standard
```typescript
[
  "Token Name",           // string
  "TKN",                  // string  
  "1000000000000000000000000", // BigInt as string
  "0x..."                 // address
]
```

### HRC-20 Token Full
```typescript
[
  "Token Name",           // string
  "TKN",                  // string
  "1000000000000000000000000", // BigInt as string
  "0x..."                 // address
]
```

### HRC-721 NFT
```typescript
[
  "NFT Collection",       // string
  "NFT",                  // string
  "https://api.example.com/metadata/" // string
]
```

## Error Handling

### Common Errors

1. **"Do not know how to serialize a BigInt"**
   - **Cause**: JSON.stringify không thể serialize BigInt
   - **Solution**: Sử dụng custom serializer (đã được implement)

2. **"Contract address không hợp lệ"**
   - **Cause**: Address format không đúng
   - **Solution**: Kiểm tra address format

3. **"Constructor arguments không hợp lệ"**
   - **Cause**: Arguments không phải array hoặc thiếu
   - **Solution**: Kiểm tra form data

4. **"Network không được hỗ trợ"**
   - **Cause**: Chain ID không được support
   - **Solution**: Chỉ support Hii Mainnet, Testnet, Localhost

### Debug Information
```typescript
// Console logs khi verify
console.log('Constructor arguments:', constructorArgs);
console.log('Serialized constructor arguments:', serializedConstructorArgs);
console.log('API URL:', apiUrl);
console.log('Request body:', requestBody);
```

## Testing

### Test Script
```bash
# Chạy test script
node test-verification.js
```

### Manual Testing
1. Deploy contract mới
2. Click "Verify Contract" trong modal
3. Kiểm tra console logs
4. Xem kết quả trên explorer

## Troubleshooting

### Verification Failed
1. **Kiểm tra source code**: Đảm bảo đã copy source code
2. **Kiểm tra constructor args**: Đảm bảo đúng format và thứ tự
3. **Kiểm tra network**: Đảm bảo đang ở đúng network
4. **Thử lại**: Đôi khi cần thử lại sau vài phút

### API Errors
1. **CORS**: Kiểm tra CORS policy
2. **Rate limiting**: Đợi vài phút rồi thử lại
3. **Network issues**: Kiểm tra kết nối mạng

## Best Practices

1. **Test trên testnet trước**: Luôn test verification trên testnet
2. **Kiểm tra source code**: Đảm bảo source code đúng và đầy đủ
3. **Validate inputs**: Kiểm tra constructor arguments trước khi verify
4. **Error handling**: Xử lý lỗi gracefully và hiển thị thông báo rõ ràng
5. **Logging**: Log đầy đủ thông tin để debug

## Future Improvements

1. **Auto-verification**: Tự động verify sau khi deploy
2. **Batch verification**: Verify nhiều contract cùng lúc
3. **Verification history**: Lưu lịch sử verification
4. **Advanced validation**: Validate source code trước khi verify
5. **Multi-explorer support**: Support nhiều explorer khác nhau 