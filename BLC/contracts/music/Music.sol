// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IMusic.sol";
import "./interfaces/IMusicMarket.sol";

contract Music is ERC1155, AccessControl, IMusic {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    mapping(uint256 => string) private _uris;

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        string calldata uri_
    ) external override onlyRole(MINTER_ROLE) {
        _mint(account, id, amount, "");
        _uris[id] = uri_;
    }

    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        string[] calldata uris_
    ) external override onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, "");
        for (uint256 i = 0; i < ids.length; ++i) {
            _uris[ids[i]] = uris_[i];
        }
    }

    function uri(
        uint256 id
    ) public view virtual override(ERC1155) returns (string memory) {
        return _uris[id];
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, AccessControl, IERC165) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
