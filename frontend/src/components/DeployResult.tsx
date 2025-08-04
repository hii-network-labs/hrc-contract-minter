import React, { useState, useEffect } from 'react';
import { CheckCircle, ExternalLink, Copy, X } from 'lucide-react';
// import { ethers } from 'ethers';
import { DeployResult } from '../types';
import { getNetworkByChainId } from '../config/networks';
import { useWalletContext } from '../contexts/WalletContext';

interface DeployResultProps {
  result: DeployResult;
  onClose: () => void;
  tokenType: 'hrc20' | 'hrc721';
  formData?: any;
}

export const DeployResultModal: React.FC<DeployResultProps> = ({ result, onClose, tokenType, formData }) => {
  const { walletState } = useWalletContext();
  const [, setExplorerUrl] = useState<string>('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getExplorerUrl = (address: string) => {
    const network = getNetworkByChainId(walletState.chainId!);
    return `${network?.explorerUrl}/address/${address}`;
  };

  const getTransactionUrl = (txHash: string) => {
    const network = getNetworkByChainId(walletState.chainId!);
    return `${network?.explorerUrl}/tx/${txHash}`;
  };

  // Set explorer URL when component mounts
  useEffect(() => {
    if (result.success && result.contractAddress && walletState.chainId) {
      setExplorerUrl(getExplorerUrl(result.contractAddress));
    }
  }, [result.contractAddress, walletState.chainId]);



  if (!result.success) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Deploy Failed</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
            <p className="text-red-700 leading-relaxed">{result.error}</p>
          </div>
          <button
            onClick={onClose}
            className="btn-danger w-full py-3 text-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center floating-animation">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold gradient-text">Deploy Successful!</h3>
              <p className="text-gray-600">Your contract is now live on Hii Network</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {tokenType === 'hrc20' ? 'HRC-20 Token' : 'HRC-721 NFT Collection'} deployed successfully!
              </span>
            </div>
            {formData && (
              <div className="text-sm text-gray-600">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Symbol:</strong> {formData.symbol}</p>
                {tokenType === 'hrc20' && formData.totalSupply && (
                  <p><strong>Total Supply:</strong> {formData.totalSupply}</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Contract Address:
                </label>
                <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <code className="flex-1 text-sm font-mono text-gray-800 break-all">
                    {result.contractAddress}
                  </code>
                  <button
                    onClick={() => copyToClipboard(result.contractAddress!)}
                    className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                    title="Copy address"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <a
                    href={getExplorerUrl(result.contractAddress!)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                    title="View on explorer"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>



              {result.transactionHash && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Transaction Hash:
                  </label>
                  <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                    <code className="flex-1 text-sm font-mono text-gray-800 break-all">
                      {result.transactionHash}
                    </code>
                    <button
                      onClick={() => copyToClipboard(result.transactionHash!)}
                      className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                      title="Copy transaction hash"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <a
                      href={getTransactionUrl(result.transactionHash!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                      title="View transaction"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">→</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Next Steps:</h4>
            </div>
            <ul className="text-gray-700 space-y-3">
              {tokenType === 'hrc20' ? (
                <>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Add token to MetaMask wallet</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Share contract address with community</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Create liquidity pool on DEX</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Mint first NFT by calling mint() function</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Upload metadata to IPFS or server</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Share collection with community</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
          <button
            onClick={onClose}
            className="btn-secondary flex-1 py-3 text-lg font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => copyToClipboard(result.contractAddress!)}
            className="btn-primary flex-1 flex items-center justify-center space-x-3 py-3 text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Copy className="w-5 h-5" />
            <span>Copy Address</span>
          </button>
        </div>
      </div>
    </div>
  );
};