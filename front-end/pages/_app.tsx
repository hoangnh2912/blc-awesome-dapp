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
import ErrorBoundary from "../layouts/error-boundary";

function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <ChakraProvider>
        <AudioLayout>
          <ThirdwebProvider
            activeChain={Mumbai}
            supportedWallets={[metamaskWallet(), walletConnect()]}
            clientId="45a23bd3b3cd8b3181aedb3a9559e312"
          >
            <ErrorBoundary>
              <ModalTransactionProvider>
                <Component {...pageProps} />
              </ModalTransactionProvider>
            </ErrorBoundary>
          </ThirdwebProvider>
        </AudioLayout>
      </ChakraProvider>
    </StoreProvider>
  );
}

export default App;
