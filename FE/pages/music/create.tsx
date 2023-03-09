import {
  AspectRatio,
  Box,
  Button,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { MdLibraryMusic, MdPhotoLibrary } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import MusicBaseLayout from "../../layouts/music.base";
import { useStoreActions } from "../../services/redux/hook";
const Create: NextPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [singer, setSinger] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const playMusicAction = useStoreActions((state) => state.music.playMusic);

  useEffect(() => {
    if (audio && url) {
      playMusicAction({
        name: title,
        image: image || "",
        singer,
        url,
      });
    }
  }, [audio, image, title, singer]);

  const setAudioFile = (file: File | null) => {
    if (file && file.type.includes("audio")) {
      setAudio(file);
      setUrl(URL.createObjectURL(file));
    }
  };

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
    <MusicBaseLayout selectTabIndex={1}>
      <Stack direction={"column"}>
        <Text fontFamily="mono" fontWeight="bold" fontSize={"24"} color="white">
          Listing new music
        </Text>
        <Text
          fontFamily="mono"
          style={{
            marginTop: "2rem",
          }}
          fontWeight="bold"
          fontSize={"20"}
          color="white"
        >
          Audio
        </Text>
        <Text
          fontFamily="mono"
          fontWeight="bold"
          fontSize={"14"}
          color="#6F6E6E"
        >
          File types supported: MP4, WEBM, MP3, WAV. Max size: 100 MB
        </Text>
        <Stack
          onClick={() => {
            let input = document.createElement("input");
            input.hidden = true;
            input.type = "file";
            input.accept = "audio/*";
            input.onchange = (e: any) => {
              let file = e.target?.files?.item(0);
              setAudioFile(file);
              input.remove();
            };
            input.click();
          }}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            let file = e.dataTransfer.files.item(0);
            setAudioFile(file);
          }}
          w={{
            base: "100%",
            md: "50%",
          }}
          height="80px"
          justifyContent="center"
          alignItems="center"
          _hover={{
            bg: "#0D166D",
          }}
          bg="#0D164D"
          boxShadow="5px 5px 5px 5px rgba(0,0,0,0.3)"
          cursor="pointer"
          borderRadius="lg"
          border="2px dashed gray"
        >
          {audio ? (
            <Text
              color="white"
              width="90%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontFamily="mono"
            >
              {audio.name}
            </Text>
          ) : (
            <MdLibraryMusic color="gray" size={"50%"} />
          )}
        </Stack>
        <Text
          fontFamily="mono"
          style={{
            marginTop: "1rem",
          }}
          fontWeight="bold"
          fontSize={"20"}
          color="white"
        >
          Image
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
          w={{
            base: "100%",
            md: "50%",
          }}
          justifyContent="center"
          alignItems="center"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="5px 5px 5px 5px rgba(0,0,0,0.3)"
          _hover={{
            bg: "#0D166D",
          }}
          border="2px dashed gray"
          bg="#0D164D"
          style={{
            aspectRatio: "2.5",
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
            <Image
              src={image}
              objectFit="contain"
              width="100%"
              height="100%"
              fit="cover"
              alt="music image"
            />
          ) : (
            <MdPhotoLibrary color="gray" size={"25%"} />
          )}
        </Stack>
        <Text fontFamily="mono" fontWeight="bold" fontSize={"20"} color="white">
          Title
        </Text>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          borderRadius="lg"
          borderColor="gray.300"
          placeholder="Your music title"
          color="white"
          w={{
            base: "100%",
            md: "60%",
          }}
          fontFamily="mono"
        />
        <Text fontFamily="mono" fontWeight="bold" fontSize={"20"} color="white">
          Singer
        </Text>
        <Input
          value={singer}
          onChange={(e) => setSinger(e.target.value)}
          borderRadius="lg"
          borderColor="gray.300"
          placeholder="Singer"
          color="white"
          w={{
            base: "100%",
            md: "60%",
          }}
          fontFamily="mono"
        />
        <Text fontFamily="mono" fontWeight="bold" fontSize={"20"} color="white">
          Attributes
        </Text>
        <Stack
          direction={{ base: "column", md: "row" }}
          w={{
            base: "100%",
            md: "60%",
          }}
          paddingX={{
            base: "1rem",
            md: "0",
          }}
          justifyContent="space-around"
        >
          <Stack>
            <Text
              fontFamily="mono"
              fontWeight="bold"
              fontSize={"16"}
              color="white"
            >
              Category
            </Text>
            <Select
              borderColor="gray.300"
              color="white"
              value={"option1"}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Stack>
          <Stack>
            <Text
              fontFamily="mono"
              fontWeight="bold"
              fontSize={"16"}
              color="white"
            >
              Mood
            </Text>
            <Select
              borderColor="gray.300"
              color="white"
              value={"option1"}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Stack>
          <Stack>
            <Text
              fontFamily="mono"
              fontWeight="bold"
              fontSize={"16"}
              color="white"
            >
              Instrument
            </Text>
            <Select
              borderColor="gray.300"
              color="white"
              value={"option1"}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Stack>
        </Stack>
        <Text fontFamily="mono" fontWeight="bold" fontSize={"20"} color="white">
          Price
        </Text>
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          borderRadius="lg"
          borderColor="gray.300"
          placeholder="Price"
          color="white"
          w={{
            base: "100%",
            md: "60%",
          }}
          fontFamily="mono"
        />
        <Text fontFamily="mono" fontWeight="bold" fontSize={"20"} color="white">
          Quantity
        </Text>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          borderRadius="lg"
          borderColor="gray.300"
          placeholder="Quantity"
          color="white"
          w={{
            base: "100%",
            md: "60%",
          }}
          fontFamily="mono"
        />
        <Text fontFamily="mono" fontWeight="bold" fontSize={"20"} color="white">
          Description
        </Text>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          borderRadius="lg"
          borderColor="gray.300"
          placeholder="Description"
          color="white"
          w={{
            base: "100%",
            md: "60%",
          }}
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
            md: "20%",
          }}
          alignSelf="center"
          style={{
            marginTop: "2rem",
          }}
        >
          Create
        </Button>
      </Stack>
    </MusicBaseLayout>
  );
};

export default Create;
