import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";
import { Toast } from "primereact/toast";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Dropdown } from "primereact/dropdown";
import { categoryFilter } from "../../Data/categoryList";
import ProductsDataService from "../../Services/products.services";

import 'primeicons/primeicons.css';
        

const Supplier = () => {
  const navigate = useNavigate();

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastRef = useRef(null);

  // Supply categories
  const [supplyCategories, setSupplyCategories] = useState([""]);

  const addSupplyCategory = () => {
    setSupplyCategories([...supplyCategories, ""]);
  };

  const removeSupplyCategory = (indexToRemove) => {
    const updatedCategories = supplyCategories.filter(
      (_, index) => index !== indexToRemove
    );
    setSupplyCategories(updatedCategories);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 6) {
        toastRef.current.show({
          severity: "error",
          summary: "Sign up failed",
          detail: "Password cannot be less than 6 characters",
        });
      } else if (password !== confirmPassword) {
        toastRef.current.show({
          severity: "error",
          summary: "Sign up failed",
          detail: "Passwords are not the same",
        });
        
      } 
      else if (supplyCategories.length === 0) {
        // Display a toast error when no categories have been selected
        toastRef.current.show({
          severity: "error",
          summary: "Sign up failed",
          detail: "Please select at least one supply category",
        });
      } 

      else {
        const auth = getAuth();
        // const userCredential = await createUserWithEmailAndPassword(
        //   auth,
        //   email,
        //   password
        // );
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Access the user from the userCredential
        // const user = userCredential.user;

        const userInfo = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          companyName: companyName,
          supplyCategories: supplyCategories,
          number: number,
        };

        // Get the Firestore instance
        // const db = getFirestore();

        // Store the additional user information in Firestore
        // await setDoc(doc(db, "sellers", user.uid), userInfo);
        await ProductsDataService.addSeller(userInfo);

        toastRef.current.show({
          severity: "success",
          summary: "Request sent successfully!",
          detail: "Pending Approval",
        });

        // Submit to formspree
        await fetch(process.env.REACT_APP_formSpree, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });

        // Redirect to "/" after successful signup and delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Sign up failed",
        detail: error.message,
      });
    }
  };

  return (
    <div className="bg-white">
      <Nav />
      <Toast ref={toastRef} />

      <div className="container">
        <h4 className="mb-4 mt-3 text-center">
          <span className="text-warning">Request</span> To Become A Supplier
        </h4>
        <div className="container mb-5 mt-5 d-flex justify-content-center rounded">
          <form onSubmit={handleSignUp} className="w-50">
            <div className="row mb-4">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Company Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name of your organization..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="number">Phone:</label>
              <input
                type="tel"
                required
                className="form-control"
                id="number"
                placeholder="+23..."
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="number">Confirm Password:</label>
              <input
                type="password"
                required
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <p className="mt-3">
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              />
              <span className="mx-2">
                I have read the <Link to="/tnc">Terms and Policies</Link>
              </span>
            </p>
            <button
              type="submit"
              className="btn btn-warning text-white w-100 mt-4 shadow-sm"
              disabled={!isCheckboxChecked} // Disable the button if the checkbox is not checked
            >
              Send Request
            </button>

            <p className="mt-3 text-center">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
