// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '../ERC4907/ERC4907.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RentToken is ERC4907, ERC721Burnable, Ownable, Pausable {
  constructor(string memory name_, string memory symbol_) ERC4907(name_, symbol_) {}

  function mint(uint256 tokenId) public {
    _mint(_msgSender(), tokenId);
  }

  function blockTimestamp() public view returns (uint256) {
    return block.timestamp;
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
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

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC4907) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  // function _beforeTokenTransfer(
  //     address from,
  //     address to,
  //     uint256 tokenId,
  //     uint256 batchSize
  // ) internal override(ERC721, ERC4907) whenNotPaused {
  //     super._beforeTokenTransfer(from, to, tokenId, batchSize);
  // }
}
