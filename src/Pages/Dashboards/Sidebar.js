import React from "react";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../../firebase";
import { setSignedIn, setcurrentUser } from "../../Redux/store";

const SideBar = ({ items, setActiveIndex }) => {
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
        {items.map((item, index) => (
          <Button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="p-button-text"
            label={item.label}
          />
        ))}
        <Button
          onClick={handleSignOut}
          className="p-button-text"
          label="Sign Out"
        />
      </div>
    </div>
  );
};

export default SideBar;
