import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '../firebase';

export const parseTitle = (title) => {
  const split = title.split('_');
  return split.join(' ');
};

export const isEmpty = (data) => {
  if (data == null || typeof data === 'undefined' || data === '') return true;
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

    await uploadString(storageRef, dataURL, 'data_url');

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Return the download URL
    return downloadURL;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error; // Re-throw the error to handle it where uploadToStorage is called.
  }
};

export const separateWordsWithLineBreak = (text) => {
  // Split the text into an array of words
  const wordsArray = text?.split(' ');
  // Insert <br> after each word and join them back into a string
  const textWithLineBreak = wordsArray?.join('<br>');
  return textWithLineBreak;
};

export const generatePartnerCode = (firstName, lastName) => {
  const firstLetterOfFirstName = firstName.charAt(0).toUpperCase();
  const firstLetterOfLastName = lastName.charAt(0).toUpperCase();
  const creationDay = new Date().getDate(); // Get the day part of the current date

  return `AF-${firstLetterOfFirstName}-${firstLetterOfLastName}-${creationDay}`;
};

export const generateSearchKeywords = (text) => {
  if (!text) return [];

  text = text.toLowerCase();
  const words = text.split(' ');
  const keywordSet = new Set();

  // Generate prefixes for each word (e.g., "per" from "perfume")
  words.forEach((word) => {
    let prefix = '';
    for (let char of word) {
      prefix += char;
      keywordSet.add(prefix);
    }
  });

  // Include full words
  words.forEach((word) => keywordSet.add(word));

  return Array.from(keywordSet);
};

// Example:
// console.log(generateSearchKeywords("Red Perfume"));
// Output: ['r', 're', 'red', 'p', 'pe', 'per', 'perf', 'perfu', 'perfum', 'perfume', 'red', 'perfume']

export const getOptimizedImageUrl = (imagePath, width = 500, quality = 80) => {
  const baseUrl = `https://ik.imagekit.io/${process.env.REACT_APP_IMAGEKIT_ID}`;
  return `${baseUrl}/${imagePath}?tr=w-${width},q-${quality},f-auto`;
};
