import Head from "next/head";
import styles from "../styles/Home.module.css";
import { SideBarData } from "../constants/data/sidebar";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { ChainId, useNetwork, useSDK } from "@thirdweb-dev/react";

const BaseLayout = ({
  children,
  selectTabIndex = 0,
}: {
  children: React.ReactNode;
  selectTabIndex?: number;
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [currentNetwork, switchNetwork] = useNetwork();

  useEffect(() => {
    setIsBrowser(true);
    // if (currentNetwork.data.chain && switchNetwork)
    //   if (currentNetwork.data.chain.id != ChainId.Mumbai) {
    //     switchNetwork(ChainId.Mumbai);
    //   }
  }, [switchNetwork, currentNetwork]);

  if (typeof window === "undefined" || !isBrowser) {
    return <></>;
  }

  return (
    <div className={styles.App}>
      <Head>
        <title>SCIMTA Protocol</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="SCIMTA" />
        <meta property="og:url" content="http://scimta.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SCIMTA Dapp" />
        <meta property="og:description" content="SCIMTA" />
        <meta
          property="og:image"
          content="https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="scimta.com" />
        <meta property="twitter:url" content="http://scimta.com" />
        <meta name="twitter:title" content="SCIMTA Dapp" />
        <meta name="twitter:description" content="SCIMTA" />
        <meta
          name="twitter:image"
          content="https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg"
        />
      </Head>
      <Sidebar
        selectIndex={selectTabIndex}
        content={children}
        data={SideBarData}
      />
    </div>
  );
};

export default BaseLayout;
