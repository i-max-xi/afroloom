import React, { useRef, useState } from "react";
// import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ProductsDataService from "../../Services/products.services";
import { Toast } from "primereact/toast";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";

const AddDeliveryService = ({ currentSeller }) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    pricePerKg: null,
    image: "", // URL of the item image
    expressExtra: null,
    parcelOffices: [],
    duration: "",
  });


  const toastRef = useRef(null);


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setNewProduct({ ...newProduct, image: downloadURL });
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error uploading image:",
        error,
      });
    }
  };


  const handleAddProduct = async () => {
    if (
      newProduct.title === "" ||
      newProduct.pricePerKg === null ||
      newProduct.expressExtra === "" ||
      newProduct.image === "" ||
      newProduct.parcelOffices.length === 0 ||
      newProduct.duration === ""
    ) {
      toastRef.current.show({
        severity: "error",
        summary: "Please fill in all the required fields.",
      });
      return;
    }

    const productData = {
      ...newProduct,
    };

    try {
      const response = await ProductsDataService.addProduct(productData);
      // Reset the form
      setNewProduct({
        title: "",
        pricePerKg: null,
        image: "",
        expressExtra: null,
        parcelOffices: [],
        duration: "",
      });

      toastRef.current.show({
        severity: "success",
        summary: `Delivery Service added successfully. Document ID: ${response.id}`,
      });
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error adding delivery service. Please try again: ${error}`,
      });
    }
  };


  return (
    <div>
      <Toast ref={toastRef} position="top-right" />
      <h2>Add a Delivery Service</h2>
      <div className="p-fluid pr-5">
        <div className="p-field">
          <label htmlFor="title">Name of Delivery Service</label>
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
          <label htmlFor="item">Logo of delivery service</label>
          {/* <span>*Strictly with white background and preferably png</span> */}
          <InputText
            required
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {/* <div className="p-field">
          <label htmlFor="category">Category</label>
          <Dropdown
            required
            id="category"
            value={newProduct.category}
            options={categoryFilter}
            onChange={handleCategoryChange}
            placeholder="select a Category..."
          />
        </div> */}
        <div className="p-field">
          <label htmlFor="price">Price Per kg ($)</label>
          <InputText
            required
            id="price"
            value={newProduct.pricePerKg}
            placeholder="dollar equivalent value of price per..."
            onChange={(e) =>
              setNewProduct({ ...newProduct, pricePerKg: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="price">Extra Charge For Express ($)</label>
          <InputText
            id="express"
            value={newProduct.expressExtra}
            placeholder="does this delivery service have express service?..."
            onChange={(e) =>
              setNewProduct({ ...newProduct, expressExtra: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="seller">Parcel Offices</label>
          <InputText
            id="seller"
            readOnly
            value={newProduct.seller}
            onChange={(e) =>
              setNewProduct({ ...newProduct, seller: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="weight">Standard Delivery Duration</label>
          <InputText
            id="weight"
            value={newProduct.weight}
            onChange={(e) =>
              setNewProduct({ ...newProduct, weight: e.target.value })
            }
          />
        </div>
 
        <div className="p-field">
          <Button
            label="Add Delivery Service"
            onClick={handleAddProduct}
            className="p-button p-component"
          />
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryService;
