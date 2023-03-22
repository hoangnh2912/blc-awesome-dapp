import { Flex } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
// import Sidebar from "../../components/sidebar";
// import { SideBarData } from "../../constants/data/sidebar";
// import BaseLayout from "../../layouts/base";
import ChatSidebar from "../chat";

const Topbar = () => (
  <Flex>
    <Avatar src="" />
  </Flex>
);

const detail = () => (
  <Flex h="100vh">
    <ChatSidebar />

    <Flex flex={1}>
      <Topbar />
    </Flex>
  </Flex>
);
export default detail;
