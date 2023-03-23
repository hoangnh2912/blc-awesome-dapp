import { Avatar, Flex, Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import type { NextPage } from "next";
import BaseLayout from "../layouts/base";
import { ArrowLeftIcon } from "@chakra-ui/icons";

const User = () => (
  <Flex p={3} align={"center"} _hover={{ bg: "gray.100", cursor: "pointer" }}>
    <Avatar src="" marginEnd={3} />
    <Text>User 1</Text>
  </Flex>
);

const ChatSidebar: NextPage = () => (
  <Flex
    // bg={"blue.100"}
    w="300px"
    h="100%"
    borderEnd={"1px solid"}
    borderColor="gray.200"
    direction={"column"}
  >
    <Flex
      // bg="red.100"
      h="81px"
      w="100%"
      align={"center"}
      justifyContent="space-between"
      p={3}
      borderBottom="1px solid"
      borderColor={"gray.200"}
    >
      <Flex align={"center"}>
        <Avatar src="" marginEnd={3} />
        <Text>Anders</Text>
      </Flex>

      <IconButton icon={<ArrowLeftIcon />} aria-label={""} size="sm" isRound />
    </Flex>
    <Button m={5} p={4}>
      New Chat
    </Button>
    <Flex
      overflowX={"scroll"}
      direction="column"
      sx={{
        "&::-webkit-scrollbar": {
          width: "1px",
        },
      }}
      flex={1}
      //   sx={{ scrollbarWidth: "none" }}
    >
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
    </Flex>
  </Flex>
);

export default ChatSidebar;
