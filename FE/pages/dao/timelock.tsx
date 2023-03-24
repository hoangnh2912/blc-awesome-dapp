import {
  AbsoluteCenter,
  Button,
  ButtonProps,
  Center,
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
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { useEffect, useMemo, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { useModalTransaction } from "../../components/modal-transaction";
import ApiServices from "../../services/api";
import { deployContract } from "../../services/thirdweb";
import { ABI_DAO } from "../../constants/abi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { logger } from "ethers";
import { useFieldArray, useForm } from "react-hook-form";
import { useStoreActions, useStoreState } from "../../services/redux/hook";
import { COLOR_INFO } from "../../constants/constants";

const Timelock = () => {
  const [minDelay, setMinDelay] = useState("MinDelay");
  const [proposers, setProposers] = useState([{ proposer: "" }]);
  const [executors, setExecutors] = useState([{ executor: "" }]);
  const [admin, setAdmin] = useState("Admin");

  const { onOpen, setTxResult } = useModalTransaction();

  const setMinDelayGlobalState = useStoreActions(
    (actions) => actions.timelock.setMinDelay
  );
  const setProposersGlobalState = useStoreActions(
    (actions) => actions.timelock.setProposers
  );
  const setExecutorsGlobalState = useStoreActions(
    (actions) => actions.timelock.setExecutors
  );
  const setAdminGlobalState = useStoreActions(
    (actions) => actions.timelock.setAdmin
  );

  setProposersGlobalState(proposers.map((proposer) => proposer.proposer));
  setExecutorsGlobalState(executors.map((executor) => executor.executor));
  logger.info(
    "proposers",
    proposers.map((proposer) => proposer.proposer)
  );

  return (
    <Stack flex={1} borderRadius={5} p={5}>
      <Text as={"b"}>Settings</Text>
      <Stack direction={["row", "column"]}>
        <Stack flex={1}>
          <Text>Min delay</Text>
          <Input
            value={minDelay}
            onChange={(e) => {
              setMinDelayGlobalState(parseInt(e.target.value));
              setMinDelay(e.target.value);
            }}
            placeholder=""
          />
        </Stack>
      </Stack>
      <Stack direction={["row", "column"]}>
        {/* Proposers */}
        <Stack flex={1} direction={["row", "column"]}>
          <Text>Proposers</Text>
          {proposers.map((proposer, index) => {
            return (
              <Stack key={index} flex={1} direction={["row", "row"]}>
                <Input
                  value={proposer.proposer}
                  onChange={(e) => {
                    let data = [...proposers];
                    data[index].proposer = e.target.value;
                    setProposers(data);
                  }}
                  placeholder="0x0000000000000000000000000000000000000000"
                />
                {index === proposers.length - 1 && (
                  <Button
                    size="md"
                    // width={["50%"]}
                    // alignSelf={["center"]}
                    colorScheme="blue"
                    onClick={() => {
                      let newProposer = { proposer: "" };
                      setProposers([...proposers, newProposer]);
                    }}
                  >
                    <FaPlus />
                  </Button>
                )}
                {(index === proposers.length - 1 && proposers.length > 1) || (
                  <Button
                    size="md"
                    colorScheme="red"
                    onClick={() => {
                      if (proposers.length > 1) {
                        let data = [...proposers];
                        data.splice(index, 1);
                        setProposers(data);
                      }
                    }}
                  >
                    <FaMinus />
                  </Button>
                )}
              </Stack>
            );
          })}
        </Stack>

        {/* Executor */}

        <Stack flex={1} direction={["row", "column"]}>
          <Text>Exercutors</Text>
          {executors.map((exercutor, index) => {
            return (
              <Stack key={index} flex={1} direction={["row", "row"]}>
                <Input
                  value={exercutor.executor}
                  onChange={(e) => {
                    let data = [...executors];
                    data[index].executor = e.target.value;
                    setExecutors(data);
                  }}
                  placeholder="0x0000000000000000000000000000000000000000"
                />
                {index === executors.length - 1 && (
                  <Button
                    size="md"
                    // width={["50%"]}
                    // alignSelf={["center"]}
                    colorScheme="blue"
                    onClick={() => {
                      let newExecutor = { executor: "" };
                      setExecutors([...executors, newExecutor]);
                    }}
                  >
                    <FaPlus />
                  </Button>
                )}
                {(index === executors.length - 1 && executors.length > 1) || (
                  <Button
                    size="md"
                    colorScheme="red"
                    onClick={() => {
                      if (executors.length > 1) {
                        let data = [...executors];
                        data.splice(index, 1);
                        setExecutors(data);
                      }
                    }}
                  >
                    <FaMinus />
                  </Button>
                )}
              </Stack>
            );
          })}
        </Stack>
        <Stack flex={1}>
          <Text>Admin</Text>
          <Input
            value={admin}
            onChange={(e) => {
              setAdminGlobalState(e.target.value);
              setAdmin(e.target.value);
            }}
            type={"string"}
            placeholder="0x0000000000000000000000000000000000000000"
            defaultValue={18}
          />
        </Stack>
      </Stack>
      <p />
      {/* <Button
        leftIcon={<IoIosSettings />}
        onClick={deployToken}
        colorScheme="teal"
        variant="solid"
      >
        Deploy Governor
      </Button> */}
    </Stack>
  );
};

const TimelockInfo = () => {
  // return (
  //   <Stack flex={1} borderRadius={5} p={5}>
  //     <Text as={"b"}>Timelock Info</Text>
  //     <Stack direction={["row", "column"]}>
  //       <Stack flex={1}>
  //         <Text>
  //           Min delay: {useStoreState((state) => state.timelock.minDelay)}
  //         </Text>
  //         <Text>
  //           Proposers:{" "}
  //           {useStoreState((state) => state.timelock.proposers).toString()}
  //         </Text>
  //         <Text>
  //           Executors: {useStoreState((state) => state.timelock.executors)}
  //         </Text>
  //         <Text>Admin: {useStoreState((state) => state.timelock.admin)}</Text>
  //       </Stack>
  //     </Stack>
  //   </Stack>
  // );

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
        Timelock Info
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
            Min delay:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.timelock.minDelay)}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Proposers:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.timelock.proposers).map(
              (proposer, index) => {
                return (
                  <Text key={index} color={COLOR_INFO().TEXT_COLOR_INFO}>
                    {proposer.toString()}
                  </Text>
                );
              }
            )}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Executors:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.timelock.executors)}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Admin:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.timelock.admin)}
          </Text>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export { TimelockInfo };
export default Timelock;
