import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL, deleteObject } from "@firebase/storage";
import { storage } from "../../firebase";

const PackageStickers = ({ toastRef, isAdmin }) => {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        // Get a reference to the stickers folder
        const stickersRef = ref(storage, "stickers");

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
        console.error("Error fetching stickers:", error);
      }
    };

    fetchStickers();
  }, []);

  const handleDownload = async (index) => {
    try {
      const downloadURL = stickers[index];
  
      // Create an anchor element
      const link = document.createElement("a");
      link.href = downloadURL;
      link.target = "_blank";
      link.download = `sticker_${index}.png`; // Set the desired file name
  
      // Simulate a click on the anchor to trigger the download
      document.body.appendChild(link);
      link.click();
  
      // Clean up after download
      document.body.removeChild(link);
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error downloading sticker:",
        detail: error.message,
      });
    }
  };

  const handleDelete = async (index) => {
    try {
      // Create a reference to the sticker that needs to be deleted
      const stickerRef = ref(storage, `stickers/sticker${index + 1}.png`);

      // Delete the sticker from Firebase Storage
      await deleteObject(stickerRef);

      // Remove the deleted sticker from the state
      const updatedStickers = stickers.filter((_, i) => i !== index);
      setStickers(updatedStickers);
    } catch (error) {
      console.error("Error deleting sticker:", error);
    }
  };

  return (
    <div className="mt-4 stickers-container">
      <h2 className="dashboard-home-title">Uploaded Stickers</h2>
      <div className="d-flex flex-wrap">
        {stickers.map((sticker, index) => (
          <div key={index} className="d-flex flex-column m-2 ">
            <img
              className="rounded"
              width={100}
              height={100}
              alt={`Sticker ${index}`}
              src={sticker}
            />
            <button
              className="btn btn-info mt-1 sticker-button"
              onClick={() => handleDownload(index)}
            >
              Download
            </button>
            {isAdmin && (
              <button
                className="btn btn-sm btn-danger mt-2 sticker-button"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageStickers;
