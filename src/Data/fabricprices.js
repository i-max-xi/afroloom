
import { useEffect, useState } from "react";
import AllServices from "../Services/usersService"; // Make sure the path is correct



const FabricPrices = () => {

const [prices, setPrices] = useState({});

console.log({prices})

useEffect(() => { 
  const fetchPrices = async () => {
    try {
      const response = await AllServices.getAllFabrics();

      const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))


      const prices  = data.reduce((acc, fabric) => {
        const { id, price } = fabric;
        acc[id] = {
          price: parseFloat(price) || 1
        };
        return acc;
      }, {});

      setPrices(prices);
    } catch (error) {
      console.error("Error fetching Prices:", error);
    }
  };

  fetchPrices();
}, []);


 const textureValues = {
    batik: {
      price: prices["batik"]?.price,
      yardStart: 1,
    },
    waxPrint: {
      price: prices["waxPrint"]?.price,
      yardStart: 2,
    },
    Diaspora: {
      price: prices["Diaspora"]?.price,
      yardStart: 2,
    },
    commemorative: {
      price: prices["commemorative"]?.price,
      yardStart: 2,
    },
    newTextures: {
      price: prices["newTextures"]?.price,
      yardStart: 2,
    },
    logos: {
      price: prices["logos"]?.price,
      yardStart: 2,
    }
  };


  return textureValues
  
}

export default FabricPrices


