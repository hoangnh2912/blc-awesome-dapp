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
import { ContractInterface, logger } from "ethers/lib/ethers";
import { useEffect, useMemo, useState } from "react";
import { ABI_DAO } from "../../constants/abi";
import { IoIosSettings } from "react-icons/io";
import { useModalTransaction } from "../../components/modal-transaction";
import ApiServices from "../../services/api";
import { deployContract } from "../../services/thirdweb";
import { useStoreActions, useStoreState } from "../../services/redux/hook";

import { GovernorInfo } from "./governor";
import { Erc20Info } from "./erc20votes";
import { Erc721Info } from "./erc721votes";
import { TimelockInfo } from "./timelock";
import { Axios } from "axios";

const ReviewGovernor = () => {
  // Governor
  const name = useStoreState((state) => state.dao.name);
  const votingDelay = useStoreState((state) => state.dao.votingDelay);
  const votingPeriod = useStoreState((state) => state.dao.votingPeriod);
  const blockTime = useStoreState((state) => state.dao.blockTime);
  const proposalThreshold = useStoreState(
    (state) => state.dao.proposalThreshold
  );
  const quorumType = useStoreState((state) => state.dao.quorumType);
  const quorumVotes = useStoreState((state) => state.dao.quorumVotes);

  // Token
  const tokenType = useStoreState((state) => state.dao.tokenType);
  const erc20State = useStoreState((state) => state.erc20);
  const erc721State = useStoreState((state) => state.erc721);

  const isTimelock = useStoreState((state) => state.dao.isTimelock);
  // Timelock
  const minDelay = useStoreState((state) => state.timelock.minDelay);
  const proposers = useStoreState((state) => state.timelock.proposers);
  const executors = useStoreState((state) => state.timelock.executors);
  const admin = useStoreState((state) => state.timelock.admin);

  const sdk = useSDK();
  const toast = useToast();

  const { onOpen, setTxResult } = useModalTransaction();

  const deployToken = async () => {
    try {
      if (onOpen) onOpen();
      let res: any;
      if (tokenType === "ERC20Votes") {
        res = await ApiServices.tokenCreator.erc20({
          name: erc20State.name,
          symbol: erc20State.symbol,
          initial_supply: erc20State.preMint,
          is_burnable: erc20State.burnable,
          is_mintable: erc20State.mintable,
          is_pausable: erc20State.pausable,
          is_vote: true,
        });
      } else if (tokenType === "ERC721Votes") {
        res = await ApiServices.tokenCreator.erc721({
          name: erc721State.name,
          symbol: erc721State.symbol,
          baseURI: erc721State.baseURI,
          is_burnable: erc721State.burnable,
          is_mintable: erc721State.mintable,
          is_pausable: erc721State.pausable,
          is_uri_storage: erc721State.uriStorage,
          is_vote: true,
        });
      }

      let timelock_abi;
      let timelock_bytecode;
      let govenor_abi;
      let governor_bytecode;
      if (isTimelock) {
        timelock_bytecode = ABI_DAO.TimelockController.bytecode;
        timelock_abi = ABI_DAO.TimelockController.abi;
      }

      if (isTimelock && quorumType === "percent") {
        governor_bytecode = ABI_DAO.GovernorQuorumFractionTimelock.bytecode;
        govenor_abi = ABI_DAO.GovernorQuorumFractionTimelock.abi;
      } else if (isTimelock && quorumType === "absolute") {
        governor_bytecode = ABI_DAO.GovernorQuorumTimelock.bytecode;
        govenor_abi = ABI_DAO.GovernorQuorumTimelock.abi;
      } else if (!isTimelock && quorumType === "percent") {
        governor_bytecode = ABI_DAO.GovernorQuorumFractionNonTimelock.bytecode;
        govenor_abi = ABI_DAO.GovernorQuorumFractionNonTimelock.abi;
      } else if (!isTimelock && quorumType === "absolute") {
        governor_bytecode = ABI_DAO.GovernorQuorumNonTimelock.bytecode;
        govenor_abi = ABI_DAO.GovernorQuorumNonTimelock.abi;
      }

      const token_bytecode = res.data.data.bytecode;
      const token_abi = res.data.data.abi;
      const token_name = res.data.data.name;
      const token_uuid = res.data.data.uuid;
      console.log({ token_bytecode, token_abi, token_name, token_uuid });
      console.log(res.data.data);

      let totalContractDeployed = [];
      console.log("pro vjp: ", proposers, executors, admin);
      try {
        if (!sdk) return;
        //Contract deploy
        const contractDeployed = await deployContract(
          sdk,
          token_abi,
          token_bytecode,
          []
        );

        //Contract info
        setTxResult({
          reason: "",
          content: [
            {
              title: "Transaction Hash",
              value: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://mumbai.polygonscan.com/tx/${contractDeployed.transactionHash}`}
                >
                  {contractDeployed.transactionHash}
                </a>
              ),
            },
            {
              title: "Contract Address",
              value: <Spinner color="green.500" />,
            },
          ],
          txState: "success",
        });
        const { contractAddress } = await contractDeployed.deployed();
        setTxResult({
          reason: "",
          content: [
            {
              title: "Transaction Hash",
              value: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://mumbai.polygonscan.com/tx/${contractDeployed.transactionHash}`}
                >
                  {contractDeployed.transactionHash}
                </a>
              ),
            },
            {
              title: "Contract Address",
              value: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://mumbai.polygonscan.com/address/${contractAddress}`}
                >
                  {contractAddress}
                </a>
              ),
            },
          ],
          txState: "success",
        });
        if (contractAddress)
          await ApiServices.tokenCreator.verify({
            uuid,
            address: contractAddress,
            name: contractName,
          });
      } catch (error: any) {
        setTxResult({
          reason: error.message,
          content: [],
          txState: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack flex={1} borderRadius={5} p={5} bg="white">
      <Heading as="h1" size="xl" mb={3}>
        KingDAOX Information
      </Heading>
      <GovernorInfo />
      <p />
      {tokenType === "ERC20Votes" ? <Erc20Info /> : null}
      {tokenType === "ERC721Votes" ? <Erc721Info /> : null}
      {isTimelock ? <TimelockInfo /> : null}
      <Button
        leftIcon={<IoIosSettings />}
        onClick={deployToken}
        colorScheme="teal"
        variant="solid"
      >
        Deploy
      </Button>
    </Stack>
  );
};

export default ReviewGovernor;
