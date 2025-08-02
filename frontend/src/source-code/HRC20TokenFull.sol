// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { HRC20Base } from './HRC20Base.sol';
import { HRC20Burnable } from './extensions/HRC20Burnable.sol';
import { HRC20Pausable } from './extensions/HRC20Pausable.sol';
import { HRC20Permit } from './extensions/HRC20Permit.sol';
import { Ownable } from './utils/Ownable.sol';

/**
 * @title HRC20 Token Full
 * @dev Enhanced HRC20 token implementation with all extensions: Burnable, Pausable, Permit
 */
contract HRC20TokenFull is HRC20Base, HRC20Burnable, HRC20Pausable, HRC20Permit, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner
    ) HRC20Base(name, symbol) HRC20Permit(name) Ownable(owner) {
        _mint(owner, totalSupply);
    }

    /**
     * @dev Mint new tokens to specified address
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     * Requirements:
     * - Only owner can call this function
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Pause all token transfers
     * Requirements:
     * - Only owner can call this function
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause all token transfers
     * Requirements:
     * - Only owner can call this function
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Override _update to handle pausable functionality
     * This function is called on every transfer, mint, and burn
     */
    function _update(address from, address to, uint256 value) internal virtual override(HRC20Base, HRC20Pausable) {
        super._update(from, to, value);
    }
}
