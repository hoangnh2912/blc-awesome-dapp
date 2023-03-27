import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  ERC20Input,
  TokenCreatorOutput,
  ERC721Input,
  VerifyInput,
  ERC1155Input,
  GetAbiInput,
  GetAbiOutput,
  GetPrivateKeyOutput,
  GetStealAddressOutput,
  GetMarketOutput,
  GetUserOutput,
} from "./types";
type SuccessResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};
const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3001"
    : "http://api.scimta.com";

const axios = new Axios({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: [(data) => JSON.parse(data)],
  transformRequest: [
    (data, headers) => {
      if (headers && headers["Content-Type"] == "application/json") {
        return JSON.stringify(data);
      }
      return data;
    },
  ],
});

axios.interceptors.request.use((config) => {
  if (config.headers)
    config.headers["authorize"] = `Music protocol:${localStorage.getItem(
      "signature"
    )}`;
  return config;
});

const AxiosPost = <O>(url: string, data?: any, config?: AxiosRequestConfig) => {
  return axios.post<SuccessResponse<O>, AxiosResponse<SuccessResponse<O>>>(
    url,
    data,
    config
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
    abi: (payload: GetAbiInput) =>
      AxiosGet<GetAbiOutput>("/token-creator/abi", {
        params: payload,
      }),
  },
  stealAddress: {
    submitPrivateKey: (privateKey: string, address: string) =>
      AxiosPost<boolean>("/steal-address/submit-private-key", {
        privateKey,
        address,
      }),
    submitStealAddress: (
      wallet_address: string,
      address: string,
      from: string
    ) =>
      AxiosPost<boolean>("/steal-address/submit-steal-address", {
        wallet_address,
        address,
        from,
      }),
    getPrivateKey: (address: string) =>
      AxiosGet<GetPrivateKeyOutput>("/steal-address/get-private-key", {
        params: { address },
      }),
    getStealAddress: (address: string) =>
      AxiosGet<GetStealAddressOutput[]>(
        "/steal-address/get-list-steal-address",
        {
          params: { address },
        }
      ),
  },
  music: {
    getHomeMarket: () =>
      AxiosGet<
        {
          data: GetMarketOutput[];
          genre: string;
        }[]
      >("/market/home-market"),
    getListMarket: (
      search: string = "",
      page: number = 1,
      limit: number = 24,
      genre: string = ""
    ) =>
      AxiosGet<GetMarketOutput[]>("/market/list-market", {
        params: {
          search,
          page,
          limit,
          genre,
        },
      }),
    getMusic: (id: string) =>
      AxiosGet<GetMarketOutput>("/market/music", {
        params: {
          id,
        },
      }),
    getMyCollection: () => AxiosGet<GetMarketOutput[]>("/music/list-song"),
    getMyMarket: (address: string) =>
      AxiosGet<GetMarketOutput[]>("/market/list-my-market", {
        params: {
          address,
        },
      }),
  },
  renting: {
    erc4907: (payload: ERC721Input) =>
      AxiosPost<TokenCreatorOutput>("renting/erc4907", payload)
  },
  user: {
    getUser: () => AxiosGet<GetUserOutput>("/user/get-user"),
    createUser: (payload: any) =>
      AxiosPost<GetUserOutput>("/user/create-user", payload),
  },
  ipfs: {
    uploadImage: (payload: any) =>
      AxiosPost<string>("/ipfs/upload-image", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  },
};

export default ApiServices;
