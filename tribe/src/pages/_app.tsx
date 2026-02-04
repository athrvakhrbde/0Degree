import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

import { theme } from "../chakra/theme";
import ErrorBoundary from "../components/ErrorBoundary";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="0Degree Tribe - A community platform for dropouts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <ErrorBoundary>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ErrorBoundary>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
