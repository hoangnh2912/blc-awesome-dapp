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

    function getRandomNumber(uint256 seed) public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))) % 6 + 1;
    }

    

}