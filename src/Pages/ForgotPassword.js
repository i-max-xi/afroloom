import React, { useRef, useState } from "react";
// import signInBg from "../../Assets/backgrounds/3.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { auth, sendPasswordResetEmail } from "../firebase";
import Nav from "../Components/Nav";

const ForgotPassword = () => {
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // await auth.sendPasswordResetEmail(email); // Send password reset email
      await sendPasswordResetEmail(auth, email);

      toastRef.current.show({
        severity: "success",
        summary: `We have sent an email to reset your password`,
      });

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error sending reset email ${error}`,
      });
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Nav />
      <Toast ref={toastRef} />

      <div
        className="w-100 p-4"
        style={{
          // backgroundImage: `url(${signInBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <form
          onSubmit={handleForgotPassword}
          className="container bg-white rounded w-100 p-4"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <h4>
            <span className="text-warning">Forgot</span> Password ?
          </h4>
          <p>Enter your email to receive password reset instructions</p>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 text-white mt-3 position-relative"
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
            Send
          </button>
          <p className="mt-3 auth-alternative">
            <Link to="/signin" className="text-decoration-none text-black">
              &#8592; Back to Login Page
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
