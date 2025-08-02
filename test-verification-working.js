#!/usr/bin/env node

// Test script với contract đã verify thành công
const { ethers } = require('ethers');

console.log('🧪 Testing with working contract...\n');

// Contract đã verify thành công
const workingContract = '0x7c5FBFb1327e6ef00E48488a9Df373A2370afDF4';

// Constructor arguments từ contract đã verify
const constructorArgs = [
  'Hii Network Token', // name
  'HII', // symbol
  ethers.parseEther('1000000'), // totalSupply
  '0xb769BEFa05c7D9B08062630E351e865d3F49c56D' // owner
];

console.log('📋 Working Contract:', workingContract);
console.log('📝 Constructor Args:', constructorArgs);

// Encode constructor arguments
const encodeArgs = (args) => {
  return args.map(arg => {
    if (typeof arg === 'string') {
      if (ethers.isAddress(arg)) {
        return ethers.zeroPadValue(arg, 32);
      } else {
        return ethers.zeroPadValue(ethers.toUtf8Bytes(arg), 32);
      }
    } else if (typeof arg === 'bigint') {
      return ethers.zeroPadValue(ethers.toBeHex(arg), 32);
    }
  }).join('');
};

const encodedArgs = encodeArgs(constructorArgs);
console.log('🔧 Encoded Args:', encodedArgs);

console.log('\n💡 Key Insights:');
console.log('1. Contract đã verify thành công = verification hoạt động');
console.log('2. Source code khớp = không phải vấn đề source code');
console.log('3. Vấn đề có thể là constructor arguments encoding');
console.log('4. Hoặc compiler settings không khớp');

console.log('\n🎯 Next Steps:');
console.log('1. Deploy contract mới với constructor arguments chính xác');
console.log('2. Verify với source code và settings đúng');
console.log('3. Đợi vài phút để xử lý'); 