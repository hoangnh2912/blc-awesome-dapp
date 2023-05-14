import { ContractInterface } from "ethers";
import { AbiItem } from "web3-utils";
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

export type {
  GetMarketOutput,
  GetUserOutput,
  GetPlaylistOutput,
  PlaylistInput,
  GetTopMarketOutput,
  GetHomeMarketOutput,
};
