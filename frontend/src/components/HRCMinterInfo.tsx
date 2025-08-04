import React from 'react';
import { ExternalLink, Zap, Shield, Code, Globe } from 'lucide-react';

interface HRCMinterInfoProps {
  compact?: boolean;
}

const HRCMinterInfo: React.FC<HRCMinterInfoProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="card-gradient h-fit">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold gradient-text mb-2">
            Open Source Tool
          </h3>
          <p className="text-sm text-gray-600">Deploy HRC contracts compatible with EVM</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Deploy <span className="font-semibold text-blue-600">HRC-20</span> and{' '}
              <span className="font-semibold text-purple-600">HRC-721</span> contracts based on{' '}
              <a 
                href="https://github.com/hii-network-labs/hrc-contract-templates" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                HRC standards
              </a> with EVM compatibility.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-medium">
                <Zap className="w-3 h-3 mr-1" />
                Low Gas Fees
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-medium">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-lg bg-purple-100 text-purple-700 text-xs font-medium">
                <Code className="w-3 h-3 mr-1" />
                Open Source
              </span>
            </div>
            
            <a 
              href="https://github.com/hii-network-labs/hrc-contract-minter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <Globe className="w-4 h-4 mr-1" />
              View on GitHub
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="card-gradient">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold gradient-text mb-2">
          This is an open source tool
        </h3>
        <p className="text-gray-600">Deploy HRC-20 and HRC-721 contracts compatible with EVM</p>
      </div>
      
      <div className="space-y-6">
        {/* Main Description */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <p className="text-gray-700 leading-relaxed mb-4">
            Our tool allows you to deploy <span className="font-semibold text-blue-600">HRC-20</span> and{' '}
            <span className="font-semibold text-purple-600">HRC-721</span> smart contracts on Hii Network. 
            These contracts are based on{' '}
            <a 
              href="https://github.com/hii-network-labs/hrc-contract-templates" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              HRC standards
            </a>{' '}
            and are fully compatible with EVM, ensuring seamless integration with existing Ethereum tools and wallets.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            For detailed instructions and in-depth explanations of all fields please see the{' '}
            <a 
              href="https://github.com/hii-network-labs/hrc-contract-minter#readme" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              GitHub README
            </a>. It includes several best practice recommendations so please take a look.
          </p>
        </div>

        {/* Security & Open Source */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Safe & Secure</h4>
            </div>
            <p className="text-gray-700 mb-3">
              Never deploy code that you've never seen before! This deployer is fully open source with all smart contract code{' '}
              <a 
                href="https://github.com/hii-network-labs/hrc-contract-minter/tree/main/contracts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                available here
              </a>.
            </p>
            <p className="text-gray-700">
              The frontend interface is also{' '}
              <a 
                href="https://github.com/hii-network-labs/hrc-contract-minter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                open source
              </a>{' '}
              and built with modern web technologies.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Fast & Reliable</h4>
            </div>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>One-click deployment</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Low gas fees on Hii Network</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>EVM compatible contracts</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Compatible with MetaMask & EVM wallets</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Safety Question */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Is this deployer safe? Yes!
              </h4>
              <p className="text-gray-700">
                Read{' '}
                <a 
                  href="https://docs.hii.network/developers/security-best-practices" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  this
                </a>{' '}
                to understand our security practices.
              </p>
            </div>
          </div>
        </div>

        {/* Learn More */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">Learn More</h4>
          </div>
          <p className="text-gray-700 mb-4">
            Learn more about HRC token standards and deployment on{' '}
            <a 
              href="https://docs.hii.network/developers/token-standards" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Hii Network documentation
            </a>.
          </p>
          
          <a 
            href="https://github.com/hii-network-labs/hrc-contract-minter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium"
          >
            <Code className="w-5 h-5" />
            <span>GitHub Repo</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export { HRCMinterInfo };