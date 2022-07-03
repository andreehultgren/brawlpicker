import Image from "next/image";
import { IMap } from "../interfaces";
import styles from "../styles/Map.module.css";
import { useImage } from "../database";

interface IProps {
  map: IMap;
  detailed?: boolean;
}

export default function Map({ map, detailed }: IProps) {
  const imageURL = useImage(map.imagePath);
  return (
    <div className={styles.map} id={map.name}>
      <Image
        src={imageURL}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
      <p className={styles.mapName}>{map.name}</p>
    </div>
  );
}
