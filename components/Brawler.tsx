import Image from "next/image";
import { IBrawler } from "../interfaces";
import styles from "../styles/Brawler.module.css";
import { useImage } from "../database";

interface IProps {
  brawler: IBrawler;
  detailed?: boolean;
}

export default function Brawler({ brawler, detailed }: IProps) {
  const imageURL = useImage(brawler.image_path);
  return (
    <div className={styles.brawler} id={brawler.name}>
      <Image
        src={imageURL}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
      <p className={styles.brawlerName}>{brawler.name}</p>
    </div>
  );
}
