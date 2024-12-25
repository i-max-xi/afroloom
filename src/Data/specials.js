import { v4 as uuid } from "uuid";

// import tshirt from "../Assets/Customize/Tshirt.jpg";
// import shirt from "../Assets/Customize/shirt.jpg";

// import topndown from "../Assets/Customize/topanddown.jpg";

// model imports
import tshirtModel1 from "../Pages/Customize/Configurator/models/MaleClothing/tshirt_main.glb";
import tshirtModel2 from "../Pages/Customize/Configurator/models/MaleClothing/tshirt_long_best.glb";

//size-guides
// import tshirt_model from "../Pages/Customize/Configurator/size_guide/male/men.JPG";

import tshirt_guide from "../Assets/size_guide/MaleClothing/men short sleeve  t-shirt_.jpg";
import tshirtlong_guide from "../Assets/size_guide/MaleClothing/Men-long-sleeve t-shirt.jpg";

// const tshirt_image = "https://a5e8126a499f8a963166-f72e9078d72b8c998606fd6e0319b679.ssl.cf5.rackcdn.com/images/variant/large/next-level_3600_black.jpg";
const image_tshirt_short = require("../Assets/welcome_3ds/male/male short sleev ankara.png");
const image_tshirt_long_image = require("../Assets/welcome_3ds/male/male long sleev ankara.png");
// const image_top_image = require("../Assets/welcome_3ds/male/male top.jpg");

export const specialsCustomize = [
  {
    id: uuid(),
    name: "Short Sleeve T-Shirt",
    image: image_tshirt_short,
    model: tshirtModel1,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Neck Size (cm)",
      },
      {
        label: "Half Across Back (cm)",
      },
      {
        label: "Chest (cm)",
      },
      {
        label: "Sleeve Length (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Long Sleeve T-Shirt",
    image: image_tshirt_long_image,
    model: tshirtModel2,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 120,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirtlong_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 5, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 5, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 5, colorPriceValue: 125 },
      { label: "XL", value: 3, priceValue: 40, colorPriceValue: 125 },
      { label: "2XL", value: 4, priceValue: 40, colorPriceValue: 125 },
    ],
    sizeForms: [
      {
        label: "Neck Size (cm)",
      },
      {
        label: "Half Across Back (cm)",
      },
      {
        label: "Chest (cm)",
      },
      {
        label: "Sleeve Length (cm)",
      },
    ],
  },
  

];
