import { ethers } from 'ethers';
import { TokenFormData, NFTFormData, DeployResult } from '../types';
import HRC20StandardArtifact from '../contracts/HRC20TokenStandard.json';
import HRC20FullArtifact from '../contracts/HRC20TokenFull.json';
import MyNFTArtifact from '../contracts/MyNFT.json';

export class ContractService {
  private provider: ethers.BrowserProvider;
  private signer: ethers.JsonRpcSigner | null = null;

  constructor() {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }
    this.provider = new ethers.BrowserProvider(window.ethereum);
  }

  private async getSigner(): Promise<ethers.JsonRpcSigner> {
    if (!this.signer) {
      this.signer = await this.provider.getSigner();
    }
    return this.signer;
  }

  async deployHRC20Token(formData: TokenFormData): Promise<DeployResult> {
    try {
      const signer = await this.getSigner();
      const totalSupply = ethers.parseUnits(formData.totalSupply, 18);

      let contractFactory: ethers.ContractFactory;

      if (formData.tokenType === 'standard') {
        contractFactory = new ethers.ContractFactory(
          HRC20StandardArtifact.abi,
          HRC20StandardArtifact.bytecode,
          signer
        );
      } else {
        contractFactory = new ethers.ContractFactory(
          HRC20FullArtifact.abi,
          HRC20FullArtifact.bytecode,
          signer
        );
      }

      const contract = await contractFactory.deploy(
        formData.name,
        formData.symbol,
        totalSupply,
        await signer.getAddress()
      );

      await contract.waitForDeployment();
      const contractAddress = await contract.getAddress();
      const deploymentTransaction = contract.deploymentTransaction();

      return {
        success: true,
        contractAddress,
        transactionHash: deploymentTransaction?.hash,
      };
    } catch (error: any) {
      // Error deploying HRC-20 token
      return {
        success: false,
        error: error.message || 'Unknown error',
      };
    }
  }

  async deployHRC721NFT(formData: NFTFormData): Promise<DeployResult> {
    try {
      const signer = await this.getSigner();

      const contractFactory = new ethers.ContractFactory(
        MyNFTArtifact.abi,
        MyNFTArtifact.bytecode,
        signer
      );

      const contract = await contractFactory.deploy(
        formData.name,
        formData.symbol,
        await signer.getAddress()
      );

      await contract.waitForDeployment();
      const contractAddress = await contract.getAddress();
      const deploymentTransaction = contract.deploymentTransaction();

      return {
        success: true,
        contractAddress,
        transactionHash: deploymentTransaction?.hash,
      };
    } catch (error: any) {
      // Error deploying HRC-721 NFT
      return {
        success: false,
        error: error.message || 'Unknown error',
      };
    }
  }

  async getTokenInfo(contractAddress: string, tokenType: 'hrc20' | 'hrc721'): Promise<any> {
    try {
      const abi = tokenType === 'hrc20' ? HRC20StandardArtifact.abi : MyNFTArtifact.abi;
      const contract = new ethers.Contract(contractAddress, abi, this.provider);

      if (tokenType === 'hrc20') {
        const [name, symbol, decimals, totalSupply] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.decimals(),
          contract.totalSupply(),
        ]);

        return {
          name,
          symbol,
          decimals: decimals.toString(),
          totalSupply: totalSupply.toString(),
        };
      } else {
        const [name, symbol] = await Promise.all([contract.name(), contract.symbol()]);

        return {
          name,
          symbol,
        };
      }
    } catch (error) {
      // Error getting token info
      throw error;
    }
  }
}
