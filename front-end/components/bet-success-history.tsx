import { Stack, Text } from "@chakra-ui/react";
import { colors, mock } from "../constants/constants";
import fonts from "../constants/font";
import NFTComponent from "./nft";

const BetSuccessHistory = () => {
  return (
    <Stack
      flex={1}
      borderWidth={"2px"}
      p={"1rem"}
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
      <Stack maxH={"600px"} overflowY={"scroll"}>
        {[
          ...mock.betSuccessHistoryData,
          ...mock.betSuccessHistoryData,
          ...mock.betSuccessHistoryData,
        ].map((data, index) => (
          <Stack key={index}>
            <NFTComponent
              widthPx={100}
              image={mock.nftData[data.nft_id].image}
              name={mock.nftData[data.nft_id].name}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default BetSuccessHistory;
