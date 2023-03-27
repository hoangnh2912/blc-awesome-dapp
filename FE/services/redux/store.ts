import { createStore, action } from "easy-peasy";
import StoreModel from "./model";

const store = createStore<StoreModel>({
  music: {
    currentSong: undefined,
    playMusic: action((state, payload) => {
      if (
        state.audio &&
        state.audio.audio.current &&
        state.currentSong &&
        state.currentSong.audio == payload.audio
      ) {
        if (state.isPlaying) {
          state.audio.audio.current.pause();
        } else {
          state.audio.audio.current.play();
        }
      } else {
        state.currentSong = payload;
        if (!state.playList.find((item) => item.id === payload.id))
          state.playList.push(payload);
      }
    }),
    audio: undefined,
    setAudio: action((state, payload) => {
      state.audio = payload;
    }),
    isPlaying: false,
    setIsPlaying: action((state, payload) => {
      state.isPlaying = payload;
    }),
    playList: [],
    addToPlayList: action((state, payload) => {
      if (!state.playList.find((item) => item.id === payload.id))
        state.playList.push(payload);
    }),
    removeFromPlayList: action((state, payload) => {
      state.playList = state.playList.filter((item) => item.id !== payload.id);
    }),
    playNext: action((state) => {
      if (state.currentSong && state.playList.length > 1) {
        const index = state.playList.findIndex(
          (item) => item.id === state?.currentSong?.id
        );
        if (index < state.playList.length - 1)
          state.currentSong = state.playList[index + 1];
      }
    }),
    playPrevious: action((state) => {
      if (state.currentSong && state.playList.length > 1) {
        const index = state.playList.findIndex(
          (item) => item.id === state?.currentSong?.id
        );
        if (index > 0) state.currentSong = state.playList[index - 1];
      }
    }),
    isShowPlayList: false,
    setIsShowPlayList: action((state, payload) => {
      state.isShowPlayList = payload;
    }),
  },
  user: {
    data: undefined,
    setData: action((state, payload) => {
      state.data = payload;
    }),
    isCheckConnect: false,
    setIsCheckConnect: action((state, payload) => {
      state.isCheckConnect = payload;
    }),
  },
});

export default store;
