import React from "react";

const ImageUpload = ({ onImageUpload }) => {

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // setSelectedImage(file);
    onImageUpload(file); // Pass the uploaded file to the parent component
  };

  return (
    <input
      type="file"
      accept="image/png"
      onChange={handleImageChange}
    />
  );
};

export default ImageUpload;
