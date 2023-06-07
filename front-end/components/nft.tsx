import { Box, Image, Stack, Text } from "@chakra-ui/react";

const NFTComponent = (props: { image: string; name: string }) => {
  const { image, name } = props;

  return (
    <Box w={["250px"]} borderRadius="lg" overflow="hidden">
      <Image
        _hover={{
          transform: "scale(1.2)",
        }}
        alt="image"
        transition="all 0.3s ease-in-out"
        w={["full"]}
        h={["250px"]}
        fit="cover"
        cursor="pointer"
        src={image}
      />
      <Box
        backgroundImage={`url(${image})`}
        backgroundSize="cover"
        backgroundColor="transparent"
      >
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
    </Box>
  );
};

export default NFTComponent;
