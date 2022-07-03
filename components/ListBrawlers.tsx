import React from "react";
import { useBrawlers } from "../database";
import { IBrawler } from "../interfaces";
import Brawler from "./Brawler";
import styles from "../styles/Brawler.module.css";

interface IProps {
  detailed?: boolean;
  sorting?: (a, b) => 1 | -1;
}

export default function ListBrawlers({ detailed, sorting }: IProps) {
  let brawlers: IBrawler[] = useBrawlers();
  if (!!sorting) {
    brawlers = brawlers.sort(sorting);
  } else {
    brawlers = brawlers.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  return (
    <div className={styles.brawlerList}>
      {brawlers.map((brawler) => {
        return (
          <Brawler key={brawler.name} brawler={brawler} detailed={!!detailed} />
        );
      })}
    </div>
  );
}
