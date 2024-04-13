import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../firebase";

export const parseTitle = (title) => {
  const split = title.split("_");
  return split.join(" ");
};

export const isEmpty = (data) => {
  if (data == null || typeof data === "undefined" || data === "") return true;
  return false;
};

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
};

export const uploadToStorage = async (dataURL, bucket) => {
  try {
    const storageRef = ref(storage, `${bucket}/${Date.now()}.png`);

    await uploadString(storageRef, dataURL, "data_url");

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Return the download URL
    return downloadURL;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error; // Re-throw the error to handle it where uploadToStorage is called.
  }
};
