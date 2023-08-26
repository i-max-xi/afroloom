import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencySymbol } from "../Redux/store"; // Update the import path
import { Dropdown } from "primereact/dropdown";

const currencyOptions = [
  { name: "USD", factor: 1, symbol: "$" },
  { name: "EUR", factor: 0.9, symbol: "€" },
  { name: "GHS", factor: 10, symbol: "₵" },
  // Add more currency options as needed
];

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const currencySymbol = useSelector((state) => state.currencySymbol);

  const handleCurrencyChange = (selectedOption) => {
    dispatch(
      setCurrencySymbol({
        symbol: selectedOption.symbol,
        factor: selectedOption.factor,
      })
    );
  };

  return (
    <div className="currency-converter">
      <Dropdown
        value={currencyOptions.find(
          (option) => option.symbol === currencySymbol.symbol
        )}
        options={currencyOptions}
        optionLabel="name"
        onChange={(e) => handleCurrencyChange(e.value)}
      />
    </div>
  );
};

export default CurrencyConverter;
