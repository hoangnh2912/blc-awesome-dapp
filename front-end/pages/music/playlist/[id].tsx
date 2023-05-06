import { usePagination } from "@ajna/pagination";
import {
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBoolean,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPauseFill, BsSearch } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { MdCheck, MdEdit, MdRemove } from "react-icons/md";
import PaginationComponent from "../../../components/Pagination";
import { EMPTY_PLAYLIST_IMAGE } from "../../../constants/constants";
import { useMusicIsPlayingView } from "../../../hooks/music";
import MusicBaseLayout from "../../../layouts/music.base";
import ApiServices from "../../../services/api";
import {
  GetMarketOutput,
  GetPlaylistOutput,
} from "../../../services/api/types";
import { useStoreActions, useStoreState } from "../../../services/redux/hook";

let timeOutSearch: NodeJS.Timeout | null = null;
const PlaylistDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [collection, setCollection] = useState<GetMarketOutput[]>([]);
  const [playlist, setPlaylist] = useState<GetPlaylistOutput>();
  const [isEdit, setIsEdit] = useBoolean(false);
  const [search, setSearch] = useState("");
  const address = useAddress();
  const playMusicAction = useStoreActions((state) => state.music.playMusic);
  const currentSongState = useStoreState((state) => state.music.currentSong);
  const isPlayingState = useStoreState((state) => state.music.isPlaying);
  const [total, setTotal] = useState(0);
  const pagination = usePagination({
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
  const { currentPage } = pagination;

  const getPlaylist = async (id: string) => {
    try {
      if (!id) return;
      const res = await ApiServices.playlist.getPlaylist(id as string);
      setPlaylist(res.data.data);
    } catch (error: any) {
      console.log(`[PlaylistDetail.getPlaylist]:${error.message}`);
    }
  };

  const getCollection = async () => {
    if (address && playlist) {
      try {
        const resStudio = await ApiServices.music.getMyCollection(
          currentPage,
          24,
          search
        );
        const playlistId = playlist.audios.map((item) => item.id);
        const data = resStudio.data.data.filter(
          (item) => !playlistId.includes(item.id)
        );
        setCollection(data);
        setTotal(data.length);
      } catch (error: any) {
        console.log(`[PlaylistDetail.getCollection]:${error.message}`);
      }
    }
  };

  useEffect(() => {
    getPlaylist(id as string);
  }, [id, address]);

  useEffect(() => {
    if (timeOutSearch) clearTimeout(timeOutSearch);
    timeOutSearch = setTimeout(getCollection, 500);
  }, [currentPage, address, search, playlist]);

  const onSetImageFile = async (file: File | null) => {
    if (file && file.type.includes("image") && playlist) {
      const formDataImage = new FormData();
      formDataImage.append("imageFile", file);
      const resImage = await ApiServices.ipfs.uploadImage(formDataImage);
      await ApiServices.playlist.createPlaylist({
        name: playlist.name,
        image: resImage.data.data,
        id: playlist._id,
      });
      await getPlaylist(id as string);
    }
  };

  const onUpdateName = async (name: string) => {
    if (playlist) {
      await ApiServices.playlist.createPlaylist({
        name,
        id: playlist._id,
      });
      await getPlaylist(id as string);
    }
  };

  const onAddSong = async (songId: string) => {
    if (playlist && playlist.audios) {
      await ApiServices.playlist.createPlaylist({
        name: playlist.name,
        id: playlist._id,
        audios: [
          ...new Set([...playlist.audios.map((audio) => audio.id), songId]),
        ],
      });
      await getPlaylist(id as string);
    }
  };
  const onRemoveSong = async (songId: string) => {
    if (playlist && playlist.audios) {
      await ApiServices.playlist.createPlaylist({
        name: playlist.name,
        id: playlist._id,
        audios: playlist.audios
          .map((audio) => audio.id)
          .filter((audio) => audio !== songId),
      });
      await getPlaylist(id as string);
    }
  };

  const onDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const isPlayView = useMusicIsPlayingView({
    pauseComponent: <BsPauseFill size={"25px"} />,
    playComponent: <FaPlay size={"25px"} />,
    playMusicAction,
    currentSongState,
    isPlayingState,
  });

  if (!playlist)
    return (
      <MusicBaseLayout selectTabIndex={2}>
        <></>
      </MusicBaseLayout>
    );

  return (
    <MusicBaseLayout selectTabIndex={2}>
      <HStack>
        <Text
          contentEditable={isEdit}
          color="white"
          fontSize="35"
          fontFamily={"mono"}
          fontWeight="bold"
          borderWidth={isEdit ? "1px" : "0px"}
          borderRadius={"lg"}
          noOfLines={1}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const playlistName = document.getElementById("playlist-name");
              onUpdateName(playlistName?.textContent || "");
              setIsEdit.toggle();
            }
          }}
          my={"5px"}
          pr={"10px"}
          id="playlist-name"
        >
          {playlist.name}
        </Text>
        {isEdit ? (
          <MdCheck
            onClick={() => {
              const playlistName = document.getElementById("playlist-name");
              onUpdateName(playlistName?.textContent || "");
              setIsEdit.toggle();
            }}
            cursor={"pointer"}
            color="white"
            size={"35px"}
          />
        ) : (
          <MdEdit
            onClick={setIsEdit.toggle}
            cursor={"pointer"}
            color="white"
            size={"35px"}
          />
        )}
      </HStack>
      <Stack direction={{ base: "column", md: "row" }}>
        <Image
          onClick={() => {
            let input = document.createElement("input");
            input.hidden = true;
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e: any) => {
              const file = e.target?.files?.item(0);
              onSetImageFile(file);
              input.remove();
            };
            input.click();
          }}
          cursor={"pointer"}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const file = e.dataTransfer.files.item(0);
            onSetImageFile(file);
          }}
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
                        <MdRemove
                          onClick={() => {
                            onRemoveSong(item.id);
                          }}
                          cursor={"pointer"}
                          size={"35px"}
                        />
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
        <InputGroup w={["100%"]}>
          <Input
            borderWidth={0}
            bg={"rgba(0, 0, 0, 0.3)"}
            boxShadow={"2xl"}
            borderRadius={100}
            color={"white"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fontSize={["xs", "sm", "md"]}
            placeholder="Search song"
          />
          {search && (
            <InputRightElement cursor="pointer" pointerEvents="none">
              <BsSearch color="white" />
            </InputRightElement>
          )}
        </InputGroup>
        <TableContainer w={"full"}>
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
                      <IoAdd
                        onClick={() => {
                          onAddSong(item.id);
                        }}
                        cursor={"pointer"}
                        size={"35px"}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <PaginationComponent pagination={pagination} />
      </Stack>
    </MusicBaseLayout>
  );
};

export default PlaylistDetail;
