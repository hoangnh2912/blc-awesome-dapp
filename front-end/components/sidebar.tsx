import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Link,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectWallet, useConnectedWallet } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useMemo } from "react";
import { IconType } from "react-icons";
import { FiMenu, FiSettings } from "react-icons/fi";
import { SideBarData, SideBarDataProps } from "../constants/data/sidebar";
import {
  ModalCheckConnect,
  ModalSignMessage,
  ModalSwitchNetwork,
} from "./sidebar-music";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <AppNav title={data[selectIndex].name} onOpen={onOpen} />
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

interface AppNavProps extends FlexProps {
  onOpen: () => void;
  title: string;
}

const AppNav = ({ onOpen, title, ...rest }: AppNavProps) => {
  return (
    <Stack
      position={"fixed"}
      right={0}
      left={0}
      p={{ base: 1, md: 3 }}
      py={{ base: 2, md: 3 }}
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
          SCIMTA
        </Text>
      </Flex>
      <Box></Box>
      <Stack height={"58px"} justifyContent={"center"}>
        <ConnectWallet />
      </Stack>
    </Stack>
  );
};
