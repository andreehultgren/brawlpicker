import React from "react";
import Link from "next/link";
import { useGameModes } from "../database";
import { IGameMode } from "../interfaces";
import GameMode from "./GameMode";
import styles from "../styles/GameMode.module.css";

interface IProps {
  detailed?: boolean;
  sorting?: (a, b) => 1 | -1;
}

export default function ListGameModes({ detailed, sorting }: IProps) {
  let gameModes: IGameMode[] = useGameModes();
  if (!!sorting) {
    gameModes = gameModes.sort(sorting);
  } else {
    gameModes = gameModes.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  return (
    <div className={styles.gameModeList}>
      {gameModes.map((gameMode) => {
        return (
          <Link
            href={`/gamemodes/${gameMode.name}`}
            style={{ width: "100%", height: "100%" }}
          >
            <a style={{ width: "100%", height: "100%" }}>
              <GameMode
                key={gameMode.name}
                gameMode={gameMode}
                detailed={!!detailed}
              />
            </a>
          </Link>
        );
      })}
    </div>
  );
}
