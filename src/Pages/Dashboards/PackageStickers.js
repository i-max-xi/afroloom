import React, { useEffect, useRef, useState } from "react";
import { ref, listAll, getDownloadURL, deleteObject } from "@firebase/storage";
import { storage } from "../../firebase";
import { saveAs } from "file-saver";
import { Toast } from "primereact/toast";

const PackageStickers = ({ isAdmin }) => {
  const [stickers, setStickers] = useState([]);

  const toastRef = useRef(null);

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

      // Use FileSaver.js to trigger the download
      saveAs(downloadURL, `sticker${index + 1}.png`);
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

      const imageName = stickers[index];

      const stickerRef = ref(storage, imageName);
      // const stickerRef = ref(storage, `stickers/sticker${index + 1}.png`);

      // Delete the sticker from Firebase Storage
      await deleteObject(stickerRef);

      // Remove the deleted sticker from the state
      const updatedStickers = stickers.filter((_, i) => i !== index);
      setStickers(updatedStickers);
      toastRef.current.show({
        severity: "success",
        summary: "Sticker deleted successfully!",
      });
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error deleting sticker:",
        detail: error.message,
      });
    }
  };

  return (
    <div className="mt-4 stickers-container">
      <Toast ref={toastRef} position="top-right" />

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
              download={`sticker${index + 1}.png`}
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
