import { action, createStore, thunk } from "easy-peasy";
import ApiServices from "../api";
import StoreModel from "./model";
import { watchBlockNumber } from "@thirdweb-dev/sdk";

const store = createStore<StoreModel>({
  user: {
    data: undefined,
    setData: action((state, payload) => {
      state.data = payload;
    }),
    getData: thunk(async (actions, payload) => {
      try {
        const response = await ApiServices.user.getUser(payload);
        actions.setData(response.data.data);
      } catch (error: any) {
        console.error(`[Thunk][User][getUser] ${error.message}`);
      }
    }),
    isCheckConnectData: {
      isCheckConnect: false,
    },
    setIsCheckConnect: action((state, payload) => {
      state.isCheckConnectData = payload;
    }),
    clearState: action((state) => {
      state.data = undefined;
      state.isCheckConnectData = {
        isCheckConnect: false,
      };
    }),
  },
  bet: {
    usdt: 5,
    nftTokenId: -1,
    setUsdt: action((state, payload) => {
      state.usdt = payload;
    }),
    setNftTokenId: action((state, payload) => {
      state.nftTokenId = payload;
    }),
    betResult: -1,
    setBetResult: action((state, payload) => {
      state.betResult = payload;
    }),
  },
  app: {
    currentBlockNumber: 0,
    setCurrentBlockNumber: action((state, payload) => {
      state.currentBlockNumber = payload;
    }),
    startWatchBlockNumber: thunk((actions, payload) => {
      watchBlockNumber({
        network: payload,
        onBlockNumber: actions.setCurrentBlockNumber,
      });
    }),
  },
});

export default store;
