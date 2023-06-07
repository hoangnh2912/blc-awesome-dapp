import { ChakraProvider } from "@chakra-ui/react";
import { Mumbai } from "@thirdweb-dev/chains";
import {
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from "@thirdweb-dev/react";
import { StoreProvider } from "easy-peasy";
import type { AppProps } from "next/app";
import { ModalTransactionProvider } from "../contexts/modal-transaction";
import AudioLayout from "../layouts/_audio";
import ErrorBoundary from "../layouts/error-boundary";
import store from "../services/redux/store";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <ChakraProvider>
        <AudioLayout>
          <ThirdwebProvider
            activeChain={Mumbai}
            supportedWallets={[metamaskWallet(), walletConnect()]}
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
