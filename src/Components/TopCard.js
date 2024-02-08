import React from "react";
// import Map from "../Assets/ban82.jpg";
import Nav from "./Nav";
import HeaderCarousel from "./HeaderCarousel";
import MobileSearchBar from "./MobileSearchBar";
import Subheader from "./subheader/Subheader";

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

      <MobileSearchBar />

      <Subheader />


      <div className="d-flex Map">
        <HeaderCarousel />
      </div>
    </div>
  );
};

export default TopCard;
