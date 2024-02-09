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
import { ageList, genderListEnum } from "../../../Data/genderAgeList";
import {
  ProfessionalsDbEnum,
  modelSpecialties,
  photographySpecialties,
  tourGuideSpecialties,
} from "../../../Data/professionalsList";
import productsServices from "../../../Services/products.services";
import { setcurrentUser } from "../../../Redux/store";
import { useDispatch } from "react-redux";

const UpdateInfo = ({ currentUser, proffesionalType }) => {
  const [userInfo, setuserInfo] = useState(currentUser);

  const [extraImages, setExtraImages] = useState([]); // State variable to store extra images
  const [isUploading, setIsUploading] = useState(false); // Initialize loading state

  const toastRef = useRef(null);

  const dispatch = useDispatch()

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // Create an image element to get the dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Check if the image dimensions are 500x500

      const storageRef = ref(storage, `images/${file.name}`);
      uploadImage(storageRef, file);
    };
  };

  const uploadImage = async (storageRef, file) => {
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setuserInfo({ ...userInfo, license: downloadURL });
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
    if (
      !userInfo.age ||
      !userInfo.lowerPrice ||
      !userInfo.UpperPrice ||
      !userInfo.profile ||
      priceBreakdown.length < 1 ||
      specialties.length < 1 ||
      extraImages.length < 1
    ) {
      toastRef.current.show({
        severity: "error",
        summary: "Please fill in all the required fields.",
      });
      return;
    }

    setIsUploading(true);

    const newData = {
      ...userInfo,
      portfolio: extraImages,
      createdAt: Timestamp.fromMillis(Date.now()),
      specialties: specialties,
      offers: priceBreakdown,
      approved: true,
    };

    let Path;


    switch (proffesionalType) {
      case ProfessionalsDbEnum.model:
        Path = await productsServices.updateModel(userInfo.id, newData);
        break;
      case ProfessionalsDbEnum.photographer:
        Path = await productsServices.updatePhotographer(userInfo.id, newData);
        break;

      case ProfessionalsDbEnum.tourGuide:
        Path = await productsServices.updateTourGuide(userInfo.id, newData);
        break;

      default:
        break;
    }

    try {
      await Path;
      // Reset the form

      dispatch(setcurrentUser(newData));

      toastRef.current.show({
        severity: "success",
        summary: `Information successfully updated added`,
      });
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error updating information. Please try again: ${error}`,
      });
    } finally {
      setIsUploading(false);
    }
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

  const [priceBreakdown, setPriceBreakdown] = useState([
    { offer: "", priceValue: 0 },
  ]);

  const addPriceBreakdown = () => {
    setPriceBreakdown([...priceBreakdown, { offer: "", priceValue: 0 }]);
  };

  const updatePriceBreakdown = (index, field, value) => {
    const updatedPriceBreakdown = [...priceBreakdown];
    updatedPriceBreakdown[index][field] = value;
    setPriceBreakdown(updatedPriceBreakdown);
  };

  const removePriceBreakdown = (indexToRemove) => {
    setPriceBreakdown((prevPriceBreakdown) =>
      prevPriceBreakdown.filter((_, index) => index !== indexToRemove)
    );
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
      <div className="p-fluid">
        <div className="p-field">
          <label className="text-warning" htmlFor="age">
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

        <h6 className="mt-3">
          We list your prices in ranges (eg. ₵ 50 - 250 ){" "}
        </h6>

        <div className="p-field">
          <label className="text-warning" htmlFor="lowerprice">
            Lower price limit ₵
          </label>
          <span className="text-danger"> *</span>
          <InputText
            required
            type="number"
            id="price"
            value={userInfo.lowerPrice}
            placeholder="strictly equivalent Ghana Cedi (₵) value... eg. 10"
            onChange={(e) =>
              setuserInfo({ ...userInfo, lowerPrice: e.target.value })
            }
          />
        </div>

        <div className="p-field">
          <label className="text-warning" htmlFor="upperprice">
            Upper price limit ₵
          </label>
          <span className="text-danger"> *</span>
          <InputText
            required
            type="number"
            id="price"
            value={userInfo.UpperPrice}
            placeholder="strictly equivalent Ghana Cedi (₵) value... eg. 10"
            onChange={(e) =>
              setuserInfo({ ...userInfo, UpperPrice: e.target.value })
            }
          />
        </div>

        <h6 className="mt-3">
          We also encourage you to break down prices into offers. eg. (5 photos
          for ₵ 100){" "}
        </h6>
        {priceBreakdown.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center p-field"
            style={{ gap: "1rem" }}
          >
            <div className="form-group">
              <label className="text-warning">Offer:</label>
              <InputText
                required
                type="text"
                value={item.offer}
                placeholder="Specify your offer in few words"
                onChange={(e) =>
                  updatePriceBreakdown(index, "offer", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label className="text-warning">Price Value (₵):</label>
              <InputText
                required
                type="number"
                value={item.priceValue}
                placeholder="Strictly equivalent Ghana Cedi (₵) value... eg. 10"
                onChange={(e) =>
                  updatePriceBreakdown(index, "priceValue", e.target.value)
                }
              />
            </div>
            {index === priceBreakdown.length - 1 ? (
              <button
                type="button"
                onClick={addPriceBreakdown}
                className="btn btn-primary mx-2"
              >
                <span className="pi pi-plus"></span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => removePriceBreakdown(index)}
                className="btn btn-danger mx-2"
              >
                <span className="pi pi-minus"></span>
              </button>
            )}
          </div>
        ))}

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
            Upload Portfolios (any images of your work you can share with us)
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
          <h6 className="mt-3">
            List <b> at most 3</b> of your specialties
          </h6>
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

        {proffesionalType === ProfessionalsDbEnum.model && (
          <>
            <h6 className="mt-3">Other required details: </h6>
            {currentUser.gender === genderListEnum.female ? (
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div
                      className="d-flex align-items-center p-field"
                      style={{ gap: "1rem" }}
                    >
                      <div className="form-group">
                        <label className="text-warning">Height:</label>
                        <InputText
                          required
                          type="text"
                          value={userInfo.height}
                          placeholder="eg. 5.4ft"
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              height: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-warning">Waist:</label>
                        <InputText
                          required
                          type="number"
                          value={userInfo.waist}
                          placeholder="eg. 26in"
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              waist: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="d-flex align-items-center p-field"
                      style={{ gap: "1rem" }}
                    >
                      <div className="form-group">
                        <label className="text-warning">Hips:</label>
                        <InputText
                          required
                          type="text"
                          value={userInfo.hips}
                          placeholder="eg. 36in"
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              hips: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-warning">Bust</label>
                        <InputText
                          required
                          type="text"
                          value={userInfo.bust}
                          placeholder="eg. 32/C"
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              bust: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="d-flex align-items-center p-field"
                      style={{ gap: "1rem" }}
                    >
                      <div className="form-group">
                        <label className="text-warning">Dress Size:</label>
                        <InputText
                          required
                          type="text"
                          value={userInfo.dressSize}
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              dressSize: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-warning">Shoe size:</label>
                        <InputText
                          required
                          type="text"
                          value={userInfo.shoeSize}
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              shoeSize: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div
                      className="d-flex align-items-center p-field"
                      style={{ gap: "1rem" }}
                    >
                      <div className="form-group">
                        <label className="text-warning">Height:</label>
                        <InputText
                          required
                          type="text"
                          value={userInfo.height}
                          placeholder="eg. 5.4ft"
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              height: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-warning">Waist:</label>
                        <InputText
                          required
                          type="number"
                          value={userInfo.waist}
                          placeholder="eg. 26in"
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              waist: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="d-flex align-items-center p-field"
                      style={{ gap: "1rem" }}
                    >
                      <div className="form-group">
                        <label className="text-warning">Shirt Size:</label>
                        <InputText
                          required
                          type="text"
                          value={userInfo.shirtSize}
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              shirtSize: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-warning">Shoe Size</label>
                        <InputText
                          required
                          type="text"
                          value={userInfo.shoeSize}
                          onChange={(e) =>
                            setuserInfo({
                              ...userInfo,
                              shoeSize: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

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
