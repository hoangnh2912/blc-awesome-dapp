import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import { ModalTransactionProvider } from "../contexts/modal-transaction";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Mumbai}
      supportedChains={[ChainId.Mumbai]}
    >
      <ChakraProvider>
        <ModalTransactionProvider>
          <Component {...pageProps} />
        </ModalTransactionProvider>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default App;
