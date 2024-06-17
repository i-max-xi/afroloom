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

export const separateWordsWithLineBreak = (text) => {
  // Split the text into an array of words
  const wordsArray = text?.split(" ");
  // Insert <br> after each word and join them back into a string
  const textWithLineBreak = wordsArray?.join("<br>");
  return textWithLineBreak;
  
};


export const generatePartnerCode = (firstName, lastName) => {
  const firstLetterOfFirstName = firstName.charAt(0).toUpperCase();
  const firstLetterOfLastName = lastName.charAt(0).toUpperCase();
  const creationDay = new Date().getDate();  // Get the day part of the current date

  return `AF-${firstLetterOfFirstName}-${firstLetterOfLastName}-${creationDay}`;
};
