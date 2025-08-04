import React, { useState } from 'react';
import { Coins, Loader2 } from 'lucide-react';
import { TokenFormData } from '../types';
import { ContractService } from '../services/contractService';

interface TokenFormProps {
  onDeploySuccess: (result: any, formData?: TokenFormData) => void;
}

export const TokenForm: React.FC<TokenFormProps> = ({ onDeploySuccess }) => {
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    totalSupply: '1000000',
    tokenType: 'standard',
  });

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    setDeployStep('Preparing deployment...');

    try {
      setDeployStep('Connecting to blockchain...');
      const contractService = new ContractService();
      
      setDeployStep('Compiling smart contract...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate compile time
      
      setDeployStep('Deploying contract to Hii Network...');
      const result = await contractService.deployHRC20Token(formData);

      if (result.success) {
        setDeployStep('Deployment successful!');
        await new Promise(resolve => setTimeout(resolve, 500));
        onDeploySuccess(result, formData);
        // Reset form
        setFormData({
          name: '',
          symbol: '',
          totalSupply: '1000000',
          tokenType: 'standard',
        });
      } else {
        setError(result.error || 'Unknown error');
      }
    } catch (err: any) {
      setError(err.message || 'Error deploying token');
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
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Deploying Token</h3>
              <p className="text-gray-600 mb-4">{deployStep}</p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
              <p className="text-sm text-gray-500 mt-3">Please do not close this page...</p>
            </div>
          </div>
        )}
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Coins className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-2">
            Deploy HRC-20 Token
          </h2>
          <p className="text-gray-600">Create your own HRC-20 token on Hii Network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">
                Token Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g: My Token"
                required
              />
              <p className="text-xs text-gray-500">Full name of the token</p>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">
                Token Symbol *
              </label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g: MTK"
                maxLength={10}
                required
              />
              <p className="text-xs text-gray-500">Short symbol (3-5 characters)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">
                Total Supply *
              </label>
              <input
                type="text"
                name="totalSupply"
                value={formData.totalSupply}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="1000000"
              />
              <p className="text-xs text-gray-500">
                Initial token supply (will be multiplied by 10^decimals)
              </p>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">
                Decimals
              </label>
              <div className="input-field bg-gray-100 text-gray-600 cursor-not-allowed">
                18
              </div>
              <p className="text-xs text-gray-500">Decimal places are fixed at 18 (standard for most tokens)</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800">
              Token Type *
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  formData.tokenType === 'standard'
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-gray-300 bg-white/60 backdrop-blur-sm'
                }`}
                onClick={() => setFormData({ ...formData, tokenType: 'standard' })}
              >
                <div className="flex items-start space-x-4">
                  <input
                    type="radio"
                    name="tokenType"
                    value="standard"
                    checked={formData.tokenType === 'standard'}
                    onChange={handleInputChange}
                    className="text-blue-600 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">S</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Standard</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Basic HRC-20 functionality</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Transfer tokens</li>
                      <li>• Approve spending</li>
                      <li>• Check balances</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  formData.tokenType === 'full'
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-gray-300 bg-white/60 backdrop-blur-sm'
                }`}
                onClick={() => setFormData({ ...formData, tokenType: 'full' })}
              >
                <div className="flex items-start space-x-4">
                  <input
                    type="radio"
                    name="tokenType"
                    value="full"
                    checked={formData.tokenType === 'full'}
                    onChange={handleInputChange}
                    className="text-blue-600 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">F</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">Full Featured</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Advanced capabilities</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Mint new tokens</li>
                      <li>• Burn tokens</li>
                      <li>• Pause transfers</li>
                      <li>• Owner controls</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">!</span>
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
              disabled={isDeploying || !formData.name || !formData.symbol}
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
                  <Coins className="w-6 h-6" />
                  <span>Deploy HRC-20 Token</span>
                </>
              )}
            </button>
          </div>
        </form>
    </div>
  );
};