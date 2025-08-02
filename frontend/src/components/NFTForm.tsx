import React, { useState } from 'react';
import { Image, Loader2 } from 'lucide-react';
import { NFTFormData } from '../types';
import { ContractService } from '../services/contractService';

interface NFTFormProps {
  onDeploySuccess: (result: any, formData?: NFTFormData) => void;
}

export const NFTForm: React.FC<NFTFormProps> = ({ onDeploySuccess }) => {
  const [formData, setFormData] = useState<NFTFormData>({
    name: 'MyNFT',
    symbol: 'MNFT',
    baseURI: '',
  });

  const [isDeploying, setIsDeploying] = useState(false);
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

    try {
      const contractService = new ContractService();
      const result = await contractService.deployHRC721NFT(formData);

      if (result.success) {
        onDeploySuccess(result, formData);
        // Reset form
        setFormData({
          name: 'MyNFT',
          symbol: 'MNFT',
          baseURI: '',
        });
      } else {
        setError(result.error || 'Lỗi không xác định');
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi khi deploy NFT');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Image className="w-6 h-6 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Deploy HRC-721 NFT Collection</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Collection Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              disabled
              className="input-field bg-gray-100 cursor-not-allowed"
              placeholder="MyNFT (Fixed)"
            />
            <p className="text-xs text-gray-500 mt-1">Name được hardcode trong contract</p>
          </div>

          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-2">
              Collection Symbol
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              disabled
              className="input-field bg-gray-100 cursor-not-allowed"
              placeholder="MNFT (Fixed)"
              maxLength={10}
            />
            <p className="text-xs text-gray-500 mt-1">Symbol được hardcode trong contract</p>
          </div>
        </div>

        <div>
          <label htmlFor="baseURI" className="block text-sm font-medium text-gray-700 mb-2">
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
          <p className="text-xs text-gray-500 mt-1">
            URL cơ sở cho metadata của NFT. Để trống nếu chưa có metadata.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Lưu ý về NFT Collection:</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Collection sẽ được tạo với quyền mint cho owner</li>
            <li>• Bạn có thể mint NFT sau khi deploy bằng cách gọi hàm mint()</li>
            <li>• Base URI sẽ được sử dụng để tạo tokenURI cho từng NFT</li>
            <li>• Format tokenURI: {formData.baseURI || 'baseURI'}/tokenId</li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isDeploying}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang Deploy...</span>
            </>
          ) : (
            <>
              <Image className="w-4 h-4" />
              <span>Deploy NFT Collection</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}; 