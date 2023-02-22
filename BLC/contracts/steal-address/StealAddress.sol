// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../library/Secp256k1.sol";

struct PublicKey {
    uint256 X;
    uint256 Y;
}

contract StealAddress {
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

    function getStealAddress(
        uint256 privKey,
        address to_address
    ) public view returns (address, bytes memory) {
        (address stealAddress, bytes memory hash) = privKey.getStealAddress(
            publicKey_[to_address].X,
            publicKey_[to_address].Y
        );
        return (stealAddress, hash);
    }

    function getPrivateKeyOfStealAddress(
        uint256 privKey,
        uint256 hash
    ) public pure returns (bytes memory) {
        return privKey.getPrivateKeyOfStealAddress(hash);
    }
}
