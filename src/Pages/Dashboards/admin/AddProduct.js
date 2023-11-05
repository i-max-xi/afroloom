import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ProductsDataService from "../../../Services/products.services";
import { allCategory, categoryFilter } from "../../../Data/categoryList";
import { Toast } from "primereact/toast";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";


const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "", // Use a Dropdown to select from categoryFilter
    price: "",
    item: "", // URL of the item image
    seller: "",
    detailedCategory: "",
    gender: "",
    size: "",
    discount: "", // Optional field
  });

  // const toastRef = useRef(null);

  // const handleCategoryChange = (e) => {
  //   setNewProduct({ ...newProduct, category: e.value });
  // };

  const [detailedCategoryOptions, setDetailedCategoryOptions] = useState([]);

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
        summary: "Error uploading image:", error,
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
      return; // Don't proceed with adding the product if any required field is empty.
    }
  
    try {
      const response = await ProductsDataService.addProduct(newProduct);
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
  };

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
          id="title"
          placeholder="Name"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
      </div>
      <div className="p-field">
        <label htmlFor="category">Category</label>
        <Dropdown
          id="category"
          value={newProduct.category}
          options={categoryFilter}
          onChange={handleCategoryChange}
          placeholder="Select a Category"
        />
      </div>
      <div className="p-field">
        <label htmlFor="detailedCategory">Detailed Category</label>
        <Dropdown
            id="detailedCategory"
            value={newProduct.detailedCategory}
            options={detailedCategoryOptions}
            placeholder="Select a more specific category"
            onChange={(e) =>
              setNewProduct({ ...newProduct, detailedCategory: e.value })
            }
          />
      </div>
      <div className="p-field">
        <label htmlFor="price">Price $</label>
        <InputText
          id="price"
          value={newProduct.price}
          placeholder="Dollar equivalent value"
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
      </div>
      <div className="p-field">
        <label htmlFor="item">Product Image</label> <span>*Strictly with white background and preferably png</span>
        <InputText
          id="item"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
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
            value={newProduct.gender}
            options={genderOptions}
            placeholder="Is this product gender specific ?"
            onChange={(e) =>
              setNewProduct({ ...newProduct, gender: e.value })
            }
          />
      </div>
      <div className="p-field">
        <label htmlFor="size">Size</label>
        <InputText
          id="size"
          value={newProduct.size}
          placeholder="Size"
          onChange={(e) =>
            setNewProduct({ ...newProduct, size: e.target.value })
          }
        />
      </div>
      <div className="p-field">
        <label htmlFor="discount">Discount % </label> <span>(Optional)</span>
        <InputText
          id="discount"
          value={newProduct.discount}
          placeholder="Percentage discount eg. '10'"
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
