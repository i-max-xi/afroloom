import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ProductsDataService from "../../Services/products.services";
import { Toast } from "primereact/toast";
import { deliveryDurations } from "../../Data/DeliveryServiceData";
// import { storage } from "../../firebase";
// import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";

const AddDeliveryService = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    pricePerKg: null,
    // image: "",
    expressExtra: null,
    parcelOffices: [""],
    duration: "",
  });

  const toastRef = useRef(null);

  const addParcelOffice = () => {
    const updatedParcelOffices = [...newProduct.parcelOffices, ""];
    setNewProduct({ ...newProduct, parcelOffices: updatedParcelOffices });
  };

  const removeParcelOffice = (index) => {
    const updatedParcelOffices = [...newProduct.parcelOffices];
    updatedParcelOffices.splice(index, 1);
    setNewProduct({ ...newProduct, parcelOffices: updatedParcelOffices });
  };

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = ref(storage, `images/${file.name}`);
  //   try {
  //     await uploadBytes(storageRef, file);
  //     const downloadURL = await getDownloadURL(storageRef);
  //     setNewProduct({ ...newProduct, image: downloadURL });
  //   } catch (error) {
  //     toastRef.current.show({
  //       severity: "error",
  //       summary: "Error uploading image:",
  //       error,
  //     });
  //   }
  // };

  const handleAddProduct = async () => {
    if (
      newProduct.name === "" ||
      newProduct.pricePerKg === null ||
      newProduct.expressExtra === "" ||
      // newProduct.image === "" ||
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
      const response = await ProductsDataService.addDelivery(productData);
      // Reset the form
      setNewProduct({
        name: "",
        pricePerKg: null,
        // image: "",
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
          <label htmlFor="name">Name of Delivery Service</label>
          <InputText
            required
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        {/* <div className="p-field">
          <label htmlFor="item">Logo of delivery service</label>
          <InputText
            required
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div> */}
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
          {newProduct.parcelOffices.map((office, index) => (
            <div key={index} className="d-flex align-items-center">
              <InputText
                value={office}
                onChange={(e) => {
                  const updatedParcelOffices = [...newProduct.parcelOffices];
                  updatedParcelOffices[index] = e.target.value;
                  setNewProduct({
                    ...newProduct,
                    parcelOffices: updatedParcelOffices,
                  });
                }}
                placeholder="Enter Parcel Office"
                className="w-50 d-flex justify-content-center align-items-center mt-1"
                style={{ height: "3rem" }}
              />
              {index === newProduct.parcelOffices.length - 1 ? (
                <button
                  type="button"
                  onClick={addParcelOffice}
                  className="btn btn-primary mx-2"
                >
                  <span className="pi pi-plus"></span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => removeParcelOffice(index)}
                  className="btn btn-danger mx-2"
                >
                  <span className="pi pi-minus"></span>
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="p-field">
          <label htmlFor="duration">Standard Delivery Duration</label>
          <Dropdown
          id="duration"
          value={newProduct.duration}
          options={deliveryDurations}
          onChange={(e) =>
            setNewProduct({ ...newProduct, duration: e.value })
          }
          placeholder="Select Duration"
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
