import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";
import { Toast } from "primereact/toast";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { setSignedIn } from "../../Redux/store";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Dropdown } from "primereact/dropdown";
import { categoryFilter } from "../../Data/categoryList";

const Supplier = () => {
  const navigate = useNavigate();

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [supplyCategory, setSupplyCategory] = useState("Clothing");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
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
          email: email,
          // country: country,
          companyName: companyName,
          supplyCategory: supplyCategory,
          number: number,
        };

        // submit to formspree
        await fetch(process.env.REACT_APP_formSpree, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });

        // Get the Firestore instance
        const db = getFirestore();

        // Store the additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), userInfo);

        toastRef.current.show({
          severity: "success",
          summary: "Request sent successfully!",
          detail: "Pending Approval",
        });

        // Dispatch action to set signed-in status in Redux store
        // dispatch(setSignedIn(true));

        // Redirect to "/" after successful signup
        // Delayed redirect to "/"
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
        <h4 className="mb-4 text-center">
          <span className="text-warning">Request</span> To Be A Supply
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
                placeholder="Country"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="form-group mt-2 mb-2">
              <label htmlFor="email">What Do You Supply:</label>
              <div>
                <Dropdown
                  value={supplyCategory}
                  options={categoryFilter}
                  onChange={(e) => setSupplyCategory(e.value)}
                  // placeholder={categoryFilter[0]}
                  className="w-50 d-flex justify-content-center align-items-center"
                  style={{ height: "3rem" }}
                />
              </div>
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
