import React, { ReactText, useMemo } from "react";
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
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import { ChainId, ConnectWallet, useChainId } from "@thirdweb-dev/react";
import { SideBarData, SideBarDataProps } from "../constants/data/sidebar";
import { useRouter } from "next/router";

export default function Sidebar({
  data,
  content,
  selectIndex,
}: {
  data: Array<SideBarDataProps>;
  content: React.ReactNode;
  selectIndex: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
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
      <Box ml={{ base: 0, md: 60 }} p="4">
        {content}
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
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          SCIMTA Protocol
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {data.map((link) => (
        <NavItem key={link.name} link={link.link} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link: string;
}

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const { pathname } = useRouter();
  const isSelect = useMemo(() => {
    if (pathname == "/" && link == SideBarData[0].link) {
      return true;
    }
    return pathname.replace("/", "") === link.replace("/", "");
  }, [pathname, link]);
  return (
    <Link
      href={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isSelect ? "cyan.400" : "transparent"}
        color={isSelect ? "white" : "black"}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface AppNavProps extends FlexProps {
  onOpen: () => void;
  title: string;
}

const AppNav = ({ onOpen, title, ...rest }: AppNavProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        fontSize="md"
        paddingLeft={"10px"}
        fontFamily="monospace"
        fontWeight="bold"
      >
        {title}
      </Text>

      <ConnectWallet />
    </Flex>
  );
};
