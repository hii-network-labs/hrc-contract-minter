export interface NetworkConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface TokenFormData {
  name: string;
  symbol: string;
  totalSupply: string;
  tokenType: 'standard' | 'full';
}

export interface NFTFormData {
  name: string;
  symbol: string;
  baseURI: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
}

export interface DeployResult {
  success: boolean;
  contractAddress?: string;
  transactionHash?: string;
  error?: string;
}
