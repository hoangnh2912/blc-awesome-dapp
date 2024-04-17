import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Image,
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
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import {
  ConnectWallet,
  useAddress,
  useChain,
  useConnectionStatus,
  useDisconnect,
  useSDK,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
import { IconType } from "react-icons";
import { USDT_ICON, colors } from "../constants/constants";
import { SideBarData, SideBarDataProps } from "../constants/data/sidebar";
import fonts from "../constants/font";
import { ipfsToHttps } from "../constants/utils";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import AnimatedCounter from "./animate-counter";

export const ModalSwitchNetwork = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const disconnect = useDisconnect();
  const network = useChain();
  const setNetwork = useSwitchChain();

  const switchNetwork = () => {
    if (network && network.chainId == PolygonAmoyTestnet.chainId && isOpen) {
      onClose();
    } else if (setNetwork) {
      setNetwork(PolygonAmoyTestnet.chainId);
    }
  };

  useEffect(() => {
    if (network && network.chainId) {
      const currentChainId = network.chainId;
      if (currentChainId !== PolygonAmoyTestnet.chainId && !isOpen) {
        onOpen();
      } else if (currentChainId == PolygonAmoyTestnet.chainId && isOpen) {
        onClose();
      }
    }
  }, [network, isOpen, onOpen, onClose]);

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
        <ModalHeader>Unsupported network</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Current network not support</Text>
          <Center mt={4}>
            <Button
              onClick={switchNetwork}
              _hover={{ bg: colors.primary.select }}
              color="white"
              bg={colors.primary.default}
            >
              Switch to Polygon Amoy Testnet network
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
  const network = useChain();

  const signMessage = async () => {
    if (sdk && address && connectionStatus == "connected") {
      const signature = await sdk.wallet.sign("GAMBLOCK");
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
      if (currentChainId == PolygonAmoyTestnet.chainId && address) {
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
  }, [
    network,
    sdk,
    address,
    clearUserStateAction,
    getUserData,
    isOpen,
    onClose,
    onOpen,
  ]);

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
              _hover={{ bg: colors.primary.select }}
              color="white"
              bg={colors.primary.default}
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
  return (
    <Box minH="100vh" bgGradient={colors.gradient.background} pb={20}>
      <ModalSwitchNetwork />
      <ModalSignMessage />
      <AppNav data={data} selectIndex={selectIndex} />
      <Box
        style={{
          transition: "all 0.3s ease",
          paddingTop: "250px",
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
              color={colors.primary.default}
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

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
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
        if (isSelect) {
          return;
        } else {
          replace(link, undefined, { shallow: true });
        }
      }}
      cursor={"pointer"}
      style={{ textDecoration: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color={isSelect ? colors.primary.select : colors.primary.text}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        <Text className={fonts.bungeeShade.className} fontWeight={"bold"}>
          {children}
        </Text>
      </Flex>
    </Box>
  );
};

const BlockchainState = () => {
  const [currentBlockNumber, accumulatedUsdt, nextBetBlock] = [
    useStoreState((states) => states.app.currentBlockNumber),
    useStoreState((states) => states.bet.accumulatedUsdt),
    useStoreState((states) => states.app.nextBetBlock),
  ];
  return (
    <Flex gap={"2rem"}>
      <Stack
        p={"1rem"}
        textAlign={"center"}
        borderRadius={"lg"}
        bg={colors.primary.select}
      >
        <Text fontFamily={"mono"} fontWeight="bold" color={colors.primary.text}>
          Current block
        </Text>
        <Text
          fontFamily={"mono"}
          fontWeight="bold"
          fontSize={"25px"}
          color={colors.primary.text}
          bgGradient={colors.gradient.button}
          borderRadius={"8px"}
          p={"1rem"}
          boxShadow={"0 0 15px 0 rgba(0,0,0,0.5)"}
        >
          {currentBlockNumber.toLocaleString()}
        </Text>
      </Stack>
      <Stack
        p={"1rem"}
        borderRadius={"lg"}
        textAlign={"center"}
        bg={colors.primary.select}
      >
        <Text fontFamily={"mono"} fontWeight="bold" color={colors.primary.text}>
          Accumulated reward
        </Text>
        <Text
          fontFamily={"mono"}
          fontWeight="bold"
          fontSize={"25px"}
          color={colors.primary.text}
          bgGradient={colors.gradient.button}
          borderRadius={"8px"}
          p={"1rem"}
          boxShadow={"0 0 15px 0 rgba(0,0,0,0.5)"}
          flexDirection={"row"}
          display={"flex"}
          justifyContent={"center"}
          gap={"0.5rem"}
          alignItems={"center"}
        >
          <AnimatedCounter num={accumulatedUsdt} />
          <Image w={"1.5rem"} h={"1.5rem"} alt="USDT" src={USDT_ICON} />
        </Text>
      </Stack>

      <Stack
        p={"1rem"}
        borderRadius={"lg"}
        textAlign={"center"}
        bg={colors.primary.select}
      >
        <Text fontFamily={"mono"} fontWeight="bold" color={colors.primary.text}>
          Next bet block
        </Text>
        <Text
          fontFamily={"mono"}
          fontWeight="bold"
          fontSize={"25px"}
          color={colors.primary.text}
          bgGradient={colors.gradient.button}
          borderRadius={"8px"}
          p={"1rem"}
          boxShadow={"0 0 15px 0 rgba(0,0,0,0.5)"}
        >
          {nextBetBlock.toLocaleString()}
        </Text>
      </Stack>
    </Flex>
  );
};

interface AppNavProps {
  data: Array<SideBarDataProps>;
  selectIndex: number;
}

const AppNav = ({ data }: AppNavProps) => {
  return (
    <Stack
      position={"fixed"}
      right={0}
      left={0}
      p={{ base: 1, md: 3 }}
      py={{ base: 2, md: 3 }}
      bgGradient={colors.gradient.background}
      borderBottomWidth={1}
      borderColor={colors.primary.default}
      zIndex={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack w={"100%"} flexDirection={"row"}>
        <Text
          flex={1}
          fontWeight="bold"
          color={colors.primary.text}
          className={fonts.bungeeShade.className}
          fontSize="2xl"
        >
          GAMBLOCK
        </Text>
        <HStack justifyContent={"center"} flex={1}>
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
        <HStack flex={1} justifyContent={"right"} spacing={"2.5rem"}>
          <HStack>
            <Image
              w={"50px"}
              h={"50px"}
              alt={PolygonAmoyTestnet.name}
              src={ipfsToHttps(PolygonAmoyTestnet.icon.url)}
            />
            <Text
              fontFamily={"mono"}
              fontWeight="bold"
              color={colors.primary.default}
            >
              {PolygonAmoyTestnet.name}
            </Text>
          </HStack>
          <ConnectWallet />
        </HStack>
      </Stack>
      <Divider
        height={"0.5px"}
        width={"200vh"}
        opacity={1}
        bg={colors.primary.default}
      />
      <BlockchainState />
    </Stack>
  );
};
