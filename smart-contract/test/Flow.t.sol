// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
import "../src/erc721.sol";
import "../src/NFTHolder.sol";
import "../src/VaultToken.sol";
import "../src/RollDice.sol";

contract FlowTest is Test {
    NFTTest erc1 = new NFTTest();
    NFTTest erc2 = new NFTTest();
    NFTTest erc3 = new NFTTest();
    NFTHolder public nftHolder;
    RollDice public rollDice;
    VaultToken public vaultToken;

    address public alice = address(0x1);
    address public bob = address(0x2);
    address public carol = address(0x3);

    function setUp() public {
        vm.startPrank(address(0xdeadbeaf));
        vm.deal(alice, 100 ether);
        vm.deal(bob, 100 ether);
        vm.deal(carol, 100 ether);

        // Create NFT contract
        erc1 = new NFTTest();
        erc2 = new NFTTest();
        erc3 = new NFTTest();

        // Create NFTHolder contract
        nftHolder = new NFTHolder();

        // Create RollDice contract
        rollDice = new RollDice(nftHolder);

        // Create VaultToken contract
        vaultToken = new VaultToken(nftHolder, rollDice);

        // Mint 10 NFTs for each contract
        for (uint256 i = 0; i < 10; i++) {
            erc1.safeMint(alice);
            erc2.safeMint(bob);
            erc3.safeMint(carol);
        }

        vm.stopPrank();

        // Everyone stake 5 NFTs
        // REQUIRE: tokenId start from 1
        for (uint256 i = 1; i < 6; i++) {
            vm.startPrank(address(alice));
            erc1.safeTransferFrom(address(alice), address(nftHolder), i);
            vm.stopPrank();
            vm.startPrank(address(bob));
            erc2.safeTransferFrom(address(bob), address(nftHolder), i + 1);
            vm.stopPrank();
            vm.startPrank(address(carol));
            erc3.safeTransferFrom(address(carol), address(nftHolder), i + 2);
            vm.stopPrank();
        }
    }

    // function testStake() public {
    //     // Check if all NFTs are staked
    //     for (uint256 i = 1; i < 6; i++) {
    //         assertEq(erc1.ownerOf(i), address(nftHolder));
    //         assertEq(erc2.ownerOf(i + 1), address(nftHolder));
    //         assertEq(erc3.ownerOf(i + 2), address(nftHolder));
    //     }
    //     // Check if tokenHashedId is correct
    //     bytes32[] memory allStakedNFT = nftHolder.getListStakedNFTsHashed();
    //     for (uint256 i = 0; i < allStakedNFT.length; i++) {
    //         address tempNFTContract = nftHolder.getStakedNFTs(allStakedNFT[i]).nftContract;
    //         uint256 tempTokenId = nftHolder.getStakedNFTs(allStakedNFT[i]).tokenId;
    //         address tempSender = nftHolder.getStakedNFTs(allStakedNFT[i]).sender;
    //         assertEq(allStakedNFT[i], keccak256(abi.encodePacked(tempNFTContract, tempTokenId, tempSender)));
    //     }
    // }

    // function testShuffle() public {
    //     // Check if all NFTs are staked
    //     for (uint256 i = 1; i < 6; i++) {
    //         assertEq(erc1.ownerOf(i), address(nftHolder));
    //         assertEq(erc2.ownerOf(i + 1), address(nftHolder));
    //         assertEq(erc3.ownerOf(i + 2), address(nftHolder));
    //     }

    //     // Random shuffle to get top 10s
    //     vm.prank(address(0xdeadbeaf));
    //     bytes32[10] memory top10 = rollDice.randomShuffle(1);

    //     bytes32[10] memory _top10Listing = rollDice.getTop10Listing();

    //     for (uint256 i = 0; i < 10; i++) {
    //         assertEq(top10[i], _top10Listing[i]);
    //     }
    // }

    function testGetTop1() public {
        vm.startPrank(address(0xdeadbeaf));
        rollDice.randomShuffle(1);
        bytes32 top1 = rollDice.randomShuffleTop1FromArray(1);
        vm.stopPrank();
        console.log("Top1: ");
        console.logBytes32(top1);
        assertEq(top1, rollDice.getWinnerNFT());
    }

    function testBetting() public {
        vm.startPrank(alice);
        vaultToken.betting{value: 1 ether}(0x5dda0a76d053a5804eba80222c6045a7e5f0436ec5f1b2ce93431067073b187e, 1 ether);
        vaultToken.betting{value: 2 ether}(0x1d3f321d6efc81cb197e179c81ce49df4092cbdc34c1e80ecead004298d99985, 2 ether);
        vaultToken.betting{value: 0.25 ether}(
            0x8b64a03152817a33fc161cc16e97dde7555b2bbb590abb232045161e68845daa, 0.25 ether
        );
        vm.stopPrank();
        vm.startPrank(bob);
        vaultToken.betting{value: 2 ether}(0x5dda0a76d053a5804eba80222c6045a7e5f0436ec5f1b2ce93431067073b187e, 2 ether);
        vaultToken.betting{value: 0.4 ether}(
            0x6c2a6f0ab8c57ade31d0e6a569e3f5d80cb39b58b16ea495cfbed342a757ceaf, 0.4 ether
        );
        vaultToken.betting{value: 6 ether}(0x8e640b0360f26776408b474d6d298065319b60443a1ac4ce54bc9f46f33e8755, 6 ether);
        vm.stopPrank();
        vm.startPrank(carol);
        vaultToken.betting{value: 3 ether}(0x5dda0a76d053a5804eba80222c6045a7e5f0436ec5f1b2ce93431067073b187e, 3 ether);
        vaultToken.betting{value: 3 ether}(0x38d4995c2bd3e768680b41ccc94a65d6618137165b2b71873d802d27e66c1e4a, 3 ether);
        vaultToken.betting{value: 7 ether}(0x8b64a03152817a33fc161cc16e97dde7555b2bbb590abb232045161e68845daa, 7 ether);
        vm.stopPrank();

        assertEq(
            vaultToken.getBettingAmount(0x5dda0a76d053a5804eba80222c6045a7e5f0436ec5f1b2ce93431067073b187e), 6 ether
        );
        assertEq(
            vaultToken.getBettingAmount(0x1d3f321d6efc81cb197e179c81ce49df4092cbdc34c1e80ecead004298d99985), 2 ether
        );
        assertEq(
            vaultToken.getBettingAmount(0x8b64a03152817a33fc161cc16e97dde7555b2bbb590abb232045161e68845daa), 7.25 ether
        );
        assertEq(
            vaultToken.getBettingAmount(0x6c2a6f0ab8c57ade31d0e6a569e3f5d80cb39b58b16ea495cfbed342a757ceaf), 0.4 ether
        );
        assertEq(
            vaultToken.getBettingAmount(0x8e640b0360f26776408b474d6d298065319b60443a1ac4ce54bc9f46f33e8755), 6 ether
        );
        assertEq(
            vaultToken.getBettingAmount(0x38d4995c2bd3e768680b41ccc94a65d6618137165b2b71873d802d27e66c1e4a), 3 ether
        );
    }

    function testPayoutWinner() public {
        testGetTop1();
        testBetting();

        // Get winner NFT
        bytes32 winNFT = rollDice.getWinnerNFT();

        // Get nft total betted amount
        uint256 totalBettedAmount = vaultToken.getBettingAmount(winNFT);
        console.log("Total betted amount: ", totalBettedAmount);

        // Get betted user on this NFT
        address[] memory bettedUsers = vaultToken.getBettingUsers(winNFT);
        for (uint256 i = 0; i < bettedUsers.length; i++) {
            console.log("Betted user: ", bettedUsers[i]);
        }

        vm.startPrank(address(0xdeadbeaf));
        vaultToken.payoutWinner();
        vm.stopPrank();
        assertEq(address(vaultToken).balance, 6.25 ether);
        assertEq(address(alice).balance, 1 ether);
        assertEq(address(bob).balance, 2 ether);
        assertEq(address(carol).balance, 3 ether);
    }
}
