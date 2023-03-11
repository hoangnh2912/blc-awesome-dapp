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
import { useRouter } from "next/router";
import { BsPauseFill } from "react-icons/bs";
import { FaShareAlt, FaUserEdit } from "react-icons/fa";
import { MdRemoveShoppingCart, MdSell } from "react-icons/md";
import SongNFTComponent, { SongNFTProps } from "../../../components/song-nft";
import MusicBaseLayout from "../../../layouts/music.base";
import { useStoreActions } from "../../../services/redux/hook";

const Profile = () => {
  const router = useRouter();
  const { address } = router.query;
  const playMusicAction = useStoreActions((state) => state.music.playMusic);

  const { replace } = useRouter();

  const userInfo = {
    name: "Green guy",
    avatar: "https://i.pravatar.cc/300",
    description: `This is Bio ...Lorem ipsum dolor sit amet, consectetur 
    adipiscing elit, sed do eiusmod tempor incididunt ut labore
    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
    exercitation ullamco laboris nisi ut aliquip ex ea commodo`,
  };

  const data = {
    id: "4",
    name: "Song Name 4",
    seller: "0x1234567890223443342ddawweffsa",
    singer: "Snoop Dog",
    attributes: [
      {
        trait_type: "Genre",
        value: "Pop",
      },
      {
        trait_type: "Mood",
        value: "Happy",
      },
      {
        trait_type: "Instrument",
        value: "Guitar",
      },
    ],
    description: "This is a song description",
    date: new Date(),
    total: 100,
    sold: 10,
    price: "5",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/9d/75/53/9d755300-a1c2-7a01-51d5-8ffc4b4ba642/mzaf_12119942434649250117.plus.aac.ep.m4a",
    image:
      "https://images.unsplash.com/photo-1678002219434-c6738513037e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
  };

  const studio = [data];

  const collection = [data];

  const onPlayMusic = (music: SongNFTProps) => {
    playMusicAction(music);
  };
  return (
    <MusicBaseLayout selectTabIndex={-1}>
      <Stack justifyContent="space-between" direction={"row"}>
        <Image
          objectFit="cover"
          borderRadius="50%"
          width="max(15%, 150px)"
          height="max(15%, 150px)"
          alt={userInfo.name}
          src={userInfo.avatar}
          style={{
            boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.15)",
            border: "3px solid #C2A822",
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
              replace("/music/edit-profile", undefined, {
                shallow: true,
              });
            }}
            border="2px solid #C2A822"
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
              <SongNFTComponent {...data} />
            </Stack>
          </TabPanel>
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
              <SongNFTComponent {...data} />
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MusicBaseLayout>
  );
};

export default Profile;
