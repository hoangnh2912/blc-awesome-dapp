// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./ERC4907/ERC4907.sol";

contract RentToken is ERC4907, ERC721URIStorage {
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC4907(name_, symbol_) {}

    function mint(uint256 tokenId, string memory uri) public {
        _mint(_msgSender(), tokenId);
        _setTokenURI(tokenId, uri);
    }

    function blockTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    // Function overloads required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC4907) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC4907) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
