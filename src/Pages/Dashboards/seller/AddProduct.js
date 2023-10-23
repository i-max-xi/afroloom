import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ProductsDataService from "../../../Services/products.services";
import { categoryFilter } from "../../../Data/categoryList";
import { Toast } from "primereact/toast";

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

  const toastRef = useRef(null);

  const handleCategoryChange = (e) => {
    setNewProduct({ ...newProduct, category: e.value });
  };

  const handleAddProduct = async () => {
    if (
      newProduct.title === "" ||
      newProduct.category === "" ||
      newProduct.price === "" ||
      newProduct.item === "" ||
      newProduct.seller === "" ||
      newProduct.detailedCategory === "" ||
      newProduct.gender === "" ||
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
  

  return (
    <div>
      <Toast ref={toastRef} position="top-right" />

      <h2>Add a New Product</h2>
      <div className="p-grid p-fluid">
        <div className="p-col-12 p-md-6">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
        </div>
        <div className="p-col-12 p-md-6">
          <label htmlFor="category">Category</label>
          <Dropdown
            id="category"
            value={newProduct.category}
            options={categoryFilter}
            onChange={handleCategoryChange}
            placeholder="Select a Category"
          />
        </div>
        <div className="p-col-12 p-md-6">
          <label htmlFor="price">Price</label>
          <InputText
            id="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div className="p-col-12 p-md-6">
          <label htmlFor="item">Item Image URL</label>
          <InputText
            id="item"
            value={newProduct.item}
            onChange={(e) =>
              setNewProduct({ ...newProduct, item: e.target.value })
            }
          />
        </div>
        <div className="p-col-12 p-md-6">
          <label htmlFor="seller">Seller</label>
          <InputText
            id="seller"
            value={newProduct.seller}
            onChange={(e) =>
              setNewProduct({ ...newProduct, seller: e.target.value })
            }
          />
        </div>
        <div className="p-col-12 p-md-6">
          <label htmlFor="detailedCategory">Detailed Category</label>
          <InputText
            id="detailedCategory"
            value={newProduct.detailedCategory}
            onChange={(e) =>
              setNewProduct({ ...newProduct, detailedCategory: e.target.value })
            }
          />
        </div>
        <div className="p-col-12 p-md-6">
          <label htmlFor="gender">Gender</label>
          <InputText
            id="gender"
            value={newProduct.gender}
            onChange={(e) =>
              setNewProduct({ ...newProduct, gender: e.target.value })
            }
          />
        </div>
        <div className="p-col-12 p-md-6">
          <label htmlFor="size">Size</label>
          <InputText
            id="size"
            value={newProduct.size}
            onChange={(e) =>
              setNewProduct({ ...newProduct, size: e.target.value })
            }
          />
        </div>
        <div className="p-col-12 p-md-6">
          <label htmlFor="discount">Discount (Optional)</label>
          <InputText
            id="discount"
            value={newProduct.discount}
            onChange={(e) =>
              setNewProduct({ ...newProduct, discount: e.target.value })
            }
          />
        </div>
        <div className="p-col-12 p-md-6">
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
