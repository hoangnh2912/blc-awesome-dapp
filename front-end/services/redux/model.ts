import { Action, Thunk } from "easy-peasy";
import AudioPlayer from "react-h5-audio-player";
import { GetMarketOutput, GetUserOutput } from "../api/types";

interface Music {
  currentSong: GetMarketOutput | undefined;
  isPlaying: boolean;
  playMusic: Action<Music, GetMarketOutput>;
  updateMusicMetadata: Action<Music, GetMarketOutput>;
  audio: AudioPlayer | undefined;
  setAudio: Action<Music, AudioPlayer>;
  setIsPlaying: Action<Music, boolean>;
  playList: GetMarketOutput[];
  addToPlayList: Action<Music, GetMarketOutput>;
  addListToPlayList: Action<Music, GetMarketOutput[]>;
  removeFromPlayList: Action<Music, GetMarketOutput>;
  playNext: Action<Music>;
  playPrevious: Action<Music>;
  isShowPlayList: boolean;
  setIsShowPlayList: Action<Music, boolean>;
}

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
}

interface StoreModel {
  music: Music;
  user: User;
}

export type { Music };

export default StoreModel;
