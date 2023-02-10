import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  ERC20Input,
  TokenCreatorOutput,
  ERC721Input,
  VerifyInput,
  ERC1155Input,
} from "./types";
type SuccessResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};
const BASE_URL = "http://api.scimta.com";

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
      AxiosPost<TokenCreatorOutput>("/token-creator/erc20", payload),
    erc721: (payload: ERC721Input) =>
      AxiosPost<TokenCreatorOutput>("/token-creator/erc721", payload),
    erc1155: (payload: ERC1155Input) =>
      AxiosPost<TokenCreatorOutput>("/token-creator/erc1155", payload),
    verify: (payload: VerifyInput) =>
      AxiosPost<boolean>("/token-creator/verify-contract", payload),
  },
};

export default ApiServices;
