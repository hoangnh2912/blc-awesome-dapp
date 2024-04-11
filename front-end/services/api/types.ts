import { ContractInterface } from "ethers";
interface ERC20Input {
  name: string;
  symbol: string;
  initial_supply: number;
  is_mintable: boolean;
  is_burnable: boolean;
  is_pausable: boolean;
}
interface ERC721Input {
  name: string;
  symbol: string;
  baseURI: string;
  is_mintable: boolean;
  is_burnable: boolean;
  is_pausable: boolean;
  is_uri_storage: boolean;
}
interface ERC1155Input {
  name: string;
  uri: string;
  is_mintable: boolean;
  is_burnable: boolean;
  is_pausable: boolean;
  is_updatable_uri: boolean;
}
interface TokenCreatorOutput {
  bytecode: string;
  name: string;
  uuid: string;
  abi: ContractInterface;
}
interface VerifyInput {
  uuid: string;
  name: string;
  address: string;
}
interface GetAbiInput {
  address: string;
}

interface GetAbiOutput {
}

interface SubmitPrivateKeyInput {
  privateKey: string;
  address: string;
}
interface GetPrivateKeyInput {
  address: string;
}

interface GetPrivateKeyOutput {
  privateKey: string;
}

interface GetStealthAddressOutput {
  address: string;
  from: string;
}

interface GetUserOutput {
  wallet_address: string;
  name: string;
  avatar: string;
  description: string;
  private_key: string;
  stealth_address: {
    address: string;
    from: string;
  }[];
  ids: string[];
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

interface GetPlaylistOutput {
  _id: string;
  name: string;
  description: string;
  audios: GetMarketOutput[];
  image: string;
  owner: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

interface PlaylistInput {
  id?: string;
  name: string;
  description?: string;
  audios?: string[];
  image?: string;
}

interface GetTopMarketOutput {
  most_sold: {
    _id: string;
    count: number;
    data: GetMarketOutput;
  }[];
  most_viewed: GetMarketOutput[];
  most_played: GetMarketOutput[];
}

interface GetHomeMarketOutput {
  data: GetMarketOutput[];
  genre: string;
}

interface GetMarketOutput {
  name: string;
  amount: string;
  price: string;
  description: string;
  id: string;
  left: string;
  audio: string;
  image: string;
  singer: string;
  seller: string;
  owners: {
    wallet_address: string;
  }[];
  attributes: {
    trait_type: string;
    value: string;
  }[];
  history: {
    from: string;
    to: string;
    created_at: Date;
    transaction_hash: string;
    event: string;
  }[];
  duration: number;
  bitrate: number;
  play_count: number;
  view_count: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
interface RentMarketInput {
  fee_percentage: string;
  admin_wallet: string;
  token_address: string;
  is_updatable_fee: boolean;
  is_updatable_admin: boolean;
}

export type {
  ERC20Input,
  TokenCreatorOutput,
  VerifyInput,
  ERC721Input,
  ERC1155Input,
  GetAbiInput,
  GetAbiOutput,
  SubmitPrivateKeyInput,
  GetPrivateKeyInput,
  GetPrivateKeyOutput,
  GetStealthAddressOutput,
  GetMarketOutput,
  GetUserOutput,
  RentMarketInput,
  GetPlaylistOutput,
  PlaylistInput,
  GetTopMarketOutput,
  GetHomeMarketOutput,
};
