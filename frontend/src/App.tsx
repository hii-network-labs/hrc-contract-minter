import React, { useState } from 'react';
import { Coins, Image, Info, Wallet } from 'lucide-react';
import { Header } from './components/Header';
import { TokenForm } from './components/TokenForm';
import { NFTForm } from './components/NFTForm';
import { DeployResultModal } from './components/DeployResult';
import { DeployResult } from './types';
import { useWallet } from './hooks/useWallet';

type TabType = 'token' | 'nft';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('token');
  const [deployResult, setDeployResult] = useState<DeployResult | null>(null);
  const [tokenType, setTokenType] = useState<'hrc20' | 'hrc721'>('hrc20');
  const [deployFormData, setDeployFormData] = useState<any>(null);
  const { walletState, connectWallet } = useWallet();

  // Debug log
  console.log('Wallet state:', walletState);

  // Force check connection khi component mount (chỉ chạy một lần)
  React.useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum && !walletState.isConnected) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          console.log('Force checking accounts:', accounts);
          if (accounts.length > 0) {
            console.log('Force connecting wallet...');
            await connectWallet();
          }
        } catch (error) {
          console.error('Error force checking wallet:', error);
        }
      }
    };

    // Chỉ chạy sau 1 giây để tránh race condition
    const timer = setTimeout(checkWalletConnection, 1000);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array - chỉ chạy một lần

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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <Wallet className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kết nối ví để bắt đầu
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Vui lòng kết nối ví MetaMask để deploy HRC-20 token hoặc HRC-721 NFT collection trên Hii Network.
            </p>
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Debug: {walletState.isConnected ? 'Connected' : 'Not connected'}</p>
              <p className="text-sm text-gray-500">Address: {walletState.address || 'None'}</p>
              <p className="text-sm text-gray-500">Chain ID: {walletState.chainId || 'None'}</p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Refresh Page
                </button>
                <button 
                  onClick={connectWallet} 
                  className="text-sm text-green-600 hover:text-green-800 underline"
                >
                  Force Connect
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('walletState');
                    window.location.reload();
                  }} 
                  className="text-sm text-red-600 hover:text-red-800 underline"
                >
                  Clear & Reload
                </button>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-lg mx-auto">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-left">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Hướng dẫn:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Cài đặt MetaMask extension</li>
                    <li>• Click "Connect Wallet" ở góc trên bên phải</li>
                    <li>• Chọn network Hii Mainnet hoặc Testnet</li>
                    <li>• Đảm bảo có đủ HII để trả phí gas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Deploy Smart Contract
          </h1>
          <p className="text-gray-600">
            Tạo HRC-20 token hoặc HRC-721 NFT collection trên Hii Network
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => handleTabChange('token')}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === 'token'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>HRC-20 Token</span>
              </button>
              <button
                onClick={() => handleTabChange('nft')}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === 'nft'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>HRC-721 NFT</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          {activeTab === 'token' ? (
            <TokenForm onDeploySuccess={handleDeploySuccess} />
          ) : (
            <NFTForm onDeploySuccess={handleDeploySuccess} />
          )}
        </div>

        {/* Info Section */}
        <div className="mt-12 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin về Hii Network
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">HRC-20 Token</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tương thích với ERC-20 standard</li>
                  <li>• Hỗ trợ transfer, approve, allowance</li>
                  <li>• Có thể thêm mint, burn, pause (Full version)</li>
                  <li>• Phí gas thấp hơn Ethereum</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">HRC-721 NFT</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tương thích với ERC-721 standard</li>
                  <li>• Hỗ trợ mint, transfer, approve</li>
                  <li>• Metadata URI cho từng token</li>
                  <li>• Phù hợp cho game và collectibles</li>
                </ul>
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
  );
};

export { App }; 