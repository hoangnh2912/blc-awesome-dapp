import {
  Box,
  Button,
  Image,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsCart4, BsFillPlayFill } from "react-icons/bs";
import { TiMediaPause } from "react-icons/ti";
import MusicBaseLayout from "../../layouts/music.base";
import { useStoreActions, useStoreState } from "../../services/redux/hook";

const Music = () => {
  const router = useRouter();
  const { id } = router.query;
  const playMusicAction = useStoreActions((state) => state.music.playMusic);
  const currentSongState = useStoreState((state) => state.music.currentSong);
  const audioState = useStoreState((state) => state.music.audio);
  const isPlayingState = useStoreState((state) => state.music.isPlaying);

  const data = {
    id: "4",
    name: "Song Name 4",
    seller: "0x1234567890223443342ddawweffsa",
    singer: "Snoop Dog",
    attributes: [
      {
        trait_type: "Genre",
        value: "Pop",
      },
      {
        trait_type: "Mood",
        value: "Happy",
      },
      {
        trait_type: "Instrument",
        value: "Guitar",
      },
    ],
    description: "This is a song description",
    date: new Date(),
    total: 100,
    sold: 10,
    price: "5",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/9d/75/53/9d755300-a1c2-7a01-51d5-8ffc4b4ba642/mzaf_12119942434649250117.plus.aac.ep.m4a",
    image:
      "https://images.unsplash.com/photo-1678002219434-c6738513037e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
  };
  const onPlayMusic = () => {
    if (
      audioState &&
      audioState.audio.current &&
      currentSongState?.url == data.url
    ) {
      if (isPlayingState) {
        audioState.audio.current.pause();
      } else {
        audioState.audio.current.play();
      }
    } else playMusicAction(data);
  };
  return (
    <MusicBaseLayout selectTabIndex={0}>
      <Stack direction={{ base: "column", md: "row" }}>
        <Image
          width={{
            base: "100%",
            md: "30%",
          }}
          objectFit="cover"
          borderRadius="lg"
          alt={data.name}
          src={data.image}
          style={{
            boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.15)",
            aspectRatio: "1/1",
          }}
        />
        <Stack flex={1} px={2}>
          <Stack justifyContent="center">
            <Text color="white" fontSize="40" fontWeight="bold">
              {data.name}
            </Text>
            <Text color="white" fontSize="20" fontWeight="bold">
              Creator: {data.seller}
            </Text>
            <Text color="#C2A822" fontSize="20" fontWeight="bold">
              {data.singer}
            </Text>
            <Text
              fontFamily="mono"
              fontWeight="bold"
              fontSize="40"
              color="#C2A822"
            >
              {data.price} MUC
            </Text>
          </Stack>
          <Stack
            borderRadius="lg"
            bg="#3443A088"
            p="3"
            boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
          >
            <Text color="white" fontSize="20" fontWeight="bold">
              {data.sold} / {data.total} sold
            </Text>
            <Progress
              colorScheme="yellow"
              isAnimated
              hasStripe
              borderRadius="md"
              value={(data.sold * 100) / data.total}
            />
          </Stack>
          <Stack justifyContent="space-evenly" gap={1} direction={"row"}>
            <Button
              bg="#3443A0BB"
              color="#C2A822"
              flex={1}
              boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
              alignItems="center"
              height="80px"
              fontWeight="bold"
              fontSize="3xl"
              onClick={onPlayMusic}
              gap={2}
            >
              {isPlayingState && currentSongState?.url == data.url ? (
                <>
                  <TiMediaPause size="35px" />
                  Pause
                </>
              ) : (
                <>
                  <BsFillPlayFill />
                  Play
                </>
              )}
            </Button>
            <Button
              color="#3443A0"
              bg="#C2A822BB"
              boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
              flex={1}
              height="80px"
              fontWeight="bold"
              alignItems="center"
              fontSize="3xl"
              gap={2}
            >
              <BsCart4 size="0.8em" />
              Buy now
            </Button>
          </Stack>
          <Stack
            borderRadius="lg"
            bg="#3443A088"
            p="3"
            boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
          >
            <Text color="white" fontSize="20" fontWeight="bold">
              Attributes
            </Text>
            <SimpleGrid columns={[2, 2, 3]} gap={3}>
              {data.attributes.map((attr, index) => (
                <Stack
                  key={index}
                  alignItems="center"
                  justifyContent="center"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="3"
                  bg="#3443A088"
                >
                  <Text color="white" fontSize="20" fontWeight="bold">
                    {attr.trait_type}
                  </Text>
                  <Text color="#C2A822" fontSize="20" fontWeight="bold">
                    {attr.value}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Stack>
      <Text
        color="#C2A822"
        fontSize="24"
        style={{
          marginTop: "1.5rem",
        }}
        fontWeight="bold"
      >
        Description
      </Text>
      <Text color="white" fontSize="20">
        {data.description}
      </Text>
    </MusicBaseLayout>
  );
};

export default Music;
