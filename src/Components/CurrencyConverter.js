import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateProductPrices } from '../Redux/store'; // Update the import path
import { Dropdown } from 'primereact/dropdown';

const currencyOptions = [
  { name: "USD", factor: 1 }, // Default currency with no change
  { name: "EUR", factor: 0.9 }, // Example factor for Euro
  { name: "JPY", factor: 110 }, // Example factor for Japanese Yen
  // Add more currency options as needed
];

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]); // Default to USD

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
    dispatch(updateProductPrices(selectedOption.factor));
  };

  return (
    <div className="currency-converter">
      <Dropdown
        value={selectedCurrency}
        options={currencyOptions}
        optionLabel="name"
        onChange={(e) => handleCurrencyChange(e.value)}
      />
    </div>
  );
};

export default CurrencyConverter;
