// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
import "../src/erc721.sol";
import "../src/NFTHolder.sol";

contract CounterTest is Test {
    MyToken1 public erc;
    NFTHolder public nftHolder;

    function setUp() public {
        vm.startPrank(address(0xDEbe6852548dEAd0BADb2F1d698CB96B18A097D4));
        erc = new MyToken1();
        nftHolder = new NFTHolder();
    }

    function testReceive() public {
        erc.safeMint(address(0xDEbe6852548dEAd0BADb2F1d698CB96B18A097D4));
        erc.safeMint(address(0xDEbe6852548dEAd0BADb2F1d698CB96B18A097D4));

        console.log("ownerOf(1): ", erc.ownerOf(1));
        erc.safeTransferFrom(0xDEbe6852548dEAd0BADb2F1d698CB96B18A097D4, address(nftHolder), 1);

        // erc.safeMint(address(0x5FD6eB55D12E759a21C09eF703fe0CBa1DC9d88D));
        // erc.safeMint(address(nftHolder));

        assertEq(nftHolder.getNFTContractSender().length, 1);
    }
}
