import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";
import { Toast } from "primereact/toast";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setSignedIn } from "../../Redux/store";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Supplier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  // const [idNumber, setIdNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toastRef = useRef(null);

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
      } else {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Access the user from the userCredential
        const user = userCredential.user;

        const userInfo = {
          firstName: firstName,
          lastName: lastName,
          country: country,
          number: number,
        };

        // Get the Firestore instance
        const db = getFirestore();

        // Store the additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), userInfo);

        toastRef.current.show({
          severity: "success",
          summary: "Sign up successful!",
        });
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Dispatch action to set signed-in status in Redux store
        dispatch(setSignedIn(true));

        // Redirect to "/" after successful signup
        // Delayed redirect to "/"
        setTimeout(() => {
          navigate("/");
        }, 3000);
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
    <>
      <Nav />
      <Toast ref={toastRef} />

      <div className="container">
        <h4 className="mb-4 text-center">
          <span className="text-warning">Create</span> Account
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
              <label htmlFor="email">Country:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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

            {/* <div className="form-group">
              <label htmlFor="idNumber">Upload ID:</label>
              <input
                type="file"
                className="form-control"
                id="idNumber"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div> */}

            <button
              type="submit"
              className="btn btn-warning text-white w-100 mt-4 shadow-sm"
            >
              Sign Up
            </button>
            <p className="mt-3 text-center">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Supplier;
