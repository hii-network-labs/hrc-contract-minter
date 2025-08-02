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
    decimals: 18,
    tokenType: 'standard',
  });

  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'decimals' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsDeploying(true);

    try {
      const contractService = new ContractService();
      const result = await contractService.deployHRC20Token(formData);

      if (result.success) {
        onDeploySuccess(result, formData);
        // Reset form
        setFormData({
          name: '',
          symbol: '',
          totalSupply: '1000000',
          decimals: 18,
          tokenType: 'standard',
        });
      } else {
        setError(result.error || 'Lỗi không xác định');
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi khi deploy token');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Coins className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Deploy HRC-20 Token</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Token Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="Ví dụ: My Token"
            />
          </div>

          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-2">
              Token Symbol *
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="Ví dụ: MTK"
              maxLength={10}
            />
          </div>

          <div>
            <label htmlFor="totalSupply" className="block text-sm font-medium text-gray-700 mb-2">
              Total Supply *
            </label>
            <input
              type="text"
              id="totalSupply"
              name="totalSupply"
              value={formData.totalSupply}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="1000000"
            />
            <p className="text-xs text-gray-500 mt-1">
              Số lượng token ban đầu (sẽ được nhân với 10^decimals)
            </p>
          </div>

          <div>
            <label htmlFor="decimals" className="block text-sm font-medium text-gray-700 mb-2">
              Decimals *
            </label>
            <select
              id="decimals"
              name="decimals"
              value={formData.decimals}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value={18}>18 (Standard)</option>
              <option value={8}>8 (Bitcoin style)</option>
              <option value={6}>6 (USDC style)</option>
              <option value={0}>0 (Whole numbers)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="tokenType" className="block text-sm font-medium text-gray-700 mb-2">
            Token Type *
          </label>
          <select
            id="tokenType"
            name="tokenType"
            value={formData.tokenType}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="standard">Standard HRC-20 (Basic functionality)</option>
            <option value="full">Full HRC-20 (With mint, burn, pause features)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Standard: Chỉ có các chức năng cơ bản. Full: Có thêm mint, burn, pause.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isDeploying || !formData.name || !formData.symbol}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang Deploy...</span>
            </>
          ) : (
            <>
              <Coins className="w-4 h-4" />
              <span>Deploy Token</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}; 