import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";
import { TiMediaPause } from "react-icons/ti";
import { useStoreActions, useStoreState } from "../services/redux/hook";

export interface SongNFTProps {
  id: string;
  image: string;
  name: string;
  singer: string;
  price: string;
  url: string;
}

const SongNFTComponent = ({
  image,
  name,
  singer,
  price,
  url,
  id,
}: SongNFTProps) => {
  const playMusicAction = useStoreActions((state) => state.music.playMusic);
  const currentSongState = useStoreState((state) => state.music.currentSong);
  const audioState = useStoreState((state) => state.music.audio);
  const isPlayingState = useStoreState((state) => state.music.isPlaying);

  const onPlayMusic = () => {
    if (
      audioState &&
      audioState.audio.current &&
      currentSongState?.url == url
    ) {
      if (isPlayingState) {
        audioState.audio.current.pause();
      } else {
        audioState.audio.current.play();
      }
    } else
      playMusicAction({
        id,
        url,
        name,
        singer,
        price,
        image,
      });
  };

  const router = useRouter();

  const goToMusic = () => {
    router.push(
      {
        pathname: `/music/${id}`,
      },
      undefined,
      { shallow: true }
    );
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
        onClick={goToMusic}
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
          bgGradient="linear(rgba(0,0,0,0.3), transparent)"
          backdropFilter="auto"
          backdropBlur="1rem"
        >
          <Stack justifyContent="space-between" direction="row">
            <Stack>
              <Text
                cursor="pointer"
                onClick={goToMusic}
                fontWeight="bold"
                color="white"
              >
                {name}
              </Text>
              <Text fontWeight="bold" fontSize="sm" color="white">
                {singer}
              </Text>
            </Stack>
            <Text
              fontSize="md"
              alignSelf="center"
              fontWeight="bold"
              color="white"
            >
              {price} MUC
            </Text>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Text
              cursor="pointer"
              fontWeight="bold"
              color="white"
              borderRadius="3xl"
              backgroundColor="#0D164D"
              p="1"
              px="2"
              fontSize="sm"
              borderWidth="2px"
              letterSpacing="widest"
            >
              Buy now
            </Text>
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
              onClick={onPlayMusic}
            >
              {isPlayingState && currentSongState?.url == url ? (
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

export default SongNFTComponent;
