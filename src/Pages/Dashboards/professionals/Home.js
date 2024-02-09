// Home.js
import React, { useEffect, useRef, useState } from "react";
import ProductsDataService from "../../../Services/products.services";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
// import { useSelector } from "react-redux";
import { locationOptions } from "../../../Data/SupplierAcceptedCities";
import { Dropdown } from "primereact/dropdown";
import { ProfessionalsDbEnum } from "../../../Data/professionalsList";
import { Image } from "primereact/image";

const Home = ({ currentProfessional, proffesionalType }) => {
  const toastRef = useRef(null);

  const [user, setUser] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  // const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  // const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const loadInfo = async () => {
    let response;

    switch (proffesionalType) {
      case ProfessionalsDbEnum.model:
        response = await ProductsDataService.getModelByField(
          "name",
          currentProfessional
        );
        break;
      case ProfessionalsDbEnum.photographer:
        response = await ProductsDataService.getPhotographerByField(
          "name",
          currentProfessional
        );
        break;

      case ProfessionalsDbEnum.tourGuide:
        response = await ProductsDataService.getTourGuideByField(
          "name",
          currentProfessional
        );
        break;

      default:
        break;
    }

    try {
      const productData = response ? [response.data()] : [];
      setUser(productData);
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error loading products.`,
        detail: error,
      });
    }
  };

  // console.log(user)

  useEffect(() => {
    loadInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleEditClick = (product) => {
  //   setSelectedProduct(product);
  //   setEditDialogVisible(true);
  // };

  const handleEditDialogHide = () => {
    setEditDialogVisible(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedProduct) {
        await ProductsDataService.updateProduct(selectedProduct.id, {
          title: selectedProduct.title,
          price: selectedProduct.price,
          // Update other fields as needed
        });
        toastRef.current.show({
          severity: "success",
          summary: `Product updated successfully.`,
        });
        loadInfo();
        setEditDialogVisible(false);
      }
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error editing product: ${error}`,
      });
    }
  };

  // const deleteProduct = async (id) => {
  //   try {
  //     await ProductsDataService.deleteProduct(id);
  //     toastRef.current.show({
  //       severity: "success",
  //       summary: `Successfully deleted product`,
  //     });
  //     loadInfo();
  //   } catch (error) {
  //     toastRef.current.show({
  //       severity: "error",
  //       summary: `Error deleting product: ${error}`,
  //     });
  //   }
  // };

  return (
    <div>
      <Toast ref={toastRef} position="top-right" />
      {/* <h2 className="dashboard-home-title">Your Information</h2> */}
      <div className="user-details">
        <div className="">
          <img
            src={user[0]?.profile}
            alt="Profile"
            className="user-profile-img"
          />
        </div>
        <div className="">
          {user.length > 0 ? (
            user.map((userData) => (
              <div key={userData.name} className="user-details-container">
                <h2>{userData.name}</h2>
                <p>Email: {userData.email}</p>
                <p>Gender: {userData.gender}</p>
                <p>Number: {userData.number}</p>
                <p>Country: {userData.country}</p>
                <p>City: {userData.city || "Not Provided"}</p>
              </div>
            ))
          ) : (
            <p>No user information available.</p>
          )}
        </div>
      </div>
      <div className="container portfolio-container">
        <h1>Portfolio</h1>
        <div className=" row">
          {user[0]?.portfolio?.length !== 0 ? (
            user[0]?.portfolio?.map((sample, index) => (
              <div key={index} className="col-6 col-sm-4 mt-1">
                <Image
                  src={sample}
                  alt={"portfolio" + index}
                  // width="100%"
                  // height="100%"
                  className="portfolio-image"
                  preview
                />
              </div>
            ))
          ) : (
            <p className="m-5">No portfolio available to show</p>
          )}
        </div>
      </div>
      <Dialog
        header="Edit Profile Info"
        visible={editDialogVisible}
        onHide={handleEditDialogHide}
        className="col-12 col-sm-6"
      >
        {selectedProduct && (
          <form onSubmit={handleEditSubmit}>
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={selectedProduct.title}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      title: e.target.value,
                    })
                  }
                  className="p-inputtext"
                />
              </div>
              <div className="p-field">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  value={selectedProduct.price}
                  placeholder="Ghana Cedi (₵) equivalent value... 10"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: parseFloat(e.target.value), // Convert input to a floating-point number
                    })
                  }
                  className="p-inputtext"
                />
              </div>
              <div className="p-field">
                <label htmlFor="price">Discount %</label>
                <input
                  id="discount"
                  type="number"
                  placeholder="eg. 10"
                  value={selectedProduct.discount}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      discount: parseFloat(e.target.value),
                    })
                  }
                  className="p-inputtext"
                />
              </div>
              <div className="p-field">
                <label htmlFor="price">Weight (kg) </label>
                <input
                  id="weight"
                  type="number"
                  placeholder="eg. 10"
                  value={selectedProduct.weight}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      weight: parseFloat(e.target.value),
                    })
                  }
                  className="p-inputtext"
                />
              </div>

              <div className="p-field">
                <label className="text-warning" htmlFor="seller">
                  Item Location (City)
                </label>
                <Dropdown
                  id="location"
                  value={selectedProduct.location}
                  options={locationOptions}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      location: e.value,
                    })
                  }
                  placeholder="Select specific city you have this item or closest city"
                />
              </div>
            </div>
            <div className="m-3">
              <Button
                label="Save Changes"
                type="submit"
                className="p-button p-component"
              />
            </div>
          </form>
        )}
      </Dialog>
    </div>
  );
};

export default Home;
