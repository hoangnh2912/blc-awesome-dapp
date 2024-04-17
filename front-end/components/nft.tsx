import {
  AbsoluteCenter,
  Box,
  Center,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { USDT_ICON, colors } from "../constants/constants";
import AnimatedCounter from "./animate-counter";

const NFTComponent = (props: {
  image: string;
  name: string;
  id?: string;
  className?: string;
  bottom?: JSX.Element;
  onClick?: () => void;
  widthPx?: number;
  numberBet?: number;
}) => {
  const { image, name, id, className, bottom, onClick, widthPx, numberBet } =
    props;

  return (
    <Flex
      flexDirection={"column"}
      w={widthPx ? `${widthPx}px` : "170px"}
      borderRadius="lg"
      onClick={onClick}
      alignItems={"center"}
      bgGradient={colors.gradient.nft_box}
      position={"relative"}
    >
      <Box
        id={id}
        className={className}
        transition="all 0.5s ease-in-out"
        w={widthPx ? `${widthPx - 20}px` : "150px"}
        h={widthPx ? `${widthPx - 20}px` : "150px"}
        mt={"10px"}
        backgroundImage={`url(${image})`}
        cursor="pointer"
        backgroundSize="cover"
        borderRadius="lg"
        boxShadow={"0 0 15px 0 rgba(0,0,0,0.5)"}
        backgroundColor="transparent"
        backgroundPosition="center"
      />
      <Center position={"absolute"} top={"3rem"}>
        {!!numberBet && (
          <Stack
            flexDirection={"row"}
            bgGradient={colors.gradient.tether}
            px={"0.35rem"}
            py={"0.35rem"}
            transform={"rotate(-45deg)"}
            boxShadow={"0 0 25px 0 rgba(0,0,0,1)"}
            borderRadius={"4px"}
          >
            <Image w={"1rem"} h={"1rem"} alt="USDT" src={USDT_ICON} />
            <Text fontWeight="bold" color={colors.primary.text} fontSize={"sm"}>
              <AnimatedCounter
                isConvertToInternationalCurrencySystem
                num={numberBet}
              />
            </Text>
          </Stack>
        )}
      </Center>
      <Stack p="3" backdropFilter="auto">
        <Text
          cursor="pointer"
          fontWeight="bold"
          fontSize={"sm"}
          color={colors.primary.text}
          textOverflow="ellipsis"
          textAlign={"center"}
          noOfLines={1}
        >
          {name}
        </Text>
      </Stack>
      {bottom && bottom}
    </Flex>
  );
};

export default NFTComponent;
