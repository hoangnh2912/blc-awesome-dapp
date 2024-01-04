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
  GetStealthAddressOutput,
  GetMarketOutput,
  GetUserOutput,
  GetRoomInfo,
  GetChatUserOutput,
  GetMessageOutput,
  RentMarketInput,
  GetPlaylistOutput,
  PlaylistInput,
  GetTopMarketOutput,
  GetHomeMarketOutput,
} from "./types";
type SuccessResponse<T> = {
  data: T;
  message: string;
  success: boolean;
  total: number;
};
const BASE_URL =
  process.env.NODE_ENV === "development"
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
    console.log(
      `${localStorage.getItem("address")}:${localStorage.getItem("signature")}`
    );

    config.headers["authorize"] = `${localStorage.getItem(
      "address"
    )}:${localStorage.getItem("signature")}`;
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
  stealthAddress: {
    submitPrivateKey: (privateKey: string, address: string) =>
      AxiosPost<boolean>("/stealth-address/submit-private-key", {
        privateKey,
        address,
      }),
    submitStealthAddress: (
      wallet_address: string,
      address: string,
      from: string
    ) =>
      AxiosPost<boolean>("/stealth-address/submit-stealth-address", {
        wallet_address,
        address,
        from,
      }),
    getPrivateKey: (address: string) =>
      AxiosGet<GetPrivateKeyOutput>("/stealth-address/get-private-key", {
        params: { address },
      }),
    getStealthAddress: (address: string) =>
      AxiosGet<GetStealthAddressOutput[]>(
        "/stealth-address/get-list-stealth-address",
        {
          params: { address },
        }
      ),
  },
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
  renting: {
    erc4907: (payload: ERC721Input) =>
      AxiosPost<TokenCreatorOutput>("renting/erc4907", payload),
    rentMarket: (payload: RentMarketInput) =>
      AxiosPost<TokenCreatorOutput>("renting/rent-market", payload),
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
  roomChat: {
    getRoomList: (page: number = 0, limit: number = 15) =>
      AxiosGet<GetRoomInfo[]>("/room/get-room-list", {
        params: { page, limit },
      }),
    getRoomInfo: (room_id: string, page: number = 0, limit: number = 15) =>
      AxiosGet<GetRoomInfo>("/room/get-room-info", {
        params: { room_id, page, limit },
      }),
    getPublicRoomList: (
      page: number = 0,
      limit: number = 15,
      filter?: string
    ) =>
      AxiosGet<GetRoomInfo[]>("/room/get-public-room-list", {
        params: { page, limit, filter },
      }),
    getAllEncryptedMessageWithDmtp: () =>
      AxiosGet<GetRoomInfo[]>("/room/get-all-encrypted-message-with-dmtp"),
    createRoom: (payload: any) =>
      AxiosPost<GetRoomInfo>("/room/create-room", payload),
    addUserOfRoom: (payload: any) =>
      AxiosPost<GetRoomInfo>("/room/add-user-of-room", payload),
    hideRoom: (payload: any) =>
      AxiosPost<GetRoomInfo>("/room/hide-room", payload),
    joinPublicRoom: (payload: any) =>
      AxiosPost<GetRoomInfo>("/room/join-public-room", payload),
    removeUserOfRoom: (payload: any) =>
      AxiosPost<GetRoomInfo>("/room/remove-user-of-room", payload),
    setRoleOfRoom: (payload: any) =>
      AxiosPost<GetRoomInfo>("/room/set-role-of-room", payload),
    removeRoom: (payload: any) =>
      AxiosPost<GetRoomInfo>("/room/remove-room", payload),
    updateRoom: (payload: any) =>
      AxiosPost<GetRoomInfo>("/room/update-room", payload),
    readMessage: (payload: any) =>
      AxiosPost<GetRoomInfo>("/room/read-message", payload),
  },
  chatUser: {
    userInfo: () => AxiosGet<GetChatUserOutput>("/chat-user/user-info"),
    getUserByAddress: (address: string) =>
      AxiosGet<GetChatUserOutput>("/chat-user/get-user-by-address", {
        params: { address },
      }),
    getUsersByName: (name: string) =>
      AxiosGet<GetChatUserOutput>("/chat-user/get-user-by-name", {
        params: { name },
      }),
    createOrUpdateUserInfo: (payload: any) =>
      AxiosPost<GetChatUserOutput>(
        "/chat-user/create-or-update-user-info",
        payload
      ),
    createUserAddress: (payload: any) =>
      AxiosPost<GetChatUserOutput>("/chat-user/create-user-address", payload),
    sendFriendRequest: (payload: any) =>
      AxiosPost<GetChatUserOutput>("/chat-user/send-friend-request", payload),
    getFriendRequests: () =>
      AxiosGet<GetChatUserOutput>("/chat-user/get-friend-requests"),
    acceptFriendRequest: (payload: any) =>
      AxiosPost<GetChatUserOutput>("/chat-user/accept-friend-request", payload),
    getFriendList: (filter: string) =>
      AxiosGet<GetChatUserOutput>("/chat-user/get-friend-list", {
        params: { filter },
      }),
    deleteFriendRequest: (payload: any) =>
      AxiosPost<GetChatUserOutput>("/chat-user/delete-friend-request", payload),
    cancelFriendRequest: (payload: any) =>
      AxiosPost<GetChatUserOutput>("/chat-user/cancel-friend-request", payload),
    unfriend: (payload: any) =>
      AxiosPost<GetChatUserOutput>("/chat-user/unfriend", payload),
    getTotalUnread: (addressList: string) =>
      AxiosGet<GetChatUserOutput>("/chat-user/get-total-unread", {
        params: { addressList },
      }),
    getAvatarOfWallet: (wallet_address: string) =>
      AxiosGet<GetChatUserOutput>("/chat-user/avatar", {
        params: { wallet_address },
      }),
    submitKeyPair: (payload: any) =>
      AxiosPost<GetChatUserOutput>("/chat-user/submit-key-pair", payload),
    generateApiKey: (payload: any) =>
      AxiosPost<GetChatUserOutput>("/chat-user/generate-api-key", payload),
  },
  privateMessage: {
    getMessage: (
      room_id: string,
      page: number,
      limit?: number,
      isDescending?: boolean
    ) =>
      AxiosGet<{ messages: GetMessageOutput[]; is_friend: boolean }>(
        "/message/get-message-in-room",
        {
          params: { room_id, page, limit, isDescending },
        }
      ),

    sendMessage: (payload: any) =>
      AxiosPost<GetMessageOutput>("/message/send-message", payload),
    updateMessage: (payload: any) =>
      AxiosPost<GetMessageOutput>("/message/update-message", payload),
    reactMessage: (payload: any) =>
      AxiosPost<GetMessageOutput>("/message/react-message", payload),
    removeReact: (payload: any) =>
      AxiosPost<GetMessageOutput>("/message/remove-reaction", payload),
    renewMessage: (payload: any) =>
      AxiosPost<GetMessageOutput>("/message/renew-message", payload),
  },
};

export default ApiServices;
