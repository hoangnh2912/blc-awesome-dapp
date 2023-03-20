import { Box, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";
import { TiMediaPause } from "react-icons/ti";
import { ABI_MUSIC } from "../constants/abi";
import { ipfsToGateway } from "../constants/utils";
import { GetMarketOutput } from "../services/api/types";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import { useModalTransaction } from "./modal-transaction";
import { signERC2612Permit } from "eth-permit";
import { ethers } from "ethers";
import LinkScan from "./link-scan";

const SongNFTComponent = ({
  image,
  name,
  singer,
  price,
  id,
  audio,
  ...rest
}: GetMarketOutput) => {
  const playMusicAction = useStoreActions((state) => state.music.playMusic);
  const currentSongState = useStoreState((state) => state.music.currentSong);
  const isPlayingState = useStoreState((state) => state.music.isPlaying);

  const onPlayMusic = () => {
    playMusicAction({
      audio: ipfsToGateway(audio),
      name,
      singer,
      image: ipfsToGateway(image),
      id,
      price,
      ...rest,
    });
  };

  const router = useRouter();

  const goToMusic = () => {
    router.push(
      {
        pathname: `/music/${id}`,
      },
      undefined,
      { shallow: true }
    );
  };

  const sdk = useSDK();
  const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();

  const permitMuc = async (priceMuc: string) => {
    if (!sdk) return;
    if (!onOpenModalTx) return;
    onOpenModalTx();
    const mucContract = await sdk.getContractFromAbi(
      ABI_MUSIC.MUC.address,
      ABI_MUSIC.MUC.abi
    );
    const allowance = await mucContract.erc20.allowance(
      ABI_MUSIC.MusicMarket.address
    );

    if (allowance.value.gte(priceMuc)) return;

    // const result = await signERC2612Permit(
    //   sdk.getProvider(),
    //   ABI_MUSIC.MUC.address,
    //   await sdk.wallet.getAddress(),
    //   ABI_MUSIC.MusicMarket.address,
    //   ethers.utils.formatUnits(price, 18)
    // );
    // await mucContract.call(
    //   "permit",
    //   result.owner,
    //   result.spender,
    //   result.value,
    //   result.deadline,
    //   result.v,
    //   result.r,
    //   result.s
    // );
    const res = await mucContract.call(
      "approve",
      ABI_MUSIC.MusicMarket.address,
      priceMuc
    );
    setTxResult({
      reason: "",
      content: [
        {
          title: "Approve Transaction Hash",
          value: <LinkScan transactionHash={res.receipt.transactionHash} />,
        },
        {
          title: "Buy Transaction Hash",
          value: <Spinner colorScheme="green.500" />,
        },
      ],
      txState: "success",
    });
    return res;
  };

  const onBuy = async () => {
    if (sdk && onOpenModalTx) {
      try {
        const musicMarketContract = await sdk.getContractFromAbi(
          ABI_MUSIC.MusicMarket.address,
          ABI_MUSIC.MusicMarket.abi
        );

        onOpenModalTx();
        const approveMuc = await permitMuc(
          ethers.utils.parseEther(price).toString()
        );
        const res = await musicMarketContract.call(
          "buySong",
          ABI_MUSIC.Music.address,
          id
        );
        setTxResult({
          reason: "",
          content: [
            ...[
              approveMuc && {
                title: "Approve Transaction Hash",
                value: (
                  <LinkScan
                    transactionHash={approveMuc.receipt.transactionHash}
                  />
                ),
              },
            ],
            {
              title: "Transaction Hash",
              value: <LinkScan transactionHash={res.receipt.transactionHash} />,
            },
          ],
          txState: "success",
        });
      } catch (error: any) {
        setTxResult({
          reason: error.message,
          content: [],
          txState: "error",
        });
      }
    }
  };

  return (
    <Box
      w={["full"]}
      boxShadow="lg"
      borderRadius="lg"
      shadow="2xl"
      overflow="hidden"
      style={{
        boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.15)",
      }}
    >
      <Image
        _hover={{
          transform: "scale(1.2)",
        }}
        transition="all 0.3s ease-in-out"
        w={["full"]}
        h={["200px"]}
        fit="cover"
        cursor="pointer"
        onClick={goToMusic}
        src={ipfsToGateway(image)}
      />
      <Box
        backgroundImage={`url(${ipfsToGateway(image)})`}
        backgroundSize="cover"
        backgroundColor="transparent"
      >
        <Stack
          p="3"
          zIndex="0"
          bgGradient="linear(rgba(0,0,0,0.6), transparent)"
          backdropFilter="auto"
          backdropBlur="1rem"
        >
          <Stack justifyContent="space-between" direction="row">
            <Stack>
              <Text
                cursor="pointer"
                onClick={goToMusic}
                fontWeight="bold"
                color="white"
              >
                {name}
              </Text>
              <Text fontWeight="bold" fontSize="sm" color="white">
                {singer}
              </Text>
            </Stack>
            <Text
              fontSize="md"
              alignSelf="center"
              fontWeight="bold"
              color="white"
            >
              {price} MUC
            </Text>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Text
              onClick={onBuy}
              cursor="pointer"
              fontWeight="bold"
              color="white"
              borderRadius="3xl"
              backgroundColor="#0D164D"
              p="1"
              px="2"
              fontSize="sm"
              borderWidth="2px"
              letterSpacing="widest"
            >
              Buy now
            </Text>
            <Box
              w="40px"
              cursor="pointer"
              h="40px"
              borderRadius="full"
              justifyContent="center"
              alignItems="center"
              display="flex"
              backgroundColor="white"
              _hover={{
                backgroundColor: "gray.300",
              }}
              onClick={onPlayMusic}
            >
              {isPlayingState &&
              currentSongState?.audio == ipfsToGateway(audio) ? (
                <TiMediaPause size="20px" color="black" />
              ) : (
                <FaPlay size="10px" color="black" />
              )}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SongNFTComponent;
