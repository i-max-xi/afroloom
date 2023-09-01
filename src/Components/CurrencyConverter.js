import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencySymbol } from "../Redux/store"; // Update the import path
import { Dropdown } from "primereact/dropdown";

// const currencyOptions = [
//   { name: "USD", factor: 1, symbol: "$" },
//   { name: "EUR", factor: 0.9, symbol: "€" },
//   { name: "GHS", factor: 10, symbol: "₵" },
//   // Add more currency options as needed
// ];

const currencyOptions = [
  { name: "USD", factor: 1, symbol: "$" },
  { name: "GHS", factor: 11.36, symbol: "₵" },
  { name: "EUR", factor: 0.85, symbol: "€" }, // Corrected EUR factor
  { name: "GBP", factor: 0.72, symbol: "£" }, // British Pound
  // Add more currency options as needed
  { name: "ZAR", factor: 14.50, symbol: "R" }, // South African Rand
  { name: "NGN", factor: 772.34, symbol: "₦" }, // Nigerian Naira
  { name: "EGP", factor: 16.15, symbol: "ج.م" }, // Egyptian Pound
  { name: "KES", factor: 112.75, symbol: "KSh" }, // Kenyan Shilling
  { name: "JPY", factor: 110, symbol: "¥" }, // Japanese Yen
  { name: "AUD", factor: 1.35, symbol: "$" }, // Australian Dollar
  { name: "CAD", factor: 1.25, symbol: "$" }, // Canadian Dollar
  { name: "CHF", factor: 0.92, symbol: "CHF" }, // Swiss Franc
  { name: "CNY", factor: 6.45, symbol: "¥" }, // Chinese Yuan
  { name: "INR", factor: 73.5, symbol: "₹" }, // Indian Rupee
  { name: "SGD", factor: 1.33, symbol: "S$" }, // Singapore Dollar
  { name: "NZD", factor: 1.45, symbol: "$" }, // New Zealand Dollar
  { name: "AED", factor: 3.67, symbol: "د.إ" }, // United Arab Emirates Dirham
  { name: "BRL", factor: 5.25, symbol: "R$" }, // Brazilian Real
  
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
        optionLabel={(option) => `${option.name} (${option.symbol})`}
        onChange={(e) => handleCurrencyChange(e.value)}
      />
    </div>
  );
};

export default CurrencyConverter;
