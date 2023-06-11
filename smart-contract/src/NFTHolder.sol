// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract NFTHolder is IERC721Receiver {
    struct StakedNFT {
        address NFTContract;
        uint256 tokenId;
        address sender;
    }

    address[] private _nftContractSender;

    mapping(address => mapping(address => uint256[])) private _ownerOfStakingNFTByContract;
    mapping(address => mapping(uint256 => address)) _isStakedBy;
    mapping(address => uint256[]) listStakedNFTsHashed;
    mapping(bytes32 => StakedNFT) private _stakedNFTs;
    
    event Staked(address NFTContract, uint256 tokenId, address sender);

    function getNFTContractSender() public view returns (address[] memory) {
        return _nftContractSender;
    }

    function getOwnerOfStakingNFTByContract(address NFTContract, address sender) public view returns (uint256[] memory) {
        return _ownerOfStakingNFTByContract[NFTContract][sender];
    }

    function getIsStakedBy(address operator, uint256 tokenId) public view returns (address) {
        return _isStakedBy[operator][tokenId];
    }

    function getListStakedNFTs(address nftContract) public view returns (uint256[] memory) {
        return listStakedNFTsHashed[nftContract];
    }



    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4){
        require(IERC721(msg.sender).ownerOf(tokenId) == address(this), "You are not the owner of this NFT");
        require(_isStakedBy[operator][tokenId] == address(0), "This token is staked");
        _ownerOfStakingNFTByContract[operator][from].push(tokenId);
        _nftContractSender.push(operator);
        listStakedNFTsHashed[operator].push(tokenId);
        _isStakedBy[operator][tokenId] = from;
    
        bytes32 tokenHashedId = keccak256(abi.encodePacked(operator, tokenId, from));
        _stakedNFTs[tokenHashedId] = StakedNFT(operator, tokenId, from);

        emit Staked(operator, tokenId, from);

        return this.onERC721Received.selector;
    }

    function withdraw(address NFTContract, uint256 tokenId) public {
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