import { useState, useEffect } from "react";
import { set, ref, onValue, DatabaseReference } from "firebase/database";
import { uploadImage } from "./image";
import { database } from "./config";
import { UploadResult } from "firebase/storage";
import { IBrawler } from "../interfaces";

async function createBrawler(brawlerName, file) {
  if (!!!brawlerName) {
    throw "No brawler name error";
  }

  // Upload the image to firebase
  const file_location: string = `brawler/${brawlerName.toLowerCase()}`;
  const imageResponse: UploadResult = await uploadImage(file_location, file);

  // Create database object
  const path: string = imageResponse.metadata.fullPath;
  const pointer: DatabaseReference = ref(database, path);
  const brawler: IBrawler = {
    name: brawlerName,
    image_path: path,
  };

  // Save data and return pointer
  set(pointer, brawler);
  return pointer;
}

const useBrawlers = () => {
  // Create the array of brawlers
  const [brawlers, setBrawlers] = useState<IBrawler[]>([]);

  // Update the brawlers when data in firebase changes
  useEffect(() => {
    const pointer = ref(database, "brawler");
    onValue(pointer, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        const brawlerArray: IBrawler[] = Object.keys(data).map(
          (key) => data[key]
        );
        setBrawlers(brawlerArray);
      }
    });
  }, [setBrawlers]);

  // Serve the brawlers
  return brawlers;
};

const useBrawler = (brawlerName: string) => {
  // Create the data for the brawler
  const [brawler, setBrawler] = useState<IBrawler | null>(null);

  // Update brawler data when database changes
  useEffect(() => {
    const pointer = ref(database, `brawler/${brawlerName}`);
    onValue(pointer, (snapshot) => {
      const data: IBrawler = snapshot.val();
      setBrawler(data);
    });
  }, [setBrawler]);

  // Serve the bralwer
  return brawler;
};

export { createBrawler, useBrawlers, useBrawler };
