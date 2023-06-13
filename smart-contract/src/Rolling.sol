pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./NFTHolder.sol";
import "./VaultToken.sol";

contract RollDice is Ownable {
    NFTHolder private _holder;
    VaultToken private _vaultToken;

    bytes32[10] private _top10Listing;
    bytes32 public winnerNFT;

    constructor(NFTHolder holder, VaultToken vaultToken) {
        _holder = holder;
        _vaultToken = vaultToken;
    }

    function getHolder() public view returns (NFTHolder) {
        return _holder;
    }

    function getVaultToken() public view returns (VaultToken) {
        return _vaultToken;
    }

    function getTop10Listing() public view returns (bytes32[10] memory) {
        return _top10Listing;
    }

    function getRandomNumber(uint256 seed) public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))) % 100 + 1;
    }

    function getAllStakedNFTFromHolder() public view returns(bytes32[] memory) {
        return _holder.getListStakedNFTsHashed();
    }

    function get1RandomFromArray(uint256 seed) public onlyOwner returns (bytes32) {
        bytes32[10] memory top10 = _top10Listing;
        uint256 length = top10.length;
        uint256 random = getRandomNumber(block.timestamp + seed);
        winnerNFT = top10[random % length];
        return top10[random % length];
    }

    function randomShuffle(uint256 seed) public onlyOwner returns (bytes32[10] memory) {
        bytes32[] memory allStakedNFT = _holder.getListStakedNFTsHashed();

        // Reset _top10Listing array by poping
        for (uint256 i = 0; i < 10; i++) {
            _top10Listing[i] = bytes32(0);
        }

        for (uint256 i = 0; i < allStakedNFT.length; i++) {
            uint256 n = i + uint256(keccak256(abi.encodePacked(block.timestamp + seed))) % (allStakedNFT.length - i);
            bytes32 temp = allStakedNFT[n];
            allStakedNFT[n] = allStakedNFT[i];
            allStakedNFT[i] = temp;
        }

        bytes32[10] memory finalList;
        uint256 k = 0;
        do {
            finalList[k] = allStakedNFT[k];
        } while (k < 10 && k < allStakedNFT.length);

        _top10Listing = finalList;
        return finalList;
    }

}