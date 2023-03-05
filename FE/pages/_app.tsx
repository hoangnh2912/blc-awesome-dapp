import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StoreProvider } from "easy-peasy";
import type { AppProps } from "next/app";
import { ModalTransactionProvider } from "../contexts/modal-transaction";
import store from "../services/redux/store";
import "../styles/globals.css";
import "../styles/h5audio.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
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
    </StoreProvider>
  );
}

export default App;
