import Head from "next/head";
import styles from "../styles/Admin.module.css";
import { Layout } from "../components";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Set some admin stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        <span className="highlightRed">Admin</span>
      </h1>
    </Layout>
  );
}
