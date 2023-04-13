import { createStore, action } from "easy-peasy";
import StoreModel from "./model";

const store = createStore<StoreModel>({
  music: {
    currentSong: undefined,
    playMusic: action((state, payload) => {
      if (
        state.audio &&
        state.audio.audio.current &&
        state.currentSong &&
        state.currentSong.audio == payload.audio
      ) {
        if (state.isPlaying) {
          state.audio.audio.current.pause();
        } else {
          state.audio.audio.current.play();
        }
      } else state.currentSong = payload;
    }),
    audio: undefined,
    setAudio: action((state, payload) => {
      state.audio = payload;
    }),
    isPlaying: false,
    setIsPlaying: action((state, payload) => {
      state.isPlaying = payload;
    }),
    playList: [],
    addToPlayList: action((state, payload) => {
      state.playList.push(payload);
    }),
    removeFromPlayList: action((state, payload) => {
      state.playList = state.playList.filter(
        (item) => item.audio !== payload.audio
      );
    }),
    isShowPlayList: false,
    setIsShowPlayList: action((state, payload) => {
      state.isShowPlayList = payload;
    }),
  },
  user: {
    isLogin: false,
    setIsLogin: action((state, payload) => {
      state.isLogin = payload;
    }),
  },
  dao: {
    name: "KingDAOX",
    setName: action((state, payload) => {
      state.name = payload;
    }),
    address: "",
    setAddress: action((state, payload) => {
      state.address = payload;
    }),
    votingDelay: 1,
    setVotingDelay: action((state, payload) => {
      state.votingDelay = payload;
    }),
    votingPeriod: 3600,
    setVotingPeriod: action((state, payload) => {
      state.votingPeriod = payload;
    }),
    blockTime: 12,
    setBlockTime: action((state, payload) => {
      state.blockTime = payload;
    }),
    proposalThreshold: 0,
    setProposalThreshold: action((state, payload) => {
      state.proposalThreshold = payload;
    }),
    quorumType: "percent",
    setQuorumType: action((state, payload) => {
      state.quorumType = payload;
    }),
    quorumVotes: 4,
    setQuorumVotes: action((state, payload) => {
      state.quorumVotes = payload;
    }),
    tokenType: "ERC20Votes",
    setTokenType: action((state, payload) => {
      state.tokenType = payload;
    }),
    isCustomToken: false,
    setIsCustomToken: action((state, payload) => {
      state.isCustomToken = payload;
    }),
    tokenAddress: "",
    setTokenAddress: action((state, payload) => {
      state.tokenAddress = payload;
    }),
    isTimelock: false,
    setIsTimelock: action((state, payload) => {
      state.isTimelock = payload;
    }),
  },
  erc20: {
    name: "MaiDAOXToken",
    setName: action((state, payload) => {
      state.name = payload;
    }),
    address: "",
    setAddress: action((state, payload) => {
      state.address = payload;
    }),
    symbol: "MDX",
    setSymbol: action((state, payload) => {
      state.symbol = payload;
    }),
    preMint: 100,
    setPreMint: action((state, payload) => {
      state.preMint = payload;
    }),
    mintable: false,
    setMintable: action((state, payload) => {
      state.mintable = payload;
    }),
    burnable: false,
    setBurnable: action((state, payload) => {
      state.burnable = payload;
    }),
    pausable: false,
    setPausable: action((state, payload) => {
      state.pausable = payload;
    }),
    votes: false,
    setVotes: action((state, payload) => {
      state.votes = payload;
    }),
    accessControl: false,
    setAccessControl: action((state, payload) => {
      state.accessControl = payload;
    }),
  },
  erc721: {
    name: "MaiDAOXToken",
    setName: action((state, payload) => {
      state.name = payload;
    }),
    address: "",
    setAddress: action((state, payload) => {
      state.address = payload;
    }),
    symbol: "MDX",
    setSymbol: action((state, payload) => {
      state.symbol = payload;
    }),
    baseURI: "",
    setBaseURI: action((state, payload) => {
      state.baseURI = payload;
    }),
    mintable: false,
    setMintable: action((state, payload) => {
      state.mintable = payload;
    }),
    burnable: false,
    setBurnable: action((state, payload) => {
      state.burnable = payload;
    }),
    pausable: false,
    setPausable: action((state, payload) => {
      state.pausable = payload;
    }),
    uriStorage: false,
    setUriStorage: action((state, payload) => {
      state.uriStorage = payload;
    }),
    votes: false,
    setVotes: action((state, payload) => {
      state.votes = payload;
    }),
    accessControl: false,
    setAccessControl: action((state, payload) => {
      state.accessControl = payload;
    }),
  },
  timelock: {
    minDelay: 1,
    setMinDelay: action((state, payload) => {
      state.minDelay = payload;
    }),
    proposers: [],
    setProposers: action((state, payload) => {
      state.proposers = payload;
    }),
    executors: [],
    setExecutors: action((state, payload) => {
      state.executors = payload;
    }),
    admin: "",
    setAdmin: action((state, payload) => {
      state.admin = payload;
    }),
  },
});

export default store;
