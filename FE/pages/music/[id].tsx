import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import MusicBaseLayout from "../../layouts/music.base";

const Music = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MusicBaseLayout selectTabIndex={0}>
      <Text py={"5"} color="white" fontSize={["xl", "2xl"]} fontWeight="black">
        {id}
      </Text>
    </MusicBaseLayout>
  );
};

export default Music;
