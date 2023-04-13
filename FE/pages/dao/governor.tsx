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
  useBoolean,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { logger } from "ethers/lib/ethers";
import { useEffect, useMemo, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { useModalTransaction } from "../../components/modal-transaction";
import ApiServices from "../../services/api";
import { deployContract } from "../../services/thirdweb";
import { COLOR_INFO } from "../../constants/constants";
import { useStoreActions, useStoreState } from "../../services/redux/hook";

const Governor = () => {
  const [accessControlState, setAccessControlState] = useBoolean(false);

  // Governor setting
  // const [name, setName] = useState("");
  // const [votingDelay, setVotingDelay] = useState(0);
  // const [votingPeriod, setVotingPeriod] = useState(0);
  // const [blockTime, setBlockTime] = useState(0);
  // const [proposalThreshold, setProposalThreshold] = useState(0);
  // const [quorumType, setQuorumType] = useState("percent");
  // const [quorumVotes, setQuorumVotes] = useState(0);
  const [name, setName] = [
    useStoreState((state) => state.dao.name),
    useStoreActions((state) => state.dao.setName),
  ];
  const [votingDelay, setVotingDelay] = [
    useStoreState((state) => state.dao.votingDelay),
    useStoreActions((state) => state.dao.setVotingDelay),
  ];
  const [votingPeriod, setVotingPeriod] = [
    useStoreState((state) => state.dao.votingPeriod),
    useStoreActions((state) => state.dao.setVotingPeriod),
  ];
  const [blockTime, setBlockTime] = [
    useStoreState((state) => state.dao.blockTime),
    useStoreActions((state) => state.dao.setBlockTime),
  ];
  const [proposalThreshold, setProposalThreshold] = [
    useStoreState((state) => state.dao.proposalThreshold),
    useStoreActions((state) => state.dao.setProposalThreshold),
  ];
  const [quorumType, setQuorumType] = [
    useStoreState((state) => state.dao.quorumType),
    useStoreActions((state) => state.dao.setQuorumType),
  ];
  const [quorumVotes, setQuorumVotes] = [
    useStoreState((state) => state.dao.quorumVotes),
    useStoreActions((state) => state.dao.setQuorumVotes),
  ];

  // Token setting
  const [tokenType, setTokenType] = useState("TokenType");
  const [tokenDecimals, setTokenDecimals] = useState(0);

  const [isCustomToken, setIsCustomToken] = [
    useStoreState((state) => state.dao.isCustomToken),
    useStoreActions((state) => state.dao.setIsCustomToken),
  ];
  const [tokenAddress, setTokenAddress] = [
    useStoreState((state) => state.dao.tokenAddress),
    useStoreActions((state) => state.dao.setTokenAddress),
  ];

  const [isTimelock, setIsTimelock] = [
    useStoreState((state) => state.dao.isTimelock),
    useStoreActions((state) => state.dao.setIsTimelock),
  ];

  const sdk = useSDK();
  const toast = useToast();

  // logger.info("voting delay: ", votingDelay);
  // logger.info("quorum type: ", quorumType);

  return (
    <Stack flex={1} borderRadius={5} p={5}>
      <Text as={"b"}>Governor</Text>
      <Stack direction={["row", "column"]}>
        <Stack flex={1}>
          <Text fontSize={16}>DAO name</Text>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            // borderColor="black.300"
            placeholder=""
          />
        </Stack>
        <Stack flex={1} direction={["column", "row"]}>
          <Stack flex={1}>
            <Text fontSize={16}>Voting delay (block)</Text>
            <Input
              value={votingDelay}
              onChange={(e) => setVotingDelay(parseInt(e.target.value))}
              // borderColor="black.300"
              placeholder=""
            />
          </Stack>
          <Stack flex={1}>
            <Text fontSize={16}>Voting period (block)</Text>
            <Input
              value={votingPeriod}
              onChange={(e) => setVotingPeriod(parseInt(e.target.value))}
              // borderColor="black.300"
              placeholder=""
            />
          </Stack>
        </Stack>
        <Stack flex="1" direction={["row", "row"]}>
          <Text fontSize={14}>1 block =</Text>
          <Input
            flex="1"
            value={blockTime}
            onChange={(e) => setBlockTime(parseInt(e.target.value))}
            // borderColor="black.300"
            alignSelf={["center"]}
            width="50%"
            height="20%"
            placeholder=""
          />
          <Text fontSize={14}>seconds</Text>
        </Stack>
        <Stack flex={1} direction={["row", "column"]}>
          <Text fontSize={16}>Proposal threshold</Text>
          <Input
            value={proposalThreshold}
            onChange={(e) => setProposalThreshold(parseInt(e.target.value))}
            // borderColor="black.300"
            placeholder=""
          />
        </Stack>
        <Stack flex={1} direction={["row", "column"]}>
          <Stack flex={1} direction={["row", "row"]}>
            <Text fontSize={16}>Quorum</Text>
            <RadioGroup
              value={quorumType}
              onChange={(e) => setQuorumType(e)}
              colorScheme="blackAlpha"
              defaultValue={quorumType}
            >
              <Stack direction="row">
                <Radio
                  colorScheme="red"
                  value="percent"
                  defaultChecked={quorumType === "percent"}
                >
                  %
                </Radio>
                <Radio colorScheme="green" value="absolute">
                  #
                </Radio>
              </Stack>
            </RadioGroup>
          </Stack>
          <Stack>
            <Input
              value={quorumVotes}
              onChange={(e) => setQuorumVotes(parseInt(e.target.value))}
              // borderColor="black.300"
              placeholder="4"
            />
          </Stack>
          <p />
          <Stack flex={1} direction={["row", "row"]}>
            <Text fontSize={16}> Custom token:</Text>
            <Checkbox
              isChecked={isCustomToken}
              onChange={(e) => setIsCustomToken(e.target.checked)}
            />
          </Stack>
          <Stack>
            {isCustomToken && (
              <Input
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                // borderColor="black.300"
                placeholder=""
              />
            )}
          </Stack>
          <Stack>
            <Stack direction={["column", "row"]}>
              <Text>Timelock</Text>
              <Checkbox
                onChange={(e) => setIsTimelock(e.target.checked)}
                isChecked={isTimelock}
              />
            </Stack>
            <Stack direction={["column", "row"]}>
              <RadioGroup
                isDisabled={!isTimelock}
                colorScheme={"green"}
                defaultValue="Ownable"
              >
                <Stack spacing={5} direction="row">
                  <Radio value="Ownable">Ownable</Radio>
                  {/* <Radio value="Roles">Roles</Radio> */}
                </Stack>
              </RadioGroup>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const GovernorInfo = () => {
  return (
    <Stack flex={1} borderRadius="md" bg="#D6F1E1" justify="center">
      {/* Updated background color */}
      <Heading
        flex={1}
        as="h2"
        size="lg"
        p={5}
        color="#4A5568"
        marginBottom="-5"
        marginTop="-3"
      >
        Governor
      </Heading>
      <Grid
        flex={1}
        templateColumns="repeat(2, 1fr)"
        gap={2}
        bg="whiteAlpha.500"
        // borderWidth={1}
        // borderColor={border}
        p={5}
        borderBottomRadius={5}
        // boxShadow="md"
      >
        <GridItem>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Name:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.dao.name)}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Voting delay:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {" "}
            {useStoreState((state) => state.dao.votingDelay)} (block)
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Voting period:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {" "}
            {useStoreState((state) => state.dao.votingPeriod)} (block)
          </Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Quorum type:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.dao.quorumType)}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Quorum votes:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.dao.quorumVotes)}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Block time:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.dao.blockTime)} (seconds)
          </Text>
        </GridItem>
        {useStoreState((state) => state.dao.isCustomToken) && (
          <GridItem>
            <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
              Custom token address:
            </Text>
            <Text color={COLOR_INFO().TEXT_COLOR_INFO}>{}</Text>
          </GridItem>
        )}
      </Grid>
    </Stack>
  );
};

export { GovernorInfo };
export default Governor;
