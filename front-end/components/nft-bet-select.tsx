import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  ScaleFade,
  Stack,
  Text,
  useToken,
} from "@chakra-ui/react";
import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";
import { IoCloseCircle } from "react-icons/io5";
import AutosizeInput from "react-input-autosize";
import {
  MAX_BET,
  USDT_ICON,
  blurs,
  colors,
  exampleBetUsdt,
  mock,
} from "../constants/constants";
import fonts from "../constants/font";
import { useStoreActions, useStoreState } from "../services/redux/hook";
import NFTComponent from "./nft";

const NftBetSelect = () => {
  const [usdtAmount, setUSDTAmount] = [
    useStoreState((states) => states.bet.usdt),
    useStoreActions((actions) => actions.bet.setUsdt),
  ];
  const [nftTokenId, setNftTokenId] = [
    useStoreState((states) => states.bet.nftTokenId),
    useStoreActions((actions) => actions.bet.setNftTokenId),
  ];

  const [walletUsdtBalance, setWalletUsdtBalance] = [
    useStoreState((state) => state.bet.walletUsdtBalance),
    useStoreActions((actions) => actions.bet.setWalletUsdtBalance),
  ];

  const addBetSession = useStoreActions((actions) => actions.bet.addBetSession);

  const connectionStatus = useConnectionStatus();

  const colorHex = useToken("colors", colors.primary.default);

  if (nftTokenId === -1) return null;

  return (
    <ScaleFade in={nftTokenId !== -1} initialScale={0.01}>
      <Stack
        flex={1}
        height={"500px"}
        borderWidth={"2px"}
        p={"1rem"}
        transition="all 0.5s ease-in-out"
        borderRadius={"25px"}
        borderColor={colors.primary.default}
        position={"relative"}
        bgGradient={colors.gradient.background}
        boxShadow={"0 0 15px 0 rgba(0,0,0,0.5)"}
      >
        <Text
          fontWeight="bold"
          fontSize={"1.5rem"}
          position={"absolute"}
          className={fonts.bungeeShade.className}
          color={colors.primary.text}
          top={"-1.8rem"}
          bg={colors.primary.default}
          px={"0.5rem"}
          borderRadius={"8px"}
        >
          Bet NFT
        </Text>
        <Icon
          top={"-1rem"}
          right={"-1rem"}
          boxShadow={"0 0 15px 0 rgba(0,0,0,1)"}
          position={"absolute"}
          as={IoCloseCircle}
          bg={colors.primary.text}
          onClick={() => {
            setNftTokenId(-1);
            setUSDTAmount(10);
          }}
          cursor={"pointer"}
          boxSize={"2.5rem"}
          borderRadius={"50%"}
          color={colors.primary.default}
        />
        <Center
          filter={connectionStatus !== "connected" ? blurs.blur10 : undefined}
        >
          {nftTokenId > -1 && (
            <NFTComponent
              widthPx={245}
              image={mock.nftData[nftTokenId].image}
              name={mock.nftData[nftTokenId].name}
            />
          )}
        </Center>
        {connectionStatus !== "connected" && (
          <AbsoluteCenter zIndex={10}>
            <ConnectWallet />
          </AbsoluteCenter>
        )}
        <Stack
          filter={connectionStatus !== "connected" ? blurs.blur10 : undefined}
          pointerEvents={connectionStatus !== "connected" ? "none" : undefined}
        >
          <HStack justifyContent={"center"}>
            <AutosizeInput
              value={usdtAmount}
              onChange={(valueString) =>
                setUSDTAmount(
                  Math.min(
                    parseInt(valueString.target.value || "0"),
                    walletUsdtBalance,
                    MAX_BET
                  )
                )
              }
              inputStyle={{
                color: colorHex,
                backgroundColor: "transparent",
                borderBottom: "2px solid",
                borderBottomColor: colorHex,
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "monospace",
                fontSize: "1.5rem",
                outline: "none",
              }}
            />
            <Image w={"1.5rem"} h={"1.5rem"} alt="USDT" src={USDT_ICON} />
          </HStack>
          <Box w={"100%"} my={"1rem"}>
            <HStack>
              {exampleBetUsdt.map((item, index) => (
                <Button
                  key={index}
                  onClick={setUSDTAmount.bind(
                    null,
                    Math.min(
                      usdtAmount + (item.value || walletUsdtBalance),
                      walletUsdtBalance,
                      MAX_BET
                    )
                  )}
                  boxShadow={"0 0 15px 0 rgba(0,0,0,0.5)"}
                  bgGradient={colors.gradient.button}
                  flex={1}
                  backgroundPosition={"left"}
                  backgroundSize={"200%"}
                  _active={{}}
                  transition={"all 0.5s ease-in-out"}
                  color={colors.primary.text}
                  _hover={{
                    backgroundPosition: "right",
                  }}
                >
                  {item.value ? item.value : "Max"}
                </Button>
              ))}
            </HStack>
          </Box>
          <Button
            boxShadow={"0 0 15px 0 rgba(0,0,0,0.5)"}
            bgGradient={colors.gradient.active}
            color={colors.primary.text}
            backgroundPosition={"left"}
            backgroundSize={"200%"}
            transition={"all 0.5s ease-in-out"}
            _hover={{
              backgroundPosition: "right",
            }}
            _active={{}}
            onClick={() => {
              setNftTokenId(-1);
              addBetSession({
                nftTokenId,
                usdt: usdtAmount,
              });
              setUSDTAmount(10);
              setWalletUsdtBalance(walletUsdtBalance - usdtAmount);
            }}
          >
            Bet now !
          </Button>
        </Stack>
      </Stack>
    </ScaleFade>
  );
};

export default NftBetSelect;
