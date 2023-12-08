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
  { name: "AUD", factor: 1.35, symbol: "$" }, // Australian Dollar
  { name: "CAD", factor: 1.25, symbol: "$" }, // Canadian Dollar
  { name: "CHF", factor: 0.92, symbol: "CHF" }, // Swiss Franc
  { name: "CNY", factor: 6.45, symbol: "¥" }, // Chinese Yuan
  { name: "INR", factor: 73.5, symbol: "₹" }, // Indian Rupee
  { name: "SGD", factor: 1.33, symbol: "S$" }, // Singapore Dollar
  { name: "NZD", factor: 1.45, symbol: "$" }, // New Zealand Dollar
  { name: "AED", factor: 3.67, symbol: "د.إ" }, // United Arab Emirates Dirham
  { name: "BRL", factor: 5.25, symbol: "R$" }, // Brazilian Real
  { name: "MXN", factor: 20.05, symbol: "Mex$" }, // Mexican Peso
  { name: "TRY", factor: 8.75, symbol: "₺" }, // Turkish Lira
  { name: "RUB", factor: 73.95, symbol: "₽" }, // Russian Ruble
  { name: "SEK", factor: 8.85, symbol: "kr" }, // Swedish Krona
  { name: "NOK", factor: 8.63, symbol: "kr" }, // Norwegian Krone
  { name: "DKK", factor: 6.16, symbol: "kr" }, // Danish Krone
  { name: "THB", factor: 32.80, symbol: "฿" }, // Thai Baht
  { name: "MYR", factor: 4.15, symbol: "RM" }, // Malaysian Ringgit
  { name: "IDR", factor: 14450, symbol: "Rp" }, // Indonesian Rupiah
  { name: "PHP", factor: 50.30, symbol: "₱" }, // Philippine Peso
  { name: "KRW", factor: 1177.50, symbol: "₩" }, // South Korean Won
  { name: "ARS", factor: 98.50, symbol: "$" }, // Argentine Peso
  { name: "CLP", factor: 740.50, symbol: "$" }, // Chilean Peso
  { name: "COP", factor: 3895, symbol: "$" }, // Colombian Peso
  { name: "BHD", factor: 0.38, symbol: "ب.د" }, // Bahraini Dinar
  { name: "QAR", factor: 3.64, symbol: "ر.ق" }, // Qatari Riyal
  { name: "OMR", factor: 0.39, symbol: "ر.ع." }, // Omani Rial
  { name: "KWD", factor: 0.30, symbol: "د.ك" }, // Kuwaiti Dinar
  { name: "JOD", factor: 0.71, symbol: "د.ا" }, // Jordanian Dinar
  { name: "LBP", factor: 1507.50, symbol: "ل.ل" }, // Lebanese Pound
  { name: "PKR", factor: 284.00, symbol: "₨" }, // Pakistani Rupee
  { name: "ZMW", factor: 18.50, symbol: "ZK" }, // Zambian Kwacha
  { name: "RSD", factor: 102.50, symbol: "дин." }, // Serbian Dinar
  { name: "KWD", factor: 0.30, symbol: "د.ك" }, // Kuwaiti Dinar
  { name: "JOD", factor: 0.71, symbol: "د.ا" }, // Jordanian Dinar
  { name: "LBP", factor: 1507.50, symbol: "ل.ل" }, // Lebanese Pound
  { name: "PKR", factor: 284.00, symbol: "₨" }, // Pakistani Rupee
  { name: "ZMW", factor: 18.50, symbol: "ZK" }, // Zambian Kwacha
  { name: "RSD", factor: 102.50, symbol: "дин." }, // Serbian Dinar
  { name: "LKR", factor: 225.00, symbol: "රු" }, // Sri Lankan Rupee
  { name: "BDT", factor: 85.00, symbol: "৳" }, // Bangladeshi Taka
  { name: "NPR", factor: 116.00, symbol: "रू" }, // Nepalese Rupee
  { name: "BTN", factor: 74.00, symbol: "Nu." }, // Bhutanese Ngultrum
  { name: "MVR", factor: 15.40, symbol: "ރ." }, // Maldivian Rufiyaa
  { name: "MAD", factor: 10.86, symbol: "د.م." }, // Moroccan Dirham
  { name: "TND", factor: 2.89, symbol: "د.ت" }, // Tunisian Dinar
  { name: "DZD", factor: 207.50, symbol: "د.ج" }, // Algerian Dinar
  { name: "LYD", factor: 4.51, symbol: "ل.د" }, // Libyan Dinar
  { name: "SDG", factor: 440.00, symbol: "ج.س" }, // Sudanese Pound
  { name: "ETB", factor: 43.50, symbol: "ብር" }, // Ethiopian Birr
  { name: "VES", factor: 4.47, symbol: "Bs." }, // Venezuelan Bolívar
  { name: "PEN", factor: 4.06, symbol: "S/" }, // Peruvian Sol
  { name: "BOB", factor: 6.86, symbol: "Bs." }, // Bolivian Boliviano
  { name: "PYG", factor: 6500.00, symbol: "₲" }, // Paraguayan Guarani
  { name: "UYU", factor: 42.00, symbol: "$U" }, // Uruguayan Peso
  { name: "HRK", factor: 6.28, symbol: "kn" }, // Croatian Kuna
  { name: "BGN", factor: 1.65, symbol: "лв" }, // Bulgarian Lev
  { name: "RON", factor: 4.08, symbol: "lei" }, // Romanian Leu
  { name: "HUF", factor: 299.00, symbol: "Ft" }, // Hungarian Forint
  { name: "CZK", factor: 21.60, symbol: "Kč" }, // Czech Koruna
  { name: "SAR", factor: 3.75, symbol: "ر.س" }, // Saudi Riyal
  { name: "YER", factor: 250.00, symbol: "ر.ي" }, // Yemeni Rial
  { name: "IQD", factor: 1458.00, symbol: "ع.د" }, // Iraqi Dinar
  { name: "SYP", factor: 187.50, symbol: "ل.س" }, // Syrian Pound
  { name: "SAR", factor: 3.75, symbol: "ر.س" }, // Saudi Riyal
  { name: "YER", factor: 250.00, symbol: "ر.ي" }, // Yemeni Rial
  { name: "IQD", factor: 1458.00, symbol: "ع.د" }, // Iraqi Dinar
  { name: "SYP", factor: 187.50, symbol: "ل.س" }, // Syrian Pound
  { name: "IRR", factor: 42105, symbol: "﷼" }, // Iranian Rial
  { name: "AFN", factor: 78.80, symbol: "؋" }, // Afghan Afghani
  { name: "NPR", factor: 116.00, symbol: "रू" }, // Nepalese Rupee
  { name: "LKR", factor: 225.00, symbol: "රු" }, // Sri Lankan Rupee
  { name: "BDT", factor: 85.00, symbol: "৳" }, // Bangladeshi Taka
  { name: "BTN", factor: 74.00, symbol: "Nu." }, // Bhutanese Ngultrum
  { name: "MVR", factor: 15.40, symbol: "ރ." }, // Maldivian Rufiyaa
  { name: "MAD", factor: 10.86, symbol: "د.م." }, // Moroccan Dirham
  { name: "TND", factor: 2.89, symbol: "د.ت" }, // Tunisian Dinar
  { name: "DZD", factor: 207.50, symbol: "د.ج" }, // Algerian Dinar
  { name: "LYD", factor: 4.51, symbol: "ل.د" }, // Libyan Dinar
  { name: "SDG", factor: 440.00, symbol: "ج.س" }, // Sudanese Pound
  { name: "ETB", factor: 43.50, symbol: "ብር" }, // Ethiopian Birr
  { name: "VES", factor: 4.47, symbol: "Bs." }, // Venezuelan Bolívar
  { name: "PEN", factor: 4.06, symbol: "S/" }, // Peruvian Sol
  { name: "BOB", factor: 6.86, symbol: "Bs." }, // Bolivian Boliviano
  { name: "PYG", factor: 6500.00, symbol: "₲" }, // Paraguayan Guarani
  { name: "UYU", factor: 42.00, symbol: "$U" }, // Uruguayan Peso
  { name: "HRK", factor: 6.28, symbol: "kn" }, // Croatian Kuna
  { name: "BGN", factor: 1.65, symbol: "лв" }, // Bulgarian Lev
  { name: "RON", factor: 4.08, symbol: "lei" }, // Romanian Leu
  { name: "HUF", factor: 299.00, symbol: "Ft" }, // Hungarian Forint
  { name: "CZK", factor: 21.60, symbol: "Kč" }, // Czech Koruna
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
