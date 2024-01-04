import { Button, Center, Stack } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ABI_MUSIC } from "../constants/abi";
import ApiServices from "../services/api";
import { GetMarketOutput } from "../services/api/types";
import SongNFTSmallComponent from "./song-nft-small";
import { useModalTransaction } from "./modal-transaction";
const LinkNFT = ({ id, isBuy = true }: { id?: string; isBuy: boolean }) => {
  const [data, setData] = useState<GetMarketOutput | undefined>();
  const router = useRouter();
  const address = useAddress();
  const { onClose } = useModalTransaction();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        if (!id) return;
        const res = await ApiServices.music.getMusic(id as string);
        setData(res.data.data);
      } catch (error) {
        console.error(`[LinkNFT][${id}][getMusic]`, error);
      }
    })();
  }, [id]);

  return (
    <Stack mt={2}>
      {data && <SongNFTSmallComponent {...data} />}
      <Stack
        style={{
          marginTop: "1.5rem",
        }}
        direction={"row"}
      >
        {isBuy && (
          <Button
            flex={1}
            _hover={{ bg: "#3443DD" }}
            onClick={() => {
              window.open(
                `https://testnets.opensea.io/assets/mumbai/${ABI_MUSIC.Music.address}/${id}`,
                `_blank`
              );
            }}
            color="white"
            bg="#3443A0"
          >
            View on Opensea
          </Button>
        )}
        <Button
          flex={1}
          _hover={{ bg: "#3443DD" }}
          onClick={() => {
            router.push(`/music/address/${address}?tab=${isBuy ? "1" : "0"}`);
            onClose && onClose();
          }}
          color="white"
          bg="#3443A0"
        >
          View on Profile
        </Button>
      </Stack>
    </Stack>
  );
};

export default LinkNFT;
