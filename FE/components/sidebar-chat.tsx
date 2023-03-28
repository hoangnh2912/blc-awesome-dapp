import {
  Avatar,
  AvatarBadge,
  Flex,
  Button,
  Popover,
  PopoverTrigger as ExPopoverTrigger,
  FlexProps,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Center,
  Stack,
} from "@chakra-ui/react";

import { Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import type { NextPage } from "next";
import BaseLayout from "../layouts/base";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useBalance,
  useContract,
  useContractWrite,
  useDisconnect,
  useNetwork,
  useSDK,
} from "@thirdweb-dev/react";
import { CgProfile } from "react-icons/cg";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import React, { ReactNode, useEffect, useState } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { ABI_MUSIC } from "../constants/abi";
import { useModalTransaction } from "./modal-transaction";
import LinkScan from "./link-scan";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import { IoLogOut } from "react-icons/io5";
import ApiServices from "../services/api";
import { GetChatUserOutput, GetRoomInfo } from "../services/api/types";
// import { redirect } from "next/dist/server/api-utils";

const PopoverTrigger = (props: FlexProps) => {
  return <ExPopoverTrigger {...props} />;
};

const ModalSwitchNetwork = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [network, setNetwork] = useNetwork();
  const disconnect = useDisconnect();
  const switchNetwork = async () => {
    if (network.data.chain?.id == ChainId.Mumbai && isOpen) {
      onClose();
    } else if (setNetwork) {
      await setNetwork(ChainId.Mumbai);
    }
  };

  useEffect(() => {
    if (network.data.chain) {
      const currentChainId = network.data.chain.id;
      if (currentChainId !== ChainId.Mumbai && !isOpen) {
        onOpen();
      } else if (currentChainId == ChainId.Mumbai && isOpen) {
        onClose();
      }
    }
  }, [network.data.chain?.id]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      closeOnOverlayClick
      onClose={() => {
        disconnect();
        onClose();
      }}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
      <ModalContent>
        <ModalHeader>Wrong network</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Current network not support</Text>
          <Center mt={4}>
            <Button
              onClick={switchNetwork}
              _hover={{ bg: "#3443DD" }}
              color="white"
              bg="#3443A0"
            >
              Switch to Mumbai network
            </Button>
          </Center>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

const ModalSignMessage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setUserDataAction = useStoreActions((state) => state.chatUser.setData);

  const sdk = useSDK();
  const address = useAddress();
  const [network] = useNetwork();
  const disconnect = useDisconnect();

  const signMessage = async () => {
    if (sdk && address) {
      const signature = await sdk.wallet.sign("Music protocol");
      localStorage.setItem("address", address.toLowerCase());
      localStorage.setItem("signature", signature);
      await getUserData();
      onClose();
    }
  };

  const getUserData = async () => {
    if (address) {
      try {
        const resUser = await ApiServices.chatUser.userInfo();
        setUserDataAction(resUser.data.data);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (network.data.chain && sdk) {
      const currentChainId = network.data.chain.id;
      if (currentChainId == ChainId.Mumbai && address) {
        if (
          localStorage.getItem("address") != address.toLowerCase() ||
          !localStorage.getItem("signature")
        ) {
          setUserDataAction(undefined);
          onOpen();
        } else {
          getUserData();
        }
      } else if (isOpen) {
        onClose();
      }
    }
  }, [sdk, network.data.chain?.id, address]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      closeOnOverlayClick
      onClose={() => {
        disconnect();
        onClose();
      }}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
      <ModalContent>
        <ModalHeader>Sign message for verify your wallet</ModalHeader>
        <ModalBody>
          <Center>
            <Button
              onClick={signMessage}
              _hover={{ bg: "#3443DD" }}
              color="white"
              bg="#3443A0"
            >
              Sign message
            </Button>
          </Center>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

const addNewChat = async () => {
  const input = prompt("Send message to: ");

  const payload = {
    name: "",
    avatar: "",
    users: [input],
    room_type: "PRIVATE",
  };
  await ApiServices.roomChat.createRoom(payload);
};

const ChatSidebar: NextPage = () => {
  const userStateData = useStoreState((state) => state.chatUser.data);
  const isLoginState = useStoreState((state) => state.chatUser.isLogin);
  const [listRoom, setListRoom] = useState<GetRoomInfo[]>();
  const [user, setUser] = useState<GetChatUserOutput>();
  const logout = useStoreActions((state) => state.chatUser.logout);
  const disconnect = useDisconnect();
  const router = useRouter();

  const LoginButton = ({ avatar }: { avatar: string }) => {
    const avatarURL =
      "http://localhost:3001/chat-user" + avatar.split("/users")[1];

    const address = useAddress();
    const { data, refetch } = useBalance(ABI_MUSIC.MUC.address);
    const sdk = useSDK();
    const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();
    const { replace, push, query } = useRouter();

    const onFaucet = async () => {
      if (sdk && onOpenModalTx) {
        try {
          const mucContract = await sdk.getContractFromAbi(
            ABI_MUSIC.MUC.address,
            ABI_MUSIC.MUC.abi
          );
          onOpenModalTx();
          const res = await mucContract.call("faucet");
          setTxResult({
            reason: "",
            content: [
              {
                title: "Transaction Hash",
                value: (
                  <LinkScan transactionHash={res.receipt.transactionHash} />
                ),
              },
            ],
            txState: "success",
          });
          refetch();
        } catch (error: any) {
          setTxResult({
            reason: error.message,
            content: [],
            txState: "error",
          });
        }
      }
    };

    return (
      <Popover closeOnBlur={false} trigger="hover" placement="bottom-start">
        <PopoverTrigger>
          <Avatar
            src={avatar ? avatarURL : ""}
            marginEnd={3}
            border={""}
            _hover={{ cursor: "pointer" }}
          >
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Wallet</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <ConnectWallet />
          </PopoverBody>
          {address && (
            <>
              <Stack
                p="4"
                borderTopWidth={1}
                borderTopColor="rgba(0, 0, 0, 0.1)"
                borderBottomColor="rgba(0, 0, 0, 0.1)"
                borderBottomWidth={1}
                _hover={{
                  bg: "rgba(0, 0, 0, 0.1)",
                }}
                alignItems="center"
                direction="row"
              >
                <RiMoneyDollarCircleLine />
                <Text fontFamily={"mono"}>{data?.displayValue} MUC</Text>
                <Button
                  bg="#0D164D"
                  color="white"
                  _hover={{ bg: "#0D166D" }}
                  onClick={onFaucet}
                  style={{
                    marginLeft: "1rem",
                  }}
                >
                  Faucet
                </Button>
              </Stack>
              <Stack
                cursor="pointer"
                p="4"
                borderTopWidth={1}
                borderTopColor="rgba(0, 0, 0, 0.1)"
                borderBottomColor="rgba(0, 0, 0, 0.1)"
                borderBottomWidth={1}
                _hover={{
                  bg: "rgba(0, 0, 0, 0.1)",
                }}
                alignItems="center"
                direction="row"
                onClick={() => {
                  if (address)
                    replace(
                      {
                        pathname: `/music/address/${address}`,
                      },
                      undefined,
                      {
                        shallow: true,
                      }
                    );
                }}
              >
                <FaUser />
                <Text fontFamily={"mono"}>My Profile</Text>
              </Stack>
              <Stack
                cursor="pointer"
                p="4"
                onClick={() => {
                  if (address) disconnect();
                  logout();
                }}
                borderTopWidth={1}
                borderTopColor="rgba(0, 0, 0, 0.1)"
                borderBottomColor="rgba(0, 0, 0, 0.1)"
                borderBottomWidth={1}
                _hover={{
                  bg: "rgba(0, 0, 0, 0.1)",
                }}
                alignItems="center"
                direction="row"
              >
                <IoLogOut color="#B12222" />
                <Text color="#B12222" fontWeight="bold" fontFamily={"mono"}>
                  Logout
                </Text>
              </Stack>
            </>
          )}
        </PopoverContent>
      </Popover>
    );
  };

  const User = ({
    name,
    avatar,
    id,
  }: {
    name: string;
    avatar: string;
    id: string;
  }) => (
    <Flex
      p={3}
      align={"center"}
      _hover={{ bg: "gray.100", cursor: "pointer" }}
      onClick={() => redirect(id)}
    >
      <Avatar src={avatar} marginEnd={3} />
      <Text>{name}</Text>
    </Flex>
  );

  const getListRoom = async () => {
    try {
      const room = await ApiServices.roomChat.getRoomList();

      setListRoom(room.data.data);
    } catch (error) {}
  };

  const getUser = async () => {
    try {
      const user = await ApiServices.chatUser.userInfo();
      setUser(user.data.data);
    } catch (error) {}
  };

  const redirect = (id: string) => {
    router.push(`/chat/${id}`);
  };

  useEffect(() => {
    getListRoom();
    getUser();
  }, [isLoginState]);

  return (
    <Flex
      // bg={"blue.100"}
      w="300px"
      h="100%"
      borderEnd={"1px solid"}
      borderColor="gray.200"
      direction={"column"}
    >
      <ModalSwitchNetwork />
      <ModalSignMessage />
      <Flex
        // bg="red.100"
        h="81px"
        w="100%"
        align={"center"}
        justifyContent="space-between"
        p={3}
        borderBottom="1px solid"
        borderColor={"gray.200"}
      >
        <Flex align={"center"}>
          {/* <Avatar src="" marginEnd={3} /> */}
          <LoginButton avatar={userStateData?.avatar || ""} />

          <Text>{userStateData?.name || "Please log in"}</Text>
        </Flex>

        <IconButton
          icon={<ArrowLeftIcon />}
          aria-label={""}
          size="sm"
          isRound
        />
      </Flex>
      <Button m={5} p={4} onClick={() => addNewChat()}>
        New Chat
      </Button>
      <Flex
        overflowX={"scroll"}
        direction="column"
        sx={{
          "&::-webkit-scrollbar": {
            width: "1px",
          },
        }}
        flex={1}
        //   sx={{ scrollbarWidth: "none" }}
      >
        {listRoom?.map((item) => {
          return <User name={item.name} avatar={item.avatar} id={item._id} />;
        })}
      </Flex>
    </Flex>
  );
};

export default ChatSidebar;
