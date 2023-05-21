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
import { FaUserEdit } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import Collection from "../../../components/collection";
import Studio from "../../../components/studio";
import { NO_AVATAR } from "../../../constants/constants";
import { ipfsToGateway } from "../../../constants/utils";
import MusicBaseLayout from "../../../layouts/music.base";
import ApiServices from "../../../services/api";
import { GetUserOutput } from "../../../services/api/types";
import { useStoreState } from "../../../services/redux/hook";
const Profile = () => {
  const router = useRouter();
  const { address, tab } = router.query;
  const currentAddress = useAddress();
  const isMyProfile =
    address &&
    currentAddress &&
    currentAddress.toLowerCase() == `${address}`.toLowerCase();
  const { push } = useRouter();

  const userConnectData = useStoreState((state) => state.user.data);

  const [userInfo, setUserInfo] = useState<GetUserOutput>();
  const [totalCollection, setTotalCollection] = useState(0);
  const [totalStudio, setTotalStudio] = useState(0);
  const [tabIndex, setTabIndex] = useState(tab ? parseInt(`${tab}`) : 0);

  const getUserProfileData = async () => {
    if (address) {
      try {
        if (isMyProfile) {
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
            border: "3px solid #fcae00",
            aspectRatio: "1/1",
          }}
        />
        <Stack flex={5} justifyContent="center" px={2}>
          <Text
            color="white"
            fontSize="24"
            textOverflow="ellipsis"
            noOfLines={1}
            fontWeight="bold"
          >
            {userInfo.name}
          </Text>
          <Text
            wordBreak="break-word"
            color="#fcae00"
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
              border="2px solid #fcae00"
            >
              <FaUserEdit />
              Edit
            </Button>
          )}
          <Stack direction="row" spacing={2}>
            <FacebookShareButton
              url={`https://scimta.com/music/address/${address}`}
            >
              <FacebookIcon size={"35px"} borderRadius={5} />
            </FacebookShareButton>
            <TelegramShareButton
              url={`https://scimta.com/music/address/${address}`}
            >
              <TelegramIcon size={"35px"} borderRadius={5} />
            </TelegramShareButton>
            <TwitterShareButton
              url={`https://scimta.com/music/address/${address}`}
            >
              <TwitterIcon size={"35px"} borderRadius={5} />
            </TwitterShareButton>
          </Stack>
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
          border="2px solid #fcae00"
          flex={1}
          onClick={onClickEdit}
          gap={5}
        >
          <FaUserEdit />
          Edit
        </Button>
        <Stack direction="row" spacing={2}>
          <FacebookShareButton
            url={`https://scimta.com/music/address/${address}`}
          >
            <FacebookIcon size={"35px"} borderRadius={5} />
          </FacebookShareButton>
          <TelegramShareButton
            url={`https://scimta.com/music/address/${address}`}
          >
            <TelegramIcon size={"35px"} borderRadius={5} />
          </TelegramShareButton>
          <TwitterShareButton
            url={`https://scimta.com/music/address/${address}`}
          >
            <TwitterIcon size={"35px"} borderRadius={5} />
          </TwitterShareButton>
        </Stack>
      </Stack>
      <Tabs my="2" index={tabIndex} onChange={setTabIndex} variant="line">
        <TabList>
          <Tab
            _selected={{
              color: "#fcae00",
              borderBottomColor: "#fcae00",
              borderBottomWidth: "5px",
            }}
            color="white"
            fontFamily="mono"
            fontWeight="bold"
            fontSize="16"
          >
            Studio<Text color="#fcae00">{`(${totalStudio})`}</Text>
          </Tab>
          {isMyProfile && (
            <Tab
              _selected={{
                color: "#fcae00",
                borderBottomColor: "#fcae00",
                borderBottomWidth: "5px",
              }}
              color="white"
              fontFamily="mono"
              fontWeight="bold"
              fontSize="16"
            >
              Collection <Text color="#fcae00">{`(${totalCollection})`}</Text>
            </Tab>
          )}
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <Studio setTotalStudio={setTotalStudio} address={`${address}`} />
          </TabPanel>
          {isMyProfile && (
            <TabPanel p={0}>
              <Collection
                setTotalCollection={setTotalCollection}
                address={`${address}`}
              />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </MusicBaseLayout>
  );
};

export default Profile;
