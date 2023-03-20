// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMusicMarket.sol";

contract MusicMarket is Ownable, IMusicMarket {
    uint256 public constant FEE = 3;
    IERC20 private immutable _muc;
    mapping(uint256 => Song) _song;

    constructor(IERC20 muc) {
        _muc = muc;
    }

    function song(uint256 id) external view override returns (Song memory) {
        return _song[id];
    }

    modifier notPaused(uint256 id) {
        require(!_song[id].paused, "Song is paused");
        _;
    }

    modifier paused(uint256 id) {
        require(_song[id].paused, "Song is not paused");
        _;
    }

    modifier notListed(uint256 id) {
        require(_song[id].price == 0, "Song already listed");
        _;
    }

    modifier buyable(uint256 id) {
        require(_song[id].price > 0, "Song not listed");
        require(_song[id].amount > 0, "Song not available");
        _;
    }

    function listSong(
        uint256 id,
        uint256 price,
        uint256 amount,
        string calldata uri
    ) external override notListed(id) {
        require(price > 0, "Price must be greater than 0");
        require(amount > 0, "Amount must be greater than 0");

        _song[id] = Song(id, price, amount, uri, msg.sender, false);
        emit ListSong(id, msg.sender, price, amount, uri);
    }

    function listSongs(
        uint256[] calldata id,
        uint256[] calldata price,
        uint256[] calldata amount,
        string[] calldata uri
    ) external override {
        require(id.length == price.length, "Invalid input");
        require(id.length == amount.length, "Invalid input");
        require(id.length == uri.length, "Invalid input");
        for (uint256 i = 0; i < id.length; ++i) {
            this.listSong(id[i], price[i], amount[i], uri[i]);
        }
    }

    function buySong(
        IMusic token,
        uint256 id
    ) external override buyable(id) notPaused(id) {
        require(
            token.balanceOf(msg.sender, id) == 0,
            "You already own this song"
        );
        uint256 price = _song[id].price;
        require(price > 0, "Song not listed");
        --_song[id].amount;
        uint256 fee = (price * FEE) / 100;
        _muc.transferFrom(msg.sender, address(this), fee);
        _muc.transferFrom(msg.sender, _song[id].seller, price - fee);
        token.mint(msg.sender, id, 1, _song[id].uri);
        emit BuySong(id, msg.sender);
    }

    function buySongs(IMusic token, uint256[] calldata ids) external override {
        for (uint256 i = 0; i < ids.length; ++i) {
            this.buySong(token, ids[i]);
        }
    }

    function pauseListSong(uint256 id) external notPaused(id) buyable(id) {
        require(_song[id].seller == msg.sender, "Not the seller");
        _song[id].paused = true;
        emit PauseListSong(id);
    }

    function unpauseListSong(uint256 id) external paused(id) buyable(id) {
        require(_song[id].seller == msg.sender, "Not the seller");
        _song[id].paused = false;
        emit UnpauseListSong(id);
    }

    function withdraw() external onlyOwner {
        _muc.transfer(owner(), _muc.balanceOf(address(this)));
    }
}
