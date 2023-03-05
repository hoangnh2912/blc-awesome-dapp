import { createStore, action } from "easy-peasy";
import StoreModel from "./model";

const store = createStore<StoreModel>({
  music: {
    currentSong: undefined,
    playMusic: action((state, payload) => {
      state.currentSong = payload;
    }),
    audio: undefined,
    setAudio: action((state, payload) => {
      state.audio = payload;
    }),
    isPlaying: false,
    setIsPlaying: action((state, payload) => {
      state.isPlaying = payload;
    }),
  },
});

export default store;
