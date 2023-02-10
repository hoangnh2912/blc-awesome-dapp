import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { useEffect, useMemo, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { useModal } from "../../components/modal";
import ApiServices from "../../services/api";
import { deployContract } from "../../services/thirdweb";

const Erc1155 = () => {
  const [accessControlState, setAccessControlState] = useBoolean(false);
  const [name, setName] = useState("MyToken");
  const [uri, setUri] = useState("");
  const [features, setFeatures] = useState<(string | number)[]>([]);

  const sdk = useSDK();
  const toast = useToast();

  const featuresMap = useMemo(
    () => ({
      Mintable: "Mintable",
      Burnable: "Burnable",
      Pausable: "Pausable",
      Updatable_URI: "Updatable_URI",
    }),
    []
  );
  useEffect(() => {
    if (
      features.includes(featuresMap.Mintable) ||
      features.includes(featuresMap.Pausable) ||
      features.includes(featuresMap.Updatable_URI)
    ) {
      setAccessControlState.on();
    }
  }, [features]);

  const { onOpen, setTxResult } = useModal();
  const deployToken = async () => {
    try {
      const res = await ApiServices.tokenCreator.erc1155({
        name,
        uri,
        is_burnable: features.includes(featuresMap.Burnable),
        is_mintable: features.includes(featuresMap.Mintable),
        is_pausable: features.includes(featuresMap.Pausable),
        is_updatable_uri: features.includes(featuresMap.Updatable_URI),
      });
      const { bytecode, name: contractName, uuid, abi } = res.data.data;
      if (onOpen) onOpen();
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
                  href={`https://goerli.etherscan.io/tx/${contractDeployed.transactionHash}`}
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
                  href={`https://goerli.etherscan.io/tx/${contractDeployed.transactionHash}`}
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
                  href={`https://goerli.etherscan.io/address/${contractAddress}`}
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
          receipt: {},
          txState: "error",
        });
      } finally {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeCheckBoxAccessControl = () => {
    if (
      features.includes(featuresMap.Mintable) ||
      features.includes(featuresMap.Pausable)
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
            onChange={(e) => setName(e.target.value)}
            placeholder=""
          />
        </Stack>
        <Stack flex={1}>
          <Text>URI</Text>
          <Input
            value={uri}
            onChange={(e) => setUri(e.target.value)}
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
          <Checkbox value={featuresMap.Updatable_URI}>Updatable URI</Checkbox>
        </Stack>
      </CheckboxGroup>
      <Stack direction={["column", "row"]}>
        <Text as={"b"}>Access Control</Text>
        <Checkbox
          onChange={onChangeCheckBoxAccessControl}
          isChecked={accessControlState}
        />
      </Stack>
      <Stack direction={["column", "row"]}>
        <RadioGroup
          isDisabled={!accessControlState}
          colorScheme={"green"}
          defaultValue="Ownable"
        >
          <Stack spacing={5} direction={["column", "row"]}>
            <Radio value="Ownable">Ownable</Radio>
          </Stack>
        </RadioGroup>
      </Stack>
      <Button
        leftIcon={<IoIosSettings />}
        onClick={deployToken}
        colorScheme="teal"
        variant="solid"
      >
        Deploy Token
      </Button>
    </Stack>
  );
};

export default Erc1155;