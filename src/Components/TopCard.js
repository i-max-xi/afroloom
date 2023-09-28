import React, { useState } from "react";
// import Map from "../Assets/ban82.jpg";
import Nav from "./Nav";
import HeaderCarousel from "./HeaderCarousel";
import LangCurrDropdown from "./LangCurrDropdown";

const TopCard = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [Currency, setCurrency] = useState("USD");
  const [Language, setLanguage] = useState("Eng");


  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div
      className=""
      style={{
        // backgroundImage: `url(${Map})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "58% 95%",
        backgroundPosition: "top right",
      }}
    >
      {dropdownVisible && (
        <LangCurrDropdown
          initialLanguage="en"
          initialCurrency="USD"
          handleToggleDropdown={handleToggleDropdown}
          selectedLanguage={selectedLanguage}
          selectedCurrency={selectedCurrency}
          setSelectedLanguage={setSelectedLanguage}
          setSelectedCurrency={setSelectedCurrency}
          setCurrency={setCurrency}
          setLanguage={setLanguage}
        />
      )}
      <Nav
        handleToggleDropdown={handleToggleDropdown}
        Currency={Currency}
        Language={Language}
      />

      <div className="d-flex Map">
        <HeaderCarousel />
        {/* <div className="w-100" style={{ marginTop: "33.5%" }}></div> */}
      </div>
    </div>
  );
};

export default TopCard;
