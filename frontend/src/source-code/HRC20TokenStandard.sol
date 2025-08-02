// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { HRC20Base } from './HRC20Base.sol';

/**
 * @title HRC20 Token Standard
 * @dev Basic HRC20 token implementation based on ERC20 standard
 * Only includes core ERC-20 functionality without extensions
 */
contract HRC20TokenStandard is HRC20Base {
    constructor(string memory name, string memory symbol, uint256 totalSupply, address owner) HRC20Base(name, symbol) {
        _mint(owner, totalSupply);
    }
}
