import { Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const ContractUsage = () => {
  const [contractAddress, setContractAddress] = useState<string>("");

  return (
    <Stack>
      <Text fontWeight="bold" fontSize={["xs", "sm", "md", "lg", "xl"]}>
        Contract usage
      </Text>
      <Stack direction={["column", "row"]}>
        <Stack flex={1}>
          <Text>Contract address</Text>
          <Input
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x...."
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContractUsage;
