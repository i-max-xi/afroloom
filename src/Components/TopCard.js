import React from "react";
// import Map from "../Assets/ban82.jpg";
import Nav from "./Nav";
import HeaderCarousel from "./HeaderCarousel";
import MobileSearchBar from "./MobileSearchBar";

const TopCard = () => {


  return (
    <div
      className=""
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "58% 95%",
        backgroundPosition: "top right",
      }}
    >

      <Nav />

      <div className="d-flex justify-content-around align-items-center">
        <MobileSearchBar />
        {/* <span
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="pi pi-search-plus advance-search-mobile"
          id="advance-search-mobile"
        ></span> */}
      </div>

      <div className="d-flex Map">
        <HeaderCarousel />
      </div>
    </div>
  );
};

export default TopCard;
