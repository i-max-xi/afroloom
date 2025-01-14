import { v4 as uuid } from "uuid";

// sneakers
// import s2 from "../Assets/Customize/footwear/sneaker/2.jpg";

// 3d models
import flex_shoe from "../Pages/Customize/Configurator/models/Shoes/flexible_shoe_main_two.glb";
import slippers from "../Pages/Customize/Configurator/models/Shoes/slippers_main.glb";
import heels from "../Pages/Customize/Configurator/models/Shoes/heels_main.glb";
import sneaker_model from "../Pages/Customize/Configurator/models/Shoes/sneaker.glb";

// Importing size guides
import flatShoe_guide from "../Assets/size_guide/Footwear/slipper.jpg";
import sneaker_guide from "../Assets/size_guide/Footwear/slipper.jpg";
import slipper_guide from "../Assets/size_guide/Footwear/slipper.jpg";
import heels_guide from "../Assets/size_guide/Footwear/34.jpg";

// models
const tshirt_model = "";

const image_flat_shoe = require("../Assets/welcome_3ds/others/flat shoe.png");
const image_slippers = require("../Assets/welcome_3ds/others/silipers.png");

export const mainFootwear = [
  {
    id: uuid(),
    name: "Flat Shoe",
    // image: s2,
    image: image_flat_shoe,
    model: flex_shoe,
    // myNode: ["sole", "front", "back"],
    myNode: [
      { name: "front", yardNeeded: 1 },
      { name: "sole", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.9,
    price: 150 + 200,
    sizeGuide: flatShoe_guide,
    sizeModels: tshirt_model,
    readyIn: 7,
    weight: 0.25,

    sizeOptions: [
      { label: "35", value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: "36", value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: "37", value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: "38", value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: "39", value: 4, priceValue: 0, colorPriceValue: 0 },
      { label: "40", value: 5, priceValue: 0, colorPriceValue: 0 },
      { label: "41", value: 6, priceValue: 0, colorPriceValue: 0 },
      { label: "42", value: 7, priceValue: 0, colorPriceValue: 0 },
      { label: "43", value: 5, priceValue: 0, colorPriceValue: 0 },
      { label: "44", value: 6, priceValue: 0, colorPriceValue: 0 },
      { label: "45", value: 7, priceValue: 0, colorPriceValue: 0 },
      { label: "46", value: 8, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: "Length (cm)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Sneaker",
    image:
      "https://cdn.myshoptet.com/usr/www.footic.com/user/shop/big/41126-9_vegan-sneakers.jpg?65f85889",
    model: sneaker_model,
    // myNode: ["front", "lace", "sole", "back"],
    myNode: [
      { name: "front", yardNeeded: 1 },
      { name: "lace", yardNeeded: 1 },
      { name: "sole", yardNeeded: 1 },
      // { name: "back", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.9,
    price: 100 + 200,
    sizeGuide: sneaker_guide,
    sizeModels: tshirt_model,
    readyIn: 7,
    weight: 0.25,
    sizeOptions: [
      { label: "35", value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: "36", value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: "37", value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: "38", value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: "39", value: 4, priceValue: 0, colorPriceValue: 0 },
      { label: "40", value: 5, priceValue: 0, colorPriceValue: 0 },
      { label: "41", value: 6, priceValue: 0, colorPriceValue: 0 },
      { label: "42", value: 7, priceValue: 0, colorPriceValue: 0 },
      { label: "43", value: 5, priceValue: 0, colorPriceValue: 0 },
      { label: "44", value: 6, priceValue: 0, colorPriceValue: 0 },
      { label: "45", value: 7, priceValue: 0, colorPriceValue: 0 },
      { label: "46", value: 8, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: "Length (cm)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Slipper",
    // image: "https://th.bing.com/th/id/OIP.5gl1niRXNH5qhTxWLH4ybQHaHa?pid=ImgDet&w=1000&h=1000&rs=1",
    image: image_slippers,
    model: slippers,
    // myNode: ["padding", "top", "sole"],
    myNode: [
      { name: "top", yardNeeded: 1 },
      { name: "sole", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 1.2,
    price: 150 + 200,
    sizeModels: tshirt_model,
    readyIn: 7,
    weight: 0.25,
    sizeGuide: slipper_guide,
    sizeOptions: [
      { label: "35", value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: "36", value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: "37", value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: "38", value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: "39", value: 4, priceValue: 0, colorPriceValue: 0 },
      { label: "40", value: 5, priceValue: 0, colorPriceValue: 0 },
      { label: "41", value: 6, priceValue: 0, colorPriceValue: 0 },
      { label: "42", value: 7, priceValue: 0, colorPriceValue: 0 },
      { label: "43", value: 5, priceValue: 0, colorPriceValue: 0 },
      { label: "44", value: 6, priceValue: 0, colorPriceValue: 0 },
      { label: "45", value: 7, priceValue: 0, colorPriceValue: 0 },
      { label: "46", value: 8, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: "Length (cm)",
      },
      {
        label: "Width (cm)",
      },
    ],
  },
  // {
  //   id: uuid(),
  //   name: "High Heel",
  //   image:
  //     "https://th.bing.com/th/id/OIP.UMGJguReHwKJtDNEdf5-NQHaHa?pid=ImgDet&rs=1",
  //   model: heels,
  //   // myNode: ["sole", "top"],
  //   myNode: [{ name: "sole", yardNeeded: 1 }, { name: "top", yardNeeded: 1 }],
  //   otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
  //   myZoom: 0.6,
  //   price: 150,
  //   sizeGuide: heels_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
  //   weight: 0.25,
  //   sizeOptions: [
  //     { label: "35", value: 0.5 },
  //     { label: "36", value: 1 },
  //     { label: "37", value: 2 },
  //     { label: "38", value: 3 },
  //     { label: "39", value: 4 },
  //     { label: "40", value: 5 },
  //     { label: "41", value: 6 },
  //     { label: "42", value: 7 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Heel-to-Toe Length (cm)",
  //     },
  //     {
  //       label: "Heel Height (cm)",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
];
