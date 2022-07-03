import Image from "next/image";
import { IGameMode } from "../interfaces";
import styles from "../styles/GameMode.module.css";
import { useImage } from "../database";

interface IProps {
  gameMode: IGameMode | null;
  detailed?: boolean;
}

export default function GameMode({ gameMode, detailed }: IProps) {
  const imageURL = useImage(gameMode?.imagePath ?? null);
  return (
    <div className={styles.gameMode}>
      <Image
        src={imageURL}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
    </div>
  );
}
