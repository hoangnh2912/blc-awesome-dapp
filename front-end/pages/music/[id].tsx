import {
  Button,
  Image,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsCart4, BsFillPlayFill } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";
import { TiMediaPause } from "react-icons/ti";
import { ABI_MUSIC } from "../../constants/abi";
import { ipfsToGateway } from "../../constants/utils";
import { useBuyMusic } from "../../hooks/music";
import MusicBaseLayout from "../../layouts/music.base";
import ApiServices from "../../services/api";
import { GetMarketOutput } from "../../services/api/types";
import { useStoreActions, useStoreState } from "../../services/redux/hook";
import { ZERO_ADDRESS } from "../../constants/constants";

const Music = ({ music }: { music: GetMarketOutput }) => {
  const router = useRouter();
  const { id } = router.query;
  const playMusicAction = useStoreActions((state) => state.music.playMusic);
  const currentSongState = useStoreState((state) => state.music.currentSong);
  const isPlayingState = useStoreState((state) => state.music.isPlaying);
  const currentAddress = useAddress();

  const data = music;
  const [isOwnNft, setIsOwnNft] = useState(false);

  const sdk = useSDK();
  const { onBuy } = useBuyMusic();

  const checkOwnerNFT = async () => {
    if (!id) return;
    if (!sdk) return;
    if (!currentAddress) return;
    const musicNFTContract = await sdk.getContractFromAbi(
      ABI_MUSIC.Music.address,
      ABI_MUSIC.Music.abi
    );
    const balance = await musicNFTContract.call("balanceOf", [
      currentAddress,
      id,
    ]);
    if (balance.toString() != "0") {
      setIsOwnNft(true);
    }
  };

  const viewMusic = async () => {
    try {
      await ApiServices.music.viewMusic(id as string);
    } catch (error: any) {
      console.error(`[Music][${id}][viewMusic] ${error.message}`);
    }
  };

  useEffect(() => {
    viewMusic();
  }, []);

  useEffect(() => {
    checkOwnerNFT();
  }, [id, sdk, currentAddress]);

  const onPlayMusic = () => {
    if (data)
      playMusicAction({
        audio: ipfsToGateway(data.audio),
        image: ipfsToGateway(data.image),
        ...(({ audio, image, ...o }) => o)(data),
      });
  };

  if (!data)
    return (
      <MusicBaseLayout selectTabIndex={0}>
        <></>
      </MusicBaseLayout>
    );

  const isSameSeller =
    data.seller &&
    currentAddress &&
    currentAddress.toLowerCase() == `${data.seller}`.toLowerCase();

  return (
    <MusicBaseLayout selectTabIndex={0} meta={music}>
      <Stack direction={{ base: "column", md: "row" }}>
        <Image
          width={{
            base: "100%",
            md: "30%",
          }}
          objectFit="cover"
          borderRadius="lg"
          alt={data.name}
          src={ipfsToGateway(data.image)}
          style={{
            boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.15)",
            aspectRatio: "1/1",
          }}
        />
        <Stack flex={1} px={2}>
          <Stack justifyContent="center">
            <Text color="white" fontSize="40" fontWeight="bold">
              {data.name}
            </Text>
            <Text
              color="white"
              onClick={() =>
                router.push(`/music/address/${data.seller}`, undefined, {
                  shallow: true,
                })
              }
              fontSize="20"
              fontWeight="bold"
              cursor="pointer"
            >
              Creator: {data.seller}
            </Text>
            <Text color="#fcae00" fontSize="20" fontWeight="bold">
              {data.singer}
            </Text>
            <Text
              fontFamily="mono"
              fontWeight="bold"
              fontSize="40"
              color="#fcae00"
            >
              {data.price} MUC
            </Text>
          </Stack>
          <Stack
            borderRadius="lg"
            bg="#3443A088"
            p="3"
            boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
          >
            <Text color="white" fontSize="20" fontWeight="bold">
              {parseInt(data.amount) - parseInt(data.left)} / {data.amount} sold
            </Text>
            <Progress
              colorScheme="yellow"
              isAnimated
              hasStripe
              borderRadius="md"
              value={
                ((parseInt(data.amount) - parseInt(data.left)) * 100) /
                parseInt(data.amount)
              }
            />
          </Stack>
          <Stack justifyContent="space-evenly" gap={1} direction={"row"}>
            <Button
              bg="#3443A0BB"
              color="#fcae00"
              flex={1}
              boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
              alignItems="center"
              height="80px"
              fontWeight="bold"
              fontSize="3xl"
              onClick={onPlayMusic}
              gap={2}
            >
              {isPlayingState &&
              currentSongState?.audio == ipfsToGateway(data.audio) ? (
                <>
                  <TiMediaPause size="35px" />
                  Pause
                </>
              ) : (
                <>
                  <BsFillPlayFill />
                  Play
                </>
              )}
            </Button>
            {!isSameSeller && !isOwnNft && (
              <Button
                color="#3443A0"
                bg="#fcae00BB"
                boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
                flex={1}
                height="80px"
                fontWeight="bold"
                alignItems="center"
                fontSize="3xl"
                onClick={() => {
                  onBuy(data.price, data.id);
                }}
                gap={2}
              >
                <BsCart4 size="0.8em" />
                Buy now
              </Button>
            )}
            {isOwnNft && !isSameSeller && (
              <Button
                color="#3443A0"
                bg="#fcae00BB"
                boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
                flex={1}
                height="80px"
                fontWeight="bold"
                alignItems="center"
                fontSize="3xl"
                onClick={() => {
                  window.open(
                    `https://testnets.opensea.io/assets/mumbai/${ABI_MUSIC.Music.address}/${id}`,
                    `_blank`
                  );
                }}
                gap={2}
              >
                <MdOutlineSell size="0.9em" />
                Sell on OpenSea
              </Button>
            )}
          </Stack>
          <Stack
            borderRadius="lg"
            bg="#3443A088"
            p="3"
            boxShadow="5px 5px 5px 5px rgba(0,0,0,0.15)"
          >
            <Text color="white" fontSize="20" fontWeight="bold">
              Attributes
            </Text>
            <SimpleGrid columns={[2, 2, 3]} gap={3}>
              {data.attributes.map((attr, index) => (
                <Stack
                  key={index}
                  alignItems="center"
                  justifyContent="center"
                  borderWidth="1px"
                  borderRadius="lg"
                  p="3"
                  bg="#3443A088"
                >
                  <Text color="white" fontSize="20" fontWeight="bold">
                    {attr.trait_type}
                  </Text>
                  <Text color="#fcae00" fontSize="20" fontWeight="bold">
                    {attr.value}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Stack>
      <Text
        color="#fcae00"
        fontSize="24"
        style={{
          marginTop: "1.5rem",
        }}
        fontWeight="bold"
      >
        Description
      </Text>
      <Text color="white" fontSize="20">
        {data.description}
      </Text>
      <Text
        color="#fcae00"
        fontSize="24"
        style={{
          marginTop: "1.5rem",
        }}
        fontWeight="bold"
      >
        Transaction History
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th
                fontFamily="mono"
                fontWeight="bold"
                fontSize="16"
                color="#fcae00"
              >
                Event
              </Th>
              <Th
                fontFamily="mono"
                fontWeight="bold"
                fontSize="16"
                color="#fcae00"
              >
                From
              </Th>
              <Th
                fontFamily="mono"
                fontWeight="bold"
                fontSize="16"
                color="#fcae00"
              >
                To
              </Th>

              <Th
                fontFamily="mono"
                fontWeight="bold"
                fontSize="16"
                color="#fcae00"
              >
                Date
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...data.history].reverse().map((item, idx) => (
              <Tr
                fontFamily="mono"
                fontWeight="bold"
                key={idx}
                cursor={"pointer"}
                _hover={{
                  background: "#fcae00",
                  color: "black",
                }}
                onClick={() => {
                  window.open(
                    `https://mumbai.polygonscan.com/tx/${item.transaction_hash}`,
                    `_blank`
                  );
                }}
                fontSize="16"
                color="white"
              >
                <Td>{item.event}</Td>
                <Td>{item.from == ZERO_ADDRESS ? "" : item.from}</Td>
                <Td>{item.to == ZERO_ADDRESS ? "" : item.to}</Td>
                <Td>{new Date(item.created_at).toUTCString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MusicBaseLayout>
  );
};
Music.getInitialProps = async (ctx: any) => {
  const id = ctx.query.id;
  try {
    if (!id) return;
    const res = await ApiServices.music.getMusic(id as string);
    return {
      music: res.data.data,
    };
  } catch (error) {
    console.error(`[Music][${id}][getMusic]`, error);
  }
  return { music: null };
};
export default Music;
