import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarMusic from "../components/sidebar-music";
import { SideBarDataMusic } from "../constants/data/sidebar";
import ApiServices from "../services/api";
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
  const [musicName, setMusicName] = useState("");
  const [musicImage, setMusicImage] = useState("");
  const [musicSinger, setMusicSinger] = useState("");

  const getMusicDetail = async () => {
    if (router.query.id) {
      const res = await ApiServices.music.getMusic(router.query.id as string);
      setMusicName(res.data.data.name);
      setMusicImage(res.data.data.image);
      setMusicSinger(res.data.data.singer);
    }
  };
  useEffect(() => {
    getMusicDetail();
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
          {musicName ? `${musicName} - ${musicSinger}` : "Music Protocol"}
        </title>

        <link
          rel="shortcut icon"
          href={musicImage ? `${musicImage}` : "/favicon.ico"}
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
            musicImage
              ? `${musicImage}`
              : `https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg`
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
            musicImage
              ? `${musicImage}`
              : `https://r4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-7866ed583040dc28909c514e8812149a.jpg`
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
