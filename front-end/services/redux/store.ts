import { action, createStore, thunk } from "easy-peasy";
import ApiServices from "../api";
import StoreModel from "./model";
import { watchBlockNumber } from "@thirdweb-dev/sdk";
import { debounce } from "lodash";

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
    usdt: 10,
    walletUsdtBalance: 0,
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
    betSession: [],
    clearBetState: action((state) => {
      state.usdt = 10;
      state.betResult = -1;
      state.betSession = [];
    }),
    addBetSession: action((state, payload) => {
      if (
        state.betSession.find((item) => item.nftTokenId === payload.nftTokenId)
      ) {
        state.betSession = state.betSession.map((item) => {
          if (item.nftTokenId === payload.nftTokenId) {
            item.usdt += payload.usdt;
          }
          return item;
        });
      } else {
        state.betSession.push(payload);
      }
    }),
    setWalletUsdtBalance: action((state, payload) => {
      state.walletUsdtBalance = payload;
    }),
    accumulatedUsdt: 0,
    setAccumulatedUsdt: action((state, payload) => {
      state.accumulatedUsdt = payload;
    }),
    addHistoryBet: action((state, payload) => {
      state.historyBet.unshift(payload);
    }),
    historyBet: [],
  },
  app: {
    currentBlockNumber: 0,
    nextBetBlock: 0,
    subscriptionWatcher: () => {},
    setCurrentBlockNumber: action((state, payload) => {
      state.currentBlockNumber = payload;
    }),
    startWatchBlockNumber: thunk((actions, payload) => {
      actions.setSubscriptionWatcher(
        watchBlockNumber({
          network: payload,
          onBlockNumber: debounce(actions.setCurrentBlockNumber, 500),
        })
      );
    }),
    setSubscriptionWatcher: action((state, payload) => {
      state.subscriptionWatcher = payload;
    }),
    stopWatchBlockNumber: action((state) => {
      state.subscriptionWatcher();
    }),
    setNextBetBlock: action((state, payload) => {
      state.nextBetBlock = payload;
    }),
  },
});

export default store;
