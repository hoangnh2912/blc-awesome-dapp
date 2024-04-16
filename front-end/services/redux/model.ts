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

interface Bet {
  usdt: number;
  nftTokenId: number;
  setUsdt: Action<Bet, number>;
  setNftTokenId: Action<Bet, number>;
  betResult: number
  setBetResult: Action<Bet, number>
}

interface AppState {
  currentBlockNumber: number;
  setCurrentBlockNumber: Action<AppState, number>;
  startWatchBlockNumber: Thunk<AppState, Chain>;
}

interface StoreModel {
  user: User;
  bet: Bet;
  app: AppState;
}

export default StoreModel;
