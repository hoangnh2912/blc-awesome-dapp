// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MUC is ERC20Permit {
    constructor() ERC20("Music", "MUC") ERC20Permit("Music") {
        _mint(msg.sender, 1000000000 ether);
    }
}