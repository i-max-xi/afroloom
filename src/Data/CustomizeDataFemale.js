import { v4 as uuid } from "uuid";

import cloak from "../Assets/Customize/cloak.jpg";
import skirt from "../Assets/welcome_3ds/female/skirt.png";
import normal_top from "../Assets/Customize/normal_top.png";

//models
import t_shirt_short from "../Pages/Customize/Configurator/models/FemaleClothing/tshirt_short_two.glb";
import t_shirt_long from "../Pages/Customize/Configurator/models/FemaleClothing/tshirt_long_two.glb";
import skirt_model from "../Pages/Customize/Configurator/models/FemaleClothing/skirt_main.glb";
import trousers from "../Pages/Customize/Configurator/models/FemaleClothing/female_actual_trousers.glb";
import top_model from "../Pages/Customize/Configurator/models/FemaleClothing/shoulders_top.glb";
import normal_top_model from "../Pages/Customize/Configurator/models/FemaleClothing/ladies_normal_top.glb";
import mini_skirt_model from "../Pages/Customize/Configurator/models/FemaleClothing/mini_skirt_main.glb";
import cloak_model from "../Pages/Customize/Configurator/models/FemaleClothing/cloak.glb";
import topndown_model from "../Pages/Customize/Configurator/models/MaleClothing/male_topndown.glb";
import blazer from "../Pages/Customize/Configurator/models/FemaleClothing/female_suit_main.glb";
import extra_long from "../Pages/Customize/Configurator/models/FemaleClothing/female_shirt_extra_long_two.glb";
import extra_short from "../Pages/Customize/Configurator/models/FemaleClothing/female_shirt_extra_short.glb";
import booty_shorts from "../Pages/Customize/Configurator/models/FemaleClothing/booty_shorts.glb";
import material_shorts from "../Pages/Customize/Configurator/models/FemaleClothing/material_shorts.glb";
import jacket from "../Pages/Customize/Configurator/models/Accessories/Unisex/jacket_main.glb";
import bikini from "../Pages/Customize/Configurator/models/Accessories/bikini.glb";

// size guides
import tshirt_guide from "../Assets/size_guide/FemaleClothing/short_sleeves_tshirt.png";
import tshirtlong_guide from "../Assets/size_guide/FemaleClothing/women long t shirt.jpg";
import extraShortShirt_guide from "../Assets/size_guide/FemaleClothing/women short sleeve shirt.jpg";
import extraLongShirt_guide from "../Assets/size_guide/FemaleClothing/long sleeve shirt.png";
import cropTop_guide from "../Assets/size_guide/FemaleClothing/crop_top.jpg";
import normalTop_guide from "../Assets/size_guide/FemaleClothing/ladies short sleeve loose top.jpg";
import material_shorts_guide from "../Assets/size_guide/FemaleClothing/ladies material shorts.jpg";
import top_down_guide from "../Assets/size_guide/FemaleClothing/ladies kaftan_page-0001.jpg";
// import kabaSlit_guide from '../Assets/size_guide/FemaleClothing/';
import cloak_guide from "../Assets/size_guide/FemaleClothing/ladies kimono.jpg";
import blazer_guide from "../Assets/size_guide/FemaleClothing/female  blazer.jpg";
import skirt_guide from "../Assets/size_guide/FemaleClothing/women long skirt.jpg";
import miniSkirt_guide from "../Assets/size_guide/FemaleClothing/women mini skirt.jpg";
import bootyShorts_guide from "../Assets/size_guide/FemaleClothing/booty shorts.jpg";
import trousers_guide from "../Assets/size_guide/FemaleClothing/women trousers.jpg";
import jacket_guide from "../Assets/size_guide/FemaleClothing/ladies bomber.png";
import bikini_guide from "../Assets/size_guide/Accessories/Female/31.jpg";

// models

