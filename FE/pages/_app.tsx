import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  Button,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContextProvider,
  ModalFooter,
  ModalHeader,
  useModal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ModalProvider } from "../contexts/modal";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <ChakraProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default App;
