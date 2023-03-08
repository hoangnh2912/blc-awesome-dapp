import {
  AspectRatio,
  Box,
  Button,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { TbUpload } from "react-icons/tb";
import MusicBaseLayout from "../../layouts/music.base";
import { useStoreActions } from "../../services/redux/hook";
const Create: NextPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const playMusicAction = useStoreActions((state) => state.music.playMusic);

  useEffect(() => {
    if (audio && url) {
      playMusicAction({
        id: "-1",
        name: "",
        image: image || "",
        price: "0",
        singer: "",
        url,
      });
    }
  }, [audio, image]);

  return (
    <MusicBaseLayout selectTabIndex={1}>
      <Stack direction={["column", "column", "row"]}>
        <Stack flex={1}>
          <Text
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"32"}
            color="#C2A822"
          >
            Audio file
          </Text>
          <Stack
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.dataTransfer.dropEffect = "copy";
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              let file = e.dataTransfer.files.item(0);
              if (file && file.type.includes("audio")) {
                setAudio(file);
                setUrl(URL.createObjectURL(file));
              }
            }}
            bg="gray.100"
            w="100%"
            height="100px"
            justifyContent="center"
            alignItems="center"
            _hover={{
              bg: "gray.300",
            }}
            boxShadow="5px 5px 5px 5px rgba(0,0,0,0.3)"
            cursor="pointer"
            borderRadius="lg"
          >
            {audio ? (
              <>{audio.name}</>
            ) : (
              <>
                <TbUpload color="gray" size={"20%"} />
                <Text>
                  <b>Upload</b> your music file
                </Text>
              </>
            )}
          </Stack>
          <Text
            fontFamily="mono"
            style={{
              marginTop: "2rem",
            }}
            fontWeight="bold"
            fontSize={"32"}
            color="#C2A822"
          >
            Picture
          </Text>
          <Stack
            bg="gray.100"
            w="100%"
            justifyContent="center"
            alignItems="center"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="5px 5px 5px 5px rgba(0,0,0,0.3)"
            _hover={{
              bg: "gray.300",
            }}
            style={{
              aspectRatio: "1",
            }}
            cursor="pointer"
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.dataTransfer.dropEffect = "copy";
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              let file = e.dataTransfer.files.item(0);
              if (file && file.type.includes("image"))
                setImage(URL.createObjectURL(file));
            }}
          >
            {image ? (
              <Image
                src={image}
                objectFit="cover"
                width="100%"
                height="100%"
                fit="cover"
                alt="music image"
              />
            ) : (
              <>
                <TbUpload color="gray" size={"20%"} />
                <Text>
                  <b>Upload</b> your music picture
                </Text>
              </>
            )}
          </Stack>
        </Stack>
        <Stack flex={2} px={3}>
          <Text
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"20"}
            color="#C2A822"
          >
            Title
          </Text>
          <Input
            borderWidth="0px"
            borderBottomWidth="1px"
            borderRadius="0px"
            borderColor="gray.300"
            placeholder="Your music title"
            color="white"
            fontFamily="mono"
            fontSize={"32"}
            fontWeight="bold"
          />
          <Text
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"20"}
            style={{
              marginTop: "2rem",
            }}
            color="#C2A822"
          >
            Price
          </Text>
          <Input
            borderWidth="0px"
            borderBottomWidth="1px"
            borderRadius="0px"
            type="number"
            borderColor="gray.300"
            placeholder="etc: 0.1 MUC"
            color="white"
            fontFamily="mono"
            fontSize={"32"}
            fontWeight="bold"
          />
          <Text
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"20"}
            style={{
              marginTop: "2rem",
            }}
            color="#C2A822"
          >
            Amount
          </Text>
          <Input
            borderWidth="0px"
            borderBottomWidth="1px"
            borderRadius="0px"
            type="number"
            borderColor="gray.300"
            placeholder="etc: 10"
            color="white"
            fontFamily="mono"
            fontSize={"32"}
            fontWeight="bold"
          />
          <Button
            fontSize={"40"}
            fontFamily="mono"
            fontWeight="bold"
            color="white"
            bg="#3443A0"
            style={{
              marginTop: "2rem",
            }}
            height="80px"
          >
            List music
          </Button>
        </Stack>
      </Stack>
    </MusicBaseLayout>
  );
};

export default Create;
