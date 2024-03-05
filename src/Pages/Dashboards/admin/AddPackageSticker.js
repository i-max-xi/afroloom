import React, { useRef, useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { storage } from "../../../firebase";
import { Badge } from "primereact/badge";
import { Toast } from "primereact/toast";
import PackageStickers from "../PackageStickers";

const AddPackageSticker = () => {
  const [stickers, setStickers] = useState([]);
  const [uploading, setUploading] = useState(false);

  const toastRef = useRef(null);

  const handleStickerUpload = async (e) => {
    setUploading(true);

    const files = e.target.files;
    const uploadPromises = Array.from(files).map(async (file) => {
      const storageRef = ref(storage, `stickers/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        toastRef.current.show({
          severity: "success",
          summary: "Sticker uploaded successfully!",
        });
        return getDownloadURL(storageRef);
      } catch (error) {
        toastRef.current.show({
          severity: "error",
          summary: "Error uploading sticker:",
          detail: error.message,
        });
        return null;
      }
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      // const validDownloadURLs = downloadURLs.filter((url) => url !== null);
      setStickers([...stickers, ...downloadURLs]);
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error uploading stickers:",
        detail: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteSticker = async (index) => {
    try {
      const imageName = stickers[index];

      const stickerRef = ref(storage, imageName);

      await deleteObject(stickerRef);

      const updatedStickers = stickers.filter((sticker, i) => i !== index);
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
    <>
      <Toast ref={toastRef} position="top-right" />

      <div>
        <h1 className="dashboard-home-title">Upload multiple stickers</h1>
        <div className="p-field d-flex flex-column mt-5">
          <div className="d-flex upload-input">
            {uploading && <span>uploading...</span>}

            <label htmlFor="stickers" className="custom-upload">
              <span>
                Choose stickers to upload <i className="pi pi-upload"></i>
              </span>
              <input
                required
                id="stickers"
                type="file"
                accept="image/*"
                onChange={handleStickerUpload}
                multiple // This attribute allows selecting multiple files
              />
            </label>

            {stickers.length > 0 && (
              <div>
                <ul className="d-flex">
                  {stickers.map((sticker, index) => (
                    <div key={index} className="position-relative">
                      <img
                        className="mx-2 rounded"
                        width={40}
                        height={40}
                        alt={sticker}
                        src={sticker}
                      />
                      <Badge
                        value="X"
                        severity="danger"
                        className="p-badge-sm p-overlay-badge position-absolute top-0 end-0"
                        style={{ scale: "0.8", cursor: "pointer" }}
                        onClick={() => handleDeleteSticker(index)}
                      />
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div style={{marginTop: '5rem'}}>
        <PackageStickers toastRef={toastRef} isAdmin={true}/>

        </div>
      </div>
    </>
  );
};

export default AddPackageSticker;
