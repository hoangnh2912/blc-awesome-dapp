import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ListMusicComponent from "../../components/list-music";
import SongNFTSmallComponent from "../../components/song-nft-small";
import MusicBaseLayout from "../../layouts/music.base";
import ApiServices from "../../services/api";
import {
  GetHomeMarketOutput,
  GetTopMarketOutput,
} from "../../services/api/types";

const tabProps = {
  _selected: {
    color: "#fcae00",
    borderBottomColor: "#fcae00",
    borderBottomWidth: "5px",
  },
  color: "white",
  fontFamily: "mono",
  fontWeight: "bold",
  fontSize: "16",
};

const Explore: NextPage = () => {
  const [data, setData] = useState<GetHomeMarketOutput[]>([]);

  const [topMarket, setTopMarket] = useState<GetTopMarketOutput>({
    most_played: [],
    most_sold: [],
    most_viewed: [],
  });

  const getData = async () => {
    try {
      const res = await ApiServices.music.getHomeMarket();
      setData(res.data.data);
    } catch (error) {}
  };

  const getTopMarket = async () => {
    try {
      const res = await ApiServices.music.getTopMarket();
      setTopMarket(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
    getTopMarket();
  }, []);

  return (
    <MusicBaseLayout selectTabIndex={0}>
      <Tabs my="2" variant="line">
        <TabList>
          <Tab {...tabProps}>Most sold</Tab>
          <Tab {...tabProps}>Most played</Tab>
          <Tab {...tabProps}>Most viewed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <SimpleGrid mt={"1rem"} columns={[1, 1, 1, 1, 2]} spacing={2}>
              {topMarket.most_sold.map((item, index) => (
                <SongNFTSmallComponent key={index} {...item.data} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel p={0}>
            <SimpleGrid mt={"1rem"} columns={[1, 1, 1, 1, 2]} spacing={2}>
              {topMarket.most_played.map((item, index) => (
                <SongNFTSmallComponent key={index} {...item} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel p={0}>
            <SimpleGrid mt={"1rem"} columns={[1, 1, 1, 1, 2]} spacing={2}>
              {topMarket.most_viewed.map((item, index) => (
                <SongNFTSmallComponent key={index} {...item} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {data.map((item, index) => (
        <ListMusicComponent key={index} data={item} />
      ))}
    </MusicBaseLayout>
  );
};

export default Explore;
