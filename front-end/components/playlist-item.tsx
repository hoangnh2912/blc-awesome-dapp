import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";
import { TiMediaPause } from "react-icons/ti";
import { GetMarketOutput, GetPlaylistOutput } from "../services/api/types";
import { useStoreActions, useStoreState } from "../services/redux/hook";

const PlaylistItemComponent = (props: GetPlaylistOutput) => {
  const { image, name, audios } = props;
  const playMusicAction = useStoreActions((state) => state.music.playMusic);
  const addToPlayListAction = useStoreActions(
    (state) => state.music.addToPlayList
  );
  const currentSongState = useStoreState((state) => state.music.currentSong);
  const isPlayingState = useStoreState((state) => state.music.isPlaying);

  const onPlayMusic = (audio: GetMarketOutput) => {
    playMusicAction(audio);
  };

  const router = useRouter();

  return (
    <Box
      w={["full"]}
      boxShadow="lg"
      borderRadius="lg"
      shadow="2xl"
      overflow="hidden"
      style={{
        boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.15)",
      }}
    >
      <Image
        _hover={{
          transform: "scale(1.2)",
        }}
        transition="all 0.3s ease-in-out"
        w={["full"]}
        h={["200px"]}
        fit="cover"
        cursor="pointer"
        src={image}
      />
      <Box
        backgroundImage={`url(${image})`}
        backgroundSize="cover"
        backgroundColor="transparent"
      >
        <Stack
          p="3"
          zIndex="0"
          bgGradient="linear(rgba(0,0,0,0.6), transparent)"
          backdropFilter="auto"
          backdropBlur="1rem"
        >
          <Text cursor="pointer" fontWeight="bold" color="white">
            {name}
          </Text>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Box
              w="40px"
              cursor="pointer"
              h="40px"
              borderRadius="full"
              justifyContent="center"
              alignItems="center"
              display="flex"
              backgroundColor="white"
              _hover={{
                backgroundColor: "gray.300",
              }}
            >
              {isPlayingState && currentSongState?.audio ? (
                <TiMediaPause size="20px" color="black" />
              ) : (
                <FaPlay size="10px" color="black" />
              )}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default PlaylistItemComponent;
