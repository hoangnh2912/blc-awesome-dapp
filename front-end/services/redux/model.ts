import { Action, Thunk } from "easy-peasy";
import { GetUserOutput } from "../api/types";
import { Chain } from "@thirdweb-dev/chains";

interface User {
  data: GetUserOutput | undefined;
  setData: Action<User, GetUserOutput | undefined>;
  getData: Thunk<User, string>;
  isCheckConnectData: {
    isCheckConnect: boolean;
    callback?: (...args: any) => any;
    args?: any;
  };
  setIsCheckConnect: Action<
    User,
    {
      isCheckConnect: boolean;
      callback?: (...args: any) => any;
      args?: any;
    }
  >;
  clearState: Action<User>;
}

interface HistoryBet {
  nft_id: number;
  nft_contract: string;
  total_bet: number;
  awards: Array<{
    wallet_address: string;
    amount: number;
  }>;
  number_of_bets: number;
  number_of_winners: number;
  at_block: number;
  at: number;
}

interface Bet {
  usdt: number;
  nftTokenId: number;
  setUsdt: Action<Bet, number>;
  setNftTokenId: Action<Bet, number>;
  betResult: number;
  setBetResult: Action<Bet, number>;
  betSession: Array<{
    nftTokenId: number;
    usdt: number;
  }>;
  addBetSession: Action<Bet, { nftTokenId: number; usdt: number }>;
  clearBetState: Action<Bet>;
  walletUsdtBalance: number;
  setWalletUsdtBalance: Action<Bet, number>;
  accumulatedUsdt: number;
  setAccumulatedUsdt: Action<Bet, number>;
  historyBet: Array<HistoryBet>;
  addHistoryBet: Action<Bet, HistoryBet>;
}

interface AppState {
  currentBlockNumber: number;
  nextBetBlock: number;
  setNextBetBlock: Action<AppState, number>;
  subscriptionWatcher: () => void;
  setSubscriptionWatcher: Action<AppState, () => void>;
  setCurrentBlockNumber: Action<AppState, number>;
  startWatchBlockNumber: Thunk<AppState, Chain>;
  stopWatchBlockNumber: Action<AppState>;
}

interface StoreModel {
  user: User;
  bet: Bet;
  app: AppState;
}

export default StoreModel;
