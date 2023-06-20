import React from "react";
import { Dropdown } from "primereact/dropdown";

function LangCurrDropdown({
  selectedLanguage,
  selectedCurrency,
  handleToggleDropdown,
  setSelectedCurrency,
  setSelectedLanguage,
  setLanguage,
  setCurrency,
}) {
  const languageOptions = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
  ];

  const currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
  ];

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.value);
  };


  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.value);
  };

  const handleSave = () => {
    // document.getElementById(
    //   "nav-item"
    // ).innerText = `${selectedLanguage}-${selectedCurrency}`;
    setCurrency(selectedCurrency)
    setLanguage(selectedLanguage)
  };

  return (
    <div
      className="d-flex flex-column p-3 px-5 bg-white"
      style={{
        position: "absolute",
        top: "5rem",
        left: "20rem",
        width: "40%",
        zIndex: "1000",
      }}
    >
      <label className="mt-4" htmlFor="Language">
        Select a Language
      </label>

      <Dropdown
        value={selectedLanguage}
        options={languageOptions}
        onChange={handleLanguageChange}
        placeholder="Select a language"
      />
      <label htmlFor="Currency">Select Currency</label>
      <Dropdown
        value={selectedCurrency}
        options={currencyOptions}
        onChange={handleCurrencyChange}
        placeholder="Select a currency"
      />
      <div className="d-flex mt-2">
        <button className="btn btn-danger" onClick={handleToggleDropdown}>
          Cancel
        </button>
        <button className="btn btn-success mx-2" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default LangCurrDropdown;
