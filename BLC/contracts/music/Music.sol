// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IMusic.sol";
import "./interfaces/IMusicMarket.sol";

contract Music is ERC1155, AccessControl, IMusic {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    IMusicMarket private immutable _musicMarket;

    constructor(address _market) ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, _market);
        _musicMarket = IMusicMarket(_market);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external override onlyRole(MINTER_ROLE) {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external override onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    function uri(
        uint256 id
    ) public view virtual override(ERC1155) returns (string memory) {
        return _musicMarket.uri(id);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, AccessControl, IERC165) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
