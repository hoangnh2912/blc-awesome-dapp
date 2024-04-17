import { HStack, Image, SimpleGrid, Stack, Text, Wrap } from "@chakra-ui/react";
import { USDT_ICON, colors, mock } from "../constants/constants";
import NFTComponent from "./nft";
import fonts from "../constants/font";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import AnimatedCounter from "./animate-counter";
import { convertToInternationalCurrencySystem } from "../constants/utils";

const NftPool = () => {
  const setNftTokenId = useStoreActions((actions) => actions.bet.setNftTokenId);
  const betSession = useStoreState((states) => states.bet.betSession);

  return (
    <Stack
      flex={1.5}
      height={"500px"}
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
        NFT Pool
      </Text>
      <Wrap overflowY={"scroll"} spacing={"2rem"}>
        {mock.nftData.map((item, index) => {
          const numberBet =
            betSession.find((bet) => bet.nftTokenId === index)?.usdt || 0;
          return (
            <NFTComponent
              key={index}
              image={item.image}
              name={item.name}
              numberBet={numberBet}
              onClick={setNftTokenId.bind(null, index)}
              bottom={
                <HStack w={"100%"} pb="0.5rem" justifyContent={"center"}>
                  <Text
                    color={colors.primary.text}
                    display={"flex"}
                    flexDirection={"row"}
                    gap={"0.5rem"}
                  >
                    Total:{" "}
                    <AnimatedCounter
                      isConvertToInternationalCurrencySystem
                      num={numberBet}
                    />
                  </Text>
                  <Image w={"1.5rem"} h={"1.5rem"} alt="USDT" src={USDT_ICON} />
                </HStack>
              }
            />
          );
        })}
      </Wrap>
    </Stack>
  );
};

export default NftPool;
