import { ERC20Input, VerifyInput } from './token-creator';
import { Constant, logger, uuid } from '@constants';
import fs from 'fs';
import { compile, verify } from '@providers';

export class TokenCreatorService {
  async erc20({ name, initial_supply, is_burnable, is_mintable, is_pausable, symbol }: ERC20Input) {
    logger.info(is_burnable);
    logger.info(is_mintable);
    logger.info(is_pausable);
    const topContract = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.9;\n`;

    let importLibraries: Array<string> | string = [`@openzeppelin/contracts/token/ERC20/ERC20.sol`];
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

    contractBody = [...new Set(contractBody)].map(e => e.trim()).join('\n');

    let extendContract: Array<string> | string = ['ERC20'];
    if (is_burnable) extendContract.push('ERC20Burnable');
    if (is_pausable) {
      extendContract.push('Pausable');
      extendContract.push('Ownable');
    }
    if (is_mintable) extendContract.push('Ownable');

    extendContract = [...new Set(extendContract)].join(', ');

    const contractName = name
      .trim()
      .split(' ')
      .map(e => e.charAt(0).toUpperCase() + e.slice(1))
      .join('');

    let contractBase = `\ncontract ${contractName} is ${extendContract} {
        constructor() ERC20("${name.trim()}", "${symbol.trim()}") {
            ${constructorContent}
        }
        ${contractBody}
    }`;
    const finalContract = topContract + importLibraries + contractBase;
    const nameUnique = uuid();
    fs.writeFileSync(`${Constant.ROOT_PATH}/contracts/${nameUnique}.sol`, finalContract, 'utf8');
    await compile();
    const jsonCompiled = JSON.parse(
      fs.readFileSync(
        `${Constant.ROOT_PATH}/artifacts/contracts/${nameUnique}.sol/${contractName}.json`,
        'utf8',
      ),
    );

    return {
      bytecode: jsonCompiled.bytecode,
      name: contractName,
      uuid: nameUnique,
    };
  }

  async verifyContract(payload: VerifyInput) {
    const isSuccess = await verify(payload.uuid, payload.name, payload.address);
    fs.unlinkSync(`${Constant.ROOT_PATH}/contracts/${payload.uuid}.sol`);
    fs.rmSync(`${Constant.ROOT_PATH}/artifacts/contracts/${payload.uuid}.sol`, {
      recursive: true,
      force: true,
    });
    fs.rmSync(`${Constant.ROOT_PATH}/cache`, {
      recursive: true,
      force: true,
    });
    return isSuccess;
  }
}
