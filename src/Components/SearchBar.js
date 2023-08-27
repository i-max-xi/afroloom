import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../Redux/store"; // Update the import path for your allProductsSlice

export default function SearchBar() {
  const op = useRef(null);
  const dispatch = useDispatch();

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    dispatch(setSearchTerm(newSearchTerm)); // Dispatch the setSearchTerm action
  };

  return (
    <div className="flex justify-content-center">
       <li
        className="nav-item mx-3"
        style={{ translate: "0 0.5rem" }}
        onClick={(e) => op.current.toggle(e)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search about"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </li>
      <OverlayPanel style={{ backgroundColor: "none", transform: "translate(2rem, -2rem) scale(1, 0.7)" }} ref={op}>
        <input
          className="w-100 search-input"
          type="search"
          placeholder="Search for a product..."
          aria-label="Search"
          onChange={handleSearchInputChange}
          style={{ border: "none", height: "100%", transform: "scale(1, 1.7)" }}
        />
      </OverlayPanel>
    </div>
  );
}
