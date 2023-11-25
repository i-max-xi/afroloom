import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";
import { Toast } from "primereact/toast";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setSignedIn, setcurrentUser } from "../../Redux/store";
import ProductsDataService from "../../Services/products.services";
import { ProgressSpinner } from "primereact/progressspinner";

const Buyer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toastRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)

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
          detail: "Passwords are not same",
        });
      } else {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;

            // Add user data to the "users" collection in Firestore
            const newBuyer = {
              id: user.uid,
              firstName,
              lastName,
              email,
              orders: [],
            };
            ProductsDataService.addBuyer(newBuyer).then(() => {
              // Fetch user data from Firestore and set it to Redux
              ProductsDataService.getBuyer(user.uid).then((buyerData) => {
                dispatch(setcurrentUser(buyerData.data()));

                setIsLoading(false);
                toastRef.current.show({
                  severity: "success",
                  summary: "Sign up successful!",
                });

                // set user data to Redux
                dispatch(setSignedIn(true)); // set signin to true

                setTimeout(() => {
                  navigate("/");
                }, 3000);
              });
            });
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
    }
  };

  return (
    <div className="bg-white">
      <Nav />
      <Toast ref={toastRef} />

      <div className="container">
        <h4 className="mb-4 text-center">
          <span className="text-warning">Create</span> Account
        </h4>
        <div className="container mb-5 mt-5 d-flex justify-content-center rounded">
          <form onSubmit={handleSignUp} className="w-50">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                required
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

            <button
              type="submit"
              className="btn btn-warning text-white w-100 mt-4 shadow-sm position-relative"
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

export default Buyer;
