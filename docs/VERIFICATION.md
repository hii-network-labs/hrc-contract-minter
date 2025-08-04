# Contract Verification Documentation

## Overview

The Contract Verification feature allows you to verify smart contracts deployed on Hii Network explorer. This helps display source code and ABI on the explorer, increasing transparency and contract interaction capabilities.

## Why verify contracts?

### Main reasons:
1. **Display source code**: Users can view source code directly on the explorer
2. **Easy interaction**: Can call functions directly from the explorer
3. **Transparency**: Confirms the contract works as per the source code
4. **Security**: Users can audit code before interacting

### Why aren't contracts verified automatically?

**Contracts with the same bytecode/ABI as template contracts are NOT automatically verified because:**

1. **Constructor Parameters**: Each contract has different parameters
   ```solidity
   // Contract A
   constructor("Token A", "TKA", 1000000, owner1)
   
   // Contract B  
   constructor("Token B", "TKB", 2000000, owner2)
   ```
   → Creates different bytecode

2. **Metadata Hash**: Solidity compiler adds metadata to bytecode
   ```javascript
   // Metadata contains information about compiler, optimization, etc.
   // Makes bytecode different even when source code is the same
   ```

3. **Compiler Settings**: Version, optimization, runs can be different
4. **Explorer Logic**: Most explorers don't have auto-verify based on similar bytecode

## How it works

### 1. Automatically check verification status
```typescript
// When deployment is successful, system automatically checks
const status = await verifyService.checkVerificationStatus(
  contractAddress,
  chainId
);
```

### 2. Manual verification
```typescript
// User clicks "Verify Contract" button
const result = await verifyService.verifyContract(
  contractAddress,
  tokenType,
  constructorArgs,
  chainId
);
```

### 3. Handle BigInt
```typescript
// Custom JSON serializer to handle BigInt
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
  "message": "Contract has been verified successfully!",
  "explorerUrl": "https://explorer.hii.network/address/0x..."
}
```

## Source Code Management

### Copy Source Code
```bash
# Copy from HRC-20 project
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
   - **Cause**: JSON.stringify cannot serialize BigInt
   - **Solution**: Use custom serializer (already implemented)

2. **"Invalid contract address"**
   - **Cause**: Incorrect address format
   - **Solution**: Check address format

3. **"Invalid constructor arguments"**
   - **Cause**: Arguments are not array or missing
   - **Solution**: Check form data

4. **"Network not supported"**
   - **Cause**: Chain ID not supported
   - **Solution**: Only supports Hii Mainnet, Testnet, Localhost

### Debug Information
```typescript
// Console logs when verifying
console.log('Constructor arguments:', constructorArgs);
console.log('Serialized constructor arguments:', serializedConstructorArgs);
console.log('API URL:', apiUrl);
console.log('Request body:', requestBody);
```

## Testing

### Test Script
```bash
# Run test script
node test-verification.js
```

### Manual Testing
1. Deploy new contract
2. Click "Verify Contract" in modal
3. Check console logs
4. View results on explorer

## Troubleshooting

### Verification Failed
1. **Check source code**: Ensure source code has been copied
2. **Check constructor args**: Ensure correct format and order
3. **Check network**: Ensure you're on the correct network
4. **Retry**: Sometimes need to retry after a few minutes

### API Errors
1. **CORS**: Check CORS policy
2. **Rate limiting**: Wait a few minutes then retry
3. **Network issues**: Check network connection

## Best Practices

1. **Test on testnet first**: Always test verification on testnet
2. **Check source code**: Ensure source code is correct and complete
3. **Validate inputs**: Check constructor arguments before verifying
4. **Error handling**: Handle errors gracefully and display clear messages
5. **Logging**: Log sufficient information for debugging

## Future Improvements

1. **Auto-verification**: Automatically verify after deployment
2. **Batch verification**: Verify multiple contracts at once
3. **Verification history**: Save verification history
4. **Advanced validation**: Validate source code before verifying
5. **Multi-explorer support**: Support multiple different explorers