import React, { useState } from 'react';
import { Image, Loader2 } from 'lucide-react';
import { NFTFormData } from '../types';
import { ContractService } from '../services/contractService';

interface NFTFormProps {
  onDeploySuccess: (result: any, formData?: NFTFormData) => void;
}

export const NFTForm: React.FC<NFTFormProps> = ({ onDeploySuccess }) => {
  const [formData, setFormData] = useState<NFTFormData>({
    name: '',
    symbol: '',
    baseURI: '',
  });

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsDeploying(true);
    setDeployStep('Preparing NFT Collection deployment...');

    try {
      setDeployStep('Connecting to blockchain...');
      const contractService = new ContractService();
      
      setDeployStep('Compiling NFT smart contract...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate compile time
      
      setDeployStep('Deploying NFT collection to Hii Network...');
      const result = await contractService.deployHRC721NFT(formData);

      if (result.success) {
        setDeployStep('NFT Collection deployment successful!');
        await new Promise(resolve => setTimeout(resolve, 500));
        onDeploySuccess(result, formData);
        // Reset form
        setFormData({
          name: '',
          symbol: '',
          baseURI: '',
        });
      } else {
        setError(result.error || 'Unknown error');
      }
    } catch (err: any) {
      setError(err.message || 'Error deploying NFT');
    } finally {
      setIsDeploying(false);
      setDeployStep('');
    }
  };

  return (
    <div className="card-gradient relative">
        {/* Loading Overlay */}
        {isDeploying && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Deploying NFT Collection</h3>
              <p className="text-gray-600 mb-4">{deployStep}</p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
              <p className="text-sm text-gray-500 mt-3">Please do not close this page...</p>
            </div>
          </div>
        )}
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Image className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-2">
            Deploy HRC-721 NFT Collection
          </h2>
          <p className="text-gray-600">Create your own NFT collection on Hii Network</p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
              Collection Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter collection name (e.g., My Awesome NFTs)"
              required
            />
            <p className="text-xs text-gray-500">The name of your NFT collection</p>
          </div>

          <div className="space-y-3">
            <label htmlFor="symbol" className="block text-sm font-semibold text-gray-800">
              Collection Symbol
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter symbol (e.g., MYNFT)"
              maxLength={10}
              required
            />
            <p className="text-xs text-gray-500">Short symbol for your NFT collection (max 10 characters)</p>
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="baseURI" className="block text-sm font-semibold text-gray-800">
            Base URI (Optional)
          </label>
          <input
            type="url"
            id="baseURI"
            name="baseURI"
            value={formData.baseURI}
            onChange={handleInputChange}
            className="input-field"
            placeholder="https://api.example.com/metadata/"
          />
          <p className="text-xs text-gray-500">
            Base URL for NFT metadata. Leave empty if you don't have metadata yet.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Image className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">NFT Collection Notes:</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Collection will be created with mint permissions for the owner</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>You can mint NFTs after deployment by calling the mint() function</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Base URI will be used to generate tokenURI for each NFT</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="break-all text-sm leading-relaxed">
                    TokenURI format: <span className="font-mono text-blue-600">{formData.baseURI || 'baseURI'}/tokenId</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Image className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Deployment Failed</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6">
          <button
            type="submit"
            disabled={isDeploying}
            className={`btn-primary w-full flex items-center justify-center space-x-3 py-4 text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDeploying ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-2xl hover:scale-105'
            }`}
          >
            {isDeploying ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <Image className="w-6 h-6" />
                <span>Deploy HRC-721 NFT Collection</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};