import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { colors, mock } from "../constants/constants";
import fonts from "../constants/font";
import NFTComponent from "./nft";
import { useStoreState } from "../services/redux/hook";

const BetSuccessHistory = () => {
  const historyBet = useStoreState((states) => states.bet.historyBet);
  return (
    <Stack
      flex={1}
      borderWidth={"2px"}
      p={"1rem"}
      height={"650px"}
      borderRadius={"25px"}
      borderColor={colors.primary.default}
      position={"relative"}
      bgGradient={colors.gradient.background}
      boxShadow={"0 0 15px 0 rgba(0,0,0,0.5)"}
    >
      <Text
        fontWeight="bold"
        fontSize={"1.5rem"}
        position={"absolute"}
        className={fonts.bungeeShade.className}
        color={colors.primary.text}
        top={"-1.8rem"}
        bg={colors.primary.default}
        px={"0.5rem"}
        borderRadius={"8px"}
      >
        Award History
      </Text>
      <Stack overflowY={"scroll"}>
        {historyBet.map((data, index) => (
          <Stack flexDir={"row"} alignItems={"center"} key={index}>
            <Flex>
              <NFTComponent
                widthPx={180}
                image={mock.nftData[data.nft_id].image}
                name={mock.nftData[data.nft_id].name}
              />
            </Flex>
            <Stack>
              <Text fontFamily={"mono"} color={colors.primary.text}>
                Total Winners {data.number_of_winners} - Total bet{" "}
                {data.total_bet} USDT at block {data.at_block.toLocaleString()}{" "}
                - {new Date(data.at).toLocaleString()}
              </Text>
              {data.awards.map((award, indexAward) => (
                <Text
                  fontFamily={"mono"}
                  color={colors.primary.text}
                  key={indexAward}
                >
                  {award.amount} USDT for {award.wallet_address}
                </Text>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default BetSuccessHistory;
