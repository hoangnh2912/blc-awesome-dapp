import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import PlaylistItemComponent from "../../components/playlist-item";
import MusicBaseLayout from "../../layouts/music.base";
import { useStoreActions } from "../../services/redux/hook";
const Playlist: NextPage = () => {
  const setIsCheckConnectAction = useStoreActions(
    (state) => state.user.setIsCheckConnect
  );
  const address = useAddress();
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
  useEffect(() => {
    checkIsConnect();
  }, [address]);

  return (
    <MusicBaseLayout selectTabIndex={2}>
      <Stack direction={"column"}>
        <Text fontFamily="mono" fontWeight="bold" fontSize={"24"} color="white">
          Playlist
        </Text>
        <SimpleGrid columns={[1, 2, 2, 2, 4]} gap={5}>
          {[].map((item: any, index) => (
            <PlaylistItemComponent key={index} {...item} />
          ))}
        </SimpleGrid>
      </Stack>
    </MusicBaseLayout>
  );
};

export default Playlist;
