interface ERC20Input {
  name: string;
  symbol: string;
  initial_supply: number;
  is_mintable: boolean;
  is_burnable: boolean;
  is_pausable: boolean;
}
interface ERC20Output {
  bytecode: string;
  name: string;
  uuid: string;
}
interface VerifyInput {
  uuid: string;
  name: string;
  address: string;
}

export { ERC20Input, ERC20Output, VerifyInput };
