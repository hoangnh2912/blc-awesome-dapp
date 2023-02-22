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

    function getStealAddress(
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

    function getPrivateKeyOfStealAddress(
        uint256 privKey,
        uint256 hashS
    ) external pure returns (bytes memory) {
        return abi.encodePacked(privKey + hashS);
    }
}
// Bob priv 0xcd33bd88107336c284fff53d164e52dcdae1f8f17ce0ac4133e2fca133d8c101
// Bob pubx  68801338141491839629590403183976936351571676850428342953307399750470614075789
// Bob puby  71548862875834372618684220349349112243849101897006908899616949932856138469405

// Alice priv 0x4cd6b7f576b0c95a499b045bf058c62fc8c6d4c9a2a79351f630e9ce6907c042
// Alice pubx 27796775777738617449417371656261563892599770533566575012696561108402228223066
// Alice puby 97328776940829492362616315695212636021714190464923297043736457163228687809116

// 1
// sig Bob <-> Alice 0x097c8a3a58e6839ad897c76159eadd5d2c0cd73f6274d6e552a8b29126331979d90bae7ed203c59585279036faa427e323b9fbd1e7b0c6bad40ca5bac678b000
// steal address of Bob : 0xcCDd589E9c5B2f57aF435dFe4D81B627B917304F
// hashS 0x0000000000000000000000001503756104df8301846f29dbf614a04fbb6f951b
