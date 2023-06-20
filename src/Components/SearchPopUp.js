import React from "react";

const SearchPopup = ({ searchQuery, handleSearchInputChange, closePopup }) => {
  return (
    <div className="search-popup">
      <div className="search-popup-content">
        <input
          className="form-control d-inline w-100 shadow p-2"
          type="search"
          placeholder="Search for a product..."
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="btn btn-link close-btn" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchPopup;
