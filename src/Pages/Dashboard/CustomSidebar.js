import React, { useRef } from "react";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../../firebase";
import { Sidebar } from "primereact/sidebar";
import {
  setDashBoardPath,
  setSignedIn,
  setcurrentUser,
} from "../../Redux/store";

import { Divider } from "primereact/divider";

const CustomSideBar = ({ items, setActiveIndex, visible, setVisible }) => {
  const toastRef = useRef(null);

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

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      className="Sidebar bg-white "
    >
      <div className="d-flex flex-column align-items-start mt-3">
        {items.map((item, index) => (
          <>
            <Button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setVisible(false);
              }}
              className="p-button-text text-black"
              label={item.label}
            />
            <Divider />
          </>
        ))}
        <Button
          label="Anaytics and visits"
          icon="pi pi-external-link"
          className="p-button-link"
          onClick={() =>
            window.open(
              "https://console.firebase.google.com/u/1/project/shopinafrica-c84cf/analytics/app/web:ZWQ1ODAyNTMtNDY4NC00Y2NjLWFlZGItODI4ZTkyMDYyNmJk/overview",
              "_blank",
            )
          }
        />
        <Divider />
        <Button
          label="Paystack Dashboard"
          icon="pi pi-external-link"
          className="p-button-link"
          onClick={() =>
            window.open("https://dashboard.paystack.com/#/login", "_blank")
          }
        />
        <Divider />
      </div>
      <button onClick={handleSignOut} className="rounded btn btn-danger m-3">
        Sign Out
      </button>
    </Sidebar>
  );
};

export default CustomSideBar;
