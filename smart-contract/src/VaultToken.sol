// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./RollDice.sol";

import "./NFTHolder.sol";

contract VaultToken is Ownable {
    NFTHolder private _holder;
    RollDice private _rollDice;

    uint256 _minBettingAmount = 100000 wei;
    uint256 _totalWinRate = 100000;
    uint256 _winnerRate = 7000;
    uint256 _bookmakerRate = 3000;

    constructor(NFTHolder holder, RollDice rollDice) {
        _holder = holder;
        _rollDice = rollDice;
    }

    bytes32[] private _bettingNFT;

    mapping(bytes32 => uint256) _bettingAmount;

    mapping(bytes32 => address[]) _bettingUsers;

    mapping(bytes32 => mapping(address => uint256)) _bettingAmountOfUser;

    function getBettingAmount(bytes32 tokenHashedId) public view returns (uint256) {
        return _bettingAmount[tokenHashedId];
    }

    function getBettingUsers(bytes32 tokenHashedId) public view returns (address[] memory) {
        return _bettingUsers[tokenHashedId];
    }

    function getBettingAmountOfUser(bytes32 tokenHashedId, address user) public view returns (uint256) {
        return _bettingAmountOfUser[tokenHashedId][user];
    }

    function getHolder() public view returns (NFTHolder) {
        return _holder;
    }

    function getRollDice() public view returns (RollDice) {
        return _rollDice;
    }

    function getBettingNFT() public view returns (bytes32[] memory) {
        return _bettingNFT;
    }

    function betting(bytes32 tokenHashedId, uint256 amount) public payable {
        require(_holder.getStakedNFTs(tokenHashedId).nftContract != address(0), "This NFT is not staked");
        require(_holder.getLockedStatus(tokenHashedId) == false, "This NFT is locked");
        require(msg.value == amount, "You must send the exact amount of ETH");
        require(amount >= _minBettingAmount, "You must bet at least 1000 wei");
        require(_holder.getStakedNFTs(tokenHashedId).nftContract != address(0), "This NFT is not staked");
        _bettingAmount[tokenHashedId] += amount;
        _bettingAmountOfUser[tokenHashedId][msg.sender] += amount;
    }

    function payoutWinner() public onlyOwner {
        // Get winner NFT
        bytes32 winNFT = _rollDice.winnerNFT();

        // Get nft total betted amount
        uint256 totalBettedAmount = _bettingAmount[winNFT];

        // Get betted user on this NFT
        address[] memory bettedUsers = _bettingUsers[winNFT];

        // Get total betted in round
        uint256 totalBettedInRound = 0;
        for (uint256 i = 0; i < _bettingNFT.length; i++) {
            totalBettedInRound += _bettingAmount[_bettingNFT[i]];
        }

        // Payout bookmaker base on rate
        payable(owner()).transfer((totalBettedInRound * _bookmakerRate) / _totalWinRate);

        // Payout owner of NFT base on rate
        address ownerOfNFT = _holder.getStakedNFTs(winNFT).sender;
        payable(ownerOfNFT).transfer((totalBettedInRound * _winnerRate) / _totalWinRate);

        // Payout base on rate on win nft of each user
        for (uint256 i = 0; i < bettedUsers.length; i++) {
            uint256 userBettedAmount = _bettingAmountOfUser[winNFT][bettedUsers[i]];
            uint256 userWinAmount = (userBettedAmount * totalBettedInRound) / (totalBettedAmount);
            payable(bettedUsers[i]).transfer(userWinAmount);
        }
    }
}
