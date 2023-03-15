// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./IMusic.sol";

interface IMusicMarket {
    struct Song {
        uint id;
        uint price;
        uint amount;
        string uri;
        address seller;
    }

    /**
     * @dev Get song
     * @param id Song id
     * @return Song
     */
    function song(uint256 id) external view returns (Song memory);

    /**
     * @dev List a song
     * @param id Song id
     * @param price Song price
     * @param amount Song amount
     * @param uri Song URI
     */
    function listSong(
        uint256 id,
        uint256 price,
        uint256 amount,
        string calldata uri
    ) external;

    /**
     * @dev Buy a song
     * @param token IMusic token
     * @param id Song id
     * Approved amount of MUC must be transferred to the contract before calling this function
     */
    function buySong(IMusic token, uint256 id) external;

    event ListSong(
        uint256 indexed id,
        address indexed seller,
        uint256 price,
        uint256 amount,
        string uri
    );

    event BuySong(uint256 indexed id, address indexed buyer);
}
