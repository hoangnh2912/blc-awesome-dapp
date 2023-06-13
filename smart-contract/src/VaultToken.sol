// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./NFTHolder.sol";

contract VaultToken is Ownable {
    NFTHolder private _holder;

    uint256 _minBettingAmount = 1000 wei;
    uint256 _winnerFee = 10;

    constructor(NFTHolder holder) {
        _holder = holder;
    }

    mapping(bytes32 => uint256) _bettingAmount;

    mapping(bytes32 => address[]) _bettingUsers;

    mapping(bytes32 => mapping(address => uint256)) _bettingAmountOfUser;

    function getBettingAmount(bytes32 tokenHashedId) public view returns (uint256) {
        return _bettingAmount[tokenHashedId];
    }

    function getBettingAmountOfUser(bytes32 tokenHashedId, address user) public view returns (uint256) {
        return _bettingAmountOfUser[tokenHashedId][user];
    }

    function getHolder() public view returns (NFTHolder) {
        return _holder;
    }

    function betting(bytes32 tokenHashedId, uint256 amount) public payable {
        require(_holder.getStakedNFTs(tokenHashedId).NFTContract != address(0), "This NFT is not staked");
        require(_holder.getLockedStatus(tokenHashedId) == false, "This NFT is locked");
        require(msg.value == amount, "You must send the exact amount of ETH");
        require(amount >= _minBettingAmount, "You must bet at least 1000 wei");
        require(_holder.getStakedNFTs(tokenHashedId).NFTContract != address(0), "This NFT is not staked");
        _bettingAmount[tokenHashedId] += amount;
        _bettingAmountOfUser[tokenHashedId][msg.sender] += amount;
    }

    function payoutWinner() public onlyOwner {
        uint256 totalBet = 0;
    }
}