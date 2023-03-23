import {
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";
import { useRouter } from "next/router";
import { BsPauseFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { ipfsToGateway } from "../constants/utils";
import { useMusicIsPlayingView } from "../hooks/music";
import { GetMarketOutput } from "../services/api/types";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import SongNFTSmallComponent from "./song-nft-small";

const Collection = ({
  address,
  collection,
}: {
  address: string;
  collection: GetMarketOutput[];
}) => {
  const playMusicAction = useStoreActions((state) => state.music.playMusic);

  const currentSongState = useStoreState((state) => state.music.currentSong);
  const isPlayingState = useStoreState((state) => state.music.isPlaying);

  const isPlayView = useMusicIsPlayingView({
    pauseComponent: <BsPauseFill size={"20px"} />,
    playComponent: <FaPlay size={"20px"} />,
    playMusicAction,
    currentSongState,
    isPlayingState,
  });

  const { push } = useRouter();

  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: 12,
    initialState: { currentPage: 1 },
  });

  const onClickEdit = () => {
    push("/music/edit-profile", undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <TableContainer>
        <Table
          display={{
            base: "none",
            md: "table",
          }}
          variant="simple"
        >
          <Thead>
            <Tr>
              <Th
                fontFamily="mono"
                fontWeight="bold"
                fontSize="16"
                color="#C2A822"
              >
                Title
              </Th>
              <Th
                fontFamily="mono"
                fontWeight="bold"
                fontSize="16"
                color="#C2A822"
              >
                Time
              </Th>
              <Th
                fontFamily="mono"
                fontWeight="bold"
                fontSize="16"
                color="#C2A822"
              >
                Purchase Price
              </Th>
              <Th
                fontFamily="mono"
                fontWeight="bold"
                fontSize="16"
                color="#C2A822"
              >
                Date
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {collection.map((item, idx) => (
              <Tr
                fontFamily="mono"
                fontWeight="bold"
                key={idx}
                fontSize="16"
                color="white"
              >
                <Td display="flex" alignItems="center" gap={3}>
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
                    src={ipfsToGateway(item.image)}
                  />
                  {item.name}
                </Td>
                <Td>
                  {Math.floor(item.duration / 60)}:
                  {Math.round(item.duration % 60)}
                </Td>
                <Td>{item.price} MUC</Td>
                <Td>{new Date(item.created_at).toDateString()}</Td>
                <Td>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                  >
                    {isPlayView(item)}
                    <MdSell size={"25px"} />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack
        display={{
          base: "flex",
          md: "none",
        }}
      >
        {collection.map((item, idx) => (
          <SongNFTSmallComponent {...item} key={idx} />
        ))}
      </Stack>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <PaginationContainer>
          <PaginationPrevious>Previous</PaginationPrevious>
          <PaginationPageGroup>
            {pages.map((page: number) => (
              <PaginationPage key={`pagination_page_${page}`} page={page} />
            ))}
          </PaginationPageGroup>
          <PaginationNext>Next</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </>
  );
};

export default Collection;
