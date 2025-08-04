import { NetworkConfig } from '../types';

export const NETWORKS: NetworkConfig[] = [
  {
    name: 'Hii Mainnet',
    chainId: 7000,
    rpcUrl: 'https://rpc.hii.network',
    explorerUrl: 'https://explorer.hii.network',
    nativeCurrency: {
      name: 'HII',
      symbol: 'HII',
      decimals: 18,
    },
  },
  {
    name: 'Hii Testnet',
    chainId: 22988,
    rpcUrl: 'https://testnet-rpc.hii.network',
    explorerUrl: 'https://explorer.testnet.hii.network',
    nativeCurrency: {
      name: 'HII',
      symbol: 'HII',
      decimals: 18,
    },
  },
  {
    name: 'Localhost',
    chainId: 31337,
    rpcUrl: 'http://127.0.0.1:8545',
    explorerUrl: 'http://localhost:8545',
    nativeCurrency: {
      name: 'HII',
      symbol: 'HII',
      decimals: 18,
    },
  },
];

export const getNetworkByChainId = (chainId: number): NetworkConfig | undefined => {
  return NETWORKS.find(network => network.chainId === chainId);
};

export const addNetworkToMetaMask = async (network: NetworkConfig): Promise<boolean> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${network.chainId.toString(16)}`,
          chainName: network.name,
          nativeCurrency: network.nativeCurrency,
          rpcUrls: [network.rpcUrl],
          blockExplorerUrls: [network.explorerUrl],
        },
      ],
    });
    return true;
  } catch (error) {
    // Error adding network
    return false;
  }
};