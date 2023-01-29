interface ERC20Input {
  name: string;
  symbol: string;
  initial_supply: number;
  is_mintable: boolean;
  is_burnable: boolean;
  is_pausable: boolean;
}

export { ERC20Input };
