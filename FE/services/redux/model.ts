import { Action } from "easy-peasy";
import AudioPlayer from "react-h5-audio-player";
import { GetMarketOutput } from "../api/types";

interface Music {
  currentSong: GetMarketOutput | undefined;
  isPlaying: boolean;
  playMusic: Action<Music, GetMarketOutput>;
  audio: AudioPlayer | undefined;
  setAudio: Action<Music, AudioPlayer>;
  setIsPlaying: Action<Music, boolean>;
  playList: GetMarketOutput[];
  addToPlayList: Action<Music, GetMarketOutput>;
  removeFromPlayList: Action<Music, GetMarketOutput>;
  isShowPlayList: boolean;
  setIsShowPlayList: Action<Music, boolean>;
}

interface User {
  isLogin: boolean;
  setIsLogin: Action<User, boolean>;
}

interface StoreModel {
  music: Music;
  user: User;
}

export type { Music };

export default StoreModel;
