import React from "react";
import { Button } from "primereact/button";

const SideBar = ({setActiveIndex}) => {

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
          label="Products"
        />
        <Button
          onClick={() => setActiveIndex(2)}
          className="p-button-text"
          label="Customers"
        />
        <Button
          className="p-button-text"
          label="SignOut"
        />
      </div>
    </div>
  );
};

export default SideBar;
