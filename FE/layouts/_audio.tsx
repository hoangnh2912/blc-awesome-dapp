import { Center, Image, Stack, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useStoreActions, useStoreState } from "../services/redux/hook";
const AudioLayout = ({ children }: { children: React.ReactNode }) => {
  const audioState = useStoreState((state) => state.music.audio);
  const musicState = useStoreState((state) => state.music);
  const setAudioAction = useStoreActions((state) => state.music.setAudio);
  const setIsPlayingAction = useStoreActions(
    (state) => state.music.setIsPlaying
  );
  const player = useCallback((node: AudioPlayer) => {
    if (node && !audioState) {
      setAudioAction(node);
    }
  }, []);

  return (
    <>
      {children}
      <Center>
        <Center
          bottom={0}
          boxShadow={"2xl"}
          w="100%"
          shadow="3xl"
          position="fixed"
          backgroundImage={`url('${musicState.currentSong?.image}')`}
          backgroundSize="cover"
          opacity={musicState.currentSong ? 1 : 0}
          display={musicState.currentSong ? "flex" : "none"}
          transition="all 2s ease"
          style={{
            boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.75)",
          }}
        >
          <Stack
            direction="row"
            bgGradient="linear(rgba(0,0,0,0.3), transparent)"
            backdropFilter="auto"
            backdropBlur="1rem"
            flex={1}
            justifyContent="space-between"
          >
            <Stack
              display={{ base: "none", md: "flex" }}
              flex={1}
              justifyContent="center"
              alignItems="center"
              direction="row"
            >
              <Image
                alt="music"
                src={musicState.currentSong?.image}
                h={"100px"}
                w={"100px"}
                borderRadius="lg"
                fit="cover"
              />
            </Stack>
            <Stack flex={9}>
              <Text
                color="white"
                fontWeight="bold"
                fontSize="sm"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                alignSelf="center"
                pt={2}
              >
                {musicState.currentSong?.name} -{" "}
                {musicState.currentSong?.seller}
              </Text>
              <AudioPlayer
                ref={player}
                preload="auto"
                style={{
                  backgroundColor: "transparent",
                  WebkitTextFillColor: "white",
                  boxShadow: "none",
                }}
                volume={0.3}
                showSkipControls
                src={musicState.currentSong?.url}
                onPlay={(e) => setIsPlayingAction(true)}
                onPause={(e) => setIsPlayingAction(false)}
              />
            </Stack>
            <Stack flex={1} justifyContent="center" alignItems="center"></Stack>
          </Stack>
        </Center>
      </Center>
    </>
  );
};

export default AudioLayout;