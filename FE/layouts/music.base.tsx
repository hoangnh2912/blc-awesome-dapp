import { Skeleton } from "@chakra-ui/react";
import { useNetwork } from "@thirdweb-dev/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarMusic from "../components/sidebar-music";
import { SideBarDataMusic } from "../constants/data/sidebar";
import { useStoreActions } from "../services/redux/hook";
import styles from "../styles/Home.module.css";
const MusicBaseLayout = ({
  children,
  selectTabIndex = 0,
}: {
  children: React.ReactNode;
  selectTabIndex?: number;
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => {
      if (
        url &&
        typeof url == "string" &&
        url.split("?")[0] === router.asPath.split("?")[0]
      )
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
  }, []);

  if (typeof window === "undefined" || !isBrowser) {
    return <></>;
  }

  return (
    <div className={styles.App}>
      <Head>
        <title>Music Protocol</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Music" />
        <meta property="og:url" content="http://scimta.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Music Dapp" />
        <meta property="og:description" content="Music" />
        <meta
          property="og:image"
          content="https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="Music.com" />
        <meta property="twitter:url" content="http://Music.com" />
        <meta name="twitter:title" content="Music Dapp" />
        <meta name="twitter:description" content="Music" />
        <meta
          name="twitter:image"
          content="https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg"
        />
      </Head>
      <SidebarMusic
        isLoading={isLoading}
        selectIndex={selectTabIndex}
        content={children}
        data={SideBarDataMusic}
      />
    </div>
  );
};

export default MusicBaseLayout;
