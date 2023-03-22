// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMusicMarket.sol";
import "./interfaces/IMuc.sol";

contract MusicMarket is Ownable, IMusicMarket {
    uint256 public constant FEE = 3;
    IMuc private immutable _muc;
    mapping(uint256 => Song) _song;

    constructor(IMuc muc) {
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
    ) external override {
        _listSong(id, price, amount, uri, msg.sender);
    }

    function _listSong(
        uint256 id,
        uint256 price,
        uint256 amount,
        string calldata uri,
        address seller
    ) internal notListed(id) {
        require(price > 0, "Price must be greater than 0");
        require(amount > 0, "Amount must be greater than 0");

        _song[id] = Song(id, price, amount, uri, seller, false);
        emit ListSong(id, seller, price, amount, uri);
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
            _listSong(id[i], price[i], amount[i], uri[i], msg.sender);
        }
    }

    function buySong(
        IMusic token,
        uint256 id,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external override {
        _buySong(token, id, msg.sender, deadline, v, r, s);
    }

    function _buySong(
        IMusic token,
        uint256 id,
        address buyer,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal buyable(id) notPaused(id) {
        require(token.balanceOf(buyer, id) == 0, "You already own this song");
        uint256 price = _song[id].price;
        --_song[id].amount;
        _muc.permit(buyer, address(this), price, deadline, v, r, s);
        {
            Song memory song_ = _song[id];
            uint256 fee = (price * FEE) / 100;
            _muc.transferFrom(buyer, address(this), fee);
            _muc.transferFrom(buyer, song_.seller, price - fee);
            token.mint(buyer, id, 1, song_.uri);
        }
        emit BuySong(id, buyer);
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
