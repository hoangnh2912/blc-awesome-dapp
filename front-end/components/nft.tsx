import { Box, Image, Stack, Text } from "@chakra-ui/react";

const NFTComponent = (props: { image: string; name: string; id: number }) => {
  const { image, name, id } = props;

  return (
    <Box
      w={["200px"]}
      borderRadius="lg"
      borderWidth={"1px"}
      borderColor={"gray.400"}
      overflow="hidden"
    >
      <Box
        id={`box-item-${id}`}
        transition="all 2s ease-in-out"
        w={["full"]}
        h={["200px"]}
        backgroundImage={`url(${image})`}
        cursor="pointer"
        backgroundSize="cover"
        backgroundColor="transparent"
        backgroundPosition="center"
      />
      <Stack
        p="3"
        zIndex="0"
        bgGradient="linear(transparent,rgba(0,0,0,0.1),transparent)"
        backdropFilter="auto"
        backdropBlur="1rem"
      >
        <Text
          cursor="pointer"
          fontWeight="bold"
          textOverflow="ellipsis"
          noOfLines={1}
        >
          {name}
        </Text>
      </Stack>
    </Box>
  );
};

export default NFTComponent;
