// import { AbiItem } from 'web3-utils';

interface ERC4907Input {
    name: string;
    symbol: string;
    baseURI: string;
    is_burnable: boolean;
    is_mintable: boolean;
    is_pausable: boolean;
    is_uri_storage: boolean;
}
interface TokenCreatorOutput {
    bytecode: string;
    name: string;
    uuid: string;
    abi: any;
}
interface VerifyInput {
    uuid: string;
    name: string;
    address: string;
}
interface GetAbiInput {
    address: string;
}

export { ERC4907Input, TokenCreatorOutput, VerifyInput, GetAbiInput };
