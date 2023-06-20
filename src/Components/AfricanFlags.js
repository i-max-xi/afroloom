import React, { useEffect, useState } from 'react';

const AfricanFlags = () => {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/region/africa');
        const data = await response.json();
        setFlags(data);
      } catch (error) {
        console.error('Error fetching African flags:', error);
      }
    };
    fetchFlags();
  }, []);

  return (
    <div>
      <div>
        {flags.map(flag => (
          <img
            key={flag.name.common}
            src={flag.flags.svg}
            alt={flag.name.common}
            style={{ width: '10px', height: 'auto', margin: '5px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default AfricanFlags;