//part images
const tShirtShortParts = require.context(
  "../Assets/model_parts/FemaleClothing/tshirt_short",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const tShirtLongParts = require.context(
  "../Assets/model_parts/FemaleClothing/tshirt_long",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const extraShortShirtParts = require.context(
  "../Assets/model_parts/FemaleClothing/female_shirt_extra_short",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const extraLongShirtParts = require.context(
  "../Assets/model_parts/FemaleClothing/female_shirt_extra_long_two",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const cropTopParts = require.context(
  "../Assets/model_parts/FemaleClothing/shoulders_top",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const normalTopParts = require.context(
  "../Assets/model_parts/FemaleClothing/ladies_normal_top",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const blazerParts = require.context(
  "../Assets/model_parts/FemaleClothing/blazer",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const cloakParts = require.context(
  "../Assets/model_parts/FemaleClothing/cloak",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const skirtParts = require.context(
  "../Assets/model_parts/FemaleClothing/skirt",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const miniSkirtParts = require.context(
  "../Assets/model_parts/FemaleClothing/mini_skirt",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const bootyShortsParts = require.context(
  "../Assets/model_parts/FemaleClothing/booty_shorts",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const trousersParts = require.context(
  "../Assets/model_parts/FemaleClothing/trouser",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const image_tshirt_long = require("../Assets/welcome_3ds/female/long sleev t shirt.png");
const image_shirt_long = require("../Assets/welcome_3ds/female/women long sleev shirt.png");
const image_crop_top = require("../Assets/welcome_3ds/female/crop top.png");
const image_bikini = require("../Assets/welcome_3ds/female/bikini.png");
// const image_top = require("../Assets/welcome_3ds/female/");
// const image_topndown = require("../Assets/welcome_3ds/female/");
// const image_dress = require("../Assets/welcome_3ds/female/");
// const image_kaba_slit = require("../Assets/welcome_3ds/female/");
const image_blazer = require("../Assets/welcome_3ds/female/women blazer.png");
// const image_cloak = require("../Assets/welcome_3ds/female/");
// const image_long_skirt = require("../Assets/welcome_3ds/female/long skirt.jpg");
const image_mini_skirt = require("../Assets/welcome_3ds/female/mini skirt.png");
const image_booty_shorts = require("../Assets/welcome_3ds/female/booty 2.png");
const image_leggings = require("../Assets/welcome_3ds/female/leggings.png");
const image_jacket = require("../Assets/welcome_3ds/female/bomber_jacket.png");
const image_topndown_image = require("../Assets/welcome_3ds/female/kaftan.png");
const image_material_shorts_image = require("../Assets/welcome_3ds/female/material_shorts.png");

export const mainFemaleCustomize = [
  {
    id: uuid(),
    name: "Short Sleeve T-Shirt",
    // image: image_tshirt_short,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/7/ZF/KX/CN/32220664/women-s-tie-dye-t-shirt-500x500.jpg",
    model: t_shirt_short,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.7,
    price: 110,
    sizeGuide: tshirt_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: tShirtShortParts.keys().map(tShirtShortParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 85 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Bust (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
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
    name: "Long Sleeve T-Shirt",
    image: image_tshirt_long,
    model: t_shirt_long,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 1.1,
    price: 120,
    sizeGuide: tshirtlong_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: tShirtLongParts.keys().map(tShirtLongParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 15, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 15, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 15, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 40, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 40, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Bust (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
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
    name: "Short Sleeve Shirt",
    // image: image_shirt_short,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/9/m/s/m-224086901-vero-moda-original-imaghcyybzxrqmn8.jpeg?q=90&crop=false",
    model: extra_short,
    myNode: [
      { name: "all", yardNeeded: 2 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.7,
    price: 110,
    sizeGuide: extraShortShirt_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: extraShortShirtParts.keys().map(extraShortShirtParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 85 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Bust (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
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
    name: "Long Sleeve Shirt",
    image: image_shirt_long,
    model: extra_long,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 3, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 120,
    sizeGuide: extraLongShirt_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: extraLongShirtParts.keys().map(extraLongShirtParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 15, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 15, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 15, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 40, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 40, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Bust (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
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
    name: "Flare Top",
    image: normal_top,
    model: normal_top_model,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 110,
    sizeGuide: normalTop_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: normalTopParts.keys().map(normalTopParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 85 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Bust (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
      {
        label: "Top Length (cm)",
      },
      {
        label: "Sleeve Length (cm)",
      },
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Top And Down",
  //   model: topndown_model,
  //   image: topndown,
  //   myNode: [
  //     { name: "top", yardNeeded: 2 },
  //     { name: "trousers", yardNeeded: 2 },
  //   ],
  //   myZoom: 0.95,
  //   price: 20,
  //   sizeGuide: topAndDown_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
  //   parts: topAndDownParts.keys().map(topAndDownParts),
  //   sizeOptions: [
  //     // { label: "XS", value: 0.5 },
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Bust (cm)",
  //     },
  //     {
  //       label: "Waist (cm)",
  //     },
  //     {
  //       label: "Hip (cm)",
  //     },
  //     {
  //       label: "Sleeve Length (cm)",
  //     },
  //     {
  //       label: "Around arm (cm)",
  //     },
  //     {
  //       label: "Cuff (cm)",
  //     },
  //     {
  //       label: "Short Length (cm)",
  //     },
  //   ],
  // },
  // {
  //   id: uuid(),
  //   name: "Dress",
  //   model: dress_model,
  //   image: dress,
  //   myNode: [
  //     "down",
  //     "left_hand",
  //     "left_hand_cuff",
  //     "right_hand",
  //     "right_hand_cuff",
  //     "top",
  //     "top_edge",
  //   ],
  //   myZoom: 1,
  //   price: 20,
  //   sizeGuide: dress_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
  //   parts: dressParts.keys().map(dressParts),
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Bust (cm)",
  //     },
  //     {
  //       label: "Waist (cm)",
  //     },
  //     {
  //       label: "Hip (cm)",
  //     },
  //     {
  //       label: "Shoulder-to-waist (cm)",
  //     },
  //     {
  //       label: "Sleeve Length (cm)",
  //     },
  //     {
  //       label: "Around arm (cm)",
  //     },
  //     {
  //       label: "Cuff (cm)",
  //     },
  //   ],
  // },
  // {
  //   id: uuid(),
  //   name: "Kaba and Slit",
  //   model: kaba_slit,
  //   image: kabanslit,
  //   myNode: ["left_hand", "right_hand", "top", "top_pattern", "down"],
  //   myZoom: 1.15,
  //   price: 20,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
  //   parts: kabaSlitParts.keys().map(kabaSlitParts),
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Length (cm)",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
  {
    id: uuid(),
    name: "Bikini",
    image: image_bikini,
    model: bikini,
    myNode: [
      { name: "bikini_all", yardNeeded: 3 },
      { name: "bikini_top", yardNeeded: 1 },
    ],
    otherYards: { small: 1, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 100,
    // parts: bikiniParts.keys().map(bikiniParts),
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: bikini_guide,
    sizeOptions: [
      // { label: "XS", value: 0.5 },
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 60 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 60 },
      { label: "L", value: 2, priceValue: 0, colorPriceValue: 60 },
      { label: "XL", value: 3, priceValue: 0, colorPriceValue: 60 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 60 },
    ],
    sizeForms: [
      {
        label: "Upper Bust (cm)",
      },
      {
        label: "Under Bust (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Bottom Length (cm)",
      },
      // Add more form fields as needed
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
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    price: 210,
    sizeGuide: top_down_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    // parts: topndownParts.keys().map(topndownParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: -45, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: -45, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: -20, colorPriceValue: 120 },
      { label: "XL", value: 3, priceValue: -20, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: -20, colorPriceValue: 120 },
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
    name: "Crop Top",
    // image: "https://sportsfore.com/wp-content/uploads/2020/05/5-68.jpg",
    image: image_crop_top,
    model: top_model,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 1.2,
    price: 110,
    sizeGuide: cropTop_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: cropTopParts.keys().map(cropTopParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 0, colorPriceValue: 50 },
      { label: "XL", value: 3, priceValue: 0, colorPriceValue: 50 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 50 },
    ],
    sizeForms: [
      {
        label: "Bust (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
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
    name: "Bomber Jacket",
    image: image_jacket,
    model: jacket,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 1 },
    ],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.9,
    price: 140,
    // parts: jacketParts.keys().map(jacketParts),
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: jacket_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 25, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 25, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 50, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
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
    image: image_blazer,
    myNode: [
      { name: "all", yardNeeded: 3 },
      // { name: "sleeves", yardNeeded: 0 },
    ],
    otherYards: { small: 3, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 1,
    price: 260,
    sizeGuide: blazer_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: blazerParts.keys().map(blazerParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 25, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 25, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 120 },
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
    image: cloak,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.9,
    price: 110,
    sizeGuide: cloak_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: cloakParts.keys().map(cloakParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 55, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 55, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 55, colorPriceValue: 120 },
      { label: "XL", value: 3, priceValue: 70, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 70, colorPriceValue: 120 },
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
    name: "Long Skirt",
    model: skirt_model,
    image: skirt,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.9,
    price: 100,
    sizeGuide: skirt_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: skirtParts.keys().map(skirtParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 50, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 50, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Skirt Length (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Mini Skirt",
    model: mini_skirt_model,
    image: image_mini_skirt,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 100,
    sizeGuide: miniSkirt_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: miniSkirtParts.keys().map(miniSkirtParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 0, colorPriceValue: 50 },
      { label: "XL", value: 3, priceValue: 0, colorPriceValue: 50 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 50 },
    ],
    sizeForms: [
      {
        label: "Skirt Length (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Booty Shorts",
    model: booty_shorts,
    image: image_booty_shorts,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.6,
    price: 100,
    sizeGuide: bootyShorts_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: bootyShortsParts.keys().map(bootyShortsParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 0, colorPriceValue: 50 },
      { label: "XL", value: 3, priceValue: 0, colorPriceValue: 50 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 50 },
    ],
    sizeForms: [
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
      {
        label: "Length (cm)",
      },
      // Add more form fields as needed
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Summer Shorts",
  //   image: image_summer_image,
  //   model: summer_shorts,
  //   myNode: [{ name: "all", yardNeeded: 2 }],
  //   myZoom: 0.7,
  //   myX: 0,
  //   myY: 10,
  //   price: 30,
  //   sizeGuide: summer_shorts_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },

  //   ],
  //   // parts: summerShortsParts.keys().map(summerShortsParts),
  //   sizeForms: [
  //     {
  //       label: "Shorts Length (cm)",
  //     },
  //     {
  //       label: "Seat (cm)",
  //     },
  //     {
  //       label: "Thigh (cm)",
  //     },
  //     {
  //       label: "Knee (cm)",
  //     },
  //   ],
  // },
  {
    id: uuid(),
    name: "Shorts",
    image: image_material_shorts_image,
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
    // parts: materialShortsParts.keys().map(materialShortsParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 0, colorPriceValue: 50 },
      { label: "XL", value: 3, priceValue: 0, colorPriceValue: 50 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 50 },
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
  {
    id: uuid(),
    name: "Trousers",
    model: trousers,
    // image: image_trousers,
    image: image_leggings,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    price: 120,
    sizeGuide: trousers_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    parts: trousersParts.keys().map(trousersParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 25, colorPriceValue: 80 },
      { label: "M", value: 1, priceValue: 25, colorPriceValue: 80 },
      { label: "L", value: 2, priceValue: 50, colorPriceValue: 120 },
      { label: "XL", value: 3, priceValue: 50, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Trouser Length (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Hip (cm)",
      },
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Leggings",
  //   model: leggings,
  //   image: image_leggings,
  //   myNode: [
  //     { name: "all", yardNeeded: 2 },
  //   ],
  //   myZoom: 0.8,
  //   price: 20,
  //   sizeGuide: leggings_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
  //   parts: leggingsParts.keys().map(leggingsParts),
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Trouser Length (cm)",
  //     },
  //     {
  //       label: "Waist (cm)",
  //     },
  //     {
  //       label: "Hip (cm)",
  //     },
  //   ],
  // },
];
