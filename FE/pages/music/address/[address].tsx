import {
  Button,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaShareAlt, FaUserEdit } from "react-icons/fa";
import Collection from "../../../components/collection";
import Studio from "../../../components/studio";
import { NO_AVATAR } from "../../../constants/constants";
import { ipfsToGateway } from "../../../constants/utils";
import MusicBaseLayout from "../../../layouts/music.base";
import ApiServices from "../../../services/api";
import { GetMarketOutput, GetUserOutput } from "../../../services/api/types";
import { useStoreState } from "../../../services/redux/hook";

const Profile = () => {
  const router = useRouter();
  const { address } = router.query;
  const currentAddress = useAddress();
  const isMyProfile =
    address &&
    currentAddress &&
    currentAddress.toLowerCase() == `${address}`.toLowerCase();
  const { push } = useRouter();

  const userConnectData = useStoreState((state) => state.user.data);

  const [userInfo, setUserInfo] = useState<GetUserOutput>();
  const [collection, setCollection] = useState<GetMarketOutput[]>([]);
  const [totalCollection, setTotalCollection] = useState(0);
  const [totalStudio, setTotalStudio] = useState(0);

  const getUserProfileData = async () => {
    if (address) {
      try {
        if (isMyProfile) {
          const resMyCollection = await ApiServices.music.getMyCollection();
          setCollection(resMyCollection.data.data);
          setTotalCollection(resMyCollection.data.total);
          setUserInfo(userConnectData);
        } else {
          const resUser = await ApiServices.user.getUser(`${address}`);
          setUserInfo(resUser.data.data);
        }
      } catch (error) {}
    }
  };

  const onClickEdit = () => {
    push("/music/edit-profile", undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    getUserProfileData();
  }, [address, currentAddress, userConnectData]);

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
              onClick={onClickEdit}
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
          onClick={onClickEdit}
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
      <Tabs my="2" variant="line">
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
            Studio<Text color="#C2A822">{`(${totalStudio})`}</Text>
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
              Collection <Text color="#C2A822">{`(${totalCollection})`}</Text>
            </Tab>
          )}
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <Studio setTotalStudio={setTotalStudio} address={`${address}`} />
          </TabPanel>
          {isMyProfile && (
            <TabPanel p={0}>
              <Collection collection={collection} address={`${address}`} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </MusicBaseLayout>
  );
};

export default Profile;
