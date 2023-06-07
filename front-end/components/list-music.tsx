import { Box, Center, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GetMarketOutput } from "../services/api/types";
import NFTComponent from "./nft";
const ListMusicComponent = ({
  data,
}: {
  data: {
    data: GetMarketOutput[];
    genre: string;
  };
}) => {
  const router = useRouter();

  const onClickMore = () => {
    router.push(`/music/list?genre=${data.genre}`);
  };

  return (
    <Box>
      <Text py={"5"} color="white" fontSize={["xl", "2xl"]} fontWeight="black">
        {data.genre.toUpperCase()}
      </Text>
      <SimpleGrid columns={[1, 2, 2, 2, 4]} gap={3}>
        {data.data.map((item, index) => (
          <NFTComponent key={index} {...item} />
        ))}
      </SimpleGrid>
      <Center>
        <Text
          onClick={onClickMore}
          _hover={{ bg: "white", color: "black" }}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="2xl"
          px={5}
          py={1}
          borderColor="white"
          mt={5}
          fontWeight="bold"
          fontSize="md"
          color="white"
        >
          More
        </Text>
      </Center>
    </Box>
  );
};

export default ListMusicComponent;
