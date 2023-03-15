import {
  Button,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import MusicBaseLayout from "../../layouts/music.base";
const EditProfile: NextPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const address = useAddress();

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
                if (file && file.type.includes("image"))
                  setImage(URL.createObjectURL(file));
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
            border="3px solid #C2A822"
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
              if (file && file.type.includes("image"))
                setImage(URL.createObjectURL(file));
            }}
          >
            {image ? (
              <>
                <Image
                  src={image}
                  objectFit="contain"
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
            fontWeight="bold"
            color="#C2A822"
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
