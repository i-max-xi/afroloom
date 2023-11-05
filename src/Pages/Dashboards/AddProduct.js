import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ProductsDataService from "../../Services/products.services";
import { allCategory, categoryFilter } from "../../Data/categoryList";
import { Toast } from "primereact/toast";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "", // Use a Dropdown to select from categoryFilter
    price: "",
    item: "", // URL of the item image
    // seller: "",
    detailedCategory: "",
    gender: "",
    size: "",
    discount: "", // Optional field
  });

  const [extraImages, setExtraImages] = useState([]); // State variable to store extra images


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
    const sizeOptions = sizeFilter.options;
    setSizeOptions(sizeOptions);
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

    const allsizeOptions = sizeFilter.options;
    const braSizes = sizeFilter.braOptions;
    const hatSizes = sizeFilter.hatOptions;

    // Handle special sizes for Hat and Bra
    if (selectedDetailedCategory === "Hat") {
      setSizeOptions(hatSizes);
    } else if (selectedDetailedCategory === "Bra") {
      setSizeOptions(braSizes);
    } else {
      setSizeOptions(allsizeOptions);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setNewProduct({ ...newProduct, item: downloadURL });
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error uploading image:",
        error,
      });
    }
  };

  const handleExtraImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setExtraImages([...extraImages, downloadURL]); // Append the extra image to the array
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error uploading extra image:",
        detail: error.message,
      });
    }
  };

  const handleAddProduct = async () => {
    if (
      newProduct.title === "" ||
      newProduct.category === "" ||
      newProduct.price === "" ||
      newProduct.item === "" ||
      newProduct.detailedCategory === "" ||
      newProduct.size === ""
    ) {
      toastRef.current.show({
        severity: "error",
        summary: "Please fill in all the required fields.",
      });
      return;
    }

    const productData = {
      ...newProduct,
      extraImages: extraImages, // Add the array of extra images to the product data
    };

    try {
      const response = await ProductsDataService.addProduct(productData);
      // Reset the form
      setNewProduct({
        title: "",
        category: "",
        price: "",
        item: "",
        seller: "",
        detailedCategory: "",
        gender: "",
        size: "",
        discount: "",
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
    }
  }

  // dropdown infos
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  return (
    <div>
      <Toast ref={toastRef} position="top-right" />
      <h2>Add a New Product</h2>
      <div className="p-fluid pr-5">
        <div className="p-field">
          <label htmlFor="title">Name of Product</label>
          <InputText
            required
            id="title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="category">Category</label>
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
          <label htmlFor="detailedCategory">Detailed Category</label>
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
          <label htmlFor="price">Price $</label>
          <InputText
            required
            id="price"
            value={newProduct.price}
            placeholder="dollar equivalent value..."
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="item">Main Product Image</label>
          <span>*Strictly with white background and preferably png</span>
          <InputText
            required
            id="item"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="p-field">
          <label htmlFor="item">Extra Images</label>
          <InputText
            required
            id="extras"
            type="file"
            accept="image/*"
            onChange={handleExtraImageUpload}
          />
        </div>
        <div className="p-field">
          <label htmlFor="seller">Seller</label>
          <InputText
            id="seller"
            value={newProduct.seller}
            onChange={(e) =>
              setNewProduct({ ...newProduct, seller: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="gender">Gender</label> <span>(Optional)</span>
          <Dropdown
            id="gender"
            required
            value={newProduct.gender}
            options={genderOptions}
            placeholder="is this product gender specific ?"
            onChange={(e) => setNewProduct({ ...newProduct, gender: e.value })}
          />
        </div>
        <div className="p-field">
          <label htmlFor="size">Size</label>
          <Dropdown
            id="size"
            required
            value={newProduct.size}
            options={sizeOptions}
            placeholder="select a size"
            onChange={(e) => setNewProduct({ ...newProduct, size: e.value })}
          />
        </div>
        <div className="p-field">
          <label htmlFor="discount">Discount % </label> <span>(Optional)</span>
          <InputText
            id="discount"
            value={newProduct.discount}
            placeholder="percentage discount eg. '10'"
            onChange={(e) =>
              setNewProduct({ ...newProduct, discount: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <Button
            label="Add Product"
            onClick={handleAddProduct}
            className="p-button p-component"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
