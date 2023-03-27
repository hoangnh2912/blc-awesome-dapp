import { Constant, uuid } from '@constants';
import { AxiosGet, compile, verify } from '@providers';
import fs from 'fs';
import { ERC4907Input, VerifyInput, GetAbiInput } from './renting';

export class RentingService {
    async Erc4907({
        name,
        symbol,
        baseURI,
        is_burnable,
        is_mintable,
        is_pausable,
        is_uri_storage,
    }: ERC4907Input) {
        const topContract = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.9;\n`;
        let importLibraries: Array<string> | string = [`./ERC4907/ERC4907.sol`];

        if (is_uri_storage)
            importLibraries.push(`@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol`);

        if (is_pausable) {
            importLibraries.push(`@openzeppelin/contracts/security/Pausable.sol`);
            importLibraries.push(`@openzeppelin/contracts/access/Ownable.sol`);
        }
        if (is_mintable) {
            importLibraries.push(`@openzeppelin/contracts/access/Ownable.sol`);
        }
        if (is_burnable) {
            importLibraries.push(`@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol`);
        }
        importLibraries = [...new Set(importLibraries)].map(e => `import "${e}";`).join('\n');

        let contractBody: Array<string> | string = [];

        if (baseURI) {
            contractBody.push(`function _baseURI() internal pure override returns (string memory) {
                return "${baseURI}";
            }`);
        }

        if (is_burnable) {
            if (!is_pausable) {
                contractBody.push(`function _beforeTokenTransfer(
                    address from,
                    address to,
                    uint256 firstTokenId,
                    uint256 batchSize
                  ) internal override(ERC721, ERC4907) {
                    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
                  }`);
            }
            if (!is_uri_storage) {
                contractBody.push(`function supportsInterface(bytes4 interfaceId) 
                public 
                view 
                override(ERC721, ERC4907) 
                returns (bool) 
                {
                    return super.supportsInterface(interfaceId);
                }`);
            }
        }

        if (is_mintable) {
            if (is_uri_storage) {
                contractBody.push(`function safeMint(address to, uint256 tokenId, string memory uri)
                public
                onlyOwner
                {
                    _safeMint(to, tokenId);
                    _setTokenURI(tokenId, uri);
                }`);
            } else {
                contractBody.push(`function safeMint(address to, uint256 tokenId) public onlyOwner {
                    _safeMint(to, tokenId);
                }`);
            }
        }

        if (is_pausable) {
            contractBody.push(`function pause() public onlyOwner {
                _pause();
            }`);
            contractBody.push(`function unpause() public onlyOwner {
                _unpause();
            }`);
            if (is_burnable || is_uri_storage) {
                contractBody.push(`function _beforeTokenTransfer(
                address from,
                address to,
                uint256 firstTokenId,
                uint256 batchSize
                ) internal override(ERC721, ERC4907) whenNotPaused {
                    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
                }`);
            }
            else {
                contractBody.push(`function _beforeTokenTransfer(
                address from,
                address to,
                uint256 firstTokenId,
                uint256 batchSize
                ) internal override whenNotPaused {
                    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
                }`);
            }

        }
        // else {
        //     contractBody.push(`function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        //     internal
        //     override (ERC721, ERC4907)
        //     {
        //         super._beforeTokenTransfer(from, to, tokenId, batchSize);
        //     }`);
        // }

        if (is_uri_storage) {
            contractBody.push(`function _burn(uint256 tokenId) 
            internal 
            override(ERC721, ERC721URIStorage) 
            {
                super._burn(tokenId);
            }`);
            contractBody.push(`function tokenURI(uint256 tokenId)
            public
            view
            override(ERC721, ERC721URIStorage)
            returns (string memory)
            {
                return super.tokenURI(tokenId);
            }`);
            contractBody.push(`function supportsInterface(bytes4 interfaceId) 
            public 
            view 
            override(ERC721, ERC4907) 
            returns (bool) 
            {
                return super.supportsInterface(interfaceId);
            }`);
            if (!is_burnable && !is_pausable) {
                contractBody.push(`function _beforeTokenTransfer(
                    address from,
                    address to,
                    uint256 firstTokenId,
                    uint256 batchSize
                ) internal override(ERC721, ERC4907) {
                    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
                }`);
            }
        }

        contractBody = [...new Set(contractBody)].map(e => e.trim()).join('\n');

        let extendContract: Array<string> | string = ['ERC4907'];
        if (is_uri_storage) extendContract.push('ERC721URIStorage');
        if (is_pausable) {
            extendContract.push('Pausable');
            extendContract.push('Ownable');
        }
        if (is_mintable) extendContract.push('Ownable');
        if (is_burnable) extendContract.push('ERC721Burnable');
        extendContract = [...new Set(extendContract)].join(', ');

        const contractName = name
            .trim()
            .split(' ')
            .map(e => e.charAt(0).toUpperCase() + e.slice(1))
            .join('');

        let contractBase = `\ncontract ${contractName} is ${extendContract} {
        constructor() ERC4907("${name.trim()}", "${symbol.trim()}") {}
        ${contractBody}
    }`;
        const finalContract = topContract + importLibraries + contractBase;
        const { bytecode, nameUnique, abi } = await this.compileContract(contractName, finalContract);

        return {
            bytecode: bytecode,
            name: contractName,
            uuid: nameUnique,
            abi,
        };
    }

    private async compileContract(contractName: string, contractContent: string) {
        const nameUnique = uuid();
        fs.mkdirSync(`${Constant.ROOT_PATH}/contracts`, { recursive: true });
        fs.writeFileSync(`${Constant.ROOT_PATH}/contracts/${nameUnique}.sol`, contractContent, 'utf8');
        await compile();
        const jsonCompiled = JSON.parse(
            fs.readFileSync(
                `${Constant.ROOT_PATH}/artifacts/contracts/${nameUnique}.sol/${contractName}.json`,
                'utf8',
            ),
        );
        fs.rmSync(`${Constant.ROOT_PATH}/artifacts/build-info`, {
            recursive: true,
            force: true,
        });
        fs.rmSync(`${Constant.ROOT_PATH}/cache`, {
            recursive: true,
            force: true,
        });
        return {
            bytecode: jsonCompiled.bytecode,
            nameUnique,
            abi: jsonCompiled.abi,
        };
    }

    async verifyContract(payload: VerifyInput) {
        const verifyUrl = await verify(payload.uuid, payload.name, payload.address);
        if (verifyUrl) {
            fs.unlinkSync(`${Constant.ROOT_PATH}/contracts/${payload.uuid}.sol`);
            fs.rmSync(`${Constant.ROOT_PATH}/cache`, {
                recursive: true,
                force: true,
            });
            fs.rmSync(`${Constant.ROOT_PATH}/artifacts/contracts/${payload.uuid}.sol`, {
                recursive: true,
                force: true,
            });
        }
        return verifyUrl;
    }

    async getAbi(payload: GetAbiInput) {
        const res = await AxiosGet<string>('https://api-testnet.polygonscan.com/api', {
            params: {
                module: 'contract',
                action: 'getabi',
                address: payload.address,
                apikey: process.env.API_KEY,
            },
        });
        return {
            abi: JSON.parse(res.data.result),
        };
    }
}
