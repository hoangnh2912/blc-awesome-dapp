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

const Erc721 = () => {
  const [accessControlState, setAccessControlState] = useBoolean(false);
  const [name, setName] = useState("MyToken");
  const [symbol, setSymbol] = useState("mtk");
  const [baseURI, setBaseURI] = useState("");
  const [features, setFeatures] = useState<(string | number)[]>([]);

  const sdk = useSDK();
  const toast = useToast();

  const featuresMap = useMemo(
    () => ({
      Mintable: "Mintable",
      Burnable: "Burnable",
      Pausable: "Pausable",
      URI_Storage: "URI_Storage",
    }),
    []
  );
  useEffect(() => {
    if (
      features.includes(featuresMap.Mintable) ||
      features.includes(featuresMap.Pausable)
    ) {
      setAccessControlState.on();
    }
  }, [features]);

  const { onOpen, setTxResult } = useModal();
  const deployToken = async () => {
    try {
      const res = await ApiServices.tokenCreator.erc721({
        name,
        symbol,
        baseURI,
        is_burnable: features.includes(featuresMap.Burnable),
        is_mintable: features.includes(featuresMap.Mintable),
        is_pausable: features.includes(featuresMap.Pausable),
        is_uri_storage: features.includes(featuresMap.URI_Storage),
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
      <Stack direction={"row"}>
        <InputGroup>
          <InputLeftAddon>
            <p>Token Name</p>
          </InputLeftAddon>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>
            <p>Token Symbol</p>
          </InputLeftAddon>
          <Input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder=""
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>
            <p>Base URI</p>
          </InputLeftAddon>
          <Input
            value={baseURI}
            onChange={(e) => setBaseURI(e.target.value)}
            placeholder=""
            defaultValue={18}
          />
        </InputGroup>
      </Stack>
      <p />
      <Text as={"b"}>Features</Text>
      <Stack direction={"row"}>
        <CheckboxGroup
          value={features}
          onChange={setFeatures}
          colorScheme="green"
        >
          <Stack spacing={[1, 5]} direction={["row"]}>
            <Checkbox value={featuresMap.Mintable}>Mintable</Checkbox>
            <Checkbox value={featuresMap.Burnable}>Burnable</Checkbox>
            <Checkbox value={featuresMap.Pausable}>Pausable</Checkbox>
            <Checkbox value={featuresMap.URI_Storage}>URI Storage</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Stack>
      <Stack direction={"row"}>
        <Text as={"b"}>Access Control</Text>
        <Checkbox
          onChange={onChangeCheckBoxAccessControl}
          isChecked={accessControlState}
        />
      </Stack>
      <Stack direction={"row"}>
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

export default Erc721;
