import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import BaseLayout from "../layouts/base";

const Chat: NextPage = () => {
  return (
    <BaseLayout selectTabIndex={4}>
      <Box bg={"white"} borderRadius={5} p={6}>
        This is Chat Tool
      </Box>
    </BaseLayout>
  );
};

export default Chat;
