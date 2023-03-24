import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  GridItem,
  Heading,
  Grid,
  useBoolean,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { logger } from "ethers/lib/ethers";
import { useEffect, useMemo, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { useModalTransaction } from "../../components/modal-transaction";
import ApiServices from "../../services/api";
import { deployContract } from "../../services/thirdweb";
import { useStoreActions, useStoreState } from "../../services/redux/hook";

import { GovernorInfo } from "./governor";
import { Erc20Info } from "./erc20votes";
import { Erc721Info } from "./erc721votes";
import { TimelockInfo } from "./timelock";

const ReviewGovernor = () => {
  const name = useStoreState((state) => state.dao.name);
  const votingDelay = useStoreState((state) => state.dao.votingDelay);
  const votingPeriod = useStoreState((state) => state.dao.votingPeriod);
  const blockTime = useStoreState((state) => state.dao.blockTime);
  const proposalThreshold = useStoreState(
    (state) => state.dao.proposalThreshold
  );
  const quorumType = useStoreState((state) => state.dao.quorumType);
  const quorumVotes = useStoreState((state) => state.dao.quorumVotes);
  const tokenType = useStoreState((state) => state.dao.tokenType);

  const bg = useColorModeValue("gray.200", "gray.700");
  const border = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.100");

  // return (
  //   <Stack flex={1} borderRadius={5} p={5}>
  //     <Stack>
  //       <GovernorInfo />
  //     </Stack>
  //     <Stack>
  //       {tokenType === "ERC20Votes" ? <Erc20Info /> : null}
  //       {tokenType === "ERC721Votes" ? <Erc721Info /> : null}
  //     </Stack>
  //     <Stack>
  //       <TimelockInfo />
  //     </Stack>
  //   </Stack>
  // );

  // return (
  //   <Stack flex={1} borderRadius={5} p={5}>
  //     <Heading size="lg" mb={2}>
  //       Governor
  //     </Heading>
  //     <Grid
  //       templateColumns="repeat(2, 1fr)"
  //       gap={2}
  //       bg={bg}
  //       borderWidth={1}
  //       borderColor={border}
  //       p={2}
  //       borderRadius={5}
  //     >
  //       <GridItem>
  //         <Text fontWeight="bold" color={textColor}>
  //           Name:
  //         </Text>
  //         <Text color={textColor}>KingDAOX</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Voting delay:
  //         </Text>
  //         <Text color={textColor}>1</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Voting period:
  //         </Text>
  //         <Text color={textColor}>3600</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Block time:
  //         </Text>
  //         <Text color={textColor}>12</Text>
  //       </GridItem>
  //       <GridItem>
  //         <Text fontWeight="bold" color={textColor}>
  //           Proposal threshold:
  //         </Text>
  //         <Text color={textColor}>0</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Quorum type:
  //         </Text>
  //         <Text color={textColor}>percent</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Quorum votes:
  //         </Text>
  //         <Text color={textColor}>4</Text>
  //       </GridItem>
  //     </Grid>
  //   </Stack>
  // );

  // return (
  //   <Stack flex={1} borderRadius={5} p={5} bg="white">
  //     <Heading size="lg" mb={2}>
  //       Governor
  //     </Heading>
  //     <Grid
  //       templateColumns="repeat(2, 1fr)"
  //       gap={2}
  //       bg={bg}
  //       borderWidth={1}
  //       borderColor={border}
  //       p={2}
  //       borderRadius={5}
  //     >
  //       <GridItem>
  //         <Text fontWeight="bold" color={textColor}>
  //           Name:
  //         </Text>
  //         <Text color={textColor}>KingDAOX</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Voting delay:
  //         </Text>
  //         <Text color={textColor}>1</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Voting period:
  //         </Text>
  //         <Text color={textColor}>3600</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Block time:
  //         </Text>
  //         <Text color={textColor}>12</Text>
  //       </GridItem>
  //       <GridItem>
  //         <Text fontWeight="bold" color={textColor}>
  //           Proposal threshold:
  //         </Text>
  //         <Text color={textColor}>0</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Quorum type:
  //         </Text>
  //         <Text color={textColor}>percent</Text>
  //         <Text fontWeight="bold" color={textColor}>
  //           Quorum votes:
  //         </Text>
  //         <Text color={textColor}>4</Text>
  //       </GridItem>
  //     </Grid>
  //   </Stack>
  // );

  return (
    <Stack flex={1} borderRadius={5} p={5} bg="white">
      <Heading as="h1" size="xl" mb={3}>
        KingDAOX Information
      </Heading>
      <GovernorInfo />
      <p />
      <Erc20Info />
      <Erc721Info />
      <TimelockInfo />
    </Stack>
  );

  // return (
  //   <Box p="6" boxShadow="md" borderRadius="lg">
  //     <Box mb="4">
  //       <Heading as="h2" size="lg" mb="2">
  //         Governor
  //       </Heading>
  //       <Box>
  //         <Text fontWeight="bold">Name:</Text>
  //         <Text ml="2">KingDAOX</Text>
  //         <Text fontWeight="bold" mt="2">
  //           Voting delay:
  //         </Text>
  //         <Text ml="2">1</Text>
  //         <Text fontWeight="bold" mt="2">
  //           Voting period:
  //         </Text>
  //         <Text ml="2">3600</Text>
  //         <Text fontWeight="bold" mt="2">
  //           Block time:
  //         </Text>
  //         <Text ml="2">12</Text>
  //         <Text fontWeight="bold" mt="2">
  //           Proposal threshold:
  //         </Text>
  //         <Text ml="2">0</Text>
  //         <Text fontWeight="bold" mt="2">
  //           Quorum type:
  //         </Text>
  //         <Text ml="2">percent</Text>
  //         <Text fontWeight="bold" mt="2">
  //           Quorum votes:
  //         </Text>
  //         <Text ml="2">4</Text>
  //       </Box>
  //     </Box>
  //   </Box>
  // );

  // return (
  //   <Flex
  //     bg="gray.50"
  //     p={8}
  //     borderRadius="md"
  //     boxShadow="xl"
  //     alignItems="center"
  //     justify="center"
  //     height="100vh"
  //   >
  //     <Box bg="white" p={8} borderRadius="md" boxShadow="md" maxW="lg" w="full">
  //       <Heading mb={4}>KingDAOX Information</Heading>
  //       <Text mb={2} fontWeight="bold">
  //         Governor
  //       </Text>
  //       <Text mb={2}>Name: KingDAOX</Text>
  //       <Text mb={2}>Voting delay: 1</Text>
  //       <Text mb={2}>Voting period: 3600</Text>
  //       <Text mb={2}>Block time: 12</Text>
  //       <Text mb={2}>Proposal threshold: 0</Text>
  //       <Text mb={2}>Quorum type: percent</Text>
  //       <Text mb={4}>Quorum votes: 4</Text>
  //     </Box>
  //   </Flex>
  // );
};

export default ReviewGovernor;
