import {
  Button,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { ipfsToGateway } from "../../constants/utils";
import MusicBaseLayout from "../../layouts/music.base";
import ApiServices from "../../services/api";
import { GetUserOutput } from "../../services/api/types";
import { useStoreActions, useStoreState } from "../../services/redux/hook";
const EditProfile: NextPage = () => {
  const address = useAddress();
  const { back } = useRouter();
  const userInfo = useStoreState((state) => state.user.data);
  const getUserInfo = useStoreActions((state) => state.user.getData);
  const image = userInfo?.avatar || null;
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>(
    userInfo?.name == "Unnamed" ? "" : userInfo?.name || ""
  );
  const [description, setDescription] = useState<string>(
    userInfo?.description || ""
  );
  const getUserData = async () => {
    if (address) getUserInfo(`${address}`);
  };

  const toast = useToast();

  const updateUserData = async () => {
    if (address) {
      try {
        let avatarUpload = null;
        if (file) {
          const formData = new FormData();
          formData.append("imageFile", file);
          const res = await ApiServices.ipfs.uploadImage(formData);
          avatarUpload = res.data.data;
        }
        await ApiServices.user.createUser({
          name: username,
          description,
          avatar: avatarUpload || image,
        });
        back();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [address]);

  const onDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <MusicBaseLayout selectTabIndex={-1}>
      <Text fontFamily="mono" fontWeight="bold" fontSize={"24"} color="white">
        Edit Profile
      </Text>
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        flex={1}
      >
        <Stack flex={1}>
          <Text
            fontFamily="mono"
            style={{
              marginTop: "1rem",
            }}
            fontWeight="bold"
            fontSize={"20"}
            color="white"
          >
            Profile Image
          </Text>
          <Text
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"14"}
            color="#6F6E6E"
          >
            File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB
          </Text>
          <Stack
            onClick={() => {
              let input = document.createElement("input");
              input.hidden = true;
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e: any) => {
                let file = e.target?.files?.item(0);
                if (file && file.type.includes("image")) setFile(file);
                input.remove();
              };
              input.click();
            }}
            w={"50%"}
            alignSelf="center"
            justifyContent="center"
            alignItems="center"
            borderRadius="50%"
            overflow="hidden"
            boxShadow="5px 5px 5px 5px rgba(0,0,0,0.3)"
            _hover={{
              bg: "#0D166D",
            }}
            border="3px solid #fcae00"
            bg="#0D164D"
            style={{
              aspectRatio: "1",
              marginTop: "2rem",
            }}
            cursor="pointer"
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              let file = e.dataTransfer.files.item(0);
              if (file && file.type.includes("image")) setFile(file);
            }}
          >
            {file || image ? (
              <>
                <Image
                  src={
                    file ? URL.createObjectURL(file) : ipfsToGateway(`${image}`)
                  }
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  fit="cover"
                  alt="music image"
                />
              </>
            ) : (
              <AiFillEdit color="gray" size={"15%"} />
            )}
          </Stack>
        </Stack>
        <Stack flex={1}>
          <Text
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"20"}
            color="white"
          >
            Username
          </Text>
          <Input
            maxLength={256}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            borderRadius="lg"
            borderColor="gray.300"
            placeholder="Your music title"
            color="white"
            w={"100%"}
            fontFamily="mono"
          />
          <Text
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"20"}
            color="white"
          >
            Bio
          </Text>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            borderRadius="lg"
            borderColor="gray.300"
            placeholder="Description"
            color="white"
            w={"100%"}
            fontFamily="mono"
          />
          <Text
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"20"}
            color="white"
          >
            Wallet
          </Text>
          <Input
            value={address}
            disabled
            borderRadius="lg"
            borderColor="gray.300"
            color="white"
            w={"100%"}
            fontFamily="mono"
          />

          <Button
            fontSize={"24"}
            fontFamily="mono"
            onClick={updateUserData}
            fontWeight="bold"
            color="#fcae00"
            bg="#3443A0"
            w={{
              base: "100%",
              md: "max(20%, 150px)",
            }}
            alignSelf="flex-end"
            style={{
              marginTop: "2rem",
            }}
          >
            Update
          </Button>
        </Stack>
        <Stack
          display={{
            base: "none",
            md: "flex",
          }}
          flex={1}
        ></Stack>
      </Stack>
    </MusicBaseLayout>
  );
};

export default EditProfile;
