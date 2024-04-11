import { action, createStore, thunk } from "easy-peasy";
import ApiServices from "../api";
import StoreModel from "./model";

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
});

export default store;
