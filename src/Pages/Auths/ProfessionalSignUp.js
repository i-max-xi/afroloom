import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";
import { Toast } from "primereact/toast";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Dropdown } from "primereact/dropdown";
import ProductsDataService from "../../Services/products.services";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";

import "primeicons/primeicons.css";
import { ProgressSpinner } from "primereact/progressspinner";
import countryArr from "../../Data/CountryArr";
import {
  ProfessionalsDbEnum,
  ProfessionalsList,
  ProfessionalsListEnum,
} from "../../Data/professionalsList";
import { useDispatch } from "react-redux";
import {
  setDashBoardPath,
  setSignedIn,
  setcurrentUser,
} from "../../Redux/store";
import { genderList } from "../../Data/genderAgeList";
import { InputText } from "primereact/inputtext";
import { storage } from "../../firebase";

const ProfessionalSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [name, setName] = useState("");
  const [profilePic, setProflePic] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [professionalType, setProfessionalType] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastRef = useRef(null);

  const uploadProfilePic = async (storageRef, file) => {
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProflePic(downloadURL);
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error uploading image:",
        detail: error.message,
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // Create an image element to get the dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Check if the image dimensions are 500x500

      const storageRef = ref(storage, `images/${file.name}`);
      uploadProfilePic(storageRef, file);
    };
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (password.length < 6) {
        return toastRef.current.show({
          severity: "error",
          summary: "Sign up failed",
          detail: "Password cannot be less than 6 characters",
        });
      } else if (password !== confirmPassword) {
        return toastRef.current.show({
          severity: "error",
          summary: "Sign up failed",
          detail: "Passwords are not the same",
        });
      } else if (professionalType === "") {
        return toastRef.current.show({
          severity: "error",
          summary: "Sign up failed",
          detail: "Please select a professional Type",
        });
      } else {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            const userInfo = {
              id: user.uid,
              name: name,
              profile: profilePic,
              email: email,
              country: country,
              gender: gender,
              city: city,
              number: number,
              // subject: `New Supplier Request from ${name}`,
            };

            if (professionalType === ProfessionalsListEnum.model) {
              ProductsDataService.addModel(userInfo).then(() => {
                ProductsDataService.getModelByField("id", user.uid).then(
                  (modelData) => {
                    dispatch(setcurrentUser(modelData.data()));
                    console.log(modelData.data());
                    dispatch(
                      setDashBoardPath(
                        `/professionals-dashboard/${ProfessionalsDbEnum.model}`
                      )
                    );
                  }
                );
              });
            }

            if (professionalType === ProfessionalsListEnum.tourGuide) {
              ProductsDataService.addTourGuide(userInfo).then(() => {
                ProductsDataService.getTourGuideByField("id", user.uid).then(
                  (tourGuideData) => {
                    dispatch(setcurrentUser(tourGuideData.data()));
                    dispatch(
                      setDashBoardPath(
                        `/professionals-dashboard/${ProfessionalsDbEnum.tourGuide}`
                      )
                    );
                  }
                );
              });
            }

            if (professionalType === ProfessionalsListEnum.photographer) {
              ProductsDataService.addPhotographer(userInfo).then(() => {
                ProductsDataService.getPhotographerByField("id", user.uid).then(
                  (photographerData) => {
                    dispatch(setcurrentUser(photographerData.data()));
                    dispatch(
                      setDashBoardPath(
                        `/professionals-dashboard/${ProfessionalsDbEnum.photographer}`
                      )
                    );
                  }
                );
              });
            }

            // Submit to formspree
            // fetch(process.env.REACT_APP_formSpree, {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify(userInfo),
            // });

            toastRef.current.show({
              severity: "success",
              summary: "Successfully signed up!",
              detail: "Head to dashboard to complete profile",
            });

            setIsLoading(false);
            dispatch(setSignedIn(true)); // set signin to true
            // Redirect to "/" after successful signup and delay
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        );
      }
    } catch (error) {
      setIsLoading(false);
      toastRef.current.show({
        severity: "error",
        summary: "Sign up failed",
        detail: error.message,
      });
    } finally {
      setIsLoading(false); // Always reset loading state, regardless of success or failure
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-white">
      <Nav />
      <Toast ref={toastRef} />

      <div className="container">
        <h4 className="mb-4 mt-3 text-center">
          <span className="text-warning">Request</span> To Become A Professional
        </h4>
        <div className="container mb-5 mt-5 d-flex justify-content-center rounded">
          <form onSubmit={handleSignUp} className="col-12 col-sm-6">
            <div className="form-group">
              <label htmlFor="company name">Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Personal or brand name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="company name">Upload Profile Picture:</label>{" "}
              <br />
              <InputText
                required
                id="item"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country of origin:</label>
              <Dropdown
                id="country"
                value={country}
                options={countryArr.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={(e) => setCountry(e.value)}
                placeholder="Select country"
                className="d-flex"
              />
            </div>
            <div className="form-group">
              <label htmlFor="company name">City:</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group mt-2 mb-2">
              <label htmlFor="email">What kind of Professional are you:</label>
              <Dropdown
                id="professionalType"
                value={professionalType}
                options={ProfessionalsList.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={(e) => setProfessionalType(e.value)}
                placeholder="Select professional type"
                className="d-flex"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender: </label>
              <Dropdown
                id="gender"
                value={gender}
                options={genderList.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={(e) => setGender(e.value)}
                placeholder="Select gender"
                className="d-flex"
              />
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
              {/* <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
              <span className="p-input-icon-right w-100">
                <InputText
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="number">Confirm Password:</label>
              {/* <input
                type="password"
                required
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              /> */}
              <span className="p-input-icon-right w-100">
                <InputText
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <i
                  className={`pi ${
                    showConfirmPassword ? "pi-eye-slash" : "pi-eye"
                  }`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </span>
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
              className="btn btn-warning text-white w-100 mt-4 shadow-sm position-relative"
              disabled={
                !isCheckboxChecked ||
                name === "" ||
                profilePic === "" ||
                country === "" ||
                city === "" ||
                email === "" ||
                number === ""
              }
            >
              <span className="spinner-container">
                {isLoading && (
                  <ProgressSpinner
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    className="position-absolute top-50 start-50 translate-middle"
                  />
                )}
              </span>
              Sign Up
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

export default ProfessionalSignUp;
