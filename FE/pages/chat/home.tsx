import {
  Box,
  ChakraProvider,
  Text,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import ChatSidebar from "../../components/sidebar-chat";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/layout";

// function MyChat({ Component, pageProps }: AppProps) {
//   return (
//     <ChakraProvider>
//       <ChatSidebar />
//     </ChakraProvider>
//   );
// }

const Topbar = () => (
  <Flex bg={"gray.100"} h="81px" w={"100%"} align="center">
    <Flex direction={"column"} align="center">
      <Heading size={"lg"} alignContent="center">
        Statisic
      </Heading>
    </Flex>
  </Flex>
);

const HomeChat: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Decentralized Chat</title>
        <meta
          name="description"
          content="Communicating with your own Web3 Account"
        />
        <link
          rel="icon"
          href="https://cdn.iconscout.com/icon/free/png-512/chat-1438147-1213937.png?f=avif&w=256"
        />
      </Head>

      <Flex h="100vh">
        <ChatSidebar />
        <Flex flex={1} direction="column" p={3} pt={0}>
          <Topbar />

          <StatGroup>
            <Stat alignSelf={"flex-start"}>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>

            <Stat alignSelf={"flex-end"}>
              <StatLabel>Clicked</StatLabel>
              <StatNumber>45</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Flex>
      </Flex>
    </div>
  );
};

export default HomeChat;
