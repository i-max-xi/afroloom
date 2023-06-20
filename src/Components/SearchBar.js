// import React from "react";

// const SearchBar = ({ searchQuery, handleSearchInputChange, closePopup }) => {
//   return (
//     <div
//       className="container search-modal m-5 bg-white w-25 p-3"
//       style={{ transform: "translateX(25rem) translateY(1rem)" }}
//     >
//       <form className="form-inline d-flex justify-content-center m-2">
//         <input
//           className="form-control d-inline w-100 shadow p-2"
//           type="search"
//           placeholder="Search for a product..."
//           aria-label="Search"
//           shadow-sm
//           value={searchQuery}
//           onChange={handleSearchInputChange}
//         />

//         {/* <button className="btn btn-success text-white d-inline" type="submit">
//           Search
//         </button> */}
//       </form>
//       <button
//         className="btn btn-danger btn-sm"
//         style={{ float: "right", transform: "translateX(-1rem)" }}
//         onClick={closePopup}
//       >
//         Cancel
//       </button>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";

export default function SearchBar({
  searchQuery,
  handleSearchInputChange,
  closePopup,
}) {
  const op = useRef(null);

  return (
    <div className="flex justify-content-center" >
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
      <OverlayPanel ref={op} style={{backgroundColor: "none", translate: "2rem -2rem", scale: "1 0.7"}}>
          <input
            className="w-100"
            type="search"
            placeholder="Search for a product..."
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            style={{border: "none"}}
          />

          {/* <button className="btn btn-success text-white d-inline" type="submit">
          Search
        </button> */}
      </OverlayPanel>
    </div>
  );
}
