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
import { IGameMode } from "../interfaces";

async function createGameMode(
  gameModeName: string,
  file: Blob | Uint8Array | ArrayBuffer
) {
  // Upload the image to firebase
  const file_location: string = `gameMode/${gameModeName.toLowerCase()}`;
  const imageResponse: UploadResult = await uploadImage(file_location, file);

  // Create database object
  const path: string = imageResponse.metadata.fullPath;
  const pointer: DatabaseReference = ref(database, path);
  const map: IGameMode = {
    name: gameModeName,
    maps: [],
    imagePath: path,
  };

  // Save data and return pointer
  set(pointer, map);
  return pointer;
}

const useGameModes = () => {
  // Create the array of brawlers
  const [gameMode, setGameMode] = useState<IGameMode[]>([]);

  // Update the brawlers when data in firebase changes
  useEffect(() => {
    const pointer = ref(database, "gameMode");
    onValue(pointer, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        const mapArray: IGameMode[] = Object.keys(data).map((key) => data[key]);
        setGameMode(mapArray);
      }
    });
  }, [setGameMode]);

  // Serve the brawlers
  return gameMode;
};

const useGameMode = (gameModeName: string) => {
  // Create the data for the brawler
  const [gameMode, setGameMode] = useState<IGameMode | null>(null);

  // Update brawler data when database changes
  useEffect(() => {
    if (!!gameModeName) {
      const pointer = ref(database, `gameMode/${gameModeName.toLowerCase()}`);
      onValue(pointer, (snapshot) => {
        const data: IGameMode = snapshot.val();
        setGameMode(data);
      });
    }
  }, [setGameMode, gameModeName]);
  // Serve the bralwer
  return gameMode;
};

const assignMapToGameMode = (gameModeName: string, mapName: string) => {
  const gameModeRef: DatabaseReference = ref(
    database,
    `gameMode/${gameModeName.toLowerCase()}`
  );

  onValue(
    gameModeRef,
    (snapshot) => {
      console.log("Reading", `gameMode/${gameModeName.toLowerCase()}`);
      const gameMode: IGameMode = snapshot.val();
      console.log("Found", gameMode);
      let newGameMode: IGameMode = { ...gameMode };
      if (!!gameMode.maps) {
        newGameMode.maps = [...gameMode.maps, mapName.toLocaleLowerCase()];
      } else {
        newGameMode.maps = [mapName.toLocaleLowerCase()];
      }
      set(gameModeRef, newGameMode);
    },
    {
      onlyOnce: true,
    }
  );
};

const removeMapFromGameMode = (gameModeName: string, mapName: string) => {
  const gameModeRef: DatabaseReference = ref(
    database,
    `gameMode/${gameModeName.toLowerCase()}`
  );

  onValue(
    gameModeRef,
    (snapshot) => {
      const gameMode: IGameMode = snapshot.val();
      let newGameMode: IGameMode = { ...gameMode };
      if (!!gameMode.maps) {
        newGameMode.maps = gameMode.maps.filter((m) => mapName !== m);
      }
      set(gameModeRef, newGameMode);
    },
    {
      onlyOnce: true,
    }
  );
};

export {
  createGameMode,
  useGameModes,
  useGameMode,
  assignMapToGameMode,
  removeMapFromGameMode,
};
