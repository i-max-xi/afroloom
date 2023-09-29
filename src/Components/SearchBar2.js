import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchItem } from "../Redux/store";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";

const SearchBar2 = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const handleInput = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
  };

  const handleSearchInputChange = () => {
    // Dispatch the searchItem action only if the keyword is not empty
    if (keyword.trim() !== "") {
      dispatch(searchItem(keyword.trim()));
    }
  };

  return (
    <div className="flex justify-content-center align-items-center">
      <div className="p-inputgroup flex-1 rounded mx-1">
        <InputText
          placeholder="What are you looking for?..."
          onChange={handleInput}
        />

        <button // className={`btn btn-warning text-white ${
          //   keyword.trim() === "" ? "disabled" : ""
          // }`}
          className="btn btn-warning"
          onClick={handleSearchInputChange}
        >
          <Link
            to={keyword.trim() !== "" ? "searched" : ""}
            className="text-decoration-none text-white"
          >
            Search
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SearchBar2;
