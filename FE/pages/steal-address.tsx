import {
  Box,
  Button,
  Center,
  Input,
  Skeleton,
  Stack,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import _ from "lodash";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useModalTransaction } from "../components/modal-transaction";
import { ABI } from "../constants/abi";
import BaseLayout from "../layouts/base";
import ApiServices from "../services/api";
import { GetStealAddressOutput } from "../services/api/types";
import { web3 } from "../services/thirdweb";

const StealAddress: NextPage = () => {
  const [isLoading, setLoading] = useBoolean(true);
  const [publicKey, setPublicKey] = useState<string>("");
  const [privKey, setPrivKey] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [listStealAddress, setListStealAddress] = useState<
    (GetStealAddressOutput & {
      balance: string;
    })[]
  >([]);
  const [stealAddress, setStealAddress] = useState<string>("");

  const connectedAddress = useAddress();
  const { onOpen, setTxResult } = useModalTransaction();

  const sdk = useSDK();
  const toast = useToast();
  const getPublicKey = async () => {
    if (connectedAddress && sdk) {
      const address = await sdk.wallet.getAddress();
      try {
        setLoading.on();
        setPublicKey("");

        const res = await ApiServices.stealAddress.getPrivateKey(address);
        if (res.data.data.privateKey) {
          setPrivKey(res.data.data.privateKey);
          const stealAddressContract = await sdk.getContractFromAbi(
            ABI.StealAddress.address,
            ABI.StealAddress.abi
          );
          const pubKey = await stealAddressContract.call(
            "getPublicKey",
            address
          );
          const pubKeyXY = web3.utils.encodePacked(
            {
              type: "uint256",
              value: pubKey["X"],
            },
            {
              type: "uint256",
              value: pubKey["Y"],
            }
          );
          if (
            pubKeyXY &&
            web3.utils.hexToNumberString(pubKeyXY || "0x0") != "0"
          ) {
            setPublicKey(pubKeyXY);
          }
        }
      } catch (error) {
      } finally {
        setLoading.off();
      }
    }
  };

  const generateKeyPair = async () => {
    if (sdk && connectedAddress) {
      try {
        const address = await sdk.wallet.getAddress();

        setLoading.on();
        const stealAddressContract = await sdk.getContractFromAbi(
          ABI.StealAddress.address,
          ABI.StealAddress.abi
        );

        const { privateKey } = web3.eth.accounts.create();
        const [pubX, pubY] = await stealAddressContract.call(
          "privToPubKey",
          privateKey
        );
        await stealAddressContract.call(
          "setPublicKey",
          web3.utils.toHex(pubX),
          web3.utils.toHex(pubY)
        );
        setPrivKey(privateKey);
        await ApiServices.stealAddress.submitPrivateKey(privateKey, address);
      } catch (error) {
      } finally {
        getPublicKey();
      }
    }
  };

  const onChangeToAddress = async (e: any) => {
    setToAddress(e.target.value);
    setStealAddress("");
    if (
      web3.utils.isAddress(e.target.value) &&
      sdk &&
      privKey &&
      connectedAddress
    ) {
      try {
        const stealAddressContract = await sdk.getContractFromAbi(
          ABI.StealAddress.address,
          ABI.StealAddress.abi
        );
        const [stAddress, hashS] = await stealAddressContract.call(
          "getStealAddress",
          privKey,
          e.target.value
        );

        await ApiServices.stealAddress.submitStealAddress(
          e.target.value,
          stAddress,
          connectedAddress
        );
        setStealAddress(stAddress);
      } catch (error) {
        setStealAddress(`This address was not generate public key`);
      }
    }
  };

  const transferMatic = async () => {
    try {
      if (sdk && onOpen) {
        onOpen();
        const res = await sdk.wallet.transfer(stealAddress, amount);
        setTxResult({
          reason: "",
          content: [
            {
              title: "Transaction Hash",
              value: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://mumbai.polygonscan.com/tx/${res.receipt.transactionHash}`}
                >
                  {res.receipt.transactionHash}
                </a>
              ),
            },
          ],
          txState: "success",
        });
      }
    } catch (error: any) {
      setTxResult({
        reason: error?.data?.message ? error.data.message : error.message,
        content: [],
        txState: "error",
      });
    }
  };

  const getListStealAddress = async () => {
    if (sdk && connectedAddress) {
      const address = await sdk.wallet.getAddress();
      try {
        setLoading.on();
        const res = await ApiServices.stealAddress.getStealAddress(address);
        const listStAddressWithBalance = await Promise.all(
          res.data.data.map(
            (item) =>
              new Promise((resolve) => {
                sdk.getBalance(item.address).then((balance) => {
                  resolve({
                    ...item,
                    balance: balance.displayValue,
                  });
                });
              })
          )
        );
        setListStealAddress(listStAddressWithBalance as any);
      } catch (error) {
      } finally {
        setLoading.off();
      }
    }
  };

  const getPrivateKeyOfStealAddress = async (address: string, from: string) => {
    if (sdk && privKey) {
      try {
        const stealAddressContract = await sdk.getContractFromAbi(
          ABI.StealAddress.address,
          ABI.StealAddress.abi
        );
        const [__, hashS] = await stealAddressContract.call(
          "getStealAddress",
          privKey,
          from
        );
        const privOfStealAddress = await stealAddressContract.call(
          "getPrivateKeyOfStealAddress",
          privKey,
          hashS
        );
        toast({
          title: `Private key of Steal Address:${address}`,
          description: privOfStealAddress,
          status: "success",
          duration: 5000,
          position: "top-right",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (connectedAddress && sdk) {
      setToAddress("");
      setStealAddress("");
      setAmount("");
      _.debounce(getPublicKey, 500)();
      _.debounce(getListStealAddress, 500)();
    }
  }, [connectedAddress, sdk]);

  return (
    <BaseLayout selectTabIndex={5}>
      <Box boxShadow="lg" bg={"white"} borderRadius={5} p={5}>
        <Skeleton isLoaded={!isLoading}>
          <Stack direction={["column", "column", "row"]}>
            <Center>
              <Text overflowWrap="anywhere">Your public key: {publicKey}</Text>
            </Center>
            {(!publicKey || !privKey) && (
              <Button onClick={generateKeyPair} colorScheme="teal">
                Generate
              </Button>
            )}
          </Stack>
        </Skeleton>
      </Box>
      <Box boxShadow="lg" bg={"white"} mt={5} borderRadius={5} p={5}>
        <Text fontWeight="bold" fontSize={["xs", "sm", "md", "lg", "xl"]}>
          Your Steal Address
        </Text>
        <Skeleton isLoaded={!isLoading}>
          <Stack direction={["column"]}>
            {listStealAddress.map(
              (
                item: GetStealAddressOutput & {
                  balance: string;
                }
              ) => (
                <Box
                  boxShadow="lg"
                  bg={"teal.50"}
                  key={item.address}
                  borderRadius={5}
                  m={2}
                  p={5}
                  flex={1}
                  onClick={() =>
                    getPrivateKeyOfStealAddress(item.address, item.from)
                  }
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  <Stack
                    justifyContent="space-between"
                    direction={["column", "column", "row"]}
                  >
                    <Stack>
                      <Text color="teal.500" fontWeight="bold">
                        {item.address}
                      </Text>
                      <Text mt={5} fontSize={["sm"]}>
                        From: {item.from}
                      </Text>
                    </Stack>
                    <Center>
                      <Text color="purple.500" fontWeight="bold">
                        {item.balance} MATIC
                      </Text>
                    </Center>
                  </Stack>
                </Box>
              )
            )}
          </Stack>
        </Skeleton>
      </Box>
      <Box boxShadow="lg" bg={"white"} borderRadius={5} mt={5} p={5}>
        <Text fontWeight="bold" fontSize={["xs", "sm", "md", "lg", "xl"]}>
          Transfer Matic
        </Text>
        <Skeleton mt={5} isLoaded={!isLoading}>
          <Stack direction={["column"]}>
            <Text>To Address</Text>
            <Input
              value={toAddress}
              onChange={onChangeToAddress}
              placeholder=""
            />
            {stealAddress && (
              <Stack>
                <Text color="red.500" fontSize={["sm"]}>
                  Steal address: {stealAddress}
                </Text>
              </Stack>
            )}

            <Text mt={5}>Amount</Text>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="MATIC"
            />
            <Button
              disabled={
                !stealAddress ||
                !amount ||
                !toAddress ||
                !publicKey ||
                !privKey ||
                toAddress == stealAddress ||
                toAddress == connectedAddress
              }
              onClick={transferMatic}
              mt={"10"}
              colorScheme="teal"
            >
              Transfer
            </Button>
          </Stack>
        </Skeleton>
      </Box>
    </BaseLayout>
  );
};

export default StealAddress;
