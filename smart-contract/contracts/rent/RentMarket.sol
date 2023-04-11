// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RentToken.sol";
import "../music/MUC.sol";

contract RentMarket is Ownable {
    event TokenRented(
        uint256 indexed tokenId,
        address renter,
        uint256 rentalPrice
    );

    RentToken private _rent;
    MUC private _token;
    mapping(uint256 => uint256) private _rentalPrice;
    mapping(uint256 => uint256) private _rentalExpires;
    uint256 private _platformFeePercentage;
    address private _platformFeeAddress;

    constructor(
        uint256 platformFeePercentage,
        address platformFeeAddress,
        address rentAddress,
        address tokenAddress
    ) {
        _platformFeePercentage = platformFeePercentage;
        _platformFeeAddress = platformFeeAddress;
        _rent = RentToken(rentAddress);
        _token = MUC(tokenAddress);
    }

    function addRentOrder(
        uint256 tokenId,
        uint256 rentalPrice,
        uint256 rentalExpires
    ) public {
        require(
            _rent.userOf(tokenId) == address(0),
            "RentMarket: token being rented"
        );
        require(
            _rent.isApprovedForAll(msg.sender, address(this)),
            "RentMarket: not approve for all to market"
        );
        _rentalPrice[tokenId] = rentalPrice;
        _rentalExpires[tokenId] = rentalExpires;
    }

    function rent(uint256 tokenId) public {
        uint256 price = _rentalPrice[tokenId];
        require(
            _token.allowance(msg.sender, address(this)) >= price,
            "RentMarket: allowance not enough"
        );
        require(
            _rent.userOf(tokenId) == address(0),
            "RentMarket: token being rented"
        );

        uint256 fee = (price * getPlatformFeePercentage()) / 100;
        _token.transferFrom(msg.sender, getPlatformFeeAddress(), fee);
        _token.transferFrom(msg.sender, _rent.ownerOf(tokenId), price - fee);
        _rent.setUser(
            tokenId,
            msg.sender,
            block.timestamp + _rentalExpires[tokenId]
        );

        emit TokenRented(tokenId, msg.sender, price);
    }

    function getOrder(
        uint256 tokenId
    )
        public
        view
        returns (address owner, address renter, uint256 price, bool isRented)
    {
        return (
            _rent.ownerOf(tokenId),
            _rent.userOf(tokenId),
            _rentalPrice[tokenId],
            _rent.userOf(tokenId) == address(0) ? false : true
        );
    }

    function getPlatformFeePercentage() public view returns (uint256) {
        return _platformFeePercentage;
    }

    function setPlatformFeePercentage(
        uint256 newFeePercentage
    ) public onlyOwner {
        _platformFeePercentage = newFeePercentage;
    }

    function getPlatformFeeAddress() public view returns (address) {
        return _platformFeeAddress;
    }

    function setPlatformFeeAddress(address newFeeAddress) public onlyOwner {
        _platformFeeAddress = newFeeAddress;
    }
}
