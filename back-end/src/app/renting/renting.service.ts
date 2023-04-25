import { Constant, uuid } from '@constants';
import { compile } from '@providers';
import fs from 'fs';
import { ERC4907Input, RentMarketInput } from './renting';

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
      } else {
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
    const { bytecode, nameUnique, abi } = await this.CompileContract(contractName, finalContract);

    return {
      bytecode: bytecode,
      name: contractName,
      uuid: nameUnique,
      abi,
    };
  }

  async RentMarket({
    fee_percentage,
    admin_wallet,
    token_address,
    is_updatable_fee,
    is_updatable_admin,
  }: RentMarketInput) {
    const topContract = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.9;\n`;
    let importLibraries: Array<string> | string = [`./Rent/RentToken.sol`];
    importLibraries.push(`./Rent/MUC.sol`);

    if (is_updatable_fee || is_updatable_admin)
      importLibraries.push(`@openzeppelin/contracts/access/Ownable.sol`);
    importLibraries = [...new Set(importLibraries)].map(e => `import "${e}";`).join('\n');

    let initBody: Array<string> | string = [];
    initBody.push(`event TokenRented(
            uint256 indexed tokenId,
            address renter,
            uint256 rentalPrice
        );`);

    initBody.push(`RentToken private _rent;
        MUC private _token;
        mapping(uint256 => uint256) private _rentalPrice;
        mapping(uint256 => uint256) private _rentalExpires;
        uint256 private _platformFeePercentage;
        address private _platformFeeAddress;`);

    initBody = [...new Set(initBody)].map(e => e.trim()).join('\n');

    let contractBody: Array<string> | string = [];
    contractBody.push(`function addRentOrder(
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
        }`);

    contractBody.push(`function rent(uint256 tokenId) public {
            uint256 price = _rentalPrice[tokenId];
            require(
                _token.allowance(msg.sender, address(this)) >= price,
                "RentMarket: allowance not enough"
            );
            require(
                _rent.userOf(tokenId) == address(0),
                "RentMarket: token being rented"
            );
    
            uint256 fee = (price * _platformFeePercentage) / 100;
            _token.transferFrom(msg.sender, _platformFeeAddress, fee);
            _token.transferFrom(msg.sender, _rent.ownerOf(tokenId), price - fee);
            _rent.setUser(
                tokenId,
                msg.sender,
                block.timestamp + _rentalExpires[tokenId]
            );
    
            emit TokenRented(tokenId, msg.sender, price);
        }`);

    contractBody.push(`function getOrder(
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
        }`);

    if (is_updatable_fee) {
      contractBody.push(`function getPlatformFeePercentage() public view returns (uint256) {
                return _platformFeePercentage;
            }`);
      contractBody.push(`function setPlatformFeePercentage(
                uint256 newFeePercentage
            ) public onlyOwner {
                _platformFeePercentage = newFeePercentage;
            }`);
    }

    if (is_updatable_admin) {
      contractBody.push(`function getPlatformFeeAddress() public view returns (address) {
                return _platformFeeAddress;
            }`);
      contractBody.push(`function setPlatformFeeAddress(address newFeeAddress) public onlyOwner {
                _platformFeeAddress = newFeeAddress;
            }`);
    }

    contractBody = [...new Set(contractBody)].map(e => e.trim()).join('\n');

    const contractName = 'RentMarket';
    let contractBase = ``;
    if (is_updatable_fee || is_updatable_admin) {
      contractBase = `\ncontract ${contractName} is Ownable {
                ${initBody}
                constructor() {
                    _platformFeePercentage = ${fee_percentage};
                    _platformFeeAddress = ${admin_wallet};
                    _rent = RentToken(${token_address});
                    _token = MUC(0x4b137a387D2b4734013D6F78B4bC01aa25BD48bf);
                }
                ${contractBody}
            }`;
    } else {
      contractBase = `\ncontract ${contractName} {
                ${initBody}
                constructor() {
                    _platformFeePercentage = ${fee_percentage};
                    _platformFeeAddress = ${admin_wallet};
                    _rent = RentToken(${token_address});
                    _token = MUC(0x4b137a387D2b4734013D6F78B4bC01aa25BD48bf);
                }
                ${contractBody}
            }`;
    }

    const finalContract = topContract + importLibraries + contractBase;
    const { bytecode, nameUnique, abi } = await this.CompileContract(contractName, finalContract);

    return {
      bytecode: bytecode,
      name: contractName,
      uuid: nameUnique,
      abi,
    };
  }

  private async CompileContract(contractName: string, contractContent: string) {
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
}
