import React from "react";
import { useMaps } from "../database";
import { IMap } from "../interfaces";
import styles from "../styles/Map.module.css";
import Map from "./Map";

interface IProps {
  detailed?: boolean;
  sorting?: (a, b) => 1 | -1;
}

export default function ListMaps({ detailed, sorting }: IProps) {
  let maps: IMap[] = useMaps();
  if (!!sorting) {
    maps = maps.sort(sorting);
  } else {
    maps = maps.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  return (
    <div className={styles.mapList}>
      {maps.map((map) => {
        return <Map key={map.name} map={map} detailed={!!detailed} />;
      })}
    </div>
  );
}
