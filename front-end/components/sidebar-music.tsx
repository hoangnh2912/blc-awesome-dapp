import {
  Box,
  BoxProps,
  Button,
  Center,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
  useBalance,
  useConnectionStatus,
  useDisconnect,
  useMetamask,
  useSDK,
  useSwitchChain,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GiUnicorn } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { ABI_MUSIC } from "../constants/abi";
import { SideBarDataProps } from "../constants/data/sidebar";
import backgroundImage from "../public/background.png";
import ApiServices from "../services/api";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import LinkScan from "./link-scan";
import { useModalTransaction } from "./modal-transaction";
import SongNFTSmallComponent from "./song-nft-small";

export const ModalCheckConnect = () => {
  const setIsCheckConnectAction = useStoreActions(
    (state) => state.user.setIsCheckConnect
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
  const setUserDataAction = useStoreActions((state) => state.user.setData);
  const sdk = useSDK();
  const address = useAddress();
  const network = useActiveChain();

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
    if (address) getUserDataAction(address);
  };

  useEffect(() => {
    if (network?.chainId && sdk) {
      const currentChainId = network.chainId;
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
  }, [sdk, network?.chainId, address]);

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

export default function SidebarMusic({
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setIsShowPlayListAction = useStoreActions(
    (state) => state.music.setIsShowPlayList
  );
  const isOpenPlaylistState = useStoreState(
    (state) => state.music.isShowPlayList
  );
  const playListState = useStoreState((state) => state.music.playList);
  const onClosePlaylist = () => {
    setIsShowPlayListAction(false);
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundColor: "#0D164D",
      }}
      minH="100vh"
      pb={"200px"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ModalCheckConnect />
      <ModalSwitchNetwork />
      <ModalSignMessage />
      <SidebarContent
        data={data}
        selectIndex={selectIndex}
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            selectIndex={selectIndex}
            data={data}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>

      <Drawer
        autoFocus={false}
        isOpen={isOpenPlaylistState}
        placement="right"
        onClose={onClosePlaylist}
        returnFocusOnClose={false}
        onOverlayClick={onClosePlaylist}
        size={"sm"}
      >
        <DrawerContent
          style={{
            backgroundColor: "#0D164DEE",
            boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.75)",
          }}
          h={"calc(100vh - 7.9rem)"}
        >
          <Flex
            h="66px"
            borderBottomWidth={1}
            borderBottomColor="yellow.400"
            alignItems="center"
            px="4"
            justifyContent="space-between"
          >
            <Text
              color={"yellow.400"}
              fontSize={"xl"}
              fontWeight={"bold"}
              fontFamily={"mono"}
            >
              Playlist
            </Text>
            <CloseButton
              color={"white"}
              bg={"yellow.400"}
              onClick={onClosePlaylist}
            />
          </Flex>
          {playListState &&
            playListState.length > 0 &&
            playListState.map((item) => (
              <SongNFTSmallComponent {...item} key={item.id} />
            ))}
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <AppNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
        p="4"
        pt={20}
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

interface SidebarProps extends BoxProps {
  onClose: () => void;
  selectIndex: number;
  data: Array<SideBarDataProps>;
}

const SidebarContent = ({
  onClose,
  data,
  selectIndex,
  ...rest
}: SidebarProps) => {
  const { replace } = useRouter();

  const onClickLink = () => {
    replace(
      {
        pathname: "/music-marketplace",
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <Box
      transition="3s ease"
      bg={"#0D164D"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      boxShadow={"2xl"}
      {...rest}
    >
      <Flex
        h="66px"
        borderBottomWidth={1}
        borderBottomColor="yellow.400"
        alignItems="center"
        mx="4"
        justifyContent="space-between"
      >
        <Image
          py={"3"}
          h={"full"}
          fit="contain"
          w={"full"}
          cursor="pointer"
          onClick={onClickLink}
          alt="logo"
          src="/logo.png"
        />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          color={"white"}
          bg={"yellow.400"}
          onClick={onClose}
        />
      </Flex>
      {data.map((link, index) => (
        <NavItem
          key={link.name}
          isSelect={index == selectIndex}
          link={link.link}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  link: string;
  isSelect: boolean;
}

const NavItem = ({ icon, children, isSelect, link, ...rest }: NavItemProps) => {
  const { replace } = useRouter();

  const onClickLink = () => {
    replace(
      {
        pathname: link,
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <Link
      href={"#"}
      onClick={onClickLink}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        px="4"
        mx="4"
        my={"2"}
        py={"2"}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isSelect ? "#C2A822" : "transparent"}
        color={"white"}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="18" as={icon} />}
        <Text fontFamily={"mono"} fontWeight={"bold"}>
          {children}
        </Text>
      </Flex>
    </Link>
  );
};

interface AppNavProps extends FlexProps {
  onOpen: () => void;
}

const AppNav = ({ onOpen }: AppNavProps) => {
  const { replace, push, query } = useRouter();

  const address = useAddress();
  const disconnect = useDisconnect();

  const [search, setSearch] = useState(query.search || "");

  const onEnterPress = (e: any) => {
    if (e.key === "Enter") {
      push(`/music/list?search=${search}`, undefined, { shallow: true });
    }
  };
  const { data, refetch } = useBalance(ABI_MUSIC.MUC.address);

  const sdk = useSDK();

  const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();

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
    <Stack
      position={"fixed"}
      right={0}
      left={0}
      ml={{ base: 0, md: 60 }}
      p={{ base: 1, md: 3 }}
      py={{ base: 2, md: 3 }}
      bg={"#0D164DEE"}
      direction={"row"}
      borderBottomWidth={2.5}
      borderColor={"yellow.400"}
      zIndex={10}
      justifyContent={"space-between"}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        color={"white"}
        bg={"transparent"}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <InputGroup w={["100%", "70%", "65%", "60%", "50%", "35%"]}>
        <Input
          borderWidth={0}
          bg={"rgba(0, 0, 0, 0.3)"}
          boxShadow={"2xl"}
          borderRadius={100}
          maxLength={256}
          color={"white"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={onEnterPress}
          fontSize={["xs", "sm", "md"]}
          placeholder="Search song, artist, ..."
        />
        {search && (
          <InputRightElement cursor="pointer" pointerEvents="none">
            <BsSearch color="white" />
          </InputRightElement>
        )}
      </InputGroup>

      <Popover closeOnBlur={false} trigger="hover" placement="bottom-start">
        <PopoverTrigger>
          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            boxShadow={"2xl"}
          >
            <CgProfile size={30} color={"#fcae00"} />
          </Button>
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
                <Text fontFamily={"mono"}>
                  {data?.displayValue.substring(0, 8)} MUC
                </Text>
                {address == "0x62636FFD17bB80B1a7c177e5F45d774A1eE0d228" && (
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
                )}
              </Stack>
              <Stack
                p="4"
                cursor="pointer"
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
                  window.open(
                    `https://app.uniswap.org/#/swap?exactAmount=0.02&outputCurrency=${ABI_MUSIC.MUC.address}&inputCurrency=ETH&chain=polygon`,
                    "_blank"
                  );
                }}
              >
                <GiUnicorn color={"#FF007A"} />
                <Text color={"#FF007A"} fontFamily={"mono"}>
                  Get MUC on Uniswap
                </Text>
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
    </Stack>
  );
};
