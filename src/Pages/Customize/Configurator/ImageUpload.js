import React from "react";

const ImageUpload = ({ onImageUpload }) => {

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    onImageUpload(file); // Pass the uploaded file to the parent component
  };

  return (
    <>
      <label className="upload-label" htmlFor="upload-logo">
        Upload Logo
      </label>
      <input
        id="upload-logo"
        type="file"
        accept="image/png"
        onChange={handleImageChange}
        className="upload-input"
      />
    </>
  );
};

export default ImageUpload;
