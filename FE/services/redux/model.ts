import { Action } from "easy-peasy";
import { SongNFTProps } from "../../components/song-nft";
import AudioPlayer from "react-h5-audio-player";

type MusicPlaying = Pick<SongNFTProps, "image" | "name" | "singer" | "url">;

interface Music {
  currentSong: MusicPlaying | undefined;
  isPlaying: boolean;
  playMusic: Action<Music, MusicPlaying>;
  audio: AudioPlayer | undefined;
  setAudio: Action<Music, AudioPlayer>;
  setIsPlaying: Action<Music, boolean>;
}

interface StoreModel {
  music: Music;
}

export type { Music };

export default StoreModel;
