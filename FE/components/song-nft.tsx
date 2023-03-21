import { Box, Image, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";
import { TiMediaPause } from "react-icons/ti";
import { ABI_MUSIC } from "../constants/abi";
import { ipfsToGateway } from "../constants/utils";
import { GetMarketOutput } from "../services/api/types";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import LinkScan from "./link-scan";
import { signERC2612Permit } from "eth-permit";
import { useModalTransaction } from "./modal-transaction";

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
  const address = useAddress();
  const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();

  const toast = useToast();

  const permitMuc = async (priceMuc: string) => {
    if (!sdk) return;
    if (!onOpenModalTx) return;
    if (!address) return;
    const mucContract = await sdk.getContractFromAbi(
      ABI_MUSIC.MUC.address,
      ABI_MUSIC.MUC.abi
    );
    const { value } = await mucContract.erc20.balanceOf(address);

    if (value.lt(priceMuc)) {
      toast({
        title: "Insufficient balance",
        description: "Please top up your MUC balance",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    onOpenModalTx();

    const allowance = await mucContract.erc20.allowance(
      ABI_MUSIC.MusicMarket.address
    );

    if (allowance.value.gte(priceMuc)) return;

    const result = await signERC2612Permit(
      sdk.getProvider(),
      ABI_MUSIC.MUC.address,
      await sdk.wallet.getAddress(),
      ABI_MUSIC.MusicMarket.address,
      ethers.utils.formatUnits(price, 18)
    );
    setTxResult({
      reason: "",
      content: [
        {
          title: "Approve Signature",
          value: result.r + result.s + result.v,
        },
        {
          title: "Buy Transaction Hash",
          value: <Spinner colorScheme="green.500" />,
        },
      ],
      txState: "success",
    });
    return result;
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
    // const res = await mucContract.call(
    //   "approve",
    //   ABI_MUSIC.MusicMarket.address,
    //   priceMuc
    // );
  };

  const onBuy = async () => {
    if (sdk && onOpenModalTx && address) {
      try {
        const musicMarketContract = await sdk.getContractFromAbi(
          ABI_MUSIC.MusicMarket.address,
          ABI_MUSIC.MusicMarket.abi
        );

        const approveMuc = await permitMuc(
          ethers.utils.parseEther(price).toString()
        );
        if (!approveMuc) return;
        onOpenModalTx();
        const res = await musicMarketContract.call(
          "buySong",
          ABI_MUSIC.Music.address,
          id,
          approveMuc.deadline,
          approveMuc.v,
          approveMuc.r,
          approveMuc.s
        );
        setTxResult({
          reason: "",
          content: [
            ...[
              approveMuc && {
                title: "Approve Transaction Hash",
                value: approveMuc.r + approveMuc.s + approveMuc.v,
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
