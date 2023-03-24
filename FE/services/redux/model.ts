import { Action } from "easy-peasy";
import AudioPlayer from "react-h5-audio-player";
import { GetMarketOutput } from "../api/types";

interface Music {
  currentSong: GetMarketOutput | undefined;
  isPlaying: boolean;
  playMusic: Action<Music, GetMarketOutput>;
  audio: AudioPlayer | undefined;
  setAudio: Action<Music, AudioPlayer>;
  setIsPlaying: Action<Music, boolean>;
  playList: GetMarketOutput[];
  addToPlayList: Action<Music, GetMarketOutput>;
  removeFromPlayList: Action<Music, GetMarketOutput>;
  isShowPlayList: boolean;
  setIsShowPlayList: Action<Music, boolean>;
}

interface User {
  isLogin: boolean;
  setIsLogin: Action<User, boolean>;
}

interface DAO {
  name: string;
  setName: Action<DAO, string>;
  address: string;
  setAddress: Action<DAO, string>;
  votingDelay: number;
  setVotingDelay: Action<DAO, number>;
  votingPeriod: number;
  setVotingPeriod: Action<DAO, number>;
  blockTime: number;
  setBlockTime: Action<DAO, number>;
  proposalThreshold: number;
  setProposalThreshold: Action<DAO, number>;
  quorumType: string;
  setQuorumType: Action<DAO, string>;
  quorumVotes: number;
  setQuorumVotes: Action<DAO, number>;
  tokenType: string;
  setTokenType: Action<DAO, string>;
}

interface ERC20 {
  name: string;
  setName: Action<ERC20, string>;
  address: string;
  setAddress: Action<ERC20, string>;
  symbol: string;
  setSymbol: Action<ERC20, string>;
  preMint: number;
  setPreMint: Action<ERC20, number>;
  mintable: boolean;
  setMintable: Action<ERC20, boolean>;
  burnable: boolean;
  setBurnable: Action<ERC20, boolean>;
  pausable: boolean;
  setPausable: Action<ERC20, boolean>;
  votes: boolean;
  setVotes: Action<ERC20, boolean>;
  accessControl: boolean;
  setAccessControl: Action<ERC20, boolean>;
}

interface ERC721 {
  name: string;
  setName: Action<ERC721, string>;
  address: string;
  setAddress: Action<ERC721, string>;
  symbol: string;
  setSymbol: Action<ERC721, string>;
  baseURI: string;
  setBaseURI: Action<ERC721, string>;
  mintable: boolean;
  setMintable: Action<ERC721, boolean>;
  burnable: boolean;
  setBurnable: Action<ERC721, boolean>;
  pausable: boolean;
  setPausable: Action<ERC721, boolean>;
  uriStorage: boolean;
  setUriStorage: Action<ERC721, boolean>;
  votes: boolean;
  setVotes: Action<ERC721, boolean>;
  accessControl: boolean;
  setAccessControl: Action<ERC721, boolean>;
}

interface Timelock {
  minDelay: number;
  setMinDelay: Action<Timelock, number>;
  proposers: string[];
  setProposers: Action<Timelock, string[]>;
  executors: string[];
  setExecutors: Action<Timelock, string[]>;
  admin: string;
  setAdmin: Action<Timelock, string>;
}

interface StoreModel {
  music: Music;
  user: User;
  dao: DAO;
  erc20: ERC20;
  erc721: ERC721;
  timelock: Timelock;
}

export type { Music, DAO, ERC20, ERC721, Timelock };

export default StoreModel;
