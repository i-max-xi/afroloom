// src/components/admin/SetPrices.js

import React, { useState, useEffect } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

const ManagePrices = () => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Fetch current price from backend (assuming there's an endpoint for it)
    const fetchPrice = async () => {
      try {
        const response = await fetch('/api/getPrice');
        const data = await response.json();
        setPrice(data.price);
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    fetchPrice();
  }, []);

  const savePrice = async () => {
    try {
      await fetch('/api/setPrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price })
      });
    } catch (error) {
      console.error('Error saving price:', error);
    }
  };

  return (
    <div>
      <h2>Manage Prices</h2>
      <div className="p-field">
        <label htmlFor="price">Price</label>
        <InputNumber
          id="price"
          value={price}
          onValueChange={(e) => setPrice(e.value)}
          mode="currency"
          currency="USD"
          locale="en-US"
        />
      </div>
      <Button label="Save" onClick={savePrice} />
    </div>
  );
};

export default ManagePrices;
