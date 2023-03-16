import { Constant, logger, uuid } from '@constants';
import { AxiosGet, compile, verify } from '@providers';
import fs from 'fs';
import { GetAbiInput, ERC1155Input, ERC20Input, ERC721Input, VerifyInput } from './token-creator';

export class TokenCreatorService {
  async erc20({
    name,
    initial_supply,
    is_burnable,
    is_mintable,
    is_pausable,
    symbol,
    is_vote,
  }: ERC20Input) {
    const topContract = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.9;\n`;

    let importLibraries: Array<string> | string = [`@openzeppelin/contracts/token/ERC20/ERC20.sol`];
    if (is_vote) {
      importLibraries.push(`@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol`);
      importLibraries.push(`@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol`);
      is_burnable = false;
      is_mintable = false;
      is_pausable = false;
    }
    if (is_burnable) {
      importLibraries.push(`@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol`);
    }
    if (is_pausable) {
      importLibraries.push(`@openzeppelin/contracts/security/Pausable.sol`);
      importLibraries.push(`@openzeppelin/contracts/access/Ownable.sol`);
    }
    if (is_mintable) {
      importLibraries.push(`@openzeppelin/contracts/access/Ownable.sol`);
    }

    importLibraries = [...new Set(importLibraries)].map(e => `import "${e}";`).join('\n');

    let constructorContent = ``;
    let extendedConstructorContent = ``;

    if (initial_supply) {
      constructorContent += `_mint(msg.sender, ${initial_supply} * 10 ** decimals());`;
    }

    let contractBody: Array<string> | string = [];

    if (is_mintable) {
      contractBody.push(`function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }`);
    }

    if (is_pausable) {
      contractBody.push(`function pause() public onlyOwner {
        _pause();
    }`);
      contractBody.push(`function unpause() public onlyOwner {
        _unpause();
    }`);
      contractBody.push(`function _beforeTokenTransfer(address from, address to, uint256 amount)
      internal
      whenNotPaused
      override
  {
      super._beforeTokenTransfer(from, to, amount);
  }`);
    }

    if (is_vote) {
      contractBody.push(`// The functions below are overrides required by Solidity.`);

      contractBody.push(`function _afterTokenTransfer(address from, address to, uint256 amount)
          internal
          override(ERC20, ERC20Votes)
      {
          super._afterTokenTransfer(from, to, amount);
      }`);

      contractBody.push(`function _mint(address to, uint256 amount)
          internal
          override(ERC20, ERC20Votes)
      {
          super._mint(to, amount);
      }`);

