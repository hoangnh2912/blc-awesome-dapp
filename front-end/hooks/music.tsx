import { Link, Spinner, useToast } from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { signERC2612Permit } from "eth-permit";
import { ethers } from "ethers";
import { ReactNode } from "react";
import LinkScan from "../components/link-scan";
import { useModalTransaction } from "../components/modal-transaction";
import { ABI_MUSIC } from "../constants/abi";
import { GetMarketOutput } from "../services/api/types";
import { useStoreActions } from "../services/redux/hook";

const useMusicIsPlayingView = ({
  pauseComponent,
  playComponent,
  playMusicAction,
  currentSongState,
  isPlayingState,
}: {
  playComponent: ReactNode;
  pauseComponent: ReactNode;
  playMusicAction: (data: GetMarketOutput) => void;
  currentSongState: GetMarketOutput | undefined;
  isPlayingState: boolean;
}) => {
  return (data: GetMarketOutput) => {
    const onPlayMusic = () => {
      playMusicAction(data);
    };
    return (
      <div
        onClick={onPlayMusic}
        style={{
          cursor: "pointer",
        }}
      >
        {isPlayingState && currentSongState?.id === data.id
          ? pauseComponent
          : playComponent}
      </div>
    );
  };
};

const useBuyMusic = () => {
  const sdk = useSDK();
  const address = useAddress();

  const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();
  const toast = useToast();
  const setIsCheckConnectAction = useStoreActions(
    (state) => state.user.setIsCheckConnect
  );
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
      window.ethereum,
      ABI_MUSIC.MUC.address,
      address,
      ABI_MUSIC.MusicMarket.address,
      priceMuc
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
  };

  const onBuy = async (price: string, id: string) => {
    setIsCheckConnectAction({
      isCheckConnect: true,
      args: [price, id],
      callback: onBuyCallBack,
    });
  };

  const onBuyCallBack = async (price: string, id: string) => {
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
        const res = await musicMarketContract.call("buySong", [
          ABI_MUSIC.Music.address,
          id,
          approveMuc.deadline,
          approveMuc.v,
          approveMuc.r,
          approveMuc.s,
        ]);
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
            {
              title: `NFT #${id} is listed`,
              value: <Link href={`/music/${id}`}>View NFT #{id} on Music</Link>,
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

  return { onBuy };
};
const useListMusic = () => {
  const sdk = useSDK();
  const address = useAddress();
  const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();
  const setIsCheckConnectAction = useStoreActions(
    (state) => state.user.setIsCheckConnect
  );

  const onList = async (
    id: string,
    price: string,
    amount: string,
    uri: string
  ) => {
    setIsCheckConnectAction({
      isCheckConnect: true,
      args: [id, price, amount, uri],
      callback: onListCallBack,
    });
  };

  const onListCallBack = async (
    id: string,
    price: string,
    amount: string,
    uri: string
  ) => {
    if (sdk && onOpenModalTx && address) {
      try {
        setTxResult((prev) => ({
          content: [
            ...prev.content,
            {
              title: "Transaction Hash",
              value: <Spinner color="green.500" />,
            },
          ],
        }));
        const musicMarketContract = await sdk.getContractFromAbi(
          ABI_MUSIC.MusicMarket.address,
          ABI_MUSIC.MusicMarket.abi
        );
        const res = await musicMarketContract.call("listSong", [
          id,
          ethers.utils.parseUnits(price, "ether"),
          amount,
          uri,
        ]);
        setTxResult((prev) => ({
          content: [
            ...prev.content.filter((item) => item.title !== "Transaction Hash"),
            {
              title: "Transaction Hash",
              value: <LinkScan transactionHash={res.receipt.transactionHash} />,
            },
            {
              title: `NFT #${id} is listed`,
              value: <Link href={`/music/${id}`}>View NFT #{id} on Music</Link>,
            },
          ],
          txState: "success",
        }));
      } catch (error: any) {
        setTxResult({
          reason: error.message,
          content: [],
          txState: "error",
        });
      }
    }
  };

  return { onList };
};
export { useMusicIsPlayingView, useBuyMusic, useListMusic };
