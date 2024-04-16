import { ChakraProvider } from "@chakra-ui/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
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
import { THIRDWEB_CLIENTID } from "../constants/constants";

function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <ChakraProvider>
        <ThirdwebProvider
          supportedChains={[PolygonAmoyTestnet]}
          activeChain={PolygonAmoyTestnet}
          clientId={THIRDWEB_CLIENTID}
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
