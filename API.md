# API Documentation

## 📋 Overview

API documentation for HRC Minter, including interfaces, types, and services.

## 🔧 Core Services

### ContractService

Main service for interacting with smart contracts.

#### Methods

##### `deployHRC20Token(formData: TokenFormData): Promise<DeployResult>`

Deploy HRC-20 token contract.

**Parameters:**
```typescript
interface TokenFormData {
  name: string;           // Token name
symbol: string;         // Token symbol (3-5 characters)
totalSupply: string;    // Total supply (string to avoid overflow)
tokenType: 'standard' | 'full'; // Token type
}
```

**Returns:**
```typescript
interface DeployResult {
  success: boolean;
  contractAddress?: string;
  transactionHash?: string;
  error?: string;
}
```

**Example:**
```typescript
const contractService = new ContractService();
const result = await contractService.deployHRC20Token({
  name: "My Token",
  symbol: "MTK",
  totalSupply: "1000000",
  tokenType: "standard"
});
```

##### `deployHRC721NFT(formData: NFTFormData): Promise<DeployResult>`

Deploy HRC-721 NFT collection contract.

**Parameters:**
```typescript
interface NFTFormData {
  name: string;     // Collection name (fixed: "MyNFT")
  symbol: string;   // Collection symbol (fixed: "MNFT")
  baseURI?: string; // Base URI for metadata (optional)
}
```

**Returns:** Same as `DeployResult`

##### `getTokenInfo(contractAddress: string, tokenType: 'hrc20' | 'hrc721'): Promise<any>`

Get token information from contract address.

**Parameters:**
- `contractAddress`: Contract address
- `tokenType`: Token type

**Returns:**
```typescript
// For HRC-20
interface HRC20Info {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  owner: string;
}

// For HRC-721
interface HRC721Info {
  name: string;
  symbol: string;
  owner: string;
  totalSupply?: string;
}
```

## 🌐 Network Configuration

### NetworkConfig Interface

```typescript
interface NetworkConfig {
  name: string;           // Network name
  chainId: number;        // Chain ID
  rpcUrl: string;         // RPC endpoint
  explorerUrl: string;    // Block explorer URL
  nativeCurrency: {
    name: string;         // Native currency name
symbol: string;       // Native currency symbol
    decimals: number;     // Decimals (usually 18)
  };
}
```

### Available Networks

```typescript
const NETWORKS: NetworkConfig[] = [
  {
    name: 'Hii Mainnet',
    chainId: 7000,
    rpcUrl: 'https://rpc.hii.network',
    explorerUrl: 'https://explorer.hii.network',
    nativeCurrency: { name: 'HII', symbol: 'HII', decimals: 18 }
  },
  {
    name: 'Hii Testnet',
    chainId: 22988,
    rpcUrl: 'https://testnet-rpc.hii.network',
    explorerUrl: 'https://explorer.testnet.hii.network',
    nativeCurrency: { name: 'HII', symbol: 'HII', decimals: 18 }
  }
];
```

### Network Utilities

##### `getNetworkByChainId(chainId: number): NetworkConfig | undefined`

Get network config by chain ID.

##### `addNetworkToMetaMask(network: NetworkConfig): Promise<boolean>`

Add network to MetaMask.

## 🔗 Wallet Integration

### WalletContext

React Context for managing wallet state.

```typescript
interface WalletState {
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;
}

interface WalletContextType {
  walletState: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}
```

### useWallet Hook

Custom hook for using wallet functionality.

```typescript
const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
```

**Usage:**
```typescript
const { walletState, connectWallet, switchNetwork } = useWallet();

// Connect wallet
if (!walletState.isConnected) {
  await connectWallet();
}

// Switch to Hii Mainnet
if (walletState.chainId !== 7000) {
  await switchNetwork(7000);
}
```

## 📝 Form Interfaces

### TokenForm Props

