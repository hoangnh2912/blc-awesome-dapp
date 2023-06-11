import { Box, Stack, Text } from "@chakra-ui/react";

const NFTComponent = (props: {
  image: string;
  name: string;
  id?: string;
  className?: string;
}) => {
  const { image, name, id, className } = props;

  return (
    <Box
      w={["200px"]}
      borderRadius="lg"
      borderBottomRadius={"none"}
      borderWidth={"1px"}
      borderColor={"gray.400"}
      overflow="hidden"
    >
      <Box
        id={id}
        className={className}
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
          fontSize={"sm"}
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
