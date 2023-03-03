import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import MusicBaseLayout from "../../layouts/music.base";
const Album: NextPage = () => {
  return (
    <MusicBaseLayout selectTabIndex={0}>
      <Text color={"white"}>Album</Text>
    </MusicBaseLayout>
  );
};

export default Album;
