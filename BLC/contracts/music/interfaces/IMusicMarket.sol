// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IMusicMarket {
    /**
     * @dev Returns the URI for token type `id`.
     *
     * If the `\{id\}` substring is present in the URI, it must be replaced by
     * clients with the actual token type ID.
     */
    function uri(uint256 id) external view returns (string memory);

    event ListAlbum(
        bytes32 indexed root,
        uint256 indexed price,
        address indexed owner
    );

    event BuyAlbum(bytes32 indexed root, address indexed buyer);
    event BuySong(uint256 indexed id, address indexed buyer);
}
