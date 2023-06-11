/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Center,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChainId,
  ConnectWallet,
  useActiveChain,
  useAddress,
  useConnectedWallet,
  useConnectionStatus,
  useDisconnect,
  useMetamask,
  useSDK,
  useSwitchChain,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
import { IconType } from "react-icons";
import { FiSettings } from "react-icons/fi";
import { SideBarData, SideBarDataProps } from "../constants/data/sidebar";
import { useStoreActions, useStoreState } from "../services/redux/hook";
export const ModalCheckConnect = () => {
  const setIsCheckConnectAction = useStoreActions(
    (state) => state.user.setIsCheckConnect
  );

  const clearUserStateAction = useStoreActions(
    (state) => state.user.clearState
  );
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      setIsCheckConnectAction({
        isCheckConnect: false,
        args: undefined,
        callback: undefined,
      });
    },
  });
  const connectionStatus = useConnectionStatus();

  const isCheckConnectDataState = useStoreState(
    (state) => state.user.isCheckConnectData
  );
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();

  useEffect(() => {
    if (connectionStatus != "connected") {
      clearUserStateAction();
    }

    if (
      connectionStatus != "connected" &&
      isCheckConnectDataState.isCheckConnect
    ) {
      onOpen();
    } else {
      onClose();
      if (isCheckConnectDataState.args && isCheckConnectDataState.callback) {
        isCheckConnectDataState.callback(...isCheckConnectDataState.args);
      }
    }
  }, [connectionStatus, isCheckConnectDataState.isCheckConnect]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      closeOnOverlayClick
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
      <ModalContent>
        <ModalHeader>Wallet connect</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Connect your wallet to using this app</Text>
          <Stack mt={4}>
            <Button
              onClick={() => connectWithMetamask()}
              _hover={{ bg: "#3443DD" }}
              color="white"
              bg="#3443A0"
            >
              Metamask
            </Button>
            <Button
              onClick={() => connectWithWalletConnect()}
              _hover={{ bg: "#3443DD" }}
              color="white"
              bg="#3443A0"
            >
              WalletConnect
            </Button>
          </Stack>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export const ModalSwitchNetwork = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const disconnect = useDisconnect();
  const network = useActiveChain();
  const setNetwork = useSwitchChain();

  const switchNetwork = async () => {
    if (network?.chainId == ChainId.Mumbai && isOpen) {
      onClose();
    } else if (setNetwork) {
      await setNetwork(ChainId.Mumbai);
    }
  };

  useEffect(() => {
    if (network && network?.chainId) {
      const currentChainId = network.chainId;
      if (currentChainId !== ChainId.Mumbai && !isOpen) {
        onOpen();
      } else if (currentChainId == ChainId.Mumbai && isOpen) {
        onClose();
      }
    }
  }, [network?.chainId]);

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

export const ModalSignMessage = () => {
  const disconnect = useDisconnect();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getUserDataAction = useStoreActions((state) => state.user.getData);
  const clearUserStateAction = useStoreActions(
    (state) => state.user.clearState
  );
  const sdk = useSDK();
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  const network = useActiveChain();

  const signMessage = async () => {
    if (sdk && address && connectionStatus == "connected") {
      const signature = await sdk.wallet.sign("Music protocol");
      localStorage.setItem("address", address.toLowerCase());
      localStorage.setItem("signature", signature);
      await getUserData();
      onClose();
    }
  };

  const getUserData = useCallback(async () => {
    if (address && connectionStatus == "connected") getUserDataAction(address);
  }, [address, connectionStatus, getUserDataAction]);
  useEffect(() => {
    if (network?.chainId && sdk) {
      const currentChainId = network.chainId;
      if (currentChainId == ChainId.Mumbai && address) {
        if (
          localStorage.getItem("address") != address.toLowerCase() ||
          !localStorage.getItem("signature")
        ) {
          clearUserStateAction();
          onOpen();
        } else {
          getUserData();
        }
      } else if (isOpen) {
        onClose();
      }
    }
  }, [sdk, network?.chainId]);

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

export default function Sidebar({
  data,
  content,
  selectIndex,
  isLoading,
}: {
  data: Array<SideBarDataProps>;
  content: React.ReactNode;
  selectIndex: number;
  isLoading: boolean;
}) {
  const connectedWallet = useConnectedWallet();

  useEffect(() => {
    if (connectedWallet) {
      // addNetwork();
    }
  }, [connectedWallet]);

  return (
    <Box minH="100vh" bg={"gray.50"} pb={20}>
      <ModalCheckConnect />
      <ModalSwitchNetwork />
      <ModalSignMessage />
      <AppNav data={data} selectIndex={selectIndex} />
      <Box
        style={{
          transition: "all 0.3s ease",
          paddingTop: "80px",
        }}
      >
        {isLoading ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            w={"100%"}
            h={"70vh"}
          >
            <Spinner
              thickness="7px"
              speed="1s"
              emptyColor="gray.200"
              color="yellow.400"
              size="xl"
            />
          </Stack>
        ) : (
          content
        )}
      </Box>
    </Box>
  );
}
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  link: string;
  maintain?: boolean;
}

const NavItem = ({ icon, children, link, maintain, ...rest }: NavItemProps) => {
  const { pathname, replace } = useRouter();
  const isSelect = useMemo(() => {
    if (pathname == "/" && link == SideBarData[0].link) {
      return true;
    }
    return pathname.replace("/", "") === link.replace("/", "");
  }, [pathname, link]);
  return (
    <Box
      onClick={() => {
        if (isSelect || maintain) {
          return;
        } else {
          replace(link, undefined, { shallow: true });
        }
      }}
      cursor={maintain ? "not-allowed" : "pointer"}
      style={{ textDecoration: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color={maintain ? "gray" : isSelect ? "green" : "black"}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        <Text fontFamily={"mono"} fontWeight={"bold"}>
          {children}
        </Text>
        {maintain && (
          <FiSettings
            style={{
              marginLeft: "auto",
              transition: "all 0.3s ease",
            }}
            className="rotate"
            fontSize="16"
          />
        )}
      </Flex>
    </Box>
  );
};

interface AppNavProps {
  data: Array<SideBarDataProps>;
  selectIndex: number;
}

const AppNav = ({ data, selectIndex }: AppNavProps) => {
  return (
    <Stack
      position={"fixed"}
      right={0}
      left={0}
      p={{ base: 1, md: 3 }}
      py={{ base: 2, md: 3 }}
      bg={"white"}
      direction={"row"}
      borderBottomWidth={2.5}
      borderColor={"yellow.400"}
      zIndex={10}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex
        h="58px"
        alignItems="center"
        bg={"white"}
        justifyContent="space-between"
      >
        <Text fontFamily={"mono"} fontWeight="bold" fontSize="2xl">
          GAMBLOCK
        </Text>
      </Flex>
      <HStack>
        {data.map((item, index) => (
          <NavItem
            key={index}
            link={item.link}
            icon={item.icon}
            maintain={item.disabled}
          >
            {item.name}
          </NavItem>
        ))}
      </HStack>
      <Stack height={"58px"} justifyContent={"center"}>
        <ConnectWallet />
      </Stack>
    </Stack>
  );
};
