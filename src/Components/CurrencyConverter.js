import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencySymbol } from "../Redux/store";
import { Dropdown } from "primereact/dropdown";

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const currencySymbol = useSelector((state) => state.currencySymbol);
  const [exchangeRates, setExchangeRates] = useState([]);
  const currencyOptions = [
    { name: "USD", symbol: "$" },
    { name: "GHS", symbol: "₵" },
    { name: "EUR", symbol: "€" },
    { name: "GBP", symbol: "£" },
    { name: "ZAR", symbol: "R" },
    { name: "NGN", symbol: "₦" },
    { name: "EGP", symbol: "ج.م" },
    { name: "KES", symbol: "KSh" },
    { name: "JPY", symbol: "¥" },
    { name: "AUD", symbol: "$" },
    { name: "CAD", symbol: "$" },
    { name: "CHF", symbol: "CHF" },
    { name: "CNY", symbol: "¥" },
    { name: "INR", symbol: "₹" },
    { name: "SGD", symbol: "S$" },
    { name: "NZD", symbol: "$" },
    { name: "AED", symbol: "د.إ" },
    { name: "BRL", symbol: "R$" },
    { name: "MXN", symbol: "Mex$" },
    { name: "TRY", symbol: "₺" },
    { name: "RUB", symbol: "₽" },
    { name: "SEK", symbol: "kr" },
    { name: "NOK", symbol: "kr" },
    { name: "DKK", symbol: "kr" },
    { name: "THB", symbol: "฿" },
    { name: "MYR", symbol: "RM" },
    { name: "IDR", symbol: "Rp" },
    { name: "PHP", symbol: "₱" },
    { name: "KRW", symbol: "₩" },
    { name: "ARS", symbol: "$" },
    { name: "CLP", symbol: "$" },
    { name: "COP", symbol: "$" },
    { name: "BHD", symbol: "ب.د" },
    { name: "QAR", symbol: "ر.ق" },
    { name: "OMR", symbol: "ر.ع." },
    { name: "KWD", symbol: "د.ك" },
    { name: "JOD", symbol: "د.ا" },
    { name: "LBP", symbol: "ل.ل" },
    { name: "PKR", symbol: "₨" },
    { name: "ZMW", symbol: "ZK" },
    { name: "RSD", symbol: "дин." },
    { name: "LKR", symbol: "රු" },
    { name: "BDT", symbol: "৳" },
    { name: "NPR", symbol: "रू" },
    { name: "BTN", symbol: "Nu." },
    { name: "MVR", symbol: "ރ." },
    { name: "MAD", symbol: "د.م." },
    { name: "TND", symbol: "د.ت" },
    { name: "DZD", symbol: "د.ج" },
    { name: "LYD", symbol: "ل.د" },
    { name: "SDG", symbol: "ج.س" },
    { name: "ETB", symbol: "ብር" },
    { name: "VES", symbol: "Bs." },
    { name: "PEN", symbol: "S/" },
    { name: "BOB", symbol: "Bs." },
    { name: "PYG", symbol: "₲" },
    { name: "UYU", symbol: "$U" },
    { name: "HRK", symbol: "kn" },
    { name: "BGN", symbol: "лв" },
    { name: "RON", symbol: "lei" },
    { name: "HUF", symbol: "Ft" },
    { name: "CZK", symbol: "Kč" },
    { name: "SAR", symbol: "ر.س" },
    { name: "YER", symbol: "ر.ي" },
    { name: "IQD", symbol: "ع.د" },
    { name: "SYP", symbol: "ل.س" },
    { name: "IRR", symbol: "﷼" },
    { name: "NPR", symbol: "रू" },
    { name: "LKR", symbol: "රු" },
    { name: "BDT", symbol: "৳" },
    { name: "BTN", symbol: "Nu." },
    { name: "MVR", symbol: "ރ." },
    { name: "MAD", symbol: "د.م." },
    { name: "TND", symbol: "د.ت" },
    { name: "DZD", symbol: "د.ج" },
    { name: "LYD", symbol: "ل.د" },
    { name: "SDG", symbol: "ج.س" },
    { name: "ETB", symbol: "ብር" },
    { name: "VES", symbol: "Bs." },
    { name: "PEN", symbol: "S/" },
    { name: "BOB", symbol: "Bs." },
    { name: "PYG", symbol: "₲" },
    { name: "UYU", symbol: "$U" },
    { name: "HRK", symbol: "kn" },
    { name: "BGN", symbol: "лв" },
    { name: "RON", symbol: "lei" },
    { name: "HUF", symbol: "Ft" },
    { name: "CZK", symbol: "Kč" },
  ];

  useEffect(() => {
    // Fetch exchange rates from the Exchange Rates API
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/GHS?apiKey=${process.env.REACT_APP_currency_apiKey}`
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
  
        const data = await response.json();
  
        if (data && data.rates) {
          const modifiedRates = currencyOptions
            .filter((option) => data.rates.hasOwnProperty(option.name))
            .map((option) => ({
              name: option.name,
              symbol: option.symbol,
              factor: data.rates[option.name] || 1,
            }));
  
          setExchangeRates(modifiedRates);
        } else {
          console.error("Invalid response structure from the API");
        }
      } catch (error) {
        console.error("Error fetching exchange rates", error);
      }
    };
  
    fetchExchangeRates();
  }, [currencyOptions]);
  

  const handleCurrencyChange = (selectedOption) => {
    dispatch(
      setCurrencySymbol({
        symbol: selectedOption.symbol,
        factor: selectedOption.factor,
      })
    );
  };

  return (
    <div className="currency-converter" style={{ flex: 1 }}>
      <Dropdown
        value={exchangeRates.find(
          (option) => option.symbol === currencySymbol.symbol
        )}
        options={exchangeRates}
        optionLabel={(option) => `${option.name} (${option.symbol})`}
        onChange={(e) => handleCurrencyChange(e.value)}
        filter
        filterPlaceholder="Search"
        style={{ width: "100%" }}
        appendTo={document.body}
        virtualScrollerOptions={{ itemSize: 35 }} // Adjust the itemSize based on your needs
      />
    </div>
  );
};

export default CurrencyConverter;
