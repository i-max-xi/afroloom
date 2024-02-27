import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ProductsDataService from "../../Services/products.services";
import { allCategory, categoryFilter } from "../../Data/categoryList";
import { Toast } from "primereact/toast";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { Badge } from "primereact/badge";
import { Timestamp } from "firebase/firestore";
import { ProgressSpinner } from "primereact/progressspinner";
import { locationOptions } from "../../Data/SupplierAcceptedCities";
import { InputTextarea } from "primereact/inputtextarea";
import { descriptionLimit, titleLimit } from "../../utils/constants";

const AddProduct = ({ currentSeller, sellerCountry }) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    category: "", // Use a Dropdown to select from categoryFilter
    price: null,
    item: "", // URL of the item image
    weight: null,
    location: "",
    seller: currentSeller,
    country: sellerCountry,
    detailedCategory: "",
    gender: "",
    size: "",
    createdAt: Date.now(),
    discount: null, // Optional field
  });

  const [extraImages, setExtraImages] = useState([]); // State variable to store extra images
  const [isUploading, setIsUploading] = useState(false); // Initialize loading state

  const [detailedCategoryOptions, setDetailedCategoryOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);

  const toastRef = useRef(null);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.value;
    setNewProduct({ ...newProduct, category: selectedCategory });

    // Update the "Detailed Category" options based on the selected category
    const productFilter = allCategory
      .find((category) => category.name === selectedCategory)
      .filters.find((filter) => filter.name === "Product");
    const detailedCategoryOptions = productFilter.options;
    setDetailedCategoryOptions(detailedCategoryOptions);

    // Update the "Size" options based on the selected category
    const sizeFilter = allCategory
      .find((category) => category.name === selectedCategory)
      .filters.find((filter) => filter.name === "Size");

    sizeFilter !== undefined
      ? setSizeOptions(sizeFilter.options)
      : setSizeOptions([]);
  };

  const handleDetailedCategoryChange = (e) => {
    const selectedDetailedCategory = e.value;
    setNewProduct({
      ...newProduct,
      detailedCategory: selectedDetailedCategory,
    });

    // Update the "Detailed Category" options based on the selected category

    const sizeFilter = allCategory
      .find((category) => category.name === newProduct.category)
      .filters.find((filter) => filter.name === "Size");

    let allsizeOptions;
    let braSizes;
    let hatSizes;

    if (sizeFilter !== undefined) {
      allsizeOptions = sizeFilter.options;
      braSizes = sizeFilter.braOptions;
      hatSizes = sizeFilter.hatOptions;
      if (selectedDetailedCategory === "Hat") {
        setSizeOptions(hatSizes);
      } else if (selectedDetailedCategory === "Bra") {
        setSizeOptions(braSizes);
      } else {
        setSizeOptions(allsizeOptions);
      }
    } else {
      setSizeOptions([]);
    }
  };

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = ref(storage, `images/${file.name}`);
  //   try {
  //     await uploadBytes(storageRef, file);
  //     const downloadURL = await getDownloadURL(storageRef);
  //     setNewProduct({ ...newProduct, item: downloadURL });
  //   } catch (error) {
  //     toastRef.current.show({
  //       severity: "error",
  //       summary: "Error uploading image:",
  //       error,
  //     });
  //   }
  // };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // Check if file type is PNG
    if (!file.type.includes("png")) {
      toastRef.current.show({
        severity: "error",
        summary: "Error uploading image:",
        detail: "Please upload a PNG image.",
      });
      e.target.value = null;
      return;
    }

    // Create an image element to get the dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);

    // img.onload = () => {
    //   // Check if the image dimensions are 500x500
    //   if (img.width !== 500 || img.height !== 500) {
    //     toastRef.current.show({
    //       severity: "error",
    //       summary: "Error uploading image:",
    //       detail: "Please upload an image with dimensions 500x500.",
    //     });
    //     e.target.value = null;
    //     return;
    //   } else {
    //     const storageRef = ref(storage, `images/${file.name}`);
    //     uploadImage(storageRef, file);
    //   }
    // };
    img.onload = () => {
      const storageRef = ref(storage, `images/${file.name}`);
      uploadImage(storageRef, file);
    };
  };

  const uploadImage = async (storageRef, file) => {
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setNewProduct({ ...newProduct, item: downloadURL });
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

  // const handleExtraImageUpload = async (e) => {
  //   const files = e.target.files;
  //   const uploadPromises = Array.from(files).map(async (file) => {
  //     // Check if file type is PNG
  //     if (!file.type.includes("png")) {
  //       toastRef.current.show({
  //         severity: "error",
  //         summary: "Error uploading image:",
  //         detail: "Please upload a PNG image.",
  //       });
  //       e.target.value = null;
  //       return null;
  //     }

  //     // Create an image element to get the dimensions
  //     const img = new Image();
  //     img.src = URL.createObjectURL(file);

  //     return new Promise((resolve, reject) => {
  //       img.onload = () => {
  //         // Check if the image dimensions are 500x500
  //         if (img.width !== 500 || img.height !== 500) {
  //           toastRef.current.show({
  //             severity: "error",
  //             summary: "Error uploading image:",
  //             detail: "Please upload an image with dimensions 500x500.",
  //           });
  //           reject("Invalid image dimensions");
  //           e.target.value = null;
  //         } else {
  //           const storageRef = ref(storage, `images/${file.name}`);
  //           uploadImage(storageRef, file)
  //             .then((downloadURL) => resolve(downloadURL))
  //             .catch((error) => reject(error));
  //         }
  //       };
  //     });
  //   });

  //   try {
  //     const downloadURLs = await Promise.all(uploadPromises);
  //     const validDownloadURLs = downloadURLs.filter((url) => url !== null);
  //     setExtraImages([...extraImages, ...validDownloadURLs]);
  //   } catch (error) {
  //     toastRef.current.show({
  //       severity: "error",
  //       summary: "Error uploading extra image:",
  //       detail: error,
  //     });
  //   }
  // };

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

  const handleAddProduct = async () => {
    if (
      newProduct.title === "" ||
      newProduct.description === "" ||
      newProduct.category === "" ||
      newProduct.price === null ||
      newProduct.item === "" ||
      newProduct.detailedCategory === "" ||
      newProduct.weight === null ||
      newProduct.location === ""
    ) {
      toastRef.current.show({
        severity: "error",
        summary: "Please fill in all the required fields.",
      });
      return;
    }

    setIsUploading(true); // Set the uploading state to true when uploading starts

    const randomRating = Math.floor(Math.random() * 5) + 1;

    const productData = {
      ...newProduct,
      extras: extraImages, // Add the array of extra images to the product data
      createdAt: Timestamp.fromMillis(Date.now()), // Convert to Firebase Timestamp
      rating: randomRating,
    };

    try {
      const response = await ProductsDataService.addProduct(productData);
      // Reset the form
      setNewProduct({
        title: "",
        category: "",
        price: 0,
        description: "",
        weight: 0,
        location: "",
        item: "",
        seller: currentSeller,
        detailedCategory: "",
        gender: "",
        size: "",
        discount: 0,
      });

      setExtraImages([]); // Clear the extra images array

      toastRef.current.show({
        severity: "success",
        summary: `Product added successfully. Document ID: ${response.id}`,
      });
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error adding product. Please try again: ${error}`,
      });
    } finally {
      setIsUploading(false); // Reset loading state after upload attempt (success or failure)
    }
  };

  // dropdown infos
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  return (
    <div>
      <Toast ref={toastRef} position="top-right" />
      <h2 className="dashboard-home-title">Add a New Product</h2>
      <div className="p-fluid pr-5">
        <div className="p-field">
          <label className="text-warning" htmlFor="title">
            Name of Product
          </label>
          <span className="text-danger"> *</span>
          <InputText
            required
            id="title"
            value={newProduct.title}
            onChange={(e) => {
              if (e.target.value.length <= titleLimit) {
                setNewProduct({ ...newProduct, title: e.target.value });
              }
            }}
          />
          <span style={{ float: "right" }}>
            {newProduct.title.length}/{titleLimit}
          </span>
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="title">
            Description of Product
          </label>
          <span className="text-danger"> *</span>
          <InputTextarea
            required
            id="description"
            value={newProduct.description}
            onChange={(e) => {
              if (e.target.value.length <= descriptionLimit) {
                setNewProduct({ ...newProduct, description: e.target.value });
              }
            }}
            rows={5}
            cols={30}
          />
          <span style={{ float: "right" }}>
            {newProduct.description.length}/{descriptionLimit}
          </span>
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="category">
            Category
          </label>
          <span className="text-danger"> *</span>
          <Dropdown
            required
            id="category"
            value={newProduct.category}
            options={categoryFilter}
            onChange={handleCategoryChange}
            placeholder="select a Category..."
          />
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="detailedCategory">
            Detailed Category
          </label>
          <span className="text-danger"> *</span>
          <Dropdown
            required
            id="detailedCategory"
            value={newProduct.detailedCategory}
            options={detailedCategoryOptions}
            placeholder="select a more specific category..."
            onChange={handleDetailedCategoryChange}
            // onChange={(e) =>
            //   setNewProduct({ ...newProduct, detailedCategory: e.value })
            // }
          />
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="gender">
            Gender
          </label>{" "}
          <span>(Optional)</span>
          <Dropdown
            id="gender"
            required
            value={newProduct.gender}
            options={genderOptions}
            placeholder="is this product gender specific eg. male or female ?"
            onChange={(e) => setNewProduct({ ...newProduct, gender: e.value })}
          />
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="size">
            Size
          </label>{" "}
          <span>(Optional)</span>
          <Dropdown
            id="size"
            required
            value={newProduct.size}
            options={sizeOptions}
            placeholder="is this item size specific?"
            onChange={(e) => setNewProduct({ ...newProduct, size: e.value })}
          />
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="price">
            Price ₵
          </label>
          <span className="text-danger"> *</span>
          <InputText
            required
            type="number"
            id="price"
            value={newProduct.price}
            placeholder="equivalent Ghana Cedi (₵) value... eg. 10"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="discount">
            Discount %{" "}
          </label>{" "}
          <span>(Optional)</span>
          <InputText
            id="discount"
            type="number"
            value={newProduct.discount}
            placeholder="percentage discount eg. 10"
            onChange={(e) =>
              setNewProduct({ ...newProduct, discount: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="item">
            Main Product Image
          </label>
          <span className="text-danger"> *</span>
          <span>Strictly with white background and preferably png</span>
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
            Extra Images
          </label>

          <div className="d-flex">
            <input
              required
              id="extras"
              type="file"
              accept="image/*"
              onChange={handleExtraImageUpload}
              multiple // This attribute allows selecting multiple files
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

        <div className="p-field">
          <label className="text-warning" htmlFor="weight">
            Weight (kg)
          </label>
          <span className="text-danger"> *</span>
          <InputText
            id="weight"
            value={newProduct.weight}
            type="number"
            required
            onChange={(e) =>
              setNewProduct({ ...newProduct, weight: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="seller">
            Item Location (City)
          </label>
          <span className="text-danger"> *</span>
          <Dropdown
            id="location"
            value={newProduct.location}
            options={locationOptions}
            onChange={(e) =>
              setNewProduct({ ...newProduct, location: e.value })
            }
            placeholder="Select specific city you have this item or closest city"
          />
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="seller">
            Seller
          </label>
          <span className="text-danger"> *</span>
          <InputText id="seller" readOnly value={newProduct.seller} />
        </div>
        <div className="p-field">
          <label className="text-warning" htmlFor="seller">
            Seller Country
          </label>
          <span className="text-danger"> *</span>
          <InputText id="country" readOnly value={newProduct.country} />
        </div>
        <div className="p-field">
          <Button
            label="Add Product"
            onClick={handleAddProduct}
            className="p-button p-component"
            disabled={isUploading} // Disable button while uploading
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

export default AddProduct;
