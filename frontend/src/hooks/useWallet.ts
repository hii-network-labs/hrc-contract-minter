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
    // Restore state from localStorage if available
  const saved = localStorage.getItem('walletState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        // Error parsing saved wallet state
      }
    }
    return {
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    };
  });

  // Add state to track if connection has been checked
  const [hasCheckedConnection, setHasCheckedConnection] = useState(false);
  // Add state to track if user has manually disconnected
  const [manuallyDisconnected, setManuallyDisconnected] = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
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

      const newWalletState = {
        isConnected: true,
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        balance: ethers.formatEther(balance),
      };
      
      console.log('Wallet manually connected:', newWalletState);
      
      // Update state and localStorage
      setWalletState(newWalletState);
      localStorage.setItem('walletState', JSON.stringify(newWalletState));
      setHasCheckedConnection(true);
      setManuallyDisconnected(false); // Reset manual disconnect flag
      
      // Use useEffect to dispatch event after state update
      // This will be handled by the useEffect that watches walletState changes

      return true;
    } catch (error) {
      // Error connecting wallet
      return false;
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    try {
      // Try to revoke permissions from MetaMask
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_revokePermissions',
            params: [
              {
                eth_accounts: {},
              },
            ],
          });
          console.log('Successfully revoked MetaMask permissions');
        } catch (revokeError: any) {
          // If wallet_revokePermissions is not supported, try other methods
          console.log('wallet_revokePermissions not supported, trying alternative method');
          try {
            await window.ethereum.request({
              method: "wallet_requestPermissions",
              params: [{
                eth_accounts: {}
              }]
            });
          } catch (altError) {
            console.log('Alternative disconnect method also failed:', altError);
          }
        }
      }
    } catch (error) {
      console.log('Error during MetaMask disconnect:', error);
    }
    
    // Always update local state
    const disconnectedState = {
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    };
    
    setWalletState(disconnectedState);
    localStorage.setItem('walletState', JSON.stringify(disconnectedState));
    setHasCheckedConnection(false);
    setManuallyDisconnected(true); // Mark that user has manually disconnected
    
    console.log('User manually disconnected wallet');
  }, []);

  const switchNetwork = useCallback(async (chainId: number) => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
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
        // Network doesn't exist, try to add it
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
            // Error adding network
            return false;
          }
        }
      }
      // Error switching network
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
      // Error updating balance
    }
  }, [walletState.isConnected, walletState.address]);

    useEffect(() => {
    let isMounted = true;

    const handleAccountsChanged = (accounts: string[]) => {
      // Accounts changed
      if (!isMounted) return;
      
      if (accounts.length === 0) {
        // Only disconnect if not due to user manual disconnect
        if (!manuallyDisconnected) {
          disconnectWallet();
        }
      } else {
        // Only auto-connect if user hasn't manually disconnected
        if (!manuallyDisconnected) {
          const newState = {
            isConnected: true,
            address: accounts[0],
            chainId: walletState.chainId,
            balance: walletState.balance,
          };
          setWalletState(newState);
          localStorage.setItem('walletState', JSON.stringify(newState));
          
          // Dispatch event to force re-render
          setTimeout(() => {
            window.dispatchEvent(new Event('walletStateChanged'));
          }, 100);
        }
      }
    };

    const handleChainChanged = (chainId: string) => {
      // Chain changed
      if (!isMounted) return;
      
      const newState = {
        ...walletState,
        chainId: parseInt(chainId, 16),
      };
      setWalletState(newState);
      localStorage.setItem('walletState', JSON.stringify(newState));
      
      // Dispatch event to force re-render
      setTimeout(() => {
        window.dispatchEvent(new Event('walletStateChanged'));
      }, 100);
    };

    const checkConnection = async () => {
      if (window.ethereum && !hasCheckedConnection) {
        try {
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', handleChainChanged);

          // Check if already connected
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          console.log('checkConnection - accounts:', accounts.length, 'manuallyDisconnected:', manuallyDisconnected);
          
          if (accounts.length > 0 && isMounted && !manuallyDisconnected) {
            try {
              const chainId = await window.ethereum.request({
                method: 'eth_chainId',
              });

              const provider = new ethers.BrowserProvider(window.ethereum);
              const balance = await provider.getBalance(accounts[0]);

              if (isMounted) {
                const newWalletState = {
                  isConnected: true,
                  address: accounts[0],
                  chainId: parseInt(chainId, 16),
                  balance: ethers.formatEther(balance),
                };
                
                setWalletState(newWalletState);
                localStorage.setItem('walletState', JSON.stringify(newWalletState));
                setHasCheckedConnection(true);
                setManuallyDisconnected(false); // Reset manual disconnect flag
                
                console.log('Wallet auto-connected:', newWalletState);
                
                // Dispatch event to force re-render
                setTimeout(() => {
                  window.dispatchEvent(new Event('walletStateChanged'));
                  console.log('walletStateChanged event dispatched');
                }, 100);
                // Wallet auto-connected
              }
            } catch (error) {
              // Error auto-connecting wallet
            }
          }
        } catch (error) {
          // Error checking wallet connection
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

  // Save state to localStorage on change and force re-render
  useEffect(() => {
    localStorage.setItem('walletState', JSON.stringify(walletState));
    console.log('useWallet state updated:', walletState);
    
    // Force component re-render when wallet state changes
    // Trigger a small delay to ensure state propagation
    setTimeout(() => {
      window.dispatchEvent(new Event('walletStateChanged'));
      console.log('walletStateChanged event dispatched from useEffect');
    }, 50);
  }, [walletState]);



  return {
    walletState,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    updateBalance,
  };
};