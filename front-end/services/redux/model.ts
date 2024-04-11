import { Action, Thunk } from "easy-peasy";
import { GetUserOutput } from "../api/types";

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

interface StoreModel {
  user: User;
}

export default StoreModel;
