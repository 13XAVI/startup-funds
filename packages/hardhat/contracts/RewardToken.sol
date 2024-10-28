// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
	// Constructor takes an address for the initial owner
	constructor(
		address originalOwner
	) Ownable(originalOwner) ERC20("RewardToken", "RTK") {
		// Transfer ownership to the initial owner
		transferOwnership(originalOwner);
		// Mint initial supply to the initial owner
		_mint(originalOwner, 1000000 * 10 ** decimals());
	}

	// Mint function allows the owner to mint new tokens
	function mint(address to, uint256 amount) external onlyOwner {
		_mint(to, amount);
	}

	// Burn function allows users to burn their own tokens
	function burn(uint256 amount) external {
		_burn(msg.sender, amount);
	}
}
