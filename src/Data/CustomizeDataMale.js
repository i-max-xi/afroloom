import { v4 as uuid } from "uuid";

// import tshirt from "../Assets/Customize/Tshirt.jpg";
// import shirt from "../Assets/Customize/shirt.jpg";
import flare_shirt from "../Assets/Customize/flare_shirt.png";

// import topndown from "../Assets/Customize/topanddown.jpg";

// model imports
import tshirtModel1 from "../Pages/Customize/Configurator/models/MaleClothing/tshirt_main.glb";
import tshirtModel2 from "../Pages/Customize/Configurator/models/MaleClothing/tshirt_long_best.glb";
import shirtModel1 from "../Pages/Customize/Configurator/models/MaleClothing/short_sleeves_main.glb";
import shirtModel2 from "../Pages/Customize/Configurator/models/MaleClothing/long_sleeves_main_two.glb";
import trousersModel1 from "../Pages/Customize/Configurator/models/MaleClothing/male_trousers_better.glb";
import material_shorts from "../Pages/Customize/Configurator/models/MaleClothing/material_shorts.glb";
import summer_shorts from "../Pages/Customize/Configurator/models/MaleClothing/summer_shorts.glb";
import cloak from "../Pages/Customize/Configurator/models/MaleClothing/cloak.glb";
import topndown_model from "../Pages/Customize/Configurator/models/MaleClothing/male_topndown.glb";
import blazer from "../Pages/Customize/Configurator/models/MaleClothing/male_suit.glb";
import jacket from "../Pages/Customize/Configurator/models/Accessories/Unisex/jacket_main.glb";
import cloak_model from "../Pages/Customize/Configurator/models/MaleClothing/kimono.glb";

//size-guides
// import tshirt_model from "../Pages/Customize/Configurator/size_guide/male/men.JPG";

import tshirt_guide from "../Assets/size_guide/MaleClothing/men short sleeve  t-shirt_.jpg";
import tshirtlong_guide from "../Assets/size_guide/MaleClothing/Men-long-sleeve t-shirt.jpg";
import shirt_guide from "../Assets/size_guide/MaleClothing/men short sleeve shirt.jpg";
import shirtlong_guide from "../Assets/size_guide/MaleClothing/men long sleeve shirt.png";
import top_down_guide from "../Assets/size_guide/MaleClothing/mens kaftan.jpg";
import cloak_guide from "../Assets/size_guide/MaleClothing/mens kimono jacket.jpg";
import loose_top_guide from "../Assets/size_guide/MaleClothing/mens loose short sleeve t shirt.jpg";
import blazer_guide from "../Assets/size_guide/MaleClothing/men blazer.png";
import trouser_guide from "../Assets/size_guide/MaleClothing/mens trousers.jpg";
import summer_shorts_guide from "../Assets/size_guide/MaleClothing/men summer shorts.jpg";
import material_shorts_guide from "../Assets/size_guide/MaleClothing/men material shorts.png";
import jacket_guide from "../Assets/size_guide/MaleClothing/men Bomber_Jacket.jpg";

