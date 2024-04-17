import { Center, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import { useAddress } from "@thirdweb-dev/react";
import { debounce, delay, set } from "lodash";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import AnimatedCounter from "../components/animate-counter";
import BetSuccessHistory from "../components/bet-success-history";
import NFTComponent from "../components/nft";
import NftBetSelect from "../components/nft-bet-select";
import NftPool from "../components/nft-pool";
import RouletteNFT from "../components/roulette-nft";
import { USDT_ICON, colors, mock } from "../constants/constants";
import { findNextNumberDivisible } from "../constants/utils";
import BaseLayout from "../layouts/base";
import { useStoreActions, useStoreState } from "../services/redux/hook";

const Play: NextPage = () => {
  const scrollDataDefault = Array.from({ length: 10 }, () =>
    JSON.parse(JSON.stringify(mock.nftData))
  ).flat();

  const walletAddress = useAddress();

  const [
    currentBlockNumber,
    startWatchBlockNumber,
    stopWatchBlockNumber,
    nextBetBlock,
    setNextBetBlock,
  ] = [
    useStoreState((state) => state.app.currentBlockNumber),
    useStoreActions((actions) => actions.app.startWatchBlockNumber),
    useStoreActions((actions) => actions.app.stopWatchBlockNumber),
    useStoreState((state) => state.app.nextBetBlock),
    useStoreActions((actions) => actions.app.setNextBetBlock),
  ];
  const [
    betResult,
    setBetResult,
    clearBetState,
    accumulatedUsdt,
    setAccumulatedUsdt,
    addHistoryBet,
  ] = [
    useStoreState((state) => state.bet.betResult),
    useStoreActions((actions) => actions.bet.setBetResult),
    useStoreActions((actions) => actions.bet.clearBetState),
    useStoreState((state) => state.bet.accumulatedUsdt),
    useStoreActions((actions) => actions.bet.setAccumulatedUsdt),
    useStoreActions((actions) => actions.bet.addHistoryBet),
  ];

  const [walletUsdtBalance, setWalletUsdtBalance, betSession] = [
    useStoreState((state) => state.bet.walletUsdtBalance),
    useStoreActions((actions) => actions.bet.setWalletUsdtBalance),
    useStoreState((state) => state.bet.betSession),
  ];
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [scrollData, setSrollData] = useState(scrollDataDefault);

  useEffect(() => {
    if (!nextBetBlock && currentBlockNumber) {
      setNextBetBlock(findNextNumberDivisible(currentBlockNumber));
    }
  }, [currentBlockNumber, nextBetBlock, setNextBetBlock]);

  const onScrollSelect = (
    isRouletteScroll: boolean,
    id: string | null,
    callback: any
  ) => {
    setIsScroll(isRouletteScroll);
    if (id) {
      const indexOfElementInRedLine = parseInt(id.split("-")[2]);
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
        newData[indexOfElementInRedLine].image = mock.nftData[betResult].image;
        newData[indexOfElementInRedLine].name = mock.nftData[betResult].name;
        return newData;
      });
      callback && callback();

      if (betSession.length > 0) {
        betSession.forEach((item) => {
          if (item.nftTokenId === betResult) {
            setWalletUsdtBalance(walletUsdtBalance + item.usdt);
          } else {
            setAccumulatedUsdt(accumulatedUsdt + item.usdt);
          }
        });
      }
      const totalBet = betSession.reduce((acc, item) => acc + item.usdt, 0);
      const numberOfWinners = betSession.filter(
        (item) => item.nftTokenId === betResult
      ).length;
      addHistoryBet({
        at_block: nextBetBlock,
        at: Date.now(),
        awards: betSession
          .filter((item) => item.nftTokenId === betResult)
          .map((item) => ({
            amount: item.usdt,
            wallet_address: walletAddress || "",
          })),
        nft_contract: "0x",
        nft_id: betResult,
        number_of_bets: 1,
        number_of_winners: numberOfWinners,
        total_bet: totalBet,
      });
      setNextBetBlock(findNextNumberDivisible(currentBlockNumber));
      delay(clearBetState, 5000);
    }
  };

  useEffect(() => {
    if (
      currentBlockNumber &&
      nextBetBlock &&
      currentBlockNumber >= nextBetBlock
    ) {
      debounce(
        setBetResult,
        500
      )(Math.round(Math.random() * (mock.nftData.length - 1)));
    }
  }, [currentBlockNumber, nextBetBlock, setBetResult]);

  useEffect(() => {
    setWalletUsdtBalance(20000);
    startWatchBlockNumber(PolygonAmoyTestnet);
    return () => {
      stopWatchBlockNumber();
    };
  }, [startWatchBlockNumber, stopWatchBlockNumber, setWalletUsdtBalance]);

  return (
    <BaseLayout>
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

      <Center>
        <Stack p={"1rem"} textAlign={"center"}>
          <Text
            fontFamily={"mono"}
            fontWeight="bold"
            color={colors.primary.text}
          >
            Your USDT balance
          </Text>
          <Text
            fontFamily={"mono"}
            fontWeight="bold"
            fontSize={"25px"}
            color={colors.primary.text}
            borderRadius={"8px"}
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"center"}
            gap={"0.5rem"}
            alignItems={"center"}
          >
            <AnimatedCounter num={walletUsdtBalance} />
            <Image w={"1.5rem"} h={"1.5rem"} alt="USDT" src={USDT_ICON} />
          </Text>
        </Stack>
      </Center>
      <HStack mt={"2.5rem"} px={"1rem"} spacing={"2rem"}>
        <NftPool />
        <NftBetSelect />
        <BetSuccessHistory />
      </HStack>
    </BaseLayout>
  );
};

export default Play;
