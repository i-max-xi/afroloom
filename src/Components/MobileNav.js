import React, { useRef } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sidebar } from 'primereact/sidebar';


import { Divider } from "primereact/divider";

const MobileNav = ({ items, setActiveIndex, visible, setVisible }) => {
  const toastRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleMainDBPage = () => {
    window.open(
      "https://console.firebase.google.com/u/1/project/shopinafrica-c84cf/analytics/app/web:ZWQ1ODAyNTMtNDY4NC00Y2NjLWFlZGItODI4ZTkyMDYyNmJk/streamview/realtime~2Foverview%3Ffpn%3D343787566313",
      "_blank"
    );
  };

  const handleGoToPaystack = () => {
    window.open(
      "https://dashboard.paystack.com/#/dashboard?period=30",
      "_blank"
    );
  };



  return (
    <Sidebar visible={visible} onHide={() => setVisible(false)} className="Sidebar bg-white">
      <div className="d-flex flex-column align-items-start mt-3">
        
        
      </div>
      <Button
        className="rounded btn bg-danger m-3"
        label="Sign Out"
      />
    </Sidebar>
  );
};

export default MobileNav;
