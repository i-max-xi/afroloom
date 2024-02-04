import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { Badge } from "primereact/badge";
import { Timestamp } from "firebase/firestore";
import { ProgressSpinner } from "primereact/progressspinner";
import { storage } from "../../../firebase";
import productsServices from "../../../Services/products.services";
import { ageList, genderList } from "../../../Data/genderAgeList";
import {
  ProfessionalsDbEnum,
  modelSpecialties,
  photographySpecialties,
  tourGuideSpecialties,
} from "../../../Data/professionalsList";

const UpdateInfo = ({ currentUser, proffesionalType }) => {
  const [userInfo, setuserInfo] = useState(currentUser);

  const [extraImages, setExtraImages] = useState([]); // State variable to store extra images
  const [isUploading, setIsUploading] = useState(false); // Initialize loading state

  const toastRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // Create an image element to get the dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Check if the image dimensions are 500x500
      if (img.width !== 500 || img.height !== 500) {
        toastRef.current.show({
          severity: "error",
          summary: "Error uploading image:",
          detail: "Please upload an image with dimensions 500x500.",
        });
        e.target.value = null;
        return;
      } else {
        const storageRef = ref(storage, `images/${file.name}`);
        uploadImage(storageRef, file);
      }
    };
  };

  const uploadImage = async (storageRef, file) => {
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setuserInfo({ ...userInfo, item: downloadURL });
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error uploading image:",
        detail: error.message,
      });
    }
  };

  const handleDeleteImage = async (index) => {
    try {
      const imageName = extraImages[index].split("%2F").pop().split("?")[0];

      // Create a reference to the file to delete
      const imageRef = ref(storage, `images/${imageName}`);

      // Delete the file
      await deleteObject(imageRef);

      // Update state to remove the deleted image
      const updatedImages = extraImages.filter((image, i) => i !== index);
      setExtraImages(updatedImages);
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error deleting image:",
        detail: error.message,
      });
    }
  };

  const handleExtraImageUpload = async (e) => {
    const files = e.target.files;
    const uploadPromises = Array.from(files).map(async (file) => {
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      } catch (error) {
        // Handle errors during upload
        return Promise.reject(error.message);
      }
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      setExtraImages([...extraImages, ...downloadURLs]); // Append the extra image URLs to the array
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error uploading extra image:",
        detail: error,
      });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
  };

  const [specialties, setSpecialties] = useState([""]);

  const addSpecialty = () => {
    setSpecialties([...specialties, ""]);
  };

  const removeSpecialty = (indexToRemove) => {
    const updatedSpecialties = specialties.filter(
      (_, index) => index !== indexToRemove
    );
    setSpecialties(updatedSpecialties);
  };

  let specialtyOptions;

  switch (proffesionalType) {
    case ProfessionalsDbEnum.model:
      specialtyOptions = modelSpecialties;
      break;
    case ProfessionalsDbEnum.photographer:
      specialtyOptions = photographySpecialties;
      break;
    case ProfessionalsDbEnum.tourGuide:
      specialtyOptions = tourGuideSpecialties;
      break;
    default:
      break;
  }

  return (
    <div>
      <Toast ref={toastRef} position="top-right" />
      <h2 className="dashboard-home-title">Update Profile Info</h2>
      <div className="p-fluid pr-5">
        {/* <div className="p-field">
          <label className="text-warning" htmlFor="title">
            Name
          </label>
          <span className="text-danger"> *</span>
          <InputText
            required
            id="title"
            value={userInfo.name}
            onChange={(e) => setuserInfo({ ...userInfo, name: e.target.value })}
          />
        </div> */}
        {/* <div className="p-field">
          <label className="text-warning" htmlFor="title">
            Email
          </label>
          <span className="text-danger"> *</span>
          <InputText
            required
            id="title"
            value={userInfo.email}
            onChange={(e) =>
              setuserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div> */}
        {/* <div className="p-field">
          <label className="text-warning" htmlFor="country">
            Country
          </label>
          <span className="text-danger"> *</span>
          <InputText id="country" readOnly value={userInfo.country} />
        </div> */}
        {/* <div className="p-field">
          <label className="text-warning" htmlFor="gender">
            Gender
          </label>
          <Dropdown
            id="gender"
            required
            value={userInfo.gender}
            options={genderList}
            onChange={(e) => setuserInfo({ ...userInfo, gender: e.value })}
          />
        </div> */}
        {/* <div className="p-field">
          <label className="text-warning" htmlFor="city">
            City
          </label>
          <span className="text-danger"> *</span>
          <InputText
            id="city"
            readOnly
            value={userInfo.city}
            onChange={(e) => setuserInfo({ ...userInfo, city: e.target.value })}
          />
        </div> */}

        <div className="p-field">
          <label className="text-warning" htmlFor="gender">
            Age
          </label>
          <Dropdown
            id="age"
            required
            value={userInfo.age}
            options={ageList}
            onChange={(e) => setuserInfo({ ...userInfo, age: e.value })}
          />
        </div>

        <div className="p-field">
          <label className="text-warning" htmlFor="price">
            Lower price limit ₵
          </label>
          <span className="text-danger"> *</span>
          <InputText
            required
            type="number"
            id="price"
            value={userInfo.price}
            placeholder="strictly equivalent Ghana Cedi (₵) value... eg. 10"
            onChange={(e) =>
              setuserInfo({ ...userInfo, lowerPrice: e.target.value })
            }
          />
        </div>

        <div className="p-field">
          <label className="text-warning" htmlFor="price">
            Upper price limit ₵
          </label>
          <span className="text-danger"> *</span>
          <InputText
            required
            type="number"
            id="price"
            value={userInfo.price}
            placeholder="strictly equivalent Ghana Cedi (₵) value... eg. 10"
            onChange={(e) =>
              setuserInfo({ ...userInfo, UpperPrice: e.target.value })
            }
          />
        </div>

        <div className="p-field">
          <label className="text-warning" htmlFor="item">
            Upload Licence of work
          </label>
          <span className="text-danger"> *</span>
          <InputText
            required
            id="item"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="p-field d-flex flex-column">
          <label className="text-warning" htmlFor="extras">
            Upload Portfolios (any images of you work you can share with us)
          </label>

          <div className="d-flex">
            <input
              required
              id="extras"
              type="file"
              accept="image/*"
              onChange={handleExtraImageUpload}
              multiple
            />
            {extraImages.length > 0 && (
              <div>
                <ul className="d-flex">
                  {extraImages.map((image, index) => (
                    <div key={index} className="position-relative">
                      <img
                        className="mx-2 rounded"
                        width={40}
                        height={40}
                        alt={image}
                        src={image}
                      />
                      <Badge
                        value="X"
                        severity="danger"
                        className="p-badge-sm p-overlay-badge position-absolute top-0 end-0"
                        style={{ scale: "0.8", cursor: "pointer" }}
                        onClick={() => handleDeleteImage(index)}
                      />
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="p-field d-flex flex-column">
          <label className="text-warning" htmlFor="extras">
            What is your specialty
          </label>
          {specialties.map((category, index) => (
            <div key={index} className="d-flex align-items-center">
              <Dropdown
                value={category}
                options={specialtyOptions}
                onChange={(e) => {
                  const updatedCategories = [...specialties];
                  updatedCategories[index] = e.value;
                  setSpecialties(updatedCategories);
                }}
                placeholder="Select supply Category"
                className="w-50 d-flex justify-content-center align-items-center mt-1"
                style={{ height: "3rem" }}
              />
              {index === specialties.length - 1 ? (
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="btn btn-primary mx-2"
                >
                  <span className="pi pi-plus"></span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => removeSpecialty(index)}
                  className="btn btn-danger mx-2"
                >
                  <span className="pi pi-minus"></span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* <div className="p-field">
          <label className="text-warning" htmlFor="weight">
            Weight (kg)
          </label>
          <span className="text-danger"> *</span>
          <InputText
            id="weight"
            value={userInfo.weight}
            type="number"
            required
            onChange={(e) =>
              setuserInfo({ ...userInfo, weight: e.target.value })
            }
          />
        </div> */}

        <div className="p-field">
          <Button
            label="Add Product"
            onClick={handleUpdateSubmit}
            className="p-button p-component"
            disabled={isUploading}
          >
            <span className="spinner-container">
              {isUploading && (
                <ProgressSpinner
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  strokeWidth="8"
                  fill="var(--surface-ground)"
                  className="position-absolute top-50 start-50 translate-middle"
                />
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfo;
