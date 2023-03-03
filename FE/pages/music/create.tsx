import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import MusicBaseLayout from "../../layouts/music.base";
const Create: NextPage = () => {
  return (
    <MusicBaseLayout selectTabIndex={0}>
      <Text color={"white"}>Create</Text>
    </MusicBaseLayout>
  );
};

export default Create;
