import { ReactNode } from "react";
import { GetMarketOutput } from "../services/api/types";
import { useStoreActions, useStoreState } from "../services/redux/hook";

const useMusicIsPlayingView = ({
  pauseComponent,
  playComponent,
  playMusicAction,
  currentSongState,
  isPlayingState,
}: {
  playComponent: ReactNode;
  pauseComponent: ReactNode;
  playMusicAction: (data: GetMarketOutput) => void;
  currentSongState: GetMarketOutput | undefined;
  isPlayingState: boolean;
}) => {
  return (data: GetMarketOutput) => {
    const onPlayMusic = () => {
      playMusicAction(data);
    };
    return (
      <div onClick={onPlayMusic}>
        {isPlayingState && currentSongState?.id === data.id
          ? pauseComponent
          : playComponent}
      </div>
    );
  };
};

export { useMusicIsPlayingView };
