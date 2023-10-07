export const getPriceRangeOptions = (currencySymbol, currencyFactor) => {
    return [
    //   { label: "All", value: "" },
      { label: `Under ${currencySymbol}${currencyFactor * 10}`, value: 10 * currencyFactor },
      { label: `${currencySymbol}${currencyFactor * 10} - ${currencySymbol}${currencyFactor * 25}`, value: 25 * currencyFactor },
      { label: `${currencySymbol}${currencyFactor * 25} - ${currencySymbol}${currencyFactor * 50}`, value: 50 * currencyFactor },
      { label: `${currencySymbol}${currencyFactor * 50} - ${currencySymbol}${currencyFactor * 100}`, value: 100 * currencyFactor },
      { label: `${currencySymbol}${currencyFactor * 100} - ${currencySymbol}${currencyFactor * 200}`, value: 200 * currencyFactor },
      { label: `Above ${currencySymbol}${currencyFactor * 200}`, value: 201 * currencyFactor }, // Adjusted value
    ];
  };
  
