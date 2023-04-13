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
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSDK } from "@thirdweb-dev/react";
import { useEffect, useMemo, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { useModalTransaction } from "../../components/modal-transaction";
import ApiServices from "../../services/api";
import { deployContract } from "../../services/thirdweb";
import { COLOR_INFO } from "../../constants/constants";
import { useStoreActions, useStoreState } from "../../services/redux/hook";

const Erc20Votes = () => {
  const [accessControlState, setAccessControlState] = useBoolean(true);
  const [name, setName] = useState("MaiDAOXToken");
  const [symbol, setSymbol] = useState("MDX");
  const [preMint, setPreMint] = useState(100);
  const [features, setFeatures] = useState<(string | number)[]>([]);

  const setNameGlobalState = useStoreActions((state) => state.erc20.setName);
  const setSymbolGlobalState = useStoreActions(
    (state) => state.erc20.setSymbol
  );
  const setPreMintGlobalState = useStoreActions(
    (state) => state.erc20.setPreMint
  );
  const setMintableGlobalState = useStoreActions(
    (state) => state.erc20.setMintable
  );
  const setBurnableGlobalState = useStoreActions(
    (state) => state.erc20.setBurnable
  );
  const setPausableGlobalState = useStoreActions(
    (state) => state.erc20.setPausable
  );
  const setVotesGlobalState = useStoreActions((state) => state.erc20.setVotes);
  const setAccessControlStateGlobalState = useStoreActions(
    (state) => state.erc20.setAccessControl
  );

  const sdk = useSDK();
  const toast = useToast();

  const featuresMap = useMemo(
    () => ({
      Mintable: "Mintable",
      Burnable: "Burnable",
      Pausable: "Pausable",
      Votes: "Votes",
    }),
    []
  );
  useEffect(() => {
    if (
      features.includes(featuresMap.Mintable) ||
      features.includes(featuresMap.Pausable) ||
      features.includes(featuresMap.Votes)
    ) {
      setAccessControlState.on();
    }
  }, [features]);

  console.log("votes", features.includes(featuresMap.Votes));
  setVotesGlobalState(true);
  setAccessControlStateGlobalState(true);
  setMintableGlobalState(features.includes(featuresMap.Mintable));
  setBurnableGlobalState(features.includes(featuresMap.Burnable));
  setPausableGlobalState(features.includes(featuresMap.Pausable));

  const { onOpen, setTxResult } = useModalTransaction();
  const deployToken = async () => {
    try {
      if (onOpen) onOpen();
      const res = await ApiServices.tokenCreator.erc20({
        name,
        symbol,
        initial_supply: preMint,
        is_burnable: features.includes(featuresMap.Burnable),
        is_mintable: features.includes(featuresMap.Mintable),
        is_pausable: features.includes(featuresMap.Pausable),
        is_vote: true,
      });
      const { bytecode, name: contractName, uuid, abi } = res.data.data;
      try {
        if (!sdk) return;
        const contractDeployed = await deployContract(sdk, abi, bytecode, []);
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
  const onChangeCheckBoxAccessControl = () => {
    if (
      features.includes(featuresMap.Mintable) ||
      features.includes(featuresMap.Pausable) ||
      features.includes(featuresMap.Votes)
    ) {
      return toast({
        title: `You can't disable Access Control when Mintable or Pausable is enabled`,
        status: "error",
        isClosable: true,
        variant: "subtle",
        position: "top-right",
        duration: 1500,
      });
    }
    setAccessControlState.toggle();
  };

  return (
    <Stack>
      <Text as={"b"}>Settings</Text>
      <Stack direction={["column", "row"]}>
        <Stack flex={1}>
          <Text>Token Name</Text>
          <Input
            value={name}
            onChange={(e) => {
              setNameGlobalState(e.target.value);
              setName(e.target.value);
            }}
            placeholder=""
          />
        </Stack>
        <Stack flex={1}>
          <Text>Token Symbol</Text>
          <Input
            value={symbol}
            onChange={(e) => {
              setSymbolGlobalState(e.target.value);
              setSymbol(e.target.value);
            }}
            placeholder=""
          />
        </Stack>
        <Stack flex={1}>
          <Text>Pre-mint</Text>
          <Input
            value={preMint}
            onChange={(e) => {
              setPreMintGlobalState(parseInt(e.target.value));
              setPreMint(parseInt(e.target.value));
            }}
            type={"number"}
            placeholder=""
            defaultValue={18}
          />
        </Stack>
      </Stack>
      <p />
      <Text as={"b"}>Features</Text>
      <CheckboxGroup
        value={features}
        onChange={setFeatures}
        colorScheme="green"
      >
        <Stack spacing={[1, 5]} direction={["column", "row"]}>
          <Checkbox value={featuresMap.Mintable}>Mintable</Checkbox>
          <Checkbox value={featuresMap.Burnable}>Burnable</Checkbox>
          <Checkbox value={featuresMap.Pausable}>Pausable</Checkbox>
          <Checkbox isChecked={true} isDisabled={true}>
            Votes
          </Checkbox>
        </Stack>
      </CheckboxGroup>
      <Stack direction={["column", "row"]}>
        <Text as={"b"}>Access Control</Text>
        <Checkbox
          onChange={onChangeCheckBoxAccessControl}
          isChecked={accessControlState}
          isDisabled={true}
        />
      </Stack>
      <Stack direction={["column", "row"]}>
        <RadioGroup
          isDisabled={!accessControlState}
          colorScheme={"green"}
          defaultValue="Ownable"
        >
          <Stack spacing={5} direction="row">
            <Radio value="Ownable">Ownable</Radio>
            {/* <Radio value="Roles">Roles</Radio> */}
          </Stack>
        </RadioGroup>
      </Stack>
      {/* <Button
        leftIcon={<IoIosSettings />}
        onClick={deployToken}
        colorScheme="teal"
        variant="solid"
      >
        Deploy Token
      </Button> */}
    </Stack>
  );
};

const Erc20Info = () => {
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
        ERC20Votes
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
            {useStoreState((state) => state.erc20.name)}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Symbol:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.erc20.symbol)}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Pre-mint:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.erc20.preMint)}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Votes:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.erc20.votes) ? "✅" : "❌"}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Mintable:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.erc20.mintable) ? "✅" : "❌"}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Burnable:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.erc20.burnable) ? "✅" : "❌"}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Pausable:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.erc20.pausable) ? "✅" : "❌"}
          </Text>
          <Text fontWeight="bold" color={COLOR_INFO().TEXT_COLOR_INFO}>
            Access control:
          </Text>
          <Text color={COLOR_INFO().TEXT_COLOR_INFO}>
            {useStoreState((state) => state.erc20.accessControl)
              ? "✅ Ownable"
              : "❌"}
          </Text>
        </GridItem>
      </Grid>
    </Stack>
  );
};
export { Erc20Info };
export default Erc20Votes;
