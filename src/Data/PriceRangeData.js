export const getPriceRangeOptions = (currencySymbol, currencyFactor) => {
    return [
      { label: "All", value: "" },
      { label: `Under ${currencySymbol} ${currencyFactor * 20}`, value: 20 * currencyFactor },
      { label: `Under ${currencySymbol} ${currencyFactor * 50}`, value: 50 * currencyFactor },
      { label: `${currencySymbol} ${currencyFactor * 50} - ${currencySymbol} ${currencyFactor * 100}`, value: 100 * currencyFactor },
      { label: `${currencySymbol} ${currencyFactor * 100} - ${currencySymbol} ${currencyFactor * 200}`, value: 200 * currencyFactor },
      { label: `Above ${currencySymbol} ${currencyFactor * 200}`, value: 201 * currencyFactor }, // Adjusted value
    ];
  };
  
