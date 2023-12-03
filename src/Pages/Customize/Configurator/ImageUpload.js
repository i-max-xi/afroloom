import React from "react";

const ImageUpload = ({ labelLeft, labelRight, onImageUploadLeft, onImageUploadRight  }) => {

  const handleImageLeftChange = (e) => {
    const file = e.target.files[0];
    onImageUploadLeft(file); // Pass the uploaded file to the parent component
  };

  const handleImageRightChange = (e) => {
    const file = e.target.files[0];
    onImageUploadRight(file); // Pass the uploaded file to the parent component
  };

  return (
    <>
      <label className="upload-label" htmlFor="upload-logo-left">
        {labelLeft}
      </label>
      <input
        id="upload-logo-left"
        type="file"
        accept="image/png"
        onChange={handleImageLeftChange}
        className="upload-input"
      />
      <label className="upload-label" htmlFor="upload-logo-right">
        {labelRight}
      </label>
      <input
        id="upload-logo-right"
        type="file"
        accept="image/png"
        onChange={handleImageRightChange}
        className="upload-input"
      />
    </>
  );
};

export default ImageUpload;
