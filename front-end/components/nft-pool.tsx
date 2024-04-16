import { HStack, Image, SimpleGrid, Stack, Text, Wrap } from "@chakra-ui/react";
import { USDT_ICON, colors, mock } from "../constants/constants";
import NFTComponent from "./nft";
import fonts from "../constants/font";
import { useStoreActions } from "../services/redux/hook";

const NftPool = () => {
  const setNftTokenId = useStoreActions((actions) => actions.bet.setNftTokenId);

  return (
    <Stack
      flex={1.5}
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
      <Wrap spacing={"2rem"}>
        {mock.nftData.map((item, index) => (
          <NFTComponent
            key={index}
            image={item.image}
            name={item.name}
            numberBet={Math.round(Math.random() * 50000)} 
            onClick={setNftTokenId.bind(null, index)}
            bottom={
              <HStack w={"100%"} pb="0.5rem" justifyContent={"center"}>
                <Text color={colors.primary.text}>
                  Total: <b>{item.bet}</b>
                </Text>
                <Image w={"1.5rem"} h={"1.5rem"} alt="USDT" src={USDT_ICON} />
              </HStack>
            }
          />
        ))}
      </Wrap>
    </Stack>
  );
};

export default NftPool;
