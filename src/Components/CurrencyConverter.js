import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencySymbol } from "../Redux/store"; // Update the import path
import { Dropdown } from "primereact/dropdown";

const currencyOptions = [
  { name: "USD", factor: 0.088, symbol: "$" }, // Updated USD factor
  { name: "GHS", factor: 1, symbol: "₵" }, // Set GHS as default currency with factor 1
  { name: "EUR", factor: 0.079, symbol: "€" }, // Updated EUR factor
  { name: "GBP", factor: 0.063, symbol: "£" }, // Updated GBP factor
  { name: "ZAR", factor: 0.843, symbol: "R" }, // Updated ZAR factor
  { name: "NGN", factor: 17.12, symbol: "₦" }, // Updated NGN factor
  { name: "EGP", factor: 2.46, symbol: "ج.م" }, // Updated EGP factor
  { name: "KES", factor: 9.61, symbol: "KSh" }, // Updated KES factor
  { name: "JPY", factor: 9.43, symbol: "¥" }, // Updated JPY factor
  // Update factors for other currencies accordingly...
  { name: "AUD", factor: 0.071, symbol: "$" }, // Australian Dollar
  { name: "CAD", factor: 0.066, symbol: "$" }, // Canadian Dollar
  { name: "CHF", factor: 0.068, symbol: "CHF" }, // Swiss Franc
  { name: "CNY", factor: 1.03, symbol: "¥" }, // Chinese Yuan
  { name: "INR", factor: 13.11, symbol: "₹" }, // Indian Rupee
  { name: "SGD", factor: 0.094, symbol: "S$" }, // Singapore Dollar
  { name: "NZD", factor: 0.077, symbol: "$" }, // New Zealand Dollar
  { name: "AED", factor: 0.252, symbol: "د.إ" }, // United Arab Emirates Dirham
  { name: "BRL", factor: 0.399, symbol: "R$" }, // Brazilian Real
  { name: "MXN", factor: 1.92, symbol: "Mex$" }, // Mexican Peso
  { name: "TRY", factor: 0.264, symbol: "₺" }, // Turkish Lira
  { name: "RUB", factor: 4.89, symbol: "₽" }, // Russian Ruble
  { name: "SEK", factor: 0.274, symbol: "kr" }, // Swedish Krona
  { name: "NOK", factor: 0.291, symbol: "kr" }, // Norwegian Krone
  { name: "DKK", factor: 0.162, symbol: "kr" }, // Danish Krone
  { name: "THB", factor: 5.07, symbol: "฿" }, // Thai Baht
  { name: "MYR", factor: 0.242, symbol: "RM" }, // Malaysian Ringgit
  { name: "IDR", factor: 3117.27, symbol: "Rp" }, // Indonesian Rupiah
  { name: "PHP", factor: 9.93, symbol: "₱" }, // Philippine Peso
  { name: "KRW", factor: 85.0, symbol: "₩" }, // South Korean Won
  { name: "ARS", factor: 1.0, symbol: "$" }, // Argentine Peso
  { name: "CLP", factor: 7.51, symbol: "$" }, // Chilean Peso
  { name: "COP", factor: 39.5, symbol: "$" }, // Colombian Peso
  // Update factors for other currencies accordingly...
  { name: "BHD", factor: 1.0, symbol: "ب.د" }, // Bahraini Dinar
  { name: "QAR", factor: 9.58, symbol: "ر.ق" }, // Qatari Riyal
  { name: "OMR", factor: 1.03, symbol: "ر.ع." }, // Omani Rial
  { name: "KWD", factor: 0.79, symbol: "د.ك" }, // Kuwaiti Dinar
  { name: "JOD", factor: 1.86, symbol: "د.ا" }, // Jordanian Dinar
  { name: "LBP", factor: 39211.76, symbol: "ل.ل" }, // Lebanese Pound
  { name: "PKR", factor: 738.05, symbol: "₨" }, // Pakistani Rupee
  { name: "ZMW", factor: 48.65, symbol: "ZK" }, // Zambian Kwacha
  { name: "RSD", factor: 269.74, symbol: "дин." }, // Serbian Dinar
  { name: "LKR", factor: 3130.14, symbol: "රු" }, // Sri Lankan Rupee
  { name: "BDT", factor: 315.79, symbol: "৳" }, // Bangladeshi Taka
  { name: "NPR", factor: 158.62, symbol: "रू" }, // Nepalese Rupee
  { name: "BTN", factor: 135.14, symbol: "Nu." }, // Bhutanese Ngultrum
  { name: "MVR", factor: 38.96, symbol: "ރ." }, // Maldivian Rufiyaa
  { name: "MAD", factor: 29.21, symbol: "د.م." }, // Moroccan Dirham
  { name: "TND", factor: 7.97, symbol: "د.ت" }, // Tunisian Dinar
  { name: "DZD", factor: 59.66, symbol: "د.ج" }, // Algerian Dinar
  { name: "LYD", factor: 1.3, symbol: "ل.د" }, // Libyan Dinar
  { name: "SDG", factor: 2653.54, symbol: "ج.س" }, // Sudanese Pound
  { name: "ETB", factor: 261.54, symbol: "ብር" }, // Ethiopian Birr
  { name: "VES", factor: 26.31, symbol: "Bs." }, // Venezuelan Bolívar
  { name: "PEN", factor: 23.96, symbol: "S/" }, // Peruvian Sol
  { name: "BOB", factor: 40.47, symbol: "Bs." }, // Bolivian Boliviano
  { name: "PYG", factor: 487473.68, symbol: "₲" }, // Paraguayan Guarani
  { name: "UYU", factor: 3147.37, symbol: "$U" }, // Uruguayan Peso
  { name: "HRK", factor: 46.95, symbol: "kn" }, // Croatian Kuna
  { name: "BGN", factor: 12.32, symbol: "лв" }, // Bulgarian Lev
  { name: "RON", factor: 30.48, symbol: "lei" }, // Romanian Leu
  { name: "HUF", factor: 22451.69, symbol: "Ft" }, // Hungarian Forint
  { name: "CZK", factor: 1579.63, symbol: "Kč" }, // Czech Koruna
  { name: "SAR", factor: 0.56, symbol: "ر.س" }, // Saudi Riyal
  { name: "YER", factor: 37.31, symbol: "ر.ي" }, // Yemeni Rial
  { name: "IQD", factor: 216.38, symbol: "ع.د" }, // Iraqi Dinar
  { name: "SYP", factor: 27.93, symbol: "ل.س" }, // Syrian Pound
  { name: "IRR", factor: 704945.05, symbol: "﷼" }, // Iranian Rial
  { name: "NPR", factor: 1.01, symbol: "रू" }, // Nepalese Rupee
  { name: "LKR", factor: 1.96, symbol: "රු" }, // Sri Lankan Rupee
  { name: "BDT", factor: 0.74, symbol: "৳" }, // Bangladeshi Taka
  { name: "BTN", factor: 0.65, symbol: "Nu." }, // Bhutanese Ngultrum
  { name: "MVR", factor: 0.14, symbol: "ރ." }, // Maldivian Rufiyaa
  { name: "MAD", factor: 0.1, symbol: "د.م." }, // Moroccan Dirham
  { name: "TND", factor: 0.03, symbol: "د.ت" }, // Tunisian Dinar
  { name: "DZD", factor: 1.41, symbol: "د.ج" }, // Algerian Dinar
  { name: "LYD", factor: 0.03, symbol: "ل.د" }, // Libyan Dinar
  { name: "SDG", factor: 6.92, symbol: "ج.س" }, // Sudanese Pound
  { name: "ETB", factor: 0.68, symbol: "ብር" }, // Ethiopian Birr
  { name: "VES", factor: 0.07, symbol: "Bs." }, // Venezuelan Bolívar
  { name: "PEN", factor: 0.06, symbol: "S/" }, // Peruvian Sol
  { name: "BOB", factor: 0.11, symbol: "Bs." }, // Bolivian Boliviano
  { name: "PYG", factor: 104.17, symbol: "₲" }, // Paraguayan Guarani
  { name: "UYU", factor: 0.68, symbol: "$U" }, // Uruguayan Peso
  { name: "HRK", factor: 0.1, symbol: "kn" }, // Croatian Kuna
  { name: "BGN", factor: 0.03, symbol: "лв" }, // Bulgarian Lev
  { name: "RON", factor: 0.07, symbol: "lei" }, // Romanian Leu
  { name: "HUF", factor: 5.0, symbol: "Ft" }, // Hungarian Forint
  { name: "CZK", factor: 0.35, symbol: "Kč" }, // Czech Koruna
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
    <div className="currency-converter" style={{flex: 1}}>
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
