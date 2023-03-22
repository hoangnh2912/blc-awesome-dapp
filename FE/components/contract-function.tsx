import { Box, Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";
import { AbiItem } from "web3-utils";
import LinkScan from "./link-scan";
import { useModalTransaction } from "./modal-transaction";

const ContractFunctionComponent = ({
  contractInstance,
  functions,
}: {
  contractInstance: SmartContract<BaseContract> | null;
  functions: AbiItem[];
}) => {
  const toast = useToast();
  const { onOpen, setTxResult } = useModalTransaction();

  const isWriteFunction = !!functions.find(
    (item) => item.stateMutability != "pure" && item.stateMutability != "view"
  );

  return (
    <Stack>
      {functions.map((item, index) => (
        <Box
          mt={"5"}
          bg="gray.100"
          borderWidth="1px"
          p="2"
          borderRadius="lg"
          key={index}
        >
          {item.inputs &&
            item.inputs.map((input, _index) => (
              <Box borderRadius="lg" bg="white" mb="2" key={_index}>
                <Input
                  name={item.name}
                  placeholder={input.name + " (" + input.type + ")"}
                />
              </Box>
            ))}
          <Button
            onClick={async () => {
              try {
                if (contractInstance && item.name) {
                  const listInput: any[] = [];
                  document.getElementsByName(item.name).forEach((e: any) => {
                    listInput.push(e.value);
                  });
                  if (isWriteFunction) {
                    if (onOpen) onOpen();
                  }
                  const res = await contractInstance.call(
                    item.name,
                    ...listInput
                  );
                  if (isWriteFunction)
                    setTxResult({
                      reason: "",
                      content: [
                        {
                          title: "Transaction Hash",
                          value: (
                            <LinkScan
                              transactionHash={res.receipt.transactionHash}
                            />
                          ),
                        },
                      ],
                      txState: "success",
                    });
                  if (!isWriteFunction)
                    toast({
                      title: `${item.name} ${res}`,
                      status: "success",
                      isClosable: true,
                      variant: "subtle",
                      position: "top-right",
                      duration: null,
                    });
                }
              } catch (error: any) {
                if (!isWriteFunction)
                  toast({
                    title: `${error.message}`,
                    status: "error",
                    isClosable: true,
                    variant: "subtle",
                    position: "top-right",
                    duration: 4000,
                  });
                else
                  setTxResult({
                    reason: error.message,
                    content: [],
                    txState: "error",
                  });
              }
            }}
            color="white"
            bgGradient="linear(to-r, teal.500, green.500)"
            variant="solid"
          >
            <Text>{item.name}</Text>
          </Button>
        </Box>
      ))}
    </Stack>
  );
};

export default ContractFunctionComponent;