```typescript
interface TokenFormProps {
  onDeploy: (formData: TokenFormData) => Promise<void>;
  isDeploying: boolean;
}
```

### NFTForm Props

```typescript
interface NFTFormProps {
  onDeploy: (formData: NFTFormData) => Promise<void>;
  isDeploying: boolean;
}
```

### DeployResult Modal Props

```typescript
interface DeployResultProps {
  result: DeployResult;
  onClose: () => void;
  tokenType: 'hrc20' | 'hrc721';
formData: TokenFormData | NFTFormData;
}
```

## 🔒 Error Handling

### Common Error Types

```typescript
// MetaMask not installed
throw new Error('MetaMask is not installed');

// User rejected transaction
throw new Error('User rejected the transaction');

// Insufficient balance
throw new Error('Insufficient balance for gas fees');

// Network not supported
throw new Error('Network not supported');

// Contract deployment failed
throw new Error('Contract deployment failed');
```

### Error Handling Pattern

```typescript
try {
  const result = await contractService.deployHRC20Token(formData);
  if (result.success) {
    // Handle success
    console.log('Contract deployed:', result.contractAddress);
  } else {
    // Handle deployment error
    console.error('Deployment failed:', result.error);
  }
} catch (error) {
  // Handle service error
  console.error('Service error:', error.message);
}
```

## 🎯 Usage Examples

### Complete Token Deployment Flow

```typescript
import { ContractService } from './services/contractService';
import { useWallet } from './hooks/useWallet';

const TokenDeployment = () => {
  const { walletState, connectWallet, switchNetwork } = useWallet();
  const [isDeploying, setIsDeploying] = useState(false);
  const [result, setResult] = useState<DeployResult | null>(null);

  const handleDeploy = async (formData: TokenFormData) => {
    try {
      setIsDeploying(true);
      
      // 1. Check wallet connection
      if (!walletState.isConnected) {
        await connectWallet();
      }
      
      // 2. Check network
      if (walletState.chainId !== 7000) {
        await switchNetwork(7000);
      }
      
      // 3. Deploy contract
      const contractService = new ContractService();
      const deployResult = await contractService.deployHRC20Token(formData);
      
      setResult(deployResult);
    } catch (error) {
      console.error('Deployment error:', error);
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div>
      <TokenForm onDeploy={handleDeploy} isDeploying={isDeploying} />
      {result && (
        <DeployResultModal 
          result={result} 
          onClose={() => setResult(null)}
          tokenType="hrc20"
          formData={formData}
        />
      )}
    </div>
  );
};
```

## 🔍 Contract ABIs

### HRC-20 Standard Functions

```solidity
// ERC-20 Standard functions
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address account) public view returns (uint256)
function transfer(address to, uint256 amount) public returns (bool)
function allowance(address owner, address spender) public view returns (uint256)
function approve(address spender, uint256 amount) public returns (bool)
function transferFrom(address from, address to, uint256 amount) public returns (bool)
```

### HRC-721 Standard Functions

```solidity
// ERC-721 Standard functions
function name() public view returns (string)
function symbol() public view returns (string)
function tokenURI(uint256 tokenId) public view returns (string)
function balanceOf(address owner) public view returns (uint256)
function ownerOf(uint256 tokenId) public view returns (address)
function approve(address to, uint256 tokenId) public
function getApproved(uint256 tokenId) public view returns (address)
function setApprovalForAll(address operator, bool approved) public
function isApprovedForAll(address owner, address operator) public view returns (bool)
function transferFrom(address from, address to, uint256 tokenId) public
function safeTransferFrom(address from, address to, uint256 tokenId) public
```

## 📞 Support

For API support:
- [GitHub Issues](https://github.com/hii-network-labs/hrc-contract-minter/issues)
- [GitHub Discussions](https://github.com/hii-network-labs/hrc-contract-minter/discussions)
- [Documentation](https://github.com/hii-network-labs/hrc-contract-minter#readme)