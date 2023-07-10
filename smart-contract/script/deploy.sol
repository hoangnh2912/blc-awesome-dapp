// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "forge-std/Script.sol";
import "../src/erc721.sol";
import "../src/NFTHolder.sol";
import "../src/VaultToken.sol";
import "../src/RollDice.sol";

contract DeployProxy is Script {
    

    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        
        vm.stopBroadcast();
    }
}
