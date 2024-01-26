export const getPriceRangeOptions = (currencySymbol, currencyFactor) => {
    return [
    //   { label: "All", value: "" },
      { label: `Under ${currencySymbol}${(currencyFactor * 10/0.088).toFixed(0)}`, value: 10 * currencyFactor },
      { label: `${currencySymbol}${(currencyFactor * 10/0.088).toFixed(0)} - ${currencySymbol}${(currencyFactor * 25/0.088).toFixed(0)}`, value: 25 * currencyFactor },
      { label: `${currencySymbol}${(currencyFactor * 25/0.088).toFixed(0)} - ${currencySymbol}${(currencyFactor * 50/0.088).toFixed(0)}`, value: 50 * currencyFactor },
      { label: `${currencySymbol}${(currencyFactor * 50/0.088).toFixed(0)} - ${currencySymbol}${(currencyFactor * 100/0.088).toFixed(0)}`, value: 100 * currencyFactor },
      { label: `${currencySymbol}${(currencyFactor * 100/0.088).toFixed(0)} - ${currencySymbol}${(currencyFactor * 200/0.088).toFixed(0)}`, value: 200 * currencyFactor },
      { label: `Above ${currencySymbol}${(currencyFactor * 200/0.088).toFixed(0)}`, value: 201 * currencyFactor }, // Adjusted value
    ];
  };
  
