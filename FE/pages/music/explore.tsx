import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ListMusicComponent from "../../components/list-music";
import MusicBaseLayout from "../../layouts/music.base";
import ApiServices from "../../services/api";
import { GetMarketOutput } from "../../services/api/types";
const Explore: NextPage = () => {
  const [data, setData] = useState<
    {
      data: GetMarketOutput[];
      genre: string;
    }[]
  >([]);

  const getData = async () => {
    try {
      const res = await ApiServices.music.getHomeMarket();
      setData(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MusicBaseLayout selectTabIndex={0}>
      {data.map((item, index) => (
        <div key={index}>
          <ListMusicComponent data={item} />
        </div>
      ))}
    </MusicBaseLayout>
  );
};

export default Explore;
