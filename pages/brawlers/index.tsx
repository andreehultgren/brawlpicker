import Head from "next/head";
import styles from "../../styles/Admin.module.css";
import { AddBrawler, ListBrawlers, Layout } from "../../components";

export default function Brawlers() {
  return (
    <Layout>
      <Head>
        <title>Brawlers</title>
        <meta name="description" content="Set some admin stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        <span className="highlightRed">Brawlers</span>
      </h1>
      <h2 className="highlightGreen">Add another brawler</h2>
      <AddBrawler />
      <h2 className="highlightGreen">Existing brawlers</h2>
      <ListBrawlers detailed />
    </Layout>
  );
}
