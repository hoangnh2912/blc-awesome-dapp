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

import { CONSTANT } from "../constants/chat-constant";
import { Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import type { NextPage } from "next";
import BaseLayout from "../layouts/base";
import { AiOutlineHome } from "react-icons/ai";
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
import { useStoreActions, useStoreState } from "../services/redux/hook";
import React, { ReactNode, useEffect, useState, memo } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { ABI_MUSIC } from "../constants/abi";
import { useModalTransaction } from "./modal-transaction";
import LinkScan from "./link-scan";
import { FaUser } from "react-icons/fa";
import { NextRouter, useRouter } from "next/router";
import { IoLogOut } from "react-icons/io5";
import ApiServices from "../services/api";
import {
  GetChatUserOutput,
  GetRoomInfo,
  UserOfRoom,
} from "../services/api/types";
import { decryptMessage, encryptMessage } from "../constants/utils";
import { createECDH } from "crypto";
import { ethers } from "ethers";

const nameConverter = (name: string) => {
  if (name.length >= CONSTANT.NAME_LENGTH_LIMIT) {
    let validName = name.substring(0, 8) + "...";
    if (ethers.utils.isAddress(name)) {
      validName += name.substring(name.length - 4);
    }
    return validName;
  }
  return name;
};

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
      const signature = await sdk.wallet.sign(address.toLowerCase());

      localStorage.setItem("address", address.toLowerCase());
      localStorage.setItem("signature", signature);
      await getUserData();
      onClose();
    }
  };

  const getUserData = async () => {
    if (address) {
      try {
        let resUser = (await (await ApiServices.chatUser.userInfo()).data).data;
        const signature = localStorage.getItem("signature") || "";
        const ecdh = createECDH("secp256k1");

        if (!resUser.priv_key || !resUser.pub_key) {
          ecdh.generateKeys();
          const privKey = ecdh.getPrivateKey().toString("hex");
          const encryptedPrivKey = encryptMessage(privKey, signature);
          const pubKey = ecdh.getPublicKey().toString("hex");
          await ApiServices.chatUser.submitKeyPair({
            priv_key: encryptedPrivKey,
            pub_key: pubKey,
          });
          resUser.priv_key = ecdh.getPrivateKey().toString("hex");
          resUser.pub_key = ecdh.getPublicKey().toString("hex");
        } else {
          resUser.priv_key = decryptMessage(resUser.priv_key || "", signature);
        }

        setUserDataAction(resUser);
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
        <ModalHeader>Sign message for verifying your wallet</ModalHeader>
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

const addNewChat = async ({
  listRoom,
  setListRoom,
}: {
  listRoom: GetRoomInfo[] | undefined;
  setListRoom: React.Dispatch<React.SetStateAction<GetRoomInfo[] | undefined>>;
}) => {
  const input = prompt("Send message to: ");

  const payload = {
    name: "",
    avatar: "",
    users: [input],
    room_type: "PRIVATE",
  };
  if (input) {
    const newRoom = await ApiServices.roomChat.createRoom(payload);

    if (listRoom) {
      console.log([newRoom.data.data, ...listRoom]);
      setListRoom([newRoom.data.data, ...listRoom]);
    } else {
      setListRoom([newRoom.data.data]);
    }
  }
};

const userAvatarGetter = ({ avatar }: { avatar: string }) => {
  const avatarURL = CONSTANT.API_PREFIX + avatar;
  return avatarURL;
};

const LoginButton = ({
  avatar,
  router,
}: {
  avatar: string;
  router: NextRouter;
}) => {
  const userStateData = useStoreState((state) => state.chatUser.data);
  
  const disconnect = useDisconnect();
  const logout = useStoreActions((state) => state.chatUser.logout);

  const avatarURL = userAvatarGetter({ avatar });

  const address = useAddress();
  const { data, refetch } = useBalance(ABI_MUSIC.MUC.address);
  const sdk = useSDK();
  const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();
  const { replace, push, query } = useRouter();

  const redirectHome = () => {
    router.replace("/chat/", undefined, { shallow: true });
  };

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
              value: <LinkScan transactionHash={res.receipt.transactionHash} />,
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
                redirectHome();
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

const Room = ({
  name,
  avatar,
  id,
  room_type,
  users,
  userStateData,
  router,
}: {
  name: string;
  avatar: string;
  id: string;
  room_type: string;
  users: [UserOfRoom];
  userStateData: GetChatUserOutput | undefined;
  router: NextRouter;
}) => {
  let roomName = name;
  let roomAvatar = avatar;
  if (room_type === CONSTANT.ROOM_TYPE.PRIVATE && userStateData) {
    const theOtherOne = users.filter(
      (user) => user.wallet_address != userStateData.wallet_address
    )[0];
    roomName = nameConverter(theOtherOne.name) || "";

    roomAvatar = theOtherOne.avatar || "";
  }

  const redirect = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <Flex
      p={3}
      align={"center"}
      _hover={{ bg: "gray.100", cursor: "pointer" }}
      onClick={() => redirect(id)}
    >
      <Avatar src={userAvatarGetter({ avatar: roomAvatar })} marginEnd={3} />
      <Text>{roomName}</Text>
    </Flex>
  );
};

const ChatSidebar: NextPage = () => {
  const userStateData = useStoreState((state) => state.chatUser.data);
  const isLoginState = useStoreState((state) => state.chatUser.isLogin);
  const [listRoom, setListRoom] = useState<GetRoomInfo[]>();
  const [user, setUser] = useState<GetChatUserOutput>();
  const router = useRouter();

  const getListRoom = async () => {
    try {
      const room = await ApiServices.roomChat.getRoomList();

      setListRoom(room.data.data);
    } catch (error) {}
  };

  const getUser = async () => {
    try {
      let user = await ApiServices.chatUser.userInfo();
      const address = localStorage.getItem("address");

      if (!user.data.data && address) {
        user = await ApiServices.chatUser.createOrUpdateUserInfo({
          name: address,
        });
      }
      setUser(user.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (isLoginState) {
      getListRoom();
      getUser();
    }
  }, [isLoginState, userStateData]);

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
          <LoginButton avatar={userStateData?.avatar || ""} router={router} />

          <Text>
            {userStateData
              ? nameConverter(userStateData.name)
              : "Please log in"}
            {/* {(userStateData &&
            userStateData.name.length <= CONSTANT.NAME_LENGTH_LIMIT)
              ? userStateData
                ? userStateData?.name
                : userStateData?.name.substring(0, CONSTANT.NAME_LENGTH_LIMIT) +
                  "..."
              : "Please log in"} */}
          </Text>
        </Flex>

        <IconButton
          icon={<AiOutlineHome />}
          aria-label={""}
          size="sm"
          isRound
          onClick={() => router.push("/chat")}
        />
      </Flex>
      <Button m={5} p={4} onClick={() => addNewChat({ listRoom, setListRoom })}>
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
          return (
            <Room
              key={Math.random()}
              name={item.name}
              avatar={CONSTANT.IPFS_PREFIX + item.avatar}
              id={item._id}
              room_type={CONSTANT.ROOM_TYPE.PRIVATE}
              users={item.users}
              userStateData={userStateData}
              router={router}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default memo(ChatSidebar);
