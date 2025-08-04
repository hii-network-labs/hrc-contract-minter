import React from 'react';
import { Wallet, LogOut, Network, ChevronDown } from 'lucide-react';
import { useWalletContext } from '../contexts/WalletContext';
import { NETWORKS } from '../config/networks';

export const Header: React.FC = () => {
  const { walletState, connectWallet, disconnectWallet, switchNetwork } = useWalletContext();

  const handleConnectWallet = async () => {
    await connectWallet();
  };

  const handleDisconnectWallet = async () => {
    await disconnectWallet();
  };

  const handleSwitchNetwork = async (chainId: number) => {
    await switchNetwork(chainId);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };



  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text text-shadow">HRC Token Minter</h1>
              <span className="text-xs text-gray-500 font-medium">Powered by Hii Network</span>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold gradient-text">HRC Minter</h1>
            </div>
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {walletState.isConnected ? (
              <>
                {/* Network Selector */}
                <div className="hidden md:flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/30 shadow-md relative">
                  <Network className="w-4 h-4 text-blue-600" />
                  <select
                    value={walletState.chainId || ''}
                    onChange={(e) => handleSwitchNetwork(Number(e.target.value))}
                    className="text-sm bg-transparent border-none focus:outline-none text-gray-700 font-medium cursor-pointer appearance-none pr-4"
                    style={{
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      backgroundImage: 'none'
                    }}
                  >
                    {NETWORKS.map((network) => (
                      <option key={network.chainId} value={network.chainId}>
                        {network.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-gray-500 pointer-events-none absolute right-1 top-1/2 transform -translate-y-1/2" />
                </div>

                {/* Mobile Network Selector */}
                <div className="md:hidden relative">
                  <select
                    value={walletState.chainId || ''}
                    onChange={(e) => handleSwitchNetwork(Number(e.target.value))}
                    className="text-xs bg-white/60 backdrop-blur-sm border border-white/30 rounded-lg px-2 py-1 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-300 max-w-16 truncate appearance-none"
                    style={{
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      backgroundImage: 'none'
                    }}
                  >
                    {NETWORKS.map((network) => {
                      // Create short names for mobile display
                      let mobileName = network.name;
                      if (network.name === 'Hii Mainnet') mobileName = 'Mainnet';
                      else if (network.name === 'Hii Testnet') mobileName = 'Testnet';
                      else if (network.name === 'Localhost') mobileName = 'Local';
                      
                      return (
                        <option key={network.chainId} value={network.chainId}>
                          {mobileName}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown className="w-3 h-3 text-gray-500 pointer-events-none absolute right-1 top-1/2 transform -translate-y-1/2" />
                </div>

                {/* Wallet Info */}
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-3 py-2 border border-blue-200/50 shadow-md">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatAddress(walletState.address!)}
                    </span>
                    {walletState.balance && (
                      <span className="text-xs text-gray-500 hidden sm:block">
                        {parseFloat(walletState.balance).toFixed(4)} HII
                      </span>
                    )}
                  </div>
                </div>

                {/* Disconnect Button */}
                <button
                  onClick={handleDisconnectWallet}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                  title="Disconnect Wallet"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Disconnect</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="btn-primary flex items-center space-x-2 text-sm sm:text-base"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};