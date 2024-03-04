import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import countryArr from "../../Data/CountryArr";
import { Button } from "primereact/button";
import { categoryFilter } from "../../Data/categoryList";
import productsServices from "../../Services/products.services";
import { updateCurrentUser } from "../../Redux/store";

const EditProfile = ({toastRef, setEditProfileVisible}) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const [updatedUser, setUpdatedUser] = useState({
    companyName: currentUser.companyName,
    email: currentUser.email,
    number: currentUser.number,
    country: currentUser.country
  });

  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);

    const Data = {
        ...updatedUser,
        supplyCategories: supplyCategories,
      };

    try {
      if (updatedUser) {
        await productsServices.updateSeller(currentUser.id, Data);
        toastRef.current.show({
          severity: "success",
          summary: `Information updated successfully.`,
        });
        dispatch(updateCurrentUser(Data));
        setEditProfileVisible(false);
      }
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error editing your info: ${error}`,
      });
    }
    setLoading(false)
  };

  const [supplyCategories, setSupplyCategories] = useState([
    ...currentUser.supplyCategories,
  ]);

  const addSupplyCategory = () => {
    setSupplyCategories([...supplyCategories, ""]);
  };

  const removeSupplyCategory = (indexToRemove) => {
    const updatedCategories = supplyCategories.filter(
      (_, index) => index !== indexToRemove
    );
    setSupplyCategories(updatedCategories);
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="title">Company / Brand Name</label>
          <input
            id="title"
            type="text"
            value={updatedUser.companyName}
            onChange={(e) => {
              setUpdatedUser({
                ...updatedUser,
                companyName: e.target.value,
              });
            }}
            className="p-inputtext"
          />
        </div>

        <div className="p-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={updatedUser.email}
            placeholder="Ghana Cedi (₵) equivalent value... 10"
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                email: e.target.value,
              })
            }
            className="p-inputtext"
          />
        </div>
        <div className="p-field">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="text"
            value={updatedUser.number}
            placeholder="Ghana Cedi (₵) equivalent value... 10"
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                number: e.target.value,
              })
            }
            className="p-inputtext"
          />
        </div>

        <div className="p-field">
          <label htmlFor="country">Country of origin:</label>
          <Dropdown
            id="country"
            value={updatedUser.country}
            options={countryArr.map((country) => ({
              label: country,
              value: country,
            }))}
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                country: e.target.value,
              })
            }
            placeholder="Select country"
            className="d-flex"
          />
        </div>

        <div className="form-group mt-2 mb-2">
          <label htmlFor="email">What Do You Supply:</label>
          {supplyCategories.map((category, index) => (
            <div key={index} className="d-flex align-items-center">
              <Dropdown
                value={category}
                options={categoryFilter}
                onChange={(e) => {
                  const updatedCategories = [...supplyCategories];
                  updatedCategories[index] = e.value;
                  setSupplyCategories(updatedCategories);
                }}
                placeholder="Select supply Category"
                className="w-50 d-flex justify-content-center align-items-center mt-1"
                style={{ height: "3rem" }}
              />
              {index === supplyCategories.length - 1 ? (
                <button
                  type="button"
                  onClick={addSupplyCategory}
                  className="btn btn-primary mx-2"
                >
                  <span className="pi pi-plus"></span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => removeSupplyCategory(index)}
                  className="btn btn-danger mx-2"
                >
                  <span className="pi pi-minus"></span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="m-3">
        <Button
          label="Save Changes"
          type="submit"
          className="p-button p-component"
          loading={loading}
        />
      </div>
    </form>
  );
};

export default EditProfile;
