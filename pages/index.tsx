import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Layout, ListGameModes } from "../components";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Brawlpicker</title>
        <meta
          name="description"
          content="Pick the best brawler for brawlstars"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <h1 className={styles.title}>
        Pick the best <span className="highlightRed">brawler</span>
      </h1>
      <h2 className={styles.title}>
        <span className="highlightGreen">Win</span> every game
      </h2>

      <ListGameModes />
    </Layout>
  );
}
