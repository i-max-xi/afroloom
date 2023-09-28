import React from "react";
// import { useDispatch } from "react-redux";
// import { searchItem } from "../Redux/store"; 
// import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";

const SearchBar2 = () => {
//   const dispatch = useDispatch();

//   const [keyword, setkeyword] = useState("");

//   const handleInput = (event) => {
//     const newKeyword = event.target.value;
//     setkeyword(newKeyword);
//   };

//   const handleSearchInputChange = () => {
//     // const newSearchTerm = event.target.value;
//     dispatch(searchItem(keyword)); // Dispatch the searchItem action
//   };

// thisss
//   const handleSearchInputChange = (event) => {
//     const newSearchTerm = event.target.value;
//     dispatch(searchItem(newSearchTerm)); // Dispatch the searchItem action
//   };

//   const searcicon = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       fill="currentColor"
//       className="bi bi-search about text-white"
//       viewBox="0 0 16 16"
//     >
//       <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
//     </svg>
//   );

  return (
    <div className="flex justify-content-center align-items-center">
      {/* <input
        className="w-100 search-input"
        type="search"
        placeholder="Search for a product..."
        aria-label="Search"
        onChange={handleSearchInputChange}
        style={{ border: "none", height: "100%", transform: "scale(1, 1.7)" }}
      /> */}
      <div className="p-inputgroup flex-1 rounded mx-1">
        {/* <InputText placeholder="Search for a product..." onChange={handleSearchInputChange} /> */}
        <InputText placeholder="What are you looking for ?..." />

        {/* <Button icon="pi pi-search" className="p-button-warning" onClick={handleSearchInputChange}/> */}
        {/* <button className="btn btn-warning" onClick={handleSearchInputChange}>
          {searcicon}
        </button> */}
      </div>
    </div>
  );
};

export default SearchBar2;
