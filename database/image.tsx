import { useState, useEffect } from "react";
import {
  ref,
  StorageReference,
  uploadBytes,
  UploadResult,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./config";

const DEFAULT_IMAGE = "/loading.gif";

async function uploadImage(
  path: string,
  file: Blob | Uint8Array | ArrayBuffer
) {
  const storageRef: StorageReference = ref(storage, path);
  const response: UploadResult = await uploadBytes(storageRef, file);
  return response;
}

function useImage(imagePath: string) {
  const [imageURL, setImageURL] = useState<string>(DEFAULT_IMAGE);

  useEffect(() => {
    if (!!imagePath) {
      const pointer = ref(storage, imagePath);
      getDownloadURL(pointer).then(setImageURL);
    }
  }, [setImageURL, imagePath]);

  return imageURL;
}

export { uploadImage, useImage };
