import Head from "next/head";
import styles from "../../styles/Admin.module.css";
import { AddGameMode, ListGameModes, Layout } from "../../components";

export default function GameModes() {
  return (
    <Layout>
      <Head>
        <title>Game Modes</title>
        <meta name="description" content="Set some admin stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        <span className="highlightRed">GameModes</span>
      </h1>
      <h2 className="highlightGreen">Existing brawlers</h2>
      <ListGameModes detailed />
      <h2 className="highlightGreen">Add another brawler</h2>
      <AddGameMode />
    </Layout>
  );
}
