export const getPriceRangeOptions = (currencySymbol, currencyFactor) => {
    return [
    //   { label: "All", value: "" },
      { label: `Under ${currencySymbol}${(currencyFactor * 100).toFixed(0)}`, value: 100 * currencyFactor },
      { label: `${currencySymbol}${(currencyFactor * 100).toFixed(0)} - ${currencySymbol}${(currencyFactor * 250).toFixed(0)}`, value: 250 * currencyFactor },
      { label: `${currencySymbol}${(currencyFactor * 250).toFixed(0)} - ${currencySymbol}${(currencyFactor * 500).toFixed(0)}`, value: 500 * currencyFactor },
      { label: `${currencySymbol}${(currencyFactor * 500).toFixed(0)} - ${currencySymbol}${(currencyFactor * 1000).toFixed(0)}`, value: 1000 * currencyFactor },
      { label: `${currencySymbol}${(currencyFactor * 1000).toFixed(0)} - ${currencySymbol}${(currencyFactor * 2000).toFixed(0)}`, value: 2000 * currencyFactor },
      { label: `Above ${currencySymbol}${(currencyFactor * 2000).toFixed(0)}`, value: 2001 * currencyFactor }, // Adjusted value
    ];
  };
  
