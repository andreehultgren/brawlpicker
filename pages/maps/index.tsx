import Head from "next/head";
import styles from "../../styles/Admin.module.css";
import { AddMap, ListMaps, Layout } from "../../components";

export default function Maps() {
  return (
    <Layout>
      <Head>
        <title>Maps</title>
        <meta name="description" content="Set some admin stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        <span className="highlightRed">Maps</span>
      </h1>
      <h2 className="highlightGreen">Existing maps</h2>
      <ListMaps detailed />
      <h2 className="highlightGreen">Add another Map</h2>
      <AddMap />
    </Layout>
  );
}
