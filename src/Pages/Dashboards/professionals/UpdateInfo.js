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
  canAccomodate,
  imageUploadType,
  modelSpecialties,
  photographySpecialties,
  tourGuideSpecialties,
} from "../../../Data/professionalsList";
import productsServices from "../../../Services/products.services";
import { setcurrentUser } from "../../../Redux/store";
import { useDispatch } from "react-redux";

import { InputTextarea } from "primereact/inputtextarea";

const UpdateInfo = ({ currentUser, proffesionalType }) => {
  const [userInfo, setuserInfo] = useState(currentUser);

  const [extraImages, setExtraImages] = useState([]);
  const [residenceImages, setResidenceImages] = useState([]);

  const [isUploading, setIsUploading] = useState(false); // Initialize loading state

  const toastRef = useRef(null);

  const dispatch = useDispatch();

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

  const handleDeleteImage = async (index, type) => {
    try {
      let imageName;

      if (type === imageUploadType.portfolio) {
        imageName = extraImages[index].split("%2F").pop().split("?")[0];
      }

      if (type === imageUploadType.residence) {
        imageName = residenceImages[index].split("%2F").pop().split("?")[0];
      }

      // Create a reference to the file to delete
      const imageRef = ref(storage, `images/${imageName}`);

      // Delete the file
      await deleteObject(imageRef);

      // Update state to remove the deleted image
      if (type === imageUploadType.portfolio) {
        const updatedImages = extraImages.filter((image, i) => i !== index);
        setExtraImages(updatedImages);
      }
      if (type === imageUploadType.residence) {
        const updatedImages = residenceImages.filter((image, i) => i !== index);
        setExtraImages(updatedImages);
      }
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error deleting image:",
        detail: error.message,
      });
    }
  };

  const handleExtraImageUpload = async (e, type) => {
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

      if (type === imageUploadType.portfolio) {
        setExtraImages([...extraImages, ...downloadURLs]);
      }
      if (type === imageUploadType.residence) {
        setResidenceImages([...residenceImages, ...downloadURLs]);
      }
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
    if (proffesionalType === ProfessionalsDbEnum.tourGuide) {
      if (
        !userInfo.license ||
        userInfo.canAccommodate ||
        userInfo.canAccommodateNumber ||
        residenceImages.length < 1
      ) {
        toastRef.current.show({
          severity: "error",
          summary: "Please fill in the required license field for tour guides.",
        });
        return;
      }
    }

    if (
      !userInfo.lowerPrice ||
      !userInfo.UpperPrice ||
      priceBreakdown.length < 1 ||
      languages.length < 1 ||
      // specialties.length < 1 ||
      // destinations.length < 1 ||
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
      residenceImages: residenceImages,
      createdAt: Timestamp.fromMillis(Date.now()),
      specialties: specialties || [],
      offers: priceBreakdown,
      languages: languages,
      destinations: destinations,
      completed: true,
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
        detail: "You approval status would be updated within 48 hours",
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

  const [destinations, setDestinations] = useState([""]);

  const addDestination = () => {
    setDestinations([...destinations, ""]);
  };

  const updateDestination = (index, value) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
  };

  const removeDestination = (indexToRemove) => {
    setDestinations((prevDestinations) =>
      prevDestinations.filter((_, index) => index !== indexToRemove)
    );
  };

  const [languages, setLanguages] = useState([""]);

  const addLanguages = () => {
    setLanguages([...languages, ""]);
  };

  const updateLanguages = (index, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = value;
    setDestinations(updatedLanguages);
  };

  const removeLanguages = (indexToRemove) => {
    setLanguages((prevLanguages) =>
      prevLanguages.filter((_, index) => index !== indexToRemove)
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
      <h2 className="dashboard-home-title">Complete Profile Info</h2>
      <div className="p-fluid">
        {proffesionalType === ProfessionalsDbEnum.model && (
          <div className="p-field">
            <label className="text-warning" htmlFor="age">
              Age <span className="text-danger"> *</span>
            </label>
            <Dropdown
              id="age"
              required
              value={userInfo.age}
              options={ageList}
              onChange={(e) => setuserInfo({ ...userInfo, age: e.value })}
            />
          </div>
        )}
        <div className="p-field d-flex flex-column">
          <label className="text-warning" htmlFor="extras">
            Languages spoken
            <span className="text-danger"> *</span>
          </label>
          {languages.map((item, index) => (
            <div key={index} className="d-flex align-items-center ">
              <div className="form-group w-50">
                <InputText
                  required
                  type="text"
                  value={item.offer}
                  placeholder="eg. English"
                  onChange={(e) => updateLanguages(index, e.target.value)}
                />
              </div>
              {index === destinations.length - 1 ? (
                <button
                  type="button"
                  onClick={addLanguages}
                  className="btn btn-primary mx-2"
                >
                  <span className="pi pi-plus"></span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => removeLanguages(index)}
                  className="btn btn-danger mx-2"
                >
                  <span className="pi pi-minus"></span>
                </button>
              )}
            </div>
          ))}
        </div>

        {proffesionalType !== ProfessionalsDbEnum.model && (
          <>
            <h6 className="mt-3">
              We list your prices in ranges (eg. ₵ 50 - 250 ){" "}
              <span className="text-danger"> *</span>
            </h6>

            <div className="p-field">
              <label className="text-warning" htmlFor="lowerprice">
                Lowest price ₵
              </label>
              <InputText
                required
                type="number"
                id="price"
                value={userInfo.lowerPrice}
                placeholder="strictly equivalent Ghana Cedi (₵) value... eg. 10"
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    lowerPrice: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="p-field">
              <label className="text-warning" htmlFor="upperprice">
                Highest price ₵
              </label>
              <InputText
                required
                type="number"
                id="price"
                value={userInfo.UpperPrice}
                placeholder="strictly equivalent Ghana Cedi (₵) value... eg. 10"
                onChange={(e) =>
                  setuserInfo({
                    ...userInfo,
                    UpperPrice: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            {proffesionalType === ProfessionalsDbEnum.tourGuide && (
              <>
                <div className="p-field d-flex flex-column">
                  <label className="text-warning" htmlFor="extras">
                    Indicate destinations
                    <span className="text-danger"> *</span>
                  </label>
                  {destinations.map((item, index) => (
                    <div key={index} className="d-flex align-items-center ">
                      <div className="form-group w-50">
                        <InputText
                          required
                          type="text"
                          value={item.offer}
                          placeholder="eg. Cape Coast Castle"
                          onChange={(e) =>
                            updateDestination(index, e.target.value)
                          }
                        />
                      </div>
                      {index === destinations.length - 1 ? (
                        <button
                          type="button"
                          onClick={addDestination}
                          className="btn btn-primary mx-2"
                        >
                          <span className="pi pi-plus"></span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeDestination(index)}
                          className="btn btn-danger mx-2"
                        >
                          <span className="pi pi-minus"></span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {proffesionalType === ProfessionalsDbEnum.tourGuide ? (
              <h6 className="mt-3">
                We also encourage you to break down prices into offers /
                packages
                <span className="text-danger"> *</span>
              </h6>
            ) : (
              <h6 className="mt-3">
                We also encourage you to break down prices into offers /
                packages. eg. (5 photos for ₵ 100)
                <span className="text-danger"> *</span>
              </h6>
            )}

            {priceBreakdown.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center p-field"
                style={{ gap: "1rem" }}
              >
                <div className="form-group">
                  <label className="text-warning">Offer / Package</label>
                  <InputText
                    required
                    type="text"
                    value={item.offer}
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
                      updatePriceBreakdown(
                        index,
                        "priceValue",
                        parseFloat(e.target.value)
                      )
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
          </>
        )}

        {proffesionalType === ProfessionalsDbEnum.tourGuide && (
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
        )}

        <div className="p-field d-flex flex-column">
          <label className="text-warning" htmlFor="extras">
            Upload Portfolios (any images of your work you can share with us)
            <span className="text-danger"> *</span>
          </label>

          <div className="d-flex">
            <input
              required
              id="extras"
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleExtraImageUpload(e, imageUploadType.portfolio)
              }
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
                        onClick={() =>
                          handleDeleteImage(index, imageUploadType.portfolio)
                        }
                      />
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {proffesionalType !== ProfessionalsDbEnum.tourGuide && (
          <div className="p-field d-flex flex-column">
            <label className="text-warning" htmlFor="extras">
              What are your specialties
            </label>
            <span className="text-danger"> *</span>

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
        )}

        {proffesionalType === ProfessionalsDbEnum.tourGuide && (
          <>
            <div className="p-field">
              <label className="text-warning" htmlFor="age">
                Can You Accommodate your clients
              </label>
              <span className="text-danger"> *</span>

              <Dropdown
                id="canAccommodate"
                required
                value={userInfo.canAccommodate}
                options={canAccomodate}
                onChange={(e) =>
                  setuserInfo({ ...userInfo, canAccommodate: e.value })
                }
              />
            </div>

            {userInfo.canAccommodate === "Yes" && (
              <>
                <div className="p-field">
                  <label className="text-warning" htmlFor="upperprice">
                    Input number you can accommodate
                  </label>
                  <InputText
                    required
                    type="number"
                    id="accommodate number"
                    value={userInfo.canAccommodateNumber}
                    placeholder="eg. 1"
                    onChange={(e) =>
                      setuserInfo({
                        ...userInfo,
                        canAccommodateNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="p-field d-flex flex-column">
                  <label className="text-warning" htmlFor="extras">
                    Upload images of place of accommodation
                    <span className="text-danger"> *</span>
                  </label>

                  <div className="d-flex">
                    <input
                      required
                      id="extras"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleExtraImageUpload(e, imageUploadType.residence)
                      }
                      multiple
                    />
                    {residenceImages.length > 0 && (
                      <div>
                        <ul className="d-flex">
                          {residenceImages.map((image, index) => (
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
                                onClick={() =>
                                  handleDeleteImage(
                                    index,
                                    imageUploadType.residence
                                  )
                                }
                              />
                            </div>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <div className="p-field">
          <label className="text-warning">Description:</label>
          <InputTextarea
            value={userInfo.description}
            placeholder="eg. I have two years experience in..."
            onChange={(e) =>
              setuserInfo({
                ...userInfo,
                description: e.target.value,
              })
            }
            rows={5}
            cols={30}
          />
        </div>

        {proffesionalType === ProfessionalsDbEnum.model && (
          <>
            <h6 className="mt-3">Other required details: </h6>{" "}
            <span className="text-danger"> *</span>
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
                          type="text"
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
                          type="text"
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
            label="Update Information"
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
