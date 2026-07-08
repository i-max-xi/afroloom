import React from "react";

const ImageUploadForLogo = ({
  labelLeft,
  labelRight,
  onImageUpload,
  toastRef,
  hideRightButton,
}) => {
  const handleImageChange = (e, onImageUpload) => {
    const file = e.target.files[0];

    // Pass the uploaded file to the parent component without dimension check
    onImageUpload(file);
  };

  const handleImageAllChange = (e) => {
    handleImageChange(e, onImageUpload);
  };

  

  return (
    <div className="flex justify-center items-center gap-4  w-full">
      <label className="cursor-pointer bg-[#3C9FEF] py-2 px-4 text-white rounded-md" htmlFor="upload-logo-left">
        {labelLeft}
      </label>
      <input
        id="upload-logo-left"
        type="file"
        onChange={handleImageAllChange}
        className="upload-input"
      />
    
    </div>
  );
};

export default ImageUploadForLogo;
