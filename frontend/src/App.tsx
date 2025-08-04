import React, { useState, useEffect } from 'react';
import { Coins, Image, Info, Wallet } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TokenForm } from './components/TokenForm';
import { NFTForm } from './components/NFTForm';
import { HRCMinterInfo } from './components/HRCMinterInfo';
import { DeployResultModal } from './components/DeployResult';
import { DeployResult } from './types';
import { useWalletContext } from './contexts/WalletContext';

type TabType = 'token' | 'nft';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('token');
  const [deployResult, setDeployResult] = useState<DeployResult | null>(null);
  const [tokenType, setTokenType] = useState<'hrc20' | 'hrc721'>('hrc20');
  const [deployFormData, setDeployFormData] = useState<any>(null);
  const [forceRender, setForceRender] = useState(0);
  const { walletState } = useWalletContext();

  // Listen for wallet state changes to force re-render
  useEffect(() => {
    const handleWalletStateChanged = () => {
      console.log('App received walletStateChanged event, forcing re-render');
      setForceRender(prev => prev + 1);
    };

    window.addEventListener('walletStateChanged', handleWalletStateChanged);
    return () => {
      window.removeEventListener('walletStateChanged', handleWalletStateChanged);
    };
  }, []);

  // Debug: Log wallet state changes
  useEffect(() => {
    console.log('App wallet state changed:', walletState);
    console.log('App walletState.isConnected:', walletState.isConnected);
  }, [walletState]);

  // Debug: Log render decision
  console.log(
    'App render - walletState.isConnected:',
    walletState.isConnected,
    'forceRender:',
    forceRender
  );

  const handleDeploySuccess = (result: DeployResult, formData?: any) => {
    setDeployResult(result);
    setDeployFormData(formData);
  };

  const handleCloseResult = () => {
    setDeployResult(null);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setTokenType(tab === 'token' ? 'hrc20' : 'hrc721');
  };

  if (!walletState.isConnected) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 bg-mesh">
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-8 floating-animation shadow-2xl">
                <Wallet className="w-16 h-16 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold gradient-text mb-6 text-shadow">
                Connect Wallet to Get Started
              </h2>
              <p className="text-gray-600 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
                Please connect your MetaMask wallet to deploy HRC-20 tokens or HRC-721 NFT
                collections on Hii Network.
              </p>

              <div className="card-gradient max-w-2xl mx-auto">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection Guide:</h3>
                    <ul className="text-gray-700 space-y-3">
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Install MetaMask extension</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Click "Connect Wallet" in the top right corner</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Select Hii Mainnet or Testnet network</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Ensure you have enough HII for gas fees</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 bg-mesh">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold gradient-text mb-6 text-shadow">
              Deploy Smart Contract
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Create HRC-20 tokens or HRC-721 NFT collections on Hii Network with a modern interface
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => handleTabChange('token')}
                    className={`py-4 px-8 rounded-xl font-semibold text-sm flex items-center space-x-3 transition-all duration-300 ${
                      activeTab === 'token'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Coins className="w-5 h-5" />
                    <span>HRC-20 Token</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('nft')}
                    className={`py-4 px-8 rounded-xl font-semibold text-sm flex items-center space-x-3 transition-all duration-300 ${
                      activeTab === 'nft'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Image className="w-5 h-5" />
                    <span>HRC-721 NFT</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {activeTab === 'token' ? (
                <TokenForm onDeploySuccess={handleDeploySuccess} />
              ) : (
                <NFTForm onDeploySuccess={handleDeploySuccess} />
              )}
            </div>

            {/* Compact Info Panel */}
            <div className="lg:col-span-1 space-y-6">
              <HRCMinterInfo compact={true} />

              {/* About Hii Network */}
              <div className="card-gradient">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold gradient-text mb-2">About Hii Network</h3>
                  <p className="text-gray-600 text-sm">
                    Learn about the types of smart contracts you can deploy
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                        <Coins className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">HRC-20 Token</h4>
                    </div>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>HRC-20 standard</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Transfer & approve functions</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Mint, burn, pause features</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Image className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">HRC-721 NFT</h4>
                    </div>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span>HRC-721 standard</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span>Mint, transfer, approve</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span>Metadata URI support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Deploy Result Modal */}
        {deployResult && (
          <DeployResultModal
            result={deployResult}
            onClose={handleCloseResult}
            tokenType={tokenType}
            formData={deployFormData}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export { App };
