import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletState } from '../types';
import { getNetworkByChainId } from '../config/networks';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>(() => {
    // Khôi phục state từ localStorage nếu có
    const saved = localStorage.getItem('walletState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved wallet state:', error);
      }
    }
    return {
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    };
  });

  // Thêm state để track việc đã check connection chưa
  const [hasCheckedConnection, setHasCheckedConnection] = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('Vui lòng cài đặt MetaMask!');
      return false;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(accounts[0]);

      setWalletState({
        isConnected: true,
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        balance: ethers.formatEther(balance),
      });

      return true;
    } catch (error) {
      console.error('Lỗi khi kết nối ví:', error);
      return false;
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    });
  }, []);

  const switchNetwork = useCallback(async (chainId: number) => {
    if (!window.ethereum) {
      alert('Vui lòng cài đặt MetaMask!');
      return false;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        // Network không tồn tại, thử thêm vào
        const network = getNetworkByChainId(chainId);
        if (network) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  chainName: network.name,
                  nativeCurrency: network.nativeCurrency,
                  rpcUrls: [network.rpcUrl],
                  blockExplorerUrls: [network.explorerUrl],
                },
              ],
            });
            return true;
          } catch (addError) {
            console.error('Lỗi khi thêm network:', addError);
            return false;
          }
        }
      }
      console.error('Lỗi khi chuyển network:', error);
      return false;
    }
  }, []);

  const updateBalance = useCallback(async () => {
    if (!walletState.isConnected || !walletState.address) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(walletState.address);
      setWalletState(prev => ({
        ...prev,
        balance: ethers.formatEther(balance),
      }));
    } catch (error) {
      console.error('Lỗi khi cập nhật balance:', error);
    }
  }, [walletState.isConnected, walletState.address]);

    useEffect(() => {
    let isMounted = true;

    const handleAccountsChanged = (accounts: string[]) => {
      console.log('Accounts changed:', accounts);
      if (!isMounted) return;
      
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setWalletState(prev => ({
          ...prev,
          address: accounts[0],
          isConnected: true,
        }));
      }
    };

    const handleChainChanged = (chainId: string) => {
      console.log('Chain changed:', chainId);
      if (!isMounted) return;
      
      setWalletState(prev => ({
        ...prev,
        chainId: parseInt(chainId, 16),
      }));
    };

    const checkConnection = async () => {
      if (window.ethereum && !hasCheckedConnection) {
        try {
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', handleChainChanged);

          // Kiểm tra xem đã kết nối chưa
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          console.log('Checking existing accounts:', accounts);
          
          if (accounts.length > 0 && isMounted) {
            try {
              const chainId = await window.ethereum.request({
                method: 'eth_chainId',
              });

              const provider = new ethers.BrowserProvider(window.ethereum);
              const balance = await provider.getBalance(accounts[0]);

              if (isMounted) {
                setWalletState({
                  isConnected: true,
                  address: accounts[0],
                  chainId: parseInt(chainId, 16),
                  balance: ethers.formatEther(balance),
                });
                setHasCheckedConnection(true);
                console.log('Wallet auto-connected:', accounts[0]);
              }
            } catch (error) {
              console.error('Error auto-connecting wallet:', error);
            }
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
      if (isMounted) {
        setHasCheckedConnection(true);
      }
    };

    checkConnection();

    return () => {
      isMounted = false;
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [disconnectWallet, hasCheckedConnection]);

  // Lưu state vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('walletState', JSON.stringify(walletState));
  }, [walletState]);

  // Debug log khi state thay đổi
  console.log('Wallet state updated:', walletState, 'hasCheckedConnection:', hasCheckedConnection);

  return {
    walletState,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    updateBalance,
  };
}; 