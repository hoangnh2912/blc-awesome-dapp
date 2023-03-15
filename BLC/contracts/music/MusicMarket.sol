// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMusicMarket.sol";

contract MusicMarket is Ownable, IMusicMarket {
    uint256 public constant FEE = 3;
    mapping(uint256 => Song) _song;
    IERC20 private immutable _muc;

    constructor(IERC20 muc) {
        _muc = muc;
    }

    function song(uint256 id) external view override returns (Song memory) {
        return _song[id];
    }

    function listSong(
        uint256 id,
        uint256 price,
        uint256 amount,
        string calldata uri
    ) external override {
        require(price > 0, "Price must be greater than 0");
        require(amount > 0, "Amount must be greater than 0");
        require(_song[id].price == 0, "Song already listed");
        _song[id] = Song(id, price, amount, uri, msg.sender);
        emit ListSong(id, msg.sender, price, amount, uri);
    }

    function buySong(IMusic token, uint256 id) external override {
        require(_song[id].price > 0, "Song not listed");
        require(_song[id].amount > 0, "Song not available");
        --_song[id].amount;
        uint256 price = _song[id].price;
        uint256 fee = (price * FEE) / 100;
        _muc.transferFrom(msg.sender, owner(), fee);
        _muc.transferFrom(msg.sender, _song[id].seller, price - fee);
        token.mint(msg.sender, id, 1, "");
        emit BuySong(id, msg.sender);
    }
}
