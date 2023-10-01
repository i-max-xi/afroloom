import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";
import { Toast } from "primereact/toast";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setSignedIn, setcurrentUser } from "../../Redux/store";

const Buyer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          detail: "Passwords are not same",
        });
      } else {

        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // Signed in
            const user = userCredential.user;
            dispatch(setcurrentUser(user));

          }
        );

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
    </div>
  );
};

export default Buyer;
