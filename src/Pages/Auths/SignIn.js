import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSignedIn, setcurrentUser } from "../../Redux/store";
import Nav from "../../Components/Nav";
import signInBg from "../../Assets/backgrounds/login2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Toast } from "primereact/toast";
import ProductsDataService from "../../Services/products.services";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const toastRef = useRef(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Firebase sign-in logic
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let userInfo = null;

      // Try to fetch user information from seller collection
      if (isChecked) {
        const sellerInfo = await ProductsDataService.getSellerByField("id", user.uid);
        userInfo = sellerInfo.data();
      } else {
        const buyerInfo = await ProductsDataService.getBuyerByField("id", user.uid);
        userInfo = buyerInfo.data();
      }

      if (userInfo !== null) {
        toastRef.current.show({
          severity: "success",
          summary: "Sign in successful!",
        });

        dispatch(setSignedIn(true));
        dispatch(setcurrentUser(userInfo));

        // Delayed redirect to "/"
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toastRef.current.show({
          severity: "error",
          summary: "User information not found.",
        });
      }
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Sign in failed. Please try again ${error}`,
      });
    }
  };

  return (
    <>
      <Nav />
      <Toast ref={toastRef} />
      <div
        className="p-2 pb-5"
        style={{
          backgroundImage: `url(${signInBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <form
          onSubmit={handleSignIn}
          className="container bg-white rounded w-50 p-5 shadow"
          style={{ marginTop: "8rem", marginBottom: "5rem" }}
        >
          <h4>
            <span className="text-warning">Welcome</span> Back
          </h4>
          <div className="form-group mt-5">
            <label htmlFor="email">Email/Phone No.</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="checkbox"
              id="check"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label className="mx-3" htmlFor="check">
              Only check if signing in as a Supplier:
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-warning w-100 text-white mt-3"
          >
            Log In
          </button>
          <p className="mt-3">
            <Link to="/forgotPassword" className="">
              Forgot Password?{" "}
            </Link>
          </p>
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/registeras" className="">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignIn;
