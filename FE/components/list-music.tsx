import { Box, Center, SimpleGrid, Text } from "@chakra-ui/react";
import SongNFTComponent, { SongNFTProps } from "./song-nft";
const ListMusicComponent = ({ data }: { data: SongNFTProps[] }) => {
  return (
    <Box>
      <SimpleGrid columns={[1, 2, 2, 2, 4]} gap={3}>
        {data.map((item, index) => (
          <SongNFTComponent key={index} {...item} />
        ))}
      </SimpleGrid>
      <Center>
        <Text
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
