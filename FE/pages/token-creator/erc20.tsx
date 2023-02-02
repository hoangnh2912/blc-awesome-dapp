import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { useMemo, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { useModal } from "../../components/modal";
import ABI from "../../constants/abi";
import ApiServices from "../../services/api";

const Erc20 = () => {
  const [accessControlState, setAccessControlState] = useBoolean();
  const [name, setName] = useState("MyToken");
  const [symbol, setSymbol] = useState("mtk");
  const [preMint, setPreMint] = useState(0);
  const [features, setFeatures] = useState<(string | number)[]>([]);

  const sdk = useSDK();

  const featuresMap = useMemo(
    () => ({
      Mintable: "Mintable",
      Burnable: "Burnable",
      Pausable: "Pausable",
    }),
    []
  );

  const { onOpen, setTxResult } = useModal();
  const deployToken = async () => {
    try {
      const res = await ApiServices.tokenCreator.erc20({
        name,
        symbol,
        initial_supply: preMint,
        is_burnable: features.includes(featuresMap.Burnable),
        is_mintable: features.includes(featuresMap.Mintable),
        is_pausable: features.includes(featuresMap.Pausable),
      });
      const { bytecode, name: contractName, uuid } = res.data.data;
      if (onOpen) onOpen();
      try {
        if (!sdk) return;
        const contract = await sdk.getContract(
          ABI.Deployer.address,
          ABI.Deployer.abi
        );
        const tx = await contract.call("deploy", bytecode);
        const contractAddressDeployed = tx.receipt.events[0].args[0];
        setTxResult({
          reason: "",
          content: [
            {
              title: "Transaction Hash",
              value: (
                <a
                  href={`https://goerli.etherscan.io/tx/${tx.receipt.transactionHash}`}
                >
                  {tx.receipt.transactionHash}
                </a>
              ),
            },
            {
              title: "Contract Address",
              value: (
                <a
                  href={`https://goerli.etherscan.io/address/${contractAddressDeployed}`}
                >
                  {contractAddressDeployed}
                </a>
              ),
            },
          ],
          receipt: tx.receipt,
          txState: "success",
        });
        await ApiServices.tokenCreator.verify({
          uuid,
          address: contractAddressDeployed,
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
            <p>Pre-mint</p>
          </InputLeftAddon>
          <Input
            value={preMint}
            onChange={(e) => setPreMint(parseInt(e.target.value))}
            type={"number"}
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
          </Stack>
        </CheckboxGroup>
      </Stack>
      <Stack direction={"row"}>
        <Text as={"b"}>Access Control</Text>
        <Checkbox
          checked={accessControlState}
          onChange={setAccessControlState.toggle}
          value="Access Control"
        ></Checkbox>
      </Stack>
      <Stack direction={"row"}>
        <RadioGroup
          isDisabled={!accessControlState}
          colorScheme={"green"}
          defaultValue="Ownable"
        >
          <Stack spacing={5} direction="row">
            <Radio value="Ownable">Ownable</Radio>
            <Radio value="Roles">Roles</Radio>
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

export default Erc20;
