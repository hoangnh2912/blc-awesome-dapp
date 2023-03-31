import { ChakraProvider } from "@chakra-ui/react";
import {
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
  walletConnectV1,
} from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
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
            activeChain={Mumbai}
            supportedWallets={[metamaskWallet(), walletConnect()]}
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
