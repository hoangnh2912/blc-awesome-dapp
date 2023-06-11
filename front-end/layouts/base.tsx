import { useActiveChain } from "@thirdweb-dev/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { SideBarData } from "../constants/data/sidebar";
import styles from "../styles/Home.module.css";

const BaseLayout = ({
  children,
  selectTabIndex = 0,
}: {
  children: React.ReactNode;
  selectTabIndex?: number;
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const currentNetwork = useActiveChain();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events, router.asPath]);

  useEffect(() => {
    setIsBrowser(true);
  }, [currentNetwork]);

  if (typeof window === "undefined" || !isBrowser) {
    return <></>;
  }

  return (
    <div className={styles.App}>
      <Head>
        <title>Gamblock</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Gamblock" />
        <meta property="og:url" content="https://scimta.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gamblock Dapp" />
        <meta property="og:description" content="Gamblock" />
        <meta
          property="og:image"
          content="https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="scimta.com" />
        <meta property="twitter:url" content="https://scimta.com" />
        <meta name="twitter:title" content="Gamblock Dapp" />
        <meta name="twitter:description" content="Gamblock" />
        <meta
          name="twitter:image"
          content="https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg"
        />
      </Head>
      <Sidebar
        isLoading={isLoading}
        selectIndex={selectTabIndex}
        content={children}
        data={SideBarData}
      />
    </div>
  );
};

export default BaseLayout;
