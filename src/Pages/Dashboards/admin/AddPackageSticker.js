import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { storage } from '../../../firebase'; 

const AddPackageSticker = () => {
  const [sticker, setSticker] = useState(null);

  const handleStickerUpload = async (e) => {
    const file = e.target.files[0];

    // Create a reference to the location where the file should be uploaded
    const storageRef = ref(storage, `stickers/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      // Set the sticker state with the download URL
      setSticker(downloadURL);
    } catch (error) {
      console.error('Error uploading sticker:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleStickerUpload} />
      {sticker && <img src={sticker} alt="Uploaded Sticker" />}
    </div>
  );
};

export default AddPackageSticker;
