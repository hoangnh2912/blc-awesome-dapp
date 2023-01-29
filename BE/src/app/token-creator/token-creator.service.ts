import { ERC20Input } from './token-creator';
// import { format as prettyFormat } from 'pretty-format'; // ES2015 modules
import { logger } from '@constants';

export class TokenCreatorService {
  async erc20({ name, initial_supply, is_burnable, is_mintable, is_pausable, symbol }: ERC20Input) {
    logger.info(is_burnable);
    logger.info(is_mintable);
    logger.info(is_pausable);
    const topContract = `// SPDX-License-Identifier: MIT
      pragma solidity ^0.8.9;
      `;

    const importLibraries = `import "@openzeppelin/contracts/token/ERC20/ERC20.sol";`;

    let constructorContent = ``;

    if (initial_supply) {
      constructorContent += `_mint(msg.sender, ${initial_supply} * 10 ** decimals());`;
    }

    const contractBase = ` contract ${name
      .split(' ')
      .map(e => e.charAt(0).toUpperCase() + e.slice(1))
      .join('')} is ERC20 {
        constructor() ERC20("${name}", "${symbol}") {
            ${constructorContent}
        }
    }`;
    const finalContract = topContract + importLibraries + contractBase;
    return finalContract;
  }
}
