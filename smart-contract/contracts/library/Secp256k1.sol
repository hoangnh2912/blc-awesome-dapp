// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./EllipticCurve.sol";

library Secp256k1 {
    uint256 private constant GX =
        0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798;
    uint256 private constant GY =
        0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8;
    uint256 private constant AA = 0;
    uint256 private constant BB = 7;
    uint256 private constant PP =
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;

    function derivePubKey(
        uint256 privKey
    ) public pure returns (uint256, uint256) {
        return EllipticCurve.ecMul(privKey, GX, GY, AA, PP);
    }

    function deriveAddress(uint256 privKey) external pure returns (address) {
        (uint256 pubKeyX, uint256 pubKeyY) = derivePubKey(privKey);
        return
            address(
                uint160(uint256(keccak256(abi.encodePacked(pubKeyX, pubKeyY))))
            );
    }

    function getStealthAddress(
        uint256 privKeyBob,
        uint256 pubKeyAliceX,
        uint256 pubKeyAliceY
    ) public pure returns (address, bytes memory) {
        (uint256 Sx, uint256 Sy) = EllipticCurve.ecMul(
            privKeyBob,
            pubKeyAliceX,
            pubKeyAliceY,
            AA,
            PP
        );
        bytes memory byteSx = abi.encodePacked(Sx);
        bytes memory byteSy = abi.encodePacked(Sy);
        bytes memory byteCombineS = abi.encodePacked(byteSx, byteSy);

        uint256 hashS = uint160(uint256(keccak256(byteCombineS)));

        (uint256 gSX, uint256 gSY) = EllipticCurve.ecMul(hashS, GX, GY, AA, PP);

        (uint256 Px, uint256 Py) = EllipticCurve.ecAdd(
            pubKeyAliceX,
            pubKeyAliceY,
            gSX,
            gSY,
            AA,
            PP
        );

        return (
            address(uint160(uint256(keccak256(abi.encodePacked(Px, Py))))),
            abi.encodePacked(hashS)
        );
    }

    function getPrivateKeyOfStealthAddress(
        uint256 privKey,
        uint256 hashS
    ) external pure returns (bytes memory) {
        return abi.encodePacked(privKey + hashS);
    }
}
