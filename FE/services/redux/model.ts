import { Action } from "easy-peasy";
import { SongNFTProps } from "../../components/song-nft";
import AudioPlayer from "react-h5-audio-player";

interface Music {
  currentSong: SongNFTProps | undefined;
  isPlaying: boolean;
  playMusic: Action<Music, SongNFTProps>;
  audio: AudioPlayer | undefined;
  setAudio: Action<Music, AudioPlayer>;
  setIsPlaying: Action<Music, boolean>;
}

interface StoreModel {
  music: Music;
}

export type { Music };

export default StoreModel;
