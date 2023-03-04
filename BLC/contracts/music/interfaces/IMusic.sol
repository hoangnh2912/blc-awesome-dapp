// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IMusic is IERC1155 {
    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external;

    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external;
}
