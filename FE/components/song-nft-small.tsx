import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";
import { TiMediaPause } from "react-icons/ti";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import { SongNFTProps } from "./song-nft";

const SongNFTSmallComponent = ({
  image,
  name,
  singer,
  url,
  id,
}: SongNFTProps) => {
  const playMusicAction = useStoreActions((state) => state.music.playMusic);
  const currentSongState = useStoreState((state) => state.music.currentSong);
  const isPlayingState = useStoreState((state) => state.music.isPlaying);
  const onPlayMusic = () => {
    playMusicAction({
      url,
      name,
      singer,
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
      shadow="2xl"
      overflow="hidden"
      style={{
        boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.15)",
      }}
    >
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
          direction="row"
        >
          <Image
            _hover={{
              transform: "scale(1.2)",
            }}
            transition="all 0.3s ease-in-out"
            w={["50px"]}
            fit="cover"
            style={{
              aspectRatio: "1/1",
            }}
            borderRadius="lg"
            cursor="pointer"
            onClick={goToMusic}
            src={image}
          />
          <Stack flex={1} justifyContent="space-between" direction="row">
            <Stack flex={4}>
              <Text
                cursor="pointer"
                onClick={goToMusic}
                fontWeight="bold"
                color="white"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                maxWidth="240px"
                fontSize="sm"
              >
                {name}
              </Text>
              <Text
                fontWeight="bold"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                maxWidth="240px"
                fontSize="smaller"
                color="white"
              >
                {singer}
              </Text>
            </Stack>
            <Stack
              cursor="pointer"
              borderRadius="50%"
              w="40px"
              h="40px"
              style={{
                aspectRatio: "1/1",
              }}
              justifyContent="center"
              alignItems="center"
              alignSelf="center"
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
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SongNFTSmallComponent;
