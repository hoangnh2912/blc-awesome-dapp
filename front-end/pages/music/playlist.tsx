import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import PlaylistItemComponent from "../../components/playlist-item";
import MusicBaseLayout from "../../layouts/music.base";
import { useStoreActions } from "../../services/redux/hook";
import ApiServices from "../../services/api";
import { GetPlaylistOutput } from "../../services/api/types";
const Playlist: NextPage = () => {
  const setIsCheckConnectAction = useStoreActions(
    (state) => state.user.setIsCheckConnect
  );
  const address = useAddress();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [playlist, setPlaylist] = useState<GetPlaylistOutput[]>([]);
  const checkIsConnect = () => {
    if (!address) {
      setIsCheckConnectAction({
        isCheckConnect: true,
        args: [],
      });
      return false;
    }
    return true;
  };

  const getMyPlaylist = async () => {
    if (!address) return;
    try {
      const playlistRes = await ApiServices.playlist.getListPlaylist();
      setPlaylist(playlistRes.data.data);
    } catch (error: any) {
      console.log(`[getMyPlaylist]:${error.message}`);
    }
  };

  useEffect(() => {
    checkIsConnect();
    getMyPlaylist();
  }, [address]);

  return (
    <MusicBaseLayout selectTabIndex={2}>
      <Modal
        isCentered
        isOpen={!!isOpen}
        closeOnOverlayClick
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent borderRadius={20} bg={"#0D164D"}>
          <ModalCloseButton color={"white"} />
          <VStack justifyContent={"center"} alignItems={"center"} w={"100%"}>
            <Text
              fontFamily="mono"
              fontWeight="bold"
              fontSize={"24"}
              color="white"
              mt={"2.5rem"}
            >
              Create Playlist
            </Text>
            <Input
              mt={"1.5rem"}
              value={""}
              // onChange={(e) => setTitle(e.target.value)}
              borderRadius="30"
              borderColor="gray.300"
              placeholder="Enter name of playlist"
              _placeholder={{ color: "white" }}
              color="white"
              bg={"#3443A0"}
              w={"80%"}
              fontFamily="mono"
            />
          </VStack>
          <ModalFooter mt={"2rem"}>
            <Button
              fontFamily="mono"
              fontWeight="bold"
              fontSize={"18"}
              onClick={onClose}
              bg={"white"}
              color={"#A80707"}
            >
              Cancel
            </Button>
            <Button
              fontFamily="mono"
              fontWeight="bold"
              fontSize={"18"}
              bg={"#3443A0"}
              color={"#fcae00"}
              ml={"5%"}
              mr={"5%"}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack>
        <HStack justifyContent={"space-between"}>
          <Text
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"24"}
            color="white"
          >
            Playlist
          </Text>
          <Button
            fontFamily="mono"
            fontWeight="bold"
            fontSize={"24"}
            onClick={onOpen}
            bg={"#3443A0"}
            color={"#fcae00"}
          >
            Create Playlist
          </Button>
        </HStack>
        <SimpleGrid columns={[1, 2, 2, 2, 4]} gap={5}>
          {playlist.map((item, index) => (
            <PlaylistItemComponent key={index} {...item} />
          ))}
        </SimpleGrid>
      </Stack>
    </MusicBaseLayout>
  );
};

export default Playlist;
