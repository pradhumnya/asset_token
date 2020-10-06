// create a Token for buying coffee
pragma solidity ^0.6.0;
// SPDX-License-Identifier: UNLICENSED
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("StarDucks Cappucino Token", "Cappu") {
        _mint(msg.sender, initialSupply); 
        _setupDecimals(0);  
    }
}