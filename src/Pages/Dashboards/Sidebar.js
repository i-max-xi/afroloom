import React, { useRef } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../../firebase";
import {
  setDashBoardPath,
  setSignedIn,
  setcurrentUser,
} from "../../Redux/store";

import { Divider } from "primereact/divider";

const SideBar = ({ items, setActiveIndex }) => {
  const toastRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Firebase sign-out logic
      await signOut(auth); // Make sure to replace 'auth' with your Firebase authentication instance

      // Dispatch sign-out action
      dispatch(setcurrentUser(null));
      dispatch(setSignedIn(false));
      dispatch(setDashBoardPath(""));

      // Redirect to the login page or any other desired page
      navigate("/signin");
    } catch (error) {
      // Handle sign-out error
      toastRef.current.show({
        severity: "error",
        summary: "Error signing out:",
        error,
      });
    }
  };

  const handleMainDBPage = () => {
    window.open(
      "https://console.firebase.google.com/u/1/project/shopinafrica-c84cf/analytics/app/web:ZWQ1ODAyNTMtNDY4NC00Y2NjLWFlZGItODI4ZTkyMDYyNmJk/streamview/realtime~2Foverview%3Ffpn%3D343787566313",
      "_blank"
    );
  };

  return (
    <div className="Sidebar bg-white">
      <div className="d-flex flex-column align-items-start mt-3">
        {items.map((item, index) => (
          <>
            <Button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="p-button-text text-black"
              label={item.label}
            />
            <Divider />
          </>
        ))}
        {currentUser.isAdmin && (
          <Button
            onClick={handleMainDBPage}
            className="p-button-text text-black"
            label="Main Database"
          />
        )}
      </div>
      <Button
        onClick={handleSignOut}
        className="rounded btn bg-danger m-3"
        label="Sign Out"
      />
    </div>
  );
};

export default SideBar;
