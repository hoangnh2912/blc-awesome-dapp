// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../library/Secp256k1.sol";

struct PublicKey {
    uint256 X;
    uint256 Y;
}

contract StealthAddress {
    using Secp256k1 for uint256;
    mapping(address => PublicKey) private publicKey_;

    function setPublicKey(uint x, uint y) public {
        publicKey_[msg.sender] = PublicKey(x, y);
    }

    function getPublicKey(
        address _address
    ) public view returns (PublicKey memory) {
        return publicKey_[_address];
    }

    function privToPubKey(
        uint256 privKey
    ) public pure returns (uint256, uint256) {
        return privKey.derivePubKey();
    }

    function getStealthAddress(
        uint256 privKey,
        address to_address
    ) public view returns (address, bytes memory) {
        (address stealthAddress, bytes memory hash) = privKey.getStealthAddress(
            publicKey_[to_address].X,
            publicKey_[to_address].Y
        );
        return (stealthAddress, hash);
    }

    function getPrivateKeyOfStealthAddress(
        uint256 privKey,
        uint256 hash
    ) public pure returns (bytes memory) {
        return privKey.getPrivateKeyOfStealthAddress(hash);
    }
}
