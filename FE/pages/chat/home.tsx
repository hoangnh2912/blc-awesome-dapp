import {
  Box,
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
import Head from "next/head";
import { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/layout";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const ChartMiddle = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <Flex flex={1} h={"45vh"} align={"center"} justifyContent={"center"}>
      <Line options={options} data={data} />
    </Flex>
  );
};

const Topbar = () => (
  <Flex
    bg={"gray.100"}
    h={"81px"}
    w={"100%"}
    align="center"
    p={5}
    justifyContent={"center"}
  >
    <Flex>
      <Heading size={"lg"}>Statisic</Heading>
    </Flex>
  </Flex>
);

const Statistic = () => {
  return (
    <StatGroup p={3} flex={1}>
      <Flex>
        <Flex p={16}>
          <Stat>
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
        </Flex>

        <Flex p={16}>
          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex p={16}>
          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </StatGroup>
  );
};

const Bottomtext = () => {
  return (
    <Box textAlign="center" py={10} px={6} flex={1}>
      <InfoIcon boxSize={"50px"} color={"blue.400"} />
      <Heading as="h2" size="md" mt={6} mb={2}>
        Select a conversation to start chatting now!
      </Heading>
    </Box>
  );
};

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
        <Flex flex={1} direction="column">
          <Topbar />

          <Statistic />

          <ChartMiddle />

          <Bottomtext />
        </Flex>
      </Flex>
    </div>
  );
};

export default HomeChat;
