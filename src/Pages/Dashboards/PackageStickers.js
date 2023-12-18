import React, { useEffect, useState } from 'react';
import { ref, listAll, getDownloadURL, deleteObject } from '@firebase/storage';
import { storage } from '../../firebase';

const PackageStickers = () => {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        // Get a reference to the stickers folder
        const stickersRef = ref(storage, 'stickers');

        // Get a list of all the items in the folder
        const stickersList = await listAll(stickersRef);

        // Retrieve the download URLs of all the stickers
        const stickerURLs = await Promise.all(
          stickersList.items.map(async (itemRef) => {
            return getDownloadURL(itemRef);
          })
        );

        setStickers(stickerURLs);
      } catch (error) {
        console.error('Error fetching stickers:', error);
      }
    };

    fetchStickers();
  }, []);

  const handleDownload = async (index) => {
    try {
      // Create a reference to the sticker that needs to be downloaded
      const stickerRef = ref(storage, `stickers/sticker${index + 1}.png`);

      // Get the download URL of the sticker
      const downloadURL = await getDownloadURL(stickerRef);

      // Simulate a download by opening the sticker URL in a new tab
      window.open(downloadURL);
    } catch (error) {
      console.error('Error downloading sticker:', error);
    }
  };

  // const handleDelete = async (index) => {
  //   try {
  //     // Create a reference to the sticker that needs to be deleted
  //     const stickerRef = ref(storage, `stickers/sticker${index + 1}.png`);

  //     // Delete the sticker from Firebase Storage
  //     await deleteObject(stickerRef);

  //     // Remove the deleted sticker from the state
  //     const updatedStickers = stickers.filter((_, i) => i !== index);
  //     setStickers(updatedStickers);
  //   } catch (error) {
  //     console.error('Error deleting sticker:', error);
  //   }
  // };

  return (
    <div>
      {stickers.map((sticker, index) => (
        <div key={index}>
          <img src={sticker} alt={`Sticker ${index + 1}`} />
          <button onClick={() => handleDownload(index)}>Download</button>
          {/* <button onClick={() => handleDelete(index)}>Delete</button> */}
        </div>
      ))}
    </div>
  );
};

export default PackageStickers;
