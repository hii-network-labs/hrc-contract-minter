import React from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { NETWORKS } from '../config/networks';

export const Header: React.FC = () => {
  const { walletState, connectWallet, disconnectWallet, switchNetwork } = useWallet();

  const handleConnectWallet = async () => {
    await connectWallet();
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
  };

  const handleSwitchNetwork = async (chainId: number) => {
    await switchNetwork(chainId);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };



  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">HRC-20 Token Minter</h1>
            <span className="ml-2 text-sm text-gray-500">Hii Network</span>
          </div>

          <div className="flex items-center space-x-4">
            {walletState.isConnected ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Network:</span>
                  <select
                    value={walletState.chainId || ''}
                    onChange={(e) => handleSwitchNetwork(Number(e.target.value))}
                    className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {NETWORKS.map((network) => (
                      <option key={network.chainId} value={network.chainId}>
                        {network.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                  <Wallet className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {formatAddress(walletState.address!)}
                  </span>
                  {walletState.balance && (
                    <span className="text-sm text-gray-500">
                      ({parseFloat(walletState.balance).toFixed(4)} HII)
                    </span>
                  )}
                </div>

                <button
                  onClick={handleDisconnectWallet}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="btn-primary flex items-center space-x-2"
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