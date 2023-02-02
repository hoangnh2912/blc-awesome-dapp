import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { ERC20Input, ERC20Output, VerifyInput } from "./types";
type SuccessResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};
const BASE_URL = "http://localhost:3001";

const axios = new Axios({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: [(data) => JSON.parse(data)],
  transformRequest: [(data) => JSON.stringify(data)],
});

const AxiosPost = <O>(url: string, data?: any) => {
  return axios.post<SuccessResponse<O>, AxiosResponse<SuccessResponse<O>>>(
    url,
    data
  );
};

const AxiosGet = <O>(url: string, config?: AxiosRequestConfig) =>
  axios.get<SuccessResponse<O>, AxiosResponse<SuccessResponse<O>>>(url, config);

const ApiServices = {
  tokenCreator: {
    erc20: (payload: ERC20Input) =>
      AxiosPost<ERC20Output>("/token-creator/erc20", payload),
    verify: (payload: VerifyInput) =>
      AxiosPost<boolean>("/token-creator/verify-contract", payload),
  },
};

export default ApiServices;
