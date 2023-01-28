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
import { IoIosSettings } from "react-icons/io";
import { useModal } from "../../components/modal";
import ABI from "../../constants/abi";

const Erc20 = () => {
  const [accessControlState, setAccessControlState] = useBoolean();
  const sdk = useSDK();

  const { onOpen, setTxResult } = useModal();
  const deployToken = async () => {
    if (onOpen) onOpen();
    try {
      if (!sdk) return;
      const contract = await sdk.getContract(
        "0xFc2dBC410dB016A36223FCe55f8c7BcD947A30b9",
        ABI.Deployer.abi
      );
      const tx = await contract.call("deploy", "0x00");
      setTxResult({
        reason: "",
        txHash: tx.receipt.transactionHash,
        receipt: tx.receipt,
        txState: "success",
      });
    } catch (error: any) {
      setTxResult({
        reason: error.message,
        txHash: "",
        receipt: {},
        txState: "error",
      });
    } finally {
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
          <Input placeholder="" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>
            <p>Token Symbol</p>
          </InputLeftAddon>
          <Input placeholder="" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>
            <p>Decimal</p>
          </InputLeftAddon>
          <Input type={"number"} placeholder="" defaultValue={18} />
        </InputGroup>
      </Stack>
      <p />
      <Text as={"b"}>Features</Text>
      <Stack direction={"row"}>
        <CheckboxGroup colorScheme="green">
          <Stack spacing={[1, 5]} direction={["row"]}>
            <Checkbox value="Mintable">Mintable</Checkbox>
            <Checkbox value="Burnable">Burnable</Checkbox>
            <Checkbox value="Pausable">Pausable</Checkbox>
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
