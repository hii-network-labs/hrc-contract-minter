import React, { useState, useEffect } from 'react';
import { CheckCircle, ExternalLink, Copy, X } from 'lucide-react';
import { ethers } from 'ethers';
import { DeployResult } from '../types';
import { getNetworkByChainId } from '../config/networks';
import { useWallet } from '../hooks/useWallet';

interface DeployResultProps {
  result: DeployResult;
  onClose: () => void;
  tokenType: 'hrc20' | 'hrc721';
  formData?: any;
}

export const DeployResultModal: React.FC<DeployResultProps> = ({ result, onClose, tokenType, formData }) => {
  const { walletState } = useWallet();
  const [explorerUrl, setExplorerUrl] = useState<string>('');

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

  // Set explorer URL khi component mount
  useEffect(() => {
    if (result.success && result.contractAddress && walletState.chainId) {
      setExplorerUrl(getExplorerUrl(result.contractAddress));
    }
  }, [result.contractAddress, walletState.chainId]);



  if (!result.success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Deploy Failed</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{result.error}</p>
          </div>
          <button
            onClick={onClose}
            className="btn-secondary w-full mt-4"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Deploy Successful!</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">
              {tokenType === 'hrc20' ? 'HRC-20 Token' : 'HRC-721 NFT Collection'} đã được deploy thành công!
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Address:
                </label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-sm font-mono">
                    {result.contractAddress}
                  </code>
                  <button
                    onClick={() => copyToClipboard(result.contractAddress!)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={getExplorerUrl(result.contractAddress!)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                    title="View on explorer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>



              {result.transactionHash && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Hash:
                  </label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-sm font-mono">
                      {result.transactionHash}
                    </code>
                    <button
                      onClick={() => copyToClipboard(result.transactionHash!)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Copy transaction hash"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <a
                      href={getTransactionUrl(result.transactionHash!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                      title="View transaction"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Next Steps:</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              {tokenType === 'hrc20' ? (
                <>
                  <li>• Thêm token vào ví MetaMask</li>
                  <li>• Chia sẻ contract address với cộng đồng</li>
                  <li>• Tạo liquidity pool trên DEX</li>
                </>
              ) : (
                <>
                  <li>• Mint NFT đầu tiên bằng cách gọi hàm mint()</li>
                  <li>• Upload metadata lên IPFS hoặc server</li>
                  <li>• Chia sẻ collection với cộng đồng</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Close
          </button>
          <button
            onClick={() => copyToClipboard(result.contractAddress!)}
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Address</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 