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
    <Box minH="100vh" bg={"#F9FAFB"} pb={20}>
      <ModalCheckConnect />
      <ModalSwitchNetwork />
      <ModalSignMessage />
      <SidebarContent
        data={data}
        onClose={() => onClose}
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
          <SidebarContent data={data} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <AppNav title={data[selectIndex].name} onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        style={{
          padding: "1rem",
          transition: "all 0.3s ease",
          paddingTop: "calc(1rem + 85px)",
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

interface SidebarProps extends BoxProps {
  onClose: () => void;
  data: Array<SideBarDataProps>;
}

const SidebarContent = ({ onClose, data, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      boxShadow={"2xl"}
      bg={"#F9FAFB"}
      {...rest}
    >
      <Flex
        h="84px"
        borderBottomWidth={"2px"}
        borderBottomColor="yellow.400"
        alignItems="center"
        px="4"
        bg={"white"}
        justifyContent="space-between"
      >
        <Text fontFamily={"mono"} fontWeight="bold" fontSize="2xl">
          SCIMTA
        </Text>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          color={"white"}
          bg={"green.400"}
          onClick={onClose}
        />
      </Flex>
      {data.map((link) => (
        <NavItem
          boxShadow={"lg"}
          bg={"white"}
          my={"5"}
          key={link.name}
          link={link.link}
          maintain={link.disabled}
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
      ml={{ base: 0, md: 60 }}
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
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        color={"green"}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box></Box>
      <Stack height={"58px"} justifyContent={"center"}>
        <ConnectWallet />
      </Stack>
    </Stack>
  );
};
