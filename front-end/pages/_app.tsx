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
import ErrorBoundary from "../layouts/error-boundary";
import store from "../services/redux/store";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <ChakraProvider>
        <ThirdwebProvider
          activeChain={Mumbai}
          clientId="cce88ba586b9a9772e27e52376f7f39aa9fcaacc6097af98866edc47fab20cbfdc4a85d41ea11f49148cfc9fb25499d93248ef1080eec4978bc4b978b9d6770b"
          supportedWallets={[metamaskWallet(), walletConnect()]}
        >
          <ErrorBoundary>
            <ModalTransactionProvider>
              <Component {...pageProps} />
            </ModalTransactionProvider>
          </ErrorBoundary>
        </ThirdwebProvider>
      </ChakraProvider>
    </StoreProvider>
  );
}

export default App;
