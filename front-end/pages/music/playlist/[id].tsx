import {
  HStack,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MusicBaseLayout from "../../../layouts/music.base";
import ApiServices from "../../../services/api";
import {
  GetMarketOutput,
  GetPlaylistOutput,
} from "../../../services/api/types";
import { EMPTY_PLAYLIST_IMAGE } from "../../../constants/constants";
import { usePagination } from "@ajna/pagination";
import { useAddress } from "@thirdweb-dev/react";
import { FaPlay } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { MdRemove } from "react-icons/md";
import { useMusicIsPlayingView } from "../../../hooks/music";
import { BsPauseFill } from "react-icons/bs";
import { useStoreActions, useStoreState } from "../../../services/redux/hook";

const getPlaylist = async (id: string) => {
  try {
    if (!id) return;
    const res = await ApiServices.playlist.getPlaylist(id as string);
    return {
      playlist: res.data.data,
    };
  } catch (error: any) {
    console.log(
      `[PlaylistDetail.getInitialProps.getPlaylist]:${error.message}`
    );
  }
  return { playlist: null };
};

const PlaylistDetail = ({ playlist }: { playlist: GetPlaylistOutput }) => {
  const router = useRouter();
  const { id } = router.query;
  const [collection, setCollection] = useState<GetMarketOutput[]>([]);
  const address = useAddress();
  const playMusicAction = useStoreActions((state) => state.music.playMusic);
  const currentSongState = useStoreState((state) => state.music.currentSong);
  const isPlayingState = useStoreState((state) => state.music.isPlaying);
  const [total, setTotal] = useState(0);
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    total,
    initialState: {
      currentPage: 1,
      pageSize: 24,
    },
    limits: {
      inner: 1,
      outer: 1,
    },
  });

  const getCollection = async () => {
    if (address) {
      try {
        const resStudio = await ApiServices.music.getMyCollection(currentPage);
        setCollection(resStudio.data.data);
        setTotal(resStudio.data.total);
      } catch (error) {}
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  const isPlayView = useMusicIsPlayingView({
    pauseComponent: <BsPauseFill size={"25px"} />,
    playComponent: <FaPlay size={"25px"} />,
    playMusicAction,
    currentSongState,
    isPlayingState,
  });

  if (!playlist)
    return (
      <MusicBaseLayout selectTabIndex={0}>
        <></>
      </MusicBaseLayout>
    );

  return (
    <MusicBaseLayout selectTabIndex={2}>
      <Text color="white" fontSize="35" fontFamily={"mono"} fontWeight="bold">
        {playlist.name}
      </Text>
      <Stack direction={{ base: "column", md: "row" }}>
        <Image
          width={{
            base: "100%",
            md: "35%",
          }}
          objectFit="cover"
          borderRadius="lg"
          alt={playlist.name}
          src={playlist.image || EMPTY_PLAYLIST_IMAGE}
          style={{
            boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.15)",
            aspectRatio: "1/1",
          }}
        />
        <Stack w={"full"}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontFamily="mono" fontSize="16" color="white">
                    Title
                  </Th>
                  <Th fontFamily="mono" fontSize="16" color="white">
                    Time
                  </Th>
                  <Th fontFamily="mono" fontSize="16" color="white"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {playlist.audios.map((item, idx) => (
                  <Tr
                    fontFamily="mono"
                    fontWeight="bold"
                    key={idx}
                    cursor={"pointer"}
                    _hover={{
                      background: "#fcae00",
                      color: "black",
                    }}
                    onClick={() => {}}
                    fontSize="16"
                    color="white"
                  >
                    <Td
                      cursor="pointer"
                      onClick={() => {
                        router.push(`/music/${item.id}`);
                      }}
                      display="flex"
                      alignItems="center"
                      gap={3}
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
                        src={item.image}
                      />
                      {item.name}
                    </Td>
                    <Td>
                      {Math.floor(item.duration / 60)}:
                      {Math.round(item.duration % 60)}
                    </Td>
                    <Td>
                      <HStack gap={2}>
                        {isPlayView(item)}
                        <MdRemove cursor={"pointer"} size={"35px"} />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
      <Stack mt={"1.5rem"} w={"full"}>
        <Text color="white" fontSize="25" fontFamily={"mono"} fontWeight="bold">
          Add Song
        </Text>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontFamily="mono" fontSize="16" color="white">
                  Title
                </Th>
                <Th fontFamily="mono" fontSize="16" color="white">
                  Time
                </Th>
                <Th fontFamily="mono" fontSize="16" color="white"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {collection.map((item, idx) => (
                <Tr
                  fontFamily="mono"
                  fontWeight="bold"
                  key={idx}
                  cursor={"pointer"}
                  _hover={{
                    background: "#fcae00",
                    color: "black",
                  }}
                  onClick={() => {}}
                  fontSize="16"
                  color="white"
                >
                  <Td
                    cursor="pointer"
                    onClick={() => {
                      router.push(`/music/${item.id}`);
                    }}
                    display="flex"
                    alignItems="center"
                    gap={3}
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
                      src={item.image}
                    />
                    {item.name}
                  </Td>
                  <Td>
                    {Math.floor(item.duration / 60)}:
                    {Math.round(item.duration % 60)}
                  </Td>
                  <Td>
                    <HStack gap={2}>
                      {isPlayView(item)}
                      <IoAdd cursor={"pointer"} size={"35px"} />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </MusicBaseLayout>
  );
};
PlaylistDetail.getInitialProps = async (ctx: any) => {
  const id = ctx.query.id;
  return await getPlaylist(id);
};
export default PlaylistDetail;
