import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarMusic from "../components/sidebar-music";
import { SideBarDataMusic } from "../constants/data/sidebar";
import ApiServices from "../services/api";
import styles from "../styles/Home.module.css";
import { GetMarketOutput } from "../services/api/types";
const MusicBaseLayout = ({
  children,
  selectTabIndex = 0,
  meta,
}: {
  children: React.ReactNode;
  selectTabIndex?: number;
  meta?: GetMarketOutput;
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
      // if (
      //   url &&
      //   typeof url == "string" &&
      //   url.split("?")[0] === router.asPath.split("?")[0]
      // )
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
        <title>
          {meta ? `${meta.name} - ${meta.singer}` : "Music Protocol"}
        </title>

        <link
          rel="shortcut icon"
          href={meta ? `${meta.image}` : "/favicon.ico"}
        />
        <meta name="description" content="Music Marketplace" />
        <meta
          property="og:url"
          content="https://scimta.com/music-marketplace"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Music Marketplace" />
        <meta property="og:description" content="Music Marketplace" />
        <meta
          property="og:image"
          content={
            meta
              ? `${meta.image}`
              : `https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=1024`
          }
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://scimta.com/music-marketplace"
        />
        <meta
          property="twitter:url"
          content="https://scimta.com/music-marketplace"
        />
        <meta name="twitter:title" content="Music Marketplace" />
        <meta name="twitter:description" content="Music Marketplace" />
        <meta
          name="twitter:image"
          content={
            meta
              ? `${meta.image}`
              : `https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=1024`
          }
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
