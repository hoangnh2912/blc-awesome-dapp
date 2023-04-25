interface ERC4907Input {
  name: string;
  symbol: string;
  baseURI: string;
  is_burnable: boolean;
  is_mintable: boolean;
  is_pausable: boolean;
  is_uri_storage: boolean;
}
interface RentMarketInput {
  fee_percentage: string;
  admin_wallet: string;
  token_address: string;
  is_updatable_fee: boolean;
  is_updatable_admin: boolean;
}
interface ContractCreatorOutput {
  bytecode: string;
  name: string;
  uuid: string;
  abi: any;
}

export { ERC4907Input, RentMarketInput, ContractCreatorOutput };
