import { Center, HStack, Image, Text } from "@chakra-ui/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import BetSuccessHistory from "../components/bet-success-history";
import NFTComponent from "../components/nft";
import NftBetSelect from "../components/nft-bet-select";
import NftPool from "../components/nft-pool";
import RouletteNFT from "../components/roulette-nft";
import { colors, mock } from "../constants/constants";
import { ipfsToHttps } from "../constants/utils";
import BaseLayout from "../layouts/base";
import { useStoreActions, useStoreState } from "../services/redux/hook";

const Play: NextPage = () => {
  const scrollDataDefault = Array.from({ length: 10 }, () =>
    JSON.parse(JSON.stringify(mock.nftData))
  ).flat();

  const [currentBlockNumber, startWatchBlockNumber] = [
    useStoreState((state) => state.app.currentBlockNumber),
    useStoreActions((actions) => actions.app.startWatchBlockNumber),
  ];
  const betResult = useStoreState((state) => state.bet.betResult);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [scrollData, setSrollData] = useState(scrollDataDefault);

  const onScrollSelect = (
    isRouletteScroll: boolean,
    id: string | null,
    callback: any
  ) => {
    setIsScroll(isRouletteScroll);
    if (id) {
      const index = parseInt(id.split("-")[2]);
      setSrollData((prev) => {
        if (betResult < 0) return prev;
        const newData = Array.from({ length: 10 }, () =>
          JSON.parse(JSON.stringify(mock.nftData))
        )
          .flat()
          .map((value) => ({
            value,
            sort: Math.random() * 100 * Math.random(),
          }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        newData[index].image = mock.nftData[betResult].image;
        newData[index].name = mock.nftData[betResult].name;
        return newData;
      });
      callback && callback();
    }
  };

  useEffect(() => {
    startWatchBlockNumber(PolygonAmoyTestnet);
  }, [startWatchBlockNumber]);

  return (
    <BaseLayout>
      <Center my={"1rem"}>
        <HStack gap={"2rem"}>
          <HStack>
            <Image
              w={"50px"}
              h={"50px"}
              alt={PolygonAmoyTestnet.name}
              src={ipfsToHttps(PolygonAmoyTestnet.icon.url)}
            />
            <Text
              fontFamily={"mono"}
              fontWeight="bold"
              color={colors.primary.default}
            >
              {PolygonAmoyTestnet.name}
            </Text>
          </HStack>
          <Text
            fontFamily={"mono"}
            fontWeight="bold"
            color={colors.primary.text}
          >
            Current bet block: {currentBlockNumber.toLocaleString()}
          </Text>
          <Text
            fontFamily={"mono"}
            fontWeight="bold"
            color={colors.primary.text}
          >
            Next bet block: {(currentBlockNumber + 3 * 5).toLocaleString()}
          </Text>
        </HStack>
      </Center>
      <RouletteNFT onScroll={onScrollSelect} select={betResult}>
        <HStack my={"4"} mr={"4"}>
          {scrollData.map((item, index) => (
            <NFTComponent
              key={index}
              className="box-item"
              id={`box-item-${index}`}
              image={isScroll ? mock.nftBox.image : item.image}
              name={isScroll ? mock.nftBox.name : item.name}
            />
          ))}
        </HStack>
      </RouletteNFT>
      <HStack mt={"5rem"} px={"1rem"} spacing={"2rem"}>
        <NftPool />
        <NftBetSelect />
        <BetSuccessHistory />
      </HStack>
    </BaseLayout>
  );
};

export default Play;
