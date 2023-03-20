import {
  Button,
  Image,
  Stack,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPauseFill } from "react-icons/bs";
import { FaShareAlt, FaUserEdit } from "react-icons/fa";
import { MdRemoveShoppingCart, MdSell } from "react-icons/md";
import { NO_AVATAR } from "../../../constants/constants";
import { ipfsToGateway } from "../../../constants/utils";
import MusicBaseLayout from "../../../layouts/music.base";
import ApiServices from "../../../services/api";
import { GetUserOutput } from "../../../services/api/types";
import { useStoreActions, useStoreState } from "../../../services/redux/hook";

const Profile = () => {
  const router = useRouter();
  const { address } = router.query;
  const currentAddress = useAddress();
  const isMyProfile =
    address &&
    currentAddress &&
    currentAddress.toLowerCase() == `${address}`.toLowerCase();
  const playMusicAction = useStoreActions((state) => state.music.playMusic);

  const { push, replace } = useRouter();

  const isLogin = useStoreState((state) => state.user.isLogin);

  const [userInfo, setUserInfo] = useState<GetUserOutput>();

  const getUserData = async () => {
    if (address && currentAddress) {
      try {
        const res = await ApiServices.user.getUser();
        setUserInfo(res.data.data);
      } catch (error) {}
    }
  };

  useEffect(() => {
    getUserData();
  }, [address, currentAddress, isLogin]);

  if (!userInfo) {
    return (
      <MusicBaseLayout selectTabIndex={-1}>
        <></>
      </MusicBaseLayout>
    );
  }

  return (
    <MusicBaseLayout selectTabIndex={-1}>
      <Stack justifyContent="space-between" direction={"row"}>
        <Image
          objectFit="cover"
          borderRadius="50%"
          width="max(15%, 150px)"
          height="max(15%, 150px)"
          alt={userInfo.name}
          src={userInfo.avatar ? ipfsToGateway(userInfo.avatar) : NO_AVATAR}
          style={{
            boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.15)",
            border: "3px solid #C2A822",
            aspectRatio: "1/1",
          }}
        />
        <Stack flex={5} justifyContent="center" px={2}>
          <Text color="white" fontSize="24" fontWeight="bold">
            {userInfo.name}
          </Text>
          <Text
            wordBreak="break-word"
            color="#C2A822"
            fontSize="16"
            fontWeight="bold"
          >
            {address}
          </Text>
          <Text
            display={{
              base: "none",
              md: "block",
            }}
            color="white"
            fontSize="16"
            fontWeight="bold"
          >
            {userInfo.description}
          </Text>
        </Stack>

        <Stack
          flex={1}
          display={{
            base: "none",
            md: "flex",
          }}
          justifyContent="space-evenly"
          alignItems="center"
        >
          {isMyProfile && (
            <Button
              bg="transparent"
              boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
              alignItems="center"
              fontWeight="bold"
              borderRadius="lg"
              fontSize="16"
              color="white"
              justifyContent="space-around"
              width="120px"
              onClick={() => {
                push("/music/edit-profile", undefined, {
                  shallow: true,
                });
              }}
              border="2px solid #C2A822"
            >
              <FaUserEdit />
              Edit
            </Button>
          )}
          <Button
            bg="transparent"
            boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
            alignItems="center"
            fontWeight="bold"
            borderRadius="lg"
            fontSize="16"
            color="white"
            width="120px"
            justifyContent="space-around"
            border="2px solid #C2A822"
          >
            <FaShareAlt />
            Share
          </Button>
        </Stack>
      </Stack>
      <Text
        display={{
          base: "block",
          md: "none",
        }}
        mt={4}
        color="white"
        fontSize="16"
        fontWeight="bold"
      >
        {userInfo.description}
      </Text>
      <Stack
        flex={1}
        display={{
          base: "flex",
          md: "none",
        }}
        direction="row"
        mt={4}
      >
        <Button
          bg="transparent"
          boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
          alignItems="center"
          fontWeight="bold"
          borderRadius="lg"
          fontSize="16"
          color="white"
          border="2px solid #C2A822"
          flex={1}
          gap={5}
        >
          <FaUserEdit />
          Edit
        </Button>
        <Button
          bg="transparent"
          boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
          alignItems="center"
          fontWeight="bold"
          borderRadius="lg"
          fontSize="16"
          color="white"
          flex={1}
          gap={5}
          border="2px solid #C2A822"
        >
          <FaShareAlt />
          Share
        </Button>
      </Stack>
      <Tabs m="4" variant="line">
        <TabList>
          <Tab
            _selected={{
              color: "#C2A822",
              borderBottomColor: "#C2A822",
              borderBottomWidth: "5px",
            }}
            color="white"
            fontFamily="mono"
            fontWeight="bold"
            fontSize="16"
          >
            Studio
          </Tab>
          {isMyProfile && (
            <Tab
              _selected={{
                color: "#C2A822",
                borderBottomColor: "#C2A822",
                borderBottomWidth: "5px",
              }}
              color="white"
              fontFamily="mono"
              fontWeight="bold"
              fontSize="16"
            >
              Collection
            </Tab>
          )}
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableContainer>
              <Table
                display={{
                  base: "none",
                  md: "table",
                }}
                variant="simple"
              >
                <Thead>
                  <Tr>
                    <Th
                      fontFamily="mono"
                      fontWeight="bold"
                      fontSize="16"
                      color="#C2A822"
                    >
                      Title
                    </Th>
                    <Th
                      fontFamily="mono"
                      fontWeight="bold"
                      fontSize="16"
                      color="#C2A822"
                    >
                      Time
                    </Th>
                    <Th
                      fontFamily="mono"
                      fontWeight="bold"
                      fontSize="16"
                      color="#C2A822"
                    >
                      Price
                    </Th>
                    <Th
                      fontFamily="mono"
                      fontWeight="bold"
                      fontSize="16"
                      color="#C2A822"
                    >
                      Sold
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr
                    fontFamily="mono"
                    fontWeight="bold"
                    fontSize="16"
                    color="white"
                  >
                    <Td>Tôi thấy hoa vàng trên cỏ xanh</Td>
                    <Td>1:03</Td>
                    <Td>2.74 MUC</Td>
                    <Td>10/100</Td>
                    <Td>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-evenly"
                      >
                        <BsPauseFill size={"30px"} />
                        <MdRemoveShoppingCart size={"25px"} />
                      </Stack>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Stack
              display={{
                base: "flex",
                md: "none",
              }}
            >
              {/* <SongNFTComponent {...data} /> */}
            </Stack>
          </TabPanel>
          {isMyProfile && (
            <TabPanel>
              <TableContainer>
                <Table
                  display={{
                    base: "none",
                    md: "table",
                  }}
                  variant="simple"
                >
                  <Thead>
                    <Tr>
                      <Th
                        fontFamily="mono"
                        fontWeight="bold"
                        fontSize="16"
                        color="#C2A822"
                      >
                        Title
                      </Th>
                      <Th
                        fontFamily="mono"
                        fontWeight="bold"
                        fontSize="16"
                        color="#C2A822"
                      >
                        Time
                      </Th>
                      <Th
                        fontFamily="mono"
                        fontWeight="bold"
                        fontSize="16"
                        color="#C2A822"
                      >
                        Purchase Price
                      </Th>
                      <Th
                        fontFamily="mono"
                        fontWeight="bold"
                        fontSize="16"
                        color="#C2A822"
                      >
                        Date
                      </Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr
                      fontFamily="mono"
                      fontWeight="bold"
                      fontSize="16"
                      color="white"
                    >
                      <Td>Tôi thấy hoa vàng trên cỏ xanh</Td>
                      <Td>1:03</Td>
                      <Td>2.74 MUC</Td>
                      <Td>22/12/2023</Td>
                      <Td>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-evenly"
                        >
                          <BsPauseFill size={"30px"} />
                          <MdSell size={"25px"} />
                        </Stack>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Stack
                display={{
                  base: "flex",
                  md: "none",
                }}
              >
                {/* <SongNFTComponent {...data} /> */}
              </Stack>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </MusicBaseLayout>
  );
};

export default Profile;
