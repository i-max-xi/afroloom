import React from "react";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { setcurrentUser, setSignedIn } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../../../firebase";

const SideBar = ({ setActiveIndex }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Firebase sign-out logic
      await signOut(auth); // Make sure to replace 'auth' with your Firebase authentication instance

      // Dispatch sign-out action
      dispatch(setcurrentUser(null));
      dispatch(setSignedIn(false));

      // Redirect to the login page or any other desired page
      navigate("/signin");
    } catch (error) {
      // Handle sign-out error
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="Sidebar">
      <div className="d-flex flex-column">
        <Button
          onClick={() => setActiveIndex(0)}
          className="p-button-text"
          label="Home"
        />
        <Button
          onClick={() => setActiveIndex(1)}
          className="p-button-text"
          label="Add A New Product"
        />
        <Button onClick={handleSignOut} className="p-button-text" label="Sign Out" />
      </div>
    </div>
  );
};

export default SideBar;
