import { ChakraProvider } from "@chakra-ui/react";
import ChatSidebar from "../components/sidebar-chat";
import HomeChat from "./chat/home";
import type { AppProps } from "next/app";
import { NextPage } from "next";

// function MyChat({ Component, pageProps }: AppProps) {
//   return (
//     <ChakraProvider>
//       <ChatSidebar />
//     </ChakraProvider>
//   );
// }

const MyChat: NextPage = () => {
  return <HomeChat />;
};

export default MyChat;
