import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";
import { EMPTY_PLAYLIST_IMAGE } from "../constants/constants";
import { GetPlaylistOutput } from "../services/api/types";
import { useStoreActions } from "../services/redux/hook";

const PlaylistItemComponent = (props: GetPlaylistOutput) => {
  const { image, name, audios } = props;
  const playMusicAction = useStoreActions((state) => state.music.playMusic);
  const addListToPlayListAction = useStoreActions(
    (state) => state.music.addListToPlayList
  );

  const router = useRouter();

  const openPlaylistDetail = (id: string) => {
    router.push(`/music/playlist/${id}`, undefined, { shallow: true });
  };

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
        src={image || `${EMPTY_PLAYLIST_IMAGE}`}
        onClick={() => openPlaylistDetail(props._id)}
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
          <Stack onClick={() => openPlaylistDetail(props._id)}>
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
              onClick={() => {
                if (audios.length === 0) return;
                addListToPlayListAction(audios);
                playMusicAction(audios[0]);
              }}
              borderRadius="full"
              justifyContent="center"
              alignItems="center"
              display="flex"
              backgroundColor={audios.length > 0 ? "white" : "gray.500"}
              _hover={{
                backgroundColor: "gray.300",
              }}
            >
              <FaPlay size="10px" color="black" />
            </Box>
          </Stack>
        </HStack>
      </Box>
    </Box>
  );
};

export default PlaylistItemComponent;
