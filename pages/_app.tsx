import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";

function App({Component, pageProps}: AppProps) {
    return (
        <ThirdwebProvider desiredChainId={ChainId.Goerli}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </ThirdwebProvider>

    )
}

export default App
