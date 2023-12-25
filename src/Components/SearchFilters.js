import React from "react";
import searchBG from "../Assets/se.jpg";
import { Dropdown } from "primereact/dropdown";

const SearchFilters = ({
  title,
  search1,
  search2,
  searchPrice,
  options1,
  options2,
  optionPrice,

  search3,
  options3,
  search4,
  options4,
  search5,
  options5,

  selectedCategory,
  setSelectedCategory,
  selectedCountry,
  setSelectedCountry,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedOption3,
  setSelectedOption3,
  selectedOption4,
  setSelectedOption4,
  selectedOption5,
  setSelectedOption5,
  handleSave,
}) => {
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.value);
  };

  const handleOption3Change = (event) => {
    setSelectedOption3(event.value);
  };

  const handleOption4Change = (event) => {
    setSelectedOption4(event.value);
  };

  const handleOption5Change = (event) => {
    setSelectedOption5(event.value);
  };

  return (
    <div
      className="d-flex flex-column text-white rounded pt-2 search-banner"
      style={{
        height: "max-content",
        // scale: "0.8",
        width: "20%",
        backgroundImage: `url(${searchBG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <h4 className="text-center">{title}</h4> */}
      <h4 className="text-center">{title || "Search Product"} </h4>

      <Dropdown
        value={selectedCategory}
        options={options1}
        onChange={handleCategoryChange}
        placeholder={search1}
        className="mb-2  search-dropdown"
      />
      
      {search2 !== "" ? (
        <Dropdown
          value={selectedCountry}
          options={options2}
          onChange={handleCountryChange}
          placeholder={search2}
          className="mb-2 search-dropdown"
        />
      ) : (
        <></>
      )}

      {searchPrice !== "" ? (
        <Dropdown
        value={selectedPriceRange}
        options={optionPrice}
        onChange={handlePriceRangeChange}
        placeholder="Search Price"
        className="mb-2  search-dropdown"
      />
      ): (
        <></>
      )}

      {search3 !== "" ? (
        <Dropdown
          value={selectedOption3}
          options={options3}
          onChange={handleOption3Change}
          placeholder={search3}
          className="mb-2 search-dropdown"
        />
      ) : (
        <></>
      )}

      {search4 !== "" ? (
        <Dropdown
          value={selectedOption4}
          options={options4}
          onChange={handleOption4Change}
          placeholder={search4}
          className="mb-2 search-dropdown"
        />
      ) : (
        <></>
      )}

      {search5 !== "" ? (
        <Dropdown
          value={selectedOption5}
          options={options5}
          onChange={handleOption5Change}
          placeholder={search5}
          className="mb-2 search-dropdown"
        />
      ) : (
        <></>
      )}

      <button className="btn btn-warning text-white mb-3" onClick={handleSave}>
        Search
      </button>
    </div>
  );
};

export default SearchFilters;
