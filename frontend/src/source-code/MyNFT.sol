// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { HRC721 } from './HRC721.sol';
import { HRC721Pausable } from './extensions/HRC721Pausable.sol';
import { Ownable } from '../utils/Ownable.sol';
import { HRC721Burnable } from './extensions/HRC721Burnable.sol';

/**
 * @title MyNFT
 * @dev HRC721 NFT contract based on ERC-721 standard
 * Follows HRC (Hii Request for Comments) naming convention while maintaining ERC-721 compatibility
 */
contract MyNFT is HRC721, HRC721Pausable, Ownable, HRC721Burnable {
    constructor(address initialOwner) HRC721('MyNFT', 'MNFT') Ownable(initialOwner) {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(HRC721, HRC721Pausable) returns (address) {
        return super._update(to, tokenId, auth);
    }
}
