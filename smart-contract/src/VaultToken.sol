// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./NFTHolder.sol";

contract VaultToken is Ownable {
    NFTHolder private _holder;

    uint256 minBettingAmount = 1000 wei;

    constructor(NFTHolder holder) {
        _holder = holder;
    }

    mapping(address => mapping(uint256 => uint256)) _bettingAmount;

    mapping(address => mapping(uint256 => mapping(address => uint256))) _bettingAmountOfUser;

    function getBettingAmount(address NFTContract, uint256 tokenId) public view returns (uint256) {
        return _bettingAmount[NFTContract][tokenId];
    }


    function getBettingAmountOfUser(address NFTContract, uint256 tokenId, address sender) public view returns (uint256) {
        return _bettingAmountOfUser[NFTContract][tokenId][sender];
    }

    function getHolder() public view returns (NFTHolder) {
        return _holder;
    }

    function betting(address NFTContract, uint256 tokenId) public payable {
        require(_holder.getIsStakedBy(NFTContract, tokenId) != address(0), "This token is not staked");
        
        // Check if the betting amount is greater than minBettingAmount
        require(msg.value >= minBettingAmount, "The betting amount is less than minBettingAmount");

        // Add betting amount of user
        _bettingAmountOfUser[NFTContract][tokenId][msg.sender] += msg.value;
        // Add total betting amount of BFT
        _bettingAmount[NFTContract][tokenId] += msg.value;
    }
}