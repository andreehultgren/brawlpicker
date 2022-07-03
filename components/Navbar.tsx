import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Divider from "./Divider";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.splitter}>
          <div className={styles.left}>
            <Link href="/">
              <Image src="/logo.svg" height={60} width={60} />
            </Link>
          </div>
          <div className={styles.right}>
            <Link href="/">Home</Link>
            <Divider />
            <Link href="/brawlers">Brawlers</Link>
            <Divider />
            <Link href="/maps">Maps</Link>
            <Divider />
            <Link href="/gamemodes">Game Modes</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
