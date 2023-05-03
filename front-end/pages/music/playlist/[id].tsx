import {
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
import { useEffect } from "react";
import MusicBaseLayout from "../../../layouts/music.base";
import ApiServices from "../../../services/api";
import { GetPlaylistOutput } from "../../../services/api/types";
import { EMPTY_PLAYLIST_IMAGE } from "../../../constants/constants";

const getPlaylist = async (id: string) => {
  try {
    if (!id) return;
    const res = await ApiServices.playlist.getPlaylist(id as string);
    return {
      playlist: res.data.data,
    };
  } catch (error: any) {
    console.log(`[PlaylistDetail.getInitialProps]:${error.message}`);
  }
  return { playlist: null };
};

const PlaylistDetail = ({ playlist }: { playlist: GetPlaylistOutput }) => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {}, [id]);

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
                    <Td>{item.name}</Td>
                    <Td>
                      {Math.floor(item.duration / 60)}:
                      {Math.round(item.duration % 60)}
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
                  <Td>{item.name}</Td>
                  <Td>
                    {Math.floor(item.duration / 60)}:
                    {Math.round(item.duration % 60)}
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
