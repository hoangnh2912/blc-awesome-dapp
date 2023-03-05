import {
  Box,
  BoxProps,
  Button,
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
  InputLeftElement,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger as ExPopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectWallet, useConnectedWallet } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useMemo } from "react";
import { IconType } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import {
  SideBarData,
  SideBarDataMusic,
  SideBarDataProps,
} from "../constants/data/sidebar";
import backgroundImage from "../public/background.png";
import { addNetwork } from "../services/thirdweb";
const PopoverTrigger = (props: FlexProps) => {
  return <ExPopoverTrigger {...props} />;
};

export default function SidebarMusic({
  data,
  content,
  selectIndex,
}: {
  data: Array<SideBarDataProps>;
  content: React.ReactNode;
  selectIndex: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const connectedWallet = useConnectedWallet();

  useEffect(() => {
    if (connectedWallet) {
      addNetwork();
    }
  }, [connectedWallet]);

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
      pb={20}
    >
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
      <Box ml={{ base: 0, md: 60 }} p="4" pt={20}>
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
        <Image p={"7"} alt="logo" src="/logo.png" />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          color={"white"}
          bg={"yellow.400"}
          onClick={onClose}
        />
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
  children: ReactNode;
  link: string;
}

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const { pathname } = useRouter();
  const isSelect = useMemo(() => {
    if (
      (pathname == "/" && link == SideBarData[0].link) ||
      (pathname == "/music-marketplace" && link == SideBarDataMusic[0].link)
    ) {
      return true;
    }
    return pathname.replace("/", "") === link.replace("/", "");
  }, [pathname, link]);
  return (
    <Link
      href={isSelect ? "#" : link}
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
        color={isSelect ? "yellow.400" : "white"}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        <Text fontFamily={"mono"} fontWeight={"bold"}>
          {children}
        </Text>
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
    <Stack
      position={"fixed"}
      right={0}
      left={0}
      ml={{ base: 0, md: 60 }}
      p={{ base: 1, md: 3 }}
      py={{ base: 2, md: 3 }}
      bg={"transparent"}
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
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <InputGroup w={["100%", "70%", "65%", "60%", "50%", "35%"]}>
        <InputLeftElement pointerEvents="none">
          <BsSearch color="white" />
        </InputLeftElement>
        <Input
          borderWidth={0}
          bg={"rgba(0, 0, 0, 0.3)"}
          boxShadow={"2xl"}
          borderRadius={100}
          color={"white"}
          fontSize={["xs", "sm", "md"]}
          placeholder="Search song, artist, ..."
        />
      </InputGroup>

      <Popover closeOnBlur={false} trigger="hover" placement="bottom-start">
        <PopoverTrigger>
          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            boxShadow={"2xl"}
          >
            <CgProfile size={30} color={"#C2A822"} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Wallet</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <ConnectWallet />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Stack>
  );
};
