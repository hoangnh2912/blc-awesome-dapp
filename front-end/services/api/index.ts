import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  GetHomeMarketOutput,
  GetMarketOutput,
  GetPlaylistOutput,
  GetTopMarketOutput,
  GetUserOutput,
  PlaylistInput,
} from "./types";
type SuccessResponse<T> = {
  data: T;
  message: string;
  success: boolean;
  total: number;
};
const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3001"
    : "https://api.scimta.com";

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
  if (config.headers) {
    try {
      config.headers["authorize"] = `Music protocol:${localStorage.getItem(
        "signature"
      )}`;
    } catch (error: any) {}
  }
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
  music: {
    getHomeMarket: () => AxiosGet<GetHomeMarketOutput[]>("/market/home-market"),
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
    getMyCollection: (
      page: number = 1,
      limit: number = 24,
      search: string = ""
    ) =>
      AxiosGet<GetMarketOutput[]>("/music/list-song", {
        params: {
          page,
          limit,
          search,
        },
      }),
    getMyMarket: (address: string, page: number = 1, limit: number = 24) =>
      AxiosGet<GetMarketOutput[]>("/market/list-my-market", {
        params: {
          address,
          page,
          limit,
        },
      }),
    getNextId: () => AxiosGet<number>("/market/next-id"),
    getTopMarket: () => AxiosGet<GetTopMarketOutput>("/market/top-market"),
    viewMusic: (id: string) =>
      AxiosPost<boolean>("/music/view-song", {
        id,
      }),
    playMusic: (id: string) =>
      AxiosPost<boolean>("/music/play-song", {
        id,
      }),
  },
  user: {
    getUser: (address: string) =>
      AxiosGet<GetUserOutput>("/user/get-user", {
        params: {
          address,
        },
      }),
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
    uploadJson: (payload: any) =>
      AxiosPost<string>("/ipfs/upload-json", payload),
  },
  playlist: {
    createPlaylist: (payload: PlaylistInput) =>
      AxiosPost<GetPlaylistOutput>("/playlist/playlist", payload),
    deletePlaylist: (payload: { id: string }) =>
      AxiosPost<GetPlaylistOutput>("/playlist/delete-playlist", payload),
    getPlaylist: (id: string) =>
      AxiosGet<GetPlaylistOutput>("/playlist/playlist", {
        params: {
          id,
        },
      }),
    getListPlaylist: () =>
      AxiosGet<GetPlaylistOutput[]>("/playlist/list-playlist"),
  },
};

export default ApiServices;
