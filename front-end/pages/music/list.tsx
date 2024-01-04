import { usePagination } from "@ajna/pagination";
import { SimpleGrid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PaginationComponent from "../../components/pagination";
import SongNFTComponent from "../../components/song-nft";
import MusicBaseLayout from "../../layouts/music.base";
import ApiServices from "../../services/api";
import { GetMarketOutput } from "../../services/api/types";
const List: NextPage = () => {
  const router = useRouter();
  const { genre = "", page = "1", search = "" } = router.query;
  const [total, setTotal] = useState(1);
  const pagination = usePagination({
    total,
    initialState: {
      currentPage: parseInt(`${page}`) || 1,
      pageSize: 24,
    },
    limits: {
      inner: 1,
      outer: 1,
    },
  });

  const [data, setData] = useState<GetMarketOutput[]>([]);

  const getData = async () => {
    try {
      const res = await ApiServices.music.getListMarket(
        (search as string) || "",
        parseInt(`${page}`) || 1,
        pagination.pageSize,
        genre as string
      );
      setData(res.data.data);
      setTotal(res.data.total);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [page, search, genre]);

  return (
    <MusicBaseLayout selectTabIndex={0}>
      <SimpleGrid columns={[1, 2, 2, 2, 4]} gap={5}>
        {data.map((item, index) => (
          <SongNFTComponent key={index} {...item} />
        ))}
      </SimpleGrid>
      <PaginationComponent
        onPaginate={(pageSelect) => {
          router.push(
            `/music/list?genre=${genre}&page=${pageSelect}&search=${search}`,
            undefined,
            { shallow: true }
          );
        }}
        pagination={pagination}
      />
    </MusicBaseLayout>
  );
};

export default List;
