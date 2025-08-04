import React from 'react';
import { Github, Mail, Users, GitBranch, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">H</span>
              </div>
              <span>HRC Minter</span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Deploy HRC-20 tokens and HRC-721 NFT collections on Hii Network with ease. 
              Built with modern technology for the decentralized future.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="https://github.com/hii-network-labs/hrc-contract-minter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="mailto:hello@hii.network" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contributors Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Contributors</span>
            </h3>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm leading-relaxed">
                Thanks to all contributors who have helped make this project better.
              </p>
              <a 
                href="https://github.com/hii-network-labs/hrc-contract-minter/graphs/contributors" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm"
              >
                <span>View all contributors</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-400">
                Special thanks to the community for bug reports and feature suggestions.
              </p>
            </div>
          </div>

          {/* Git Guidelines Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <GitBranch className="w-5 h-5 text-green-400" />
              <span>Development</span>
            </h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Commit Format:</h4>
                <code className="bg-gray-800 px-2 py-1 rounded text-xs text-green-400">
                  type(scope): description
                </code>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Branch Naming:</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• feature/description</li>
                  <li>• fix/description</li>
                  <li>• docs/description</li>
                </ul>
              </div>
              <a 
                href="https://github.com/hii-network-labs/hrc-contract-minter/blob/main/CONTRIBUTING.md" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors duration-300 text-sm"
              >
                <span>Contributing Guide</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Mail className="w-5 h-5 text-purple-400" />
              <span>Contact & Support</span>
            </h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="space-y-2">
                <a 
                  href="mailto:hello@hii.network" 
                  className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span>hello@hii.network</span>
                </a>
                <a 
                  href="https://github.com/hii-network-labs/hrc-contract-minter/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                  <Github className="w-4 h-4" />
                  <span>Report Issues</span>
                </a>
                <a 
                  href="https://github.com/hii-network-labs/hrc-contract-minter/discussions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                  <Users className="w-4 h-4" />
                  <span>Discussions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 Hii Network Labs. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built with ❤️ for the decentralized future
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a 
                href="https://github.com/hii-network-labs/hrc-contract-minter#readme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Documentation
              </a>
              <a 
                href="https://github.com/hii-network-labs/hrc-contract-minter/blob/main/LICENSE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                License
              </a>
              <a 
                href="https://github.com/hii-network-labs/hrc-contract-minter/blob/main/CHANGELOG.md" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Changelog
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};