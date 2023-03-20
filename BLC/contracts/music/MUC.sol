// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MUC is ERC20 {
    constructor() ERC20("Music", "MUC") {}

    function faucet() external {
        _mint(msg.sender, 1000 ether);
    }
}