// parts
const tshirtParts = require.context(
  "../Assets/model_parts/MaleClothing/tshirt",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const tshirtLongParts = require.context(
  "../Assets/model_parts/MaleClothing/tshirt_long_best",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const shirtParts = require.context(
  "../Assets/model_parts/MaleClothing/shirt",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const shirtLongParts = require.context(
  "../Assets/model_parts/MaleClothing/shirt_long",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const topndownParts = require.context(
  "../Assets/model_parts/MaleClothing/male_topndown",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const topParts = require.context(
  "../Assets/model_parts/MaleClothing/cloak",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const blazerParts = require.context(
  "../Assets/model_parts/MaleClothing/blazer",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const trouserParts = require.context(
  "../Assets/model_parts/MaleClothing/trouser",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const summerShortsParts = require.context(
  "../Assets/model_parts/MaleClothing/summer_shorts",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const materialShortsParts = require.context(
  "../Assets/model_parts/MaleClothing/material_shorts",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const jacketParts = require.context(
  "../Assets/model_parts/Accessories/Unisex/jacket_main",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

// const tshirt_image = "https://a5e8126a499f8a963166-f72e9078d72b8c998606fd6e0319b679.ssl.cf5.rackcdn.com/images/variant/large/next-level_3600_black.jpg";
const image_tshirt_short = require("../Assets/welcome_3ds/male/male short sleev ankara.png");
const image_tshirt_long_image = require("../Assets/welcome_3ds/male/male long sleev ankara.png");
const image_shirt_short_image = require("../Assets/welcome_3ds/male/male short sleeve shirt.png");
const image_shirt_long_image = require("../Assets/welcome_3ds/male/male long sleeve shirt.png");
const image_topndown_image = require("../Assets/welcome_3ds/male/male top and down.png");
// const image_top_image = require("../Assets/welcome_3ds/male/male top.jpg");
const image_blazer_image = require("../Assets/welcome_3ds/male/male blazer.png");
const image_trouser_image = require("../Assets/welcome_3ds/male/male trousers.png");
const image_summer_image = require("../Assets/welcome_3ds/male/male summer shorts.png");
const image_shorts_image = require("../Assets/welcome_3ds/male/male shorts.png");
const image_jacket = require("../Assets/welcome_3ds/male/bomber_jacket.png");
const image_kimono = require("../Assets/welcome_3ds/male/kimono.png");

export const mainMaleCustomize = [
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
    parts: tshirtParts.keys().map(tshirtParts),
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
    parts: tshirtLongParts.keys().map(tshirtLongParts),
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
  {
    id: uuid(),
    name: "Short Sleeve Shirt",
    image: image_shirt_short_image,
    model: shirtModel1,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: shirt_guide,
    parts: shirtParts.keys().map(shirtParts),
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
    name: "Long Sleeve Shirt",
    image: image_shirt_long_image,
    model: shirtModel2,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    myX: 0,
    myY: 10,
    price: 120,
    sizeGuide: shirtlong_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: shirtLongParts.keys().map(shirtLongParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 15, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 15, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 15, colorPriceValue: 125 },
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
      {
        label: "Cuff (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Long Sleeve Top And Down Kaftan",
    image: image_topndown_image,
    model: topndown_model,
    myNode: [
      { name: "all", yardNeeded: 3 },
      // { name: "trousers", yardNeeded: 2 },
    ],
    otherYards: { small: 3, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    price: 210,
    sizeGuide: top_down_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: topndownParts.keys().map(topndownParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: -45, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: -45, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: -20, colorPriceValue: 120 },
      { label: "XL", value: 3, priceValue: -20, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 120 },
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
      {
        label: "Cuff (cm)",
      },
      {
        label: "Natural waist (cm)",
      },
      {
        label: "Trouser Waist (cm)",
      },
      {
        label: "Inside Leg (cm)",
      },
      {
        label: "Trouser Bottom (cm)",
      },
      {
        label: "Trouser Length (cm)",
      },
      {
        label: "Seat (cm)",
      },

      {
        label: "Thigh (cm)",
      },
      {
        label: "Knee (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Loose Short Sleeve Shirt",
    image: flare_shirt,
    model: cloak,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.8,
    myX: 0,
    myY: 10,
    price: 110,
    sizeGuide: loose_top_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: topParts.keys().map(topParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 120 },
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
    name: "Bomber Jacket",
    image: image_jacket,
    model: jacket,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 1 },
    ],
    otherYards: { small: 3, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.9,
    price: 140,
    parts: jacketParts.keys().map(jacketParts),
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: jacket_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 25, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 25, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 25, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Shoulder (cm)",
      },
      {
        label: "Chest (cm)",
      },
      {
        label: "Body Length (cm)",
      },
      {
        label: "Sleeve Length(cm)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Blazer",
    model: blazer,
    image: image_blazer_image,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 3, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.77,
    price: 390,
    sizeGuide: blazer_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: blazerParts.keys().map(blazerParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 25, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 25, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 50, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 50, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Chest (cm)",
      },
      {
        label: "Coat Waist (cm)",
      },
      {
        label: "Seat (cm)",
      },
      {
        label: "Natural Waist Length (cm)",
      },
      {
        label: "Half Across Back (cm)",
      },
      {
        label: "Elbow (cm)",
      },
      {
        label: "Sleeve Length (cm)",
      },
      {
        label: "Scye Depth (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Kimono Jacket",
    model: cloak_model,
    image: image_kimono,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 110,
    sizeGuide: cloak_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    // parts: cloakParts.keys().map(cloakParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 55, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 55, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 55, colorPriceValue: 120 },
      { label: "XL", value: 3, priceValue: 55, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 55, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Top Length (cm)",
      },
      {
        label: "Sleeve Length (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Trousers",
    image: image_trouser_image,
    model: trousersModel1,

    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 120,
    sizeGuide: trouser_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 25, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 25, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 50, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 50, colorPriceValue: 85 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Full Height (cm)",
      },
      {
        label: "Natural waist (cm)",
      },
      {
        label: "Trouser Waist (cm)",
      },
      {
        label: "Inside Leg (cm)",
      },
      {
        label: "Trouser Bottom (cm)",
      },
      {
        label: "Trouser Length (cm)",
      },
      {
        label: "Seat (cm)",
      },

      {
        label: "Thigh (cm)",
      },
      {
        label: "Knee (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Summer Shorts",
    image: image_summer_image,
    model: summer_shorts,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 100,
    sizeGuide: summer_shorts_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 0, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 0, colorPriceValue: 85 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 85 },
    ],
    parts: summerShortsParts.keys().map(summerShortsParts),
    sizeForms: [
      {
        label: "Shorts Length (cm)",
      },
      {
        label: "Seat (cm)",
      },
      {
        label: "Thigh (cm)",
      },
      {
        label: "Knee (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Shorts",
    image: image_shorts_image,
    model: material_shorts,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.5,
    myX: 0,
    myY: 10,
    price: 100,
    sizeGuide: material_shorts_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 0, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 0, colorPriceValue: 85 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 85 },
    ],
    sizeForms: [
      {
        label: "Natural Waist (cm)",
      },
      {
        label: "Shorts Waist (cm)",
      },
      {
        label: "Shorts Length (cm)",
      },
      {
        label: "Seat (cm)",
      },
      {
        label: "Thigh (cm)",
      },
      {
        label: "Knee (cm)",
      },
    ],
  },
];
