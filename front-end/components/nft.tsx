import {
  AbsoluteCenter,
  Box,
  Center,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { USDT_ICON, colors } from "../constants/constants";

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
    <Stack
      w={widthPx ? `${widthPx}px` : "200px"}
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
        w={widthPx ? `${widthPx - 20}px` : "180px"}
        h={widthPx ? `${widthPx - 20}px` : "180px"}
        mt={"10px"}
        backgroundImage={`url(${image})`}
        cursor="pointer"
        backgroundSize="cover"
        borderRadius="lg"
        boxShadow={"0 0 15px 0 rgba(0,0,0,0.5)"}
        backgroundColor="transparent"
        backgroundPosition="center"
      />
      {numberBet && (
        <Center position={"absolute"} top={"5rem"}>
          <Stack
            flexDirection={"row"}
            bgGradient={
              "linear-gradient(50deg, rgba(0,106,66,1) 12%, rgba(34,147,104,1) 100%)"
            }
            px={"1rem"}
            py={"0.5rem"}
            transform={"rotate(-45deg)"}
            borderRadius={"8px"}
          >
            <Image w={"1.5rem"} h={"1.5rem"} alt="USDT" src={USDT_ICON} />
            <Text fontWeight="bold" color={colors.primary.text} fontSize={"lg"}>
              {numberBet.toLocaleString()}
            </Text>
          </Stack>
        </Center>
      )}

      <Stack p="3" backdropFilter="auto">
        <Text
          cursor="pointer"
          fontWeight="bold"
          fontSize={"sm"}
          color={colors.primary.text}
          textOverflow="ellipsis"
          noOfLines={1}
        >
          {name}
        </Text>
      </Stack>
      {bottom && bottom}
    </Stack>
  );
};

export default NFTComponent;