      contractBody.push(`function _burn(address account, uint256 amount)
          internal
          override(ERC20, ERC20Votes)
      {
          super._burn(account, amount);
      }`);
    }

    contractBody = [...new Set(contractBody)].map(e => e.trim()).join('\n');

    let extendContract: Array<string> | string = ['ERC20'];
    if (is_burnable) extendContract.push('ERC20Burnable');
    if (is_pausable) {
      extendContract.push('Pausable');
      extendContract.push('Ownable');
    }
    if (is_mintable) extendContract.push('Ownable');
    if (is_vote) {
      extendContract.push('ERC20Permit');
      extendContract.push('ERC20Votes');
    }

    extendContract = [...new Set(extendContract)].join(', ');

    let extendedOveride: Array<string> | string = [];
    if (is_vote) {
      extendedOveride.push(`ERC20Permit("${name.trim()}")`);
    }

    extendedConstructorContent = [...new Set(extendedOveride)].join(', ');

    const contractName = name
      .trim()
      .split(' ')
      .map(e => e.charAt(0).toUpperCase() + e.slice(1))
      .join('');

    let contractBase = `\ncontract ${contractName} is ${extendContract} {
        constructor() ERC20("${name.trim()}", "${symbol.trim()}") ${extendedConstructorContent} {
            ${constructorContent}
        }
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

  async erc721({
    name,
    baseURI,
    is_burnable,
    is_mintable,
    is_pausable,
    symbol,
    is_uri_storage,
    is_vote,
  }: ERC721Input) {
    const topContract = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.9;\n`;
    let importLibraries: Array<string> | string = [
      `@openzeppelin/contracts/token/ERC721/ERC721.sol`,
    ];

    if (is_vote) {
      importLibraries.push(`@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol`);
      importLibraries.push(`@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol`);
      is_burnable = false;
      is_mintable = false;
      is_pausable = false;
    }

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
      contractBody.push(`    function _baseURI() internal pure override returns (string memory) {
        return "${baseURI}";
    }`);
    }

    if (is_mintable) {
      if (is_uri_storage)
        contractBody.push(`    function safeMint(address to, uint256 tokenId, string memory uri)
      public
      onlyOwner
  {
      _safeMint(to, tokenId);
      _setTokenURI(tokenId, uri);
  }`);
      else
        contractBody.push(`    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }`);
    }

    if (is_pausable) {
      contractBody.push(`    function pause() public onlyOwner {
        _pause();
    }`);
      contractBody.push(`    function unpause() public onlyOwner {
        _unpause();
    }`);
      contractBody.push(`    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
      internal
      whenNotPaused
      override
  {
      super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }
`);
    }

    if (is_uri_storage) {
      contractBody.push(`    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }`);
      contractBody.push(`    function tokenURI(uint256 tokenId)
      public
      view
      override(ERC721, ERC721URIStorage)
      returns (string memory)
  {
      return super.tokenURI(tokenId);
  }`);
    }

    if (is_vote) {
      contractBody.push(`function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
          internal
          override(ERC721, ERC721Votes)
      {
          super._afterTokenTransfer(from, to, tokenId, batchSize);
      }`);
    }

    contractBody = [...new Set(contractBody)].map(e => e.trim()).join('\n');

    let extendContract: Array<string> | string = ['ERC721'];
    if (is_uri_storage) extendContract.push('ERC721URIStorage');
    if (is_pausable) {
      extendContract.push('Pausable');
      extendContract.push('Ownable');
    }
    if (is_mintable) extendContract.push('Ownable');
    if (is_burnable) extendContract.push('ERC721Burnable');
    if (is_vote) {
      extendContract.push('EIP712');
      extendContract.push('ERC721Votes');
    }
    extendContract = [...new Set(extendContract)].join(', ');

    let extendedConstructorContent = ``;
    let extendedOveride: Array<string> | string = [];

    //TODO: dynamic version EIP712
    if (is_vote) {
      extendedOveride.push(`EIP712("${name.trim()}", "1")`);
    }

    extendedConstructorContent = [...new Set(extendedOveride)].join(', ');

    const contractName = name
      .trim()
      .split(' ')
      .map(e => e.charAt(0).toUpperCase() + e.slice(1))
      .join('');

    let contractBase = `\ncontract ${contractName} is ${extendContract} {
        constructor() ERC721("${name.trim()}", "${symbol.trim()}") ${extendedConstructorContent} {}
        ${contractBody}
    }`;
    const finalContract = topContract + importLibraries + contractBase;

    console.log(finalContract);

    const { bytecode, nameUnique, abi } = await this.compileContract(contractName, finalContract);

    return {
      bytecode: bytecode,
      name: contractName,
      uuid: nameUnique,
      abi,
    };
  }
  async erc1155({
    name,
    uri,
    is_burnable,
    is_mintable,
    is_pausable,
    is_updatable_uri,
  }: ERC1155Input) {
    const topContract = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.9;\n`;
    let importLibraries: Array<string> | string = [
      `@openzeppelin/contracts/token/ERC1155/ERC1155.sol`,
    ];

    if (is_updatable_uri) importLibraries.push(`@openzeppelin/contracts/access/Ownable.sol`);

    if (is_pausable) {
      importLibraries.push(`@openzeppelin/contracts/security/Pausable.sol`);
      importLibraries.push(`@openzeppelin/contracts/access/Ownable.sol`);
    }
    if (is_mintable) {
      importLibraries.push(`@openzeppelin/contracts/access/Ownable.sol`);
    }
    if (is_burnable) {
      importLibraries.push(`@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol`);
    }
    importLibraries = [...new Set(importLibraries)].map(e => `import "${e}";`).join('\n');

    let contractBody: Array<string> | string = [];

    if (is_updatable_uri) {
      contractBody.push(`    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }`);
    }

    if (is_mintable) {
      contractBody.push(`    function mint(address account, uint256 id, uint256 amount, bytes memory data)
      public
      onlyOwner
  {
      _mint(account, id, amount, data);
  }`);
      contractBody.push(`    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
  public
  onlyOwner
{
  _mintBatch(to, ids, amounts, data);
}`);
    }

    if (is_pausable) {
      contractBody.push(`    function pause() public onlyOwner {
        _pause();
    }`);
      contractBody.push(`    function unpause() public onlyOwner {
        _unpause();
    }`);
      contractBody.push(`    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
      internal
      whenNotPaused
      override
  {
      super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }`);
    }

    contractBody = [...new Set(contractBody)].map(e => e.trim()).join('\n');

    let extendContract: Array<string> | string = ['ERC1155'];
    if (is_pausable) {
      extendContract.push('Ownable');
      extendContract.push('Pausable');
    }
    if (is_mintable) extendContract.push('Ownable');
    if (is_burnable) extendContract.push('ERC1155Burnable');
    extendContract = [...new Set(extendContract)].join(', ');

    const contractName = name
      .trim()
      .split(' ')
      .map(e => e.charAt(0).toUpperCase() + e.slice(1))
      .join('');

    let contractBase = `\ncontract ${contractName} is ${extendContract} {
        constructor() ERC1155("${uri.trim()}") {}
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
  async compileContract(contractName: string, contractContent: string) {
    const nameUnique = uuid();
    fs.mkdirSync(`${Constant.ROOT_PATH}/contracts`, { recursive: true });
    fs.writeFileSync(`${Constant.ROOT_PATH}/contracts/${nameUnique}.sol`, contractContent, 'utf8');
    try {
      await compile();
    } catch (e) {
      logger.error(e);
      logger.info('Cleaning contract and recompile...');
      fs.readdir(`${Constant.ROOT_PATH}/contracts/`, function (err, files) {
        //handling error
        if (err) {
          return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
          // Do whatever you want to do with the file
          logger.info(file);
          try {
            fs.unlinkSync(`${Constant.ROOT_PATH}/contracts/` + file);
            //file removed
          } catch (err) {
            logger.error(err);
          }
        });
      });
    }

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
