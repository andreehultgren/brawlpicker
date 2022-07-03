import { useState, useEffect } from "react";
import {
  set,
  ref,
  onValue,
  DatabaseReference,
  Database,
} from "firebase/database";
import { uploadImage } from "./image";
import { database } from "./config";
import { UploadResult } from "firebase/storage";
import { IMap } from "../interfaces";

async function createMap(
  mapName: string,
  file: Blob | Uint8Array | ArrayBuffer
) {
  if (!!!mapName) {
    return null;
  }
  // Upload the image to firebase
  const file_location: string = `map/${mapName.toLowerCase()}`;
  const imageResponse: UploadResult = await uploadImage(file_location, file);

  // Create database object
  const path: string = imageResponse.metadata.fullPath;
  const pointer: DatabaseReference = ref(database, path);
  const map: IMap = {
    name: mapName,
    imagePath: path,
    sTier: [],
    aTier: [],
    bTier: [],
  };

  // Save data and return pointer
  set(pointer, map);
  return pointer;
}

const useMaps = () => {
  // Create the array of brawlers
  const [maps, setMaps] = useState<IMap[]>([]);

  // Update the brawlers when data in firebase changes
  useEffect(() => {
    const pointer = ref(database, "map");
    onValue(pointer, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        const mapArray: IMap[] = Object.keys(data).map((key) => data[key]);
        setMaps(mapArray);
      }
    });
  }, [setMaps]);

  // Serve the brawlers
  return maps;
};

const useMap = (mapName: string) => {
  // Create the data for the brawler
  const [map, setMap] = useState<IMap | null>(null);

  // Update brawler data when database changes
  useEffect(() => {
    if (!!mapName) {
      const pointer = ref(database, `map/${mapName}`);
      onValue(pointer, (snapshot) => {
        const data: IMap = snapshot.val();
        setMap(data);
      });
    }
  }, [setMap, mapName]);

  // Serve the bralwer
  return map;
};

const assignBrawlerToMap = (
  mapName: string,
  brawlerName: string,
  tier: "s" | "a" | "b"
) => {
  const mapPointer: DatabaseReference = ref(
    database,
    `map/${mapName.toLowerCase()}`
  );

  onValue(
    mapPointer,
    (snapshot) => {
      const mapData: IMap = snapshot.val();
      let newMapData = { ...mapData };
      // Remove brawler from all tiers
      ["s", "a", "b"].forEach((t) => {
        const key = `${t}Tier`;
        if (tier === t) {
          if (!!mapData[key]) {
            console.log("Adding brawler to", key);
            newMapData[key] = [
              ...newMapData[key],
              brawlerName.toLocaleLowerCase(),
            ];
          } else {
            console.log("Adding only brawler to", key);
            newMapData[key] = [brawlerName.toLocaleLowerCase()];
          }
        } else {
          console.log("Removing brawler", key);
          newMapData[key] = (newMapData[key] ?? []).filter(
            (b) => b !== brawlerName.toLowerCase()
          );
        }
      });
      set(mapPointer, newMapData);
    },
    { onlyOnce: true }
  );
};

const removeBrawlerFromMap = (mapName: string, brawlerName: string) => {
  const mapPointer: DatabaseReference = ref(
    database,
    `map/${mapName.toLowerCase()}`
  );

  onValue(
    mapPointer,
    (snapshot) => {
      const mapData: IMap = snapshot.val();
      let newMapData = { ...mapData };
      ["s", "a", "b"].forEach((t) => {
        const key = `${t}Tier`;

        if (!!mapData[key]) {
          newMapData[key] = mapData[key].filter(
            (b) => b !== brawlerName.toLowerCase()
          );
        }
      });
      set(mapPointer, newMapData);
    },
    { onlyOnce: true }
  );
};

export { createMap, useMaps, useMap, assignBrawlerToMap, removeBrawlerFromMap };
