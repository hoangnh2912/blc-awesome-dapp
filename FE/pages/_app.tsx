import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import { ModalTransactionProvider } from "../contexts/modal-transaction";
import "../styles/globals.css";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <ChakraProvider>
        <ModalTransactionProvider>
          <Component {...pageProps} />
        </ModalTransactionProvider>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default App;
