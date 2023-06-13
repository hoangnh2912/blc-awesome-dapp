// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTHolder is IERC721Receiver, Ownable {
    struct StakedNFT {
        address NFTContract;
        uint256 tokenId;
        address sender;
    }

    address[] private _nftContractSender;
    mapping(address => bool) _nftContractSendOnce;
    bytes32[] private listStakedNFTsHashed;

    mapping(address => mapping(address => uint256[])) private _ownerOfStakingNFTByContract;
    mapping(address => mapping(uint256 => address)) _isStakedBy;
    mapping(address => bytes32[]) listStakedNFTsHashedByContract;
    mapping(bytes32 => StakedNFT) private _stakedNFTs;
    mapping(bytes32 => bool) private _isStakedNFTsLocked;
    
    event Staked(address NFTContract, uint256 tokenId, address sender);

    function getNFTContractSender() public view returns (address[] memory) {
        return _nftContractSender;
    }

    function getOwnerOfStakingNFTByContract(address NFTContract, address sender) public view returns (uint256[] memory) {
        return _ownerOfStakingNFTByContract[NFTContract][sender];
    }

    function getIsStakedBy(address nftContract, uint256 tokenId) public view returns (address) {
        return _isStakedBy[nftContract][tokenId];
    }

    function getListStakedNFTsHashedByContract(address NFTContract) public view returns (bytes32[] memory) {
        return listStakedNFTsHashedByContract[NFTContract];
    }

    function getListStakedNFTsHashed() public view returns (bytes32[] memory) {
        return listStakedNFTsHashed;
    }

    function getStakedNFTs(bytes32 tokenHashedId) public view returns (StakedNFT memory) {
        return _stakedNFTs[tokenHashedId];
    }

    function getLockedStatus(bytes32 tokenHashedId) public view returns (bool) {
        return _isStakedNFTsLocked[tokenHashedId];
    }

    function lockStakedNFT(bytes32 tokenHashedId) public onlyOwner {
        require(_isStakedNFTsLocked[tokenHashedId] == false, "This NFT is locked");
        _isStakedNFTsLocked[tokenHashedId] = true;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4){
        require(IERC721(msg.sender).ownerOf(tokenId) == address(this), "You are not the owner of this NFT");
        require(_isStakedBy[msg.sender][tokenId] == address(0), "This token is staked");
        _ownerOfStakingNFTByContract[msg.sender][from].push(tokenId);
        if (_nftContractSendOnce[msg.sender] == false) {
            _nftContractSendOnce[msg.sender] = true;
            _nftContractSender.push(msg.sender);
        }
        _isStakedBy[msg.sender][tokenId] = from;
    
        bytes32 tokenHashedId = keccak256(abi.encodePacked(msg.sender, tokenId, from));
        _stakedNFTs[tokenHashedId] = StakedNFT(msg.sender, tokenId, from);

        listStakedNFTsHashedByContract[msg.sender].push(tokenHashedId);
        listStakedNFTsHashed.push(tokenHashedId);

        emit Staked(msg.sender, tokenId, from);

        return this.onERC721Received.selector;
    }

    function withdraw(address NFTContract, uint256 tokenId) public {
        require(_isStakedNFTsLocked[keccak256(abi.encodePacked(NFTContract, tokenId))] == false, "This NFT is locked");
        require(IERC721(NFTContract).ownerOf(tokenId) == address(this), "This NFT is not staked");
        
        // List of staked NFTs
        uint256[] storage stakedNFTs = _ownerOfStakingNFTByContract[NFTContract][msg.sender];
        // Check if the owner of the NFT is the sender
        bool isOwner = false;
        for (uint256 i = 0; i < stakedNFTs.length; i++) {
            if (stakedNFTs[i] == tokenId) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "You are not the owner of this NFT");

        IERC721(NFTContract).transferFrom(address(this), msg.sender, tokenId);
        for (uint256 i = 0; i < stakedNFTs.length; i++) {
            if (stakedNFTs[i] == tokenId) {
                stakedNFTs[i] = stakedNFTs[stakedNFTs.length - 1];
                stakedNFTs.pop();
                break;
            }
        }
    }

    

}