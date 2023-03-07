import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StoreProvider } from "easy-peasy";
import type { AppProps } from "next/app";
import { ModalTransactionProvider } from "../contexts/modal-transaction";
import AudioLayout from "../layouts/_audio";
import store from "../services/redux/store";
import "../styles/globals.css";
import "../styles/h5audio.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <ChakraProvider>
        <AudioLayout>
          <ThirdwebProvider
            desiredChainId={ChainId.Mumbai}
            supportedChains={[ChainId.Mumbai]}
          >
            <ModalTransactionProvider>
              <Component {...pageProps} />
            </ModalTransactionProvider>
          </ThirdwebProvider>
        </AudioLayout>
      </ChakraProvider>
    </StoreProvider>
  );
}

export default App;
