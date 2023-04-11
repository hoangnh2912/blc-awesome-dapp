import {
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
import { FaPlay } from "react-icons/fa";
import { MdLibraryMusic, MdPhotoLibrary } from "react-icons/md";
import { TiMediaPause } from "react-icons/ti";
import { useModalTransaction } from "../../components/modal-transaction";
import { GENRE, INSTRUMENT, MOOD } from "../../constants/constants";
import { useListMusic } from "../../hooks/music";
import MusicBaseLayout from "../../layouts/music.base";
import ApiServices from "../../services/api";
import { useStoreActions, useStoreState } from "../../services/redux/hook";
const Create: NextPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [singer, setSinger] = useState<string>("");
  const [genre, setGenre] = useState<string>(GENRE[0]);
  const [mood, setMood] = useState<string>(MOOD[0]);
  const [instrument, setInstrument] = useState<string>(INSTRUMENT[0]);
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const updateMusicMetadataAction = useStoreActions(
    (state) => state.music.updateMusicMetadata
  );
  const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();
  const { onList } = useListMusic();
  const getAudioInfo = async () => {
    if (!audio)
      return {
        duration: 0,
        bitrate: 0,
      };
    const audioContext = new AudioContext();
    const audioData = await audioContext.decodeAudioData(
      await audio.arrayBuffer()
    );
    return {
      duration: audioData.duration,
      bitrate: audioData.sampleRate,
    };
  };

  useEffect(() => {
    if (audio && url) {
      updateMusicMetadataAction({
        name: title,
        image: image || "",
        singer,
        audio: url,
      } as any);
    }
  }, [audio, image, title, singer]);

  const onSetAudioFile = (file: File | null) => {
    if (file && file.type.includes("audio")) {
      setAudio(file);
      setUrl(URL.createObjectURL(file));
    }
  };

  const onSetImageFile = (file: File | null) => {
    if (file && file.type.includes("image")) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const onCreate = async () => {
    try {
      if (!audio) return;
      if (!imageFile) return;
      if (onOpenModalTx) onOpenModalTx();
      const resNextId = await ApiServices.music.getNextId();
      const id = resNextId.data.data;
      const { duration, bitrate } = await getAudioInfo();
      const formDataImage = new FormData();
      formDataImage.append("imageFile", imageFile);
      const resImage = await ApiServices.ipfs.uploadImage(formDataImage);

      const formDataAudio = new FormData();
      formDataAudio.append("imageFile", audio);
      const resAudio = await ApiServices.ipfs.uploadImage(formDataAudio);

      const payload = {
        id,
        name: title,
        singer,
        image: resImage.data.data,
        animation_url: resAudio.data.data,
        external_url: `https://scimta.com/music/${id}`,
        attributes: [
          {
            trait_type: "Genre",
            value: genre,
          },
          {
            trait_type: "Mood",
            value: mood,
          },
          {
            trait_type: "Instrument",
            value: instrument,
          },
        ],
        description,
        duration,
        bitrate,
      };
      const resJson = await ApiServices.ipfs.uploadJson(payload);
      await onList(`${id}`, price, quantity, resJson.data.data);
    } catch (error: any) {
      setTxResult({
        reason: error.message,
        content: [],
        txState: "error",
      });
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
          w={{
            base: "100%",
            md: "50%",
          }}
          onClick={() => {
            let input = document.createElement("input");
            input.hidden = true;
            input.type = "file";
            input.accept = "audio/*";
            input.onchange = (e: any) => {
              const file = e.target?.files?.item(0);
              onSetAudioFile(file);
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
            const file = e.dataTransfer.files.item(0);
            onSetAudioFile(file);
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
              const file = e.target?.files?.item(0);
              onSetImageFile(file);
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
            const file = e.dataTransfer.files.item(0);
            onSetImageFile(file);
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
              Genre
            </Text>
            <Select
              borderColor="gray.300"
              color="white"
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
              }}
            >
              {GENRE.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
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
              value={mood}
              onChange={(e) => {
                setMood(e.target.value);
              }}
            >
              {MOOD.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
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
              value={instrument}
              onChange={(e) => {
                setInstrument(e.target.value);
              }}
            >
              {INSTRUMENT.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Stack>
        </Stack>
        <Text fontFamily="mono" fontWeight="bold" fontSize={"20"} color="white">
          Price (MUC)
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
          color="#fcae00"
          bg="#3443A0"
          onClick={onCreate}
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
