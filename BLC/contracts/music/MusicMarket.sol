// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMusicMarket.sol";
import "./interfaces/IMusic.sol";

struct Song {
    uint id;
    uint price;
    uint amount;
    string uri;
}

contract MusicMarket is Ownable, ReentrancyGuard, IMusicMarket {
    uint256 public constant FEE = 3;
    mapping(uint256 => Song) _song;
    mapping(bytes32 => uint) _albumPrice;
    mapping(bytes32 => address) _albumOwner;
    uint256 private _currentId;
    IERC20 private immutable _muc;

    constructor(IERC20 muc) {
        _muc = muc;
    }

    function uri(uint256 id) external view override returns (string memory) {
        return _song[id].uri;
    }

    function priceAlbum(bytes32 root) public view returns (uint256) {
        return _albumPrice[root];
    }

    function getRoot(uint256[] calldata ids) public pure returns (bytes32) {
        bytes32 root = keccak256(abi.encodePacked(ids[0]));
        for (uint i = 1; i < ids.length; ++i) {
            root = keccak256(abi.encodePacked(root, ids[i]));
        }
        return root;
    }

    function priceAlbum(uint256[] calldata ids) public view returns (uint256) {
        bytes32 root = getRoot(ids);
        return _albumPrice[root];
    }

    function ownerAlbum(bytes32 root) public view returns (address) {
        return _albumOwner[root];
    }

    function ownerAlbum(uint256[] calldata ids) public view returns (address) {
        bytes32 root = getRoot(ids);
        return _albumOwner[root];
    }

    function priceSong(uint256 id) public view returns (uint256) {
        return _song[id].price;
    }

    function amountSong(uint256 id) public view returns (uint256) {
        return _song[id].amount;
    }

    function listAlbum(
        uint256[] calldata price,
        uint256[] calldata amount,
        string[] calldata _uri,
        uint256 albumPrice
    ) public {
        require(
            price.length == amount.length,
            "Price and amount must be same length"
        );
        require(
            price.length == _uri.length,
            "Price and uri must be same length"
        );
        bytes32 root = keccak256(abi.encodePacked(++_currentId));
        for (uint i = 0; i < price.length; ++i) {
            _song[_currentId] = Song(_currentId, price[i], amount[i], _uri[i]);
            root = keccak256(abi.encodePacked(root, ++_currentId));
        }
        require(_albumPrice[root] == 0, "Album already listed");
        _albumPrice[root] = albumPrice;
        _albumOwner[root] = msg.sender;
        emit ListAlbum(root, albumPrice, msg.sender);
    }

    function buyAlbum(
        IMusic token,
        uint256[] calldata ids
    ) public nonReentrant {
        bytes32 root = getRoot(ids);
        uint256 price = priceAlbum(root);
        require(price > 0, "Album not listed");
        uint256[] memory amounts;
        for (uint i = 0; i < ids.length; ++i) {
            require(_song[ids[i]].amount > 0, "Song not available");
            --_song[ids[i]].amount;
            amounts[i] = 1;
        }
        uint256 fee = (price * FEE) / 100;
        _muc.transferFrom(msg.sender, owner(), fee);
        _muc.transferFrom(msg.sender, _albumOwner[root], price - fee);
        token.mintBatch(msg.sender, ids, amounts, "");
        emit BuyAlbum(root, msg.sender);
    }

    function buySong(
        IMusic token,
        uint256 id,
        uint256[] calldata ids
    ) public nonReentrant {
        require(_song[id].price > 0, "Song not listed");
        require(_song[id].amount > 0, "Song not available");
        require(priceAlbum(ids) > 0, "Album not listed");
        --_song[id].amount;
        uint256 price = _song[id].price;
        uint256 fee = (price * FEE) / 100;
        _muc.transferFrom(msg.sender, owner(), fee);
        _muc.transferFrom(msg.sender, ownerAlbum(ids), price - fee);
        token.mint(msg.sender, id, 1, "");
        emit BuySong(id, msg.sender);
    }
}
