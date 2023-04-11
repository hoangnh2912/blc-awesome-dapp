import { SimpleGrid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SongNFTComponent from "../../components/song-nft";
import MusicBaseLayout from "../../layouts/music.base";
import ApiServices from "../../services/api";
import { GetMarketOutput } from "../../services/api/types";
const List: NextPage = () => {
  const router = useRouter();
  const { genre, page, search } = router.query;

  const [data, setData] = useState<GetMarketOutput[]>([]);

  const getData = async () => {
    try {
      const res = await ApiServices.music.getListMarket(
        (search as string) || "",
        parseInt(`${page}`) || 1,
        24,
        genre as string
      );
      setData(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [search, page, genre]);

  return (
    <MusicBaseLayout selectTabIndex={0}>
      <SimpleGrid columns={[1, 2, 2, 2, 4]} gap={5}>
        {data.map((item, index) => (
          <SongNFTComponent key={index} {...item} />
        ))}
      </SimpleGrid>
    </MusicBaseLayout>
  );
};

export default List;
