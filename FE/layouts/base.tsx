import Head from "next/head";
import styles from "../styles/Home.module.css";
import { SideBarData } from "../constants/data/sidebar";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (typeof window === "undefined" || !isBrowser) {
    return <></>;
  }

  return (
    <div className={styles.App}>
      <Head>
        <title>Awesome DApp</title>
      </Head>
      <Sidebar selectIndex={0} content={children} data={SideBarData} />
    </div>
  );
};

export default BaseLayout;
