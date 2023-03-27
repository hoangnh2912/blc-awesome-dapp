import { ContractInterface } from "ethers";
import { AbiItem } from "web3-utils";
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
  abi: AbiItem[];
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

interface GetStealAddressOutput {
  address: string;
  from: string;
}

interface GetUserOutput {
  wallet_address: string;
  name: string;
  avatar: string;
  description: string;
  private_key: string;
  steal_address: {
    address: string;
    from: string;
  }[];
  ids: string[];
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
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
  duration: number;
  bitrate: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

interface GetRoomInfo {
  _id: string;
  name: string;
  avatar: string;
  description: string;
  users: [string];
  hidden: [string];
  cid: string;
  user_read: [
    {
      user: {
        wallet_address: string;
      };
      message_id: string;
      at: Date;
      unread_count: number;
    }
  ];
  user_receive: [
    {
      user: {
        wallet_address: string;
      };
      message_id: string;
      at: Date;
      unread_count: number;
    }
  ];
  created_at: Date;
  creator: string;
  both_init: true;
  only_view: true;
  admins: [string];
  sub_admins: [string];
  nft_contracts: [
    {
      chain_id: string;
      address: string;
      contract_name: string;
    }
  ];
  shared_key: string;
  updated_at: Date;
  deleted_at: Date;
  room_type: string;
  last_message: {
    message_data: string;
    at: Date;
    shared_key: string;
  };
  is_disable: [string];
}

interface GetChatUserOutput {
  wallet_address: string;
  active_points: number;
  avatar: string;
  created_at: Date;
  description: string;
  dmtp: string;
  friend_requests: [string];
  friends: [string];
  is_stake_eth: false;
  name: string;
  session: [string];
  stickers: [string];
  updated_at: Date;
  wallet_score: number;
  link_addresses: [string];
  invitation_url: string;
  api_key: string;
  stdmtp: string;
  matic: string;
  is_minter: boolean;
}

interface GetMessageOutput {
  _id: string;
  room_id: string;
  sender_user: {
    avatar: string;
    wallet_address: string;
    name: string;
  };
  message_data: string;
  is_forwarded: boolean;
  created_at: Date;
  message_status: string;
  is_notification: boolean;
  reaction: [
    {
      emoji: string;
      users: [
        {
          wallet_address: string;
        }
      ];
      at: Date;
    }
  ];
  cid: string;
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
  GetStealAddressOutput,
  GetMarketOutput,
  GetUserOutput,
  GetRoomInfo,
  GetChatUserOutput,
  GetMessageOutput,
};
