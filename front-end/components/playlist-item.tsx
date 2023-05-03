import { Box, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";
import { TiMediaPause } from "react-icons/ti";
import { GetMarketOutput, GetPlaylistOutput } from "../services/api/types";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import { EMPTY_PLAYLIST_IMAGE } from "../constants/constants";

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

  const openPlaylistDetail = (id: string) => {
    router.push(`/music/playlist/${id}`, undefined, { shallow: true });
  };

  return (
    <Box
      w={["full"]}
      maxW={["250px"]}
      boxShadow="lg"
      borderRadius="lg"
      shadow="2xl"
      onClick={() => openPlaylistDetail(props._id)}
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
        src={image || `${EMPTY_PLAYLIST_IMAGE}`}
      />
      <Box
        backgroundImage={`url(${image || `${EMPTY_PLAYLIST_IMAGE}`})`}
        backgroundSize="cover"
        backgroundColor="transparent"
      >
        <HStack
          p="3"
          justifyContent={["space-between"]}
          zIndex="0"
          bgGradient="linear(rgba(0,0,0,0.6), transparent)"
          backdropFilter="auto"
          backdropBlur="1rem"
        >
          <Stack>
            <Text cursor="pointer" fontWeight="bold" color="white">
              {name}
            </Text>
            <Text cursor="pointer" fontWeight="bold" color="white">
              {audios.length} songs
            </Text>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Box
              w="40px"
              cursor={audios.length > 0 ? "pointer" : "not-allowed"}
              h="40px"
              borderRadius="full"
              justifyContent="center"
              alignItems="center"
              display="flex"
              backgroundColor={audios.length > 0 ? "white" : "gray.500"}
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
        </HStack>
      </Box>
    </Box>
  );
};

export default PlaylistItemComponent;
