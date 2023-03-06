import { Box, Center, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useNetwork } from "@thirdweb-dev/react";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import SidebarMusic from "../components/sidebar-music";
import { SideBarDataMusic } from "../constants/data/sidebar";
import styles from "../styles/Home.module.css";
import AudioPlayer from "react-h5-audio-player";
import { useStoreActions, useStoreState } from "../services/redux/hook";
const MusicBaseLayout = ({
  children,
  selectTabIndex = 0,
}: {
  children: React.ReactNode;
  selectTabIndex?: number;
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [currentNetwork, switchNetwork] = useNetwork();
  const musicState = useStoreState((state) => state.music);
  const setAudioAction = useStoreActions((state) => state.music.setAudio);
  const setIsPlayingAction = useStoreActions(
    (state) => state.music.setIsPlaying
  );
  const player = useCallback((node: AudioPlayer) => {
    if (node !== null) {
      setAudioAction(node);
    }
  }, []);
  useEffect(() => {
    setIsBrowser(true);
  }, [switchNetwork, currentNetwork]);

  if (typeof window === "undefined" || !isBrowser) {
    return <></>;
  }

  return (
    <div className={styles.App}>
      <Head>
        <title>Music Protocol</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Music" />
        <meta property="og:url" content="http://Music.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Music Dapp" />
        <meta property="og:description" content="Music" />
        <meta
          property="og:image"
          content="https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="Music.com" />
        <meta property="twitter:url" content="http://Music.com" />
        <meta name="twitter:title" content="Music Dapp" />
        <meta name="twitter:description" content="Music" />
        <meta
          name="twitter:image"
          content="https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg"
        />
      </Head>
      <SidebarMusic
        selectIndex={selectTabIndex}
        content={children}
        data={SideBarDataMusic}
      />
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
          transition="all 2s ease"
          visibility={musicState.currentSong ? "visible" : "hidden"}
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
                autoPlay
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
    </div>
  );
};

export default MusicBaseLayout;
