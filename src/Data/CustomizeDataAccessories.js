import { v4 as uuid } from "uuid";

// import handbag from "../Assets/Customize/hand_bag.png";
// import bikini_img from "../Assets/Customize/bikini.png";

// hats
import h1 from "../Assets/Customize/maleAccessories/hat/1.jpg";
import h2 from "../Assets/Customize/maleAccessories/hat/2.jpg";

// uncat
// import un2 from "../Assets/Customize/maleAccessories/Uncat/2.jpg";

// 3d models
import tie from "../Pages/Customize/Configurator/models/Accessories/tie_main.glb";
import bow_tie from "../Pages/Customize/Configurator/models/Accessories/bow_tie_main.glb";
import knitted_cap from "../Pages/Customize/Configurator/models/Accessories/knittedHat_main_two.glb";
import round_cap from "../Pages/Customize/Configurator/models/Accessories/roundCap_main.glb";
import bikini from "../Pages/Customize/Configurator/models/Accessories/bikini.glb";
import hand_bag_model from "../Pages/Customize/Configurator/models/Accessories/handbag.glb";

// Importing size guides
import roundCap_guide from "../Assets/size_guide/Accessories/Male/28.jpg";
import knittedCap_guide from "../Assets/size_guide/Accessories/Male/knited.jpg";
import bowTie_guide from "../Assets/size_guide/Accessories/Male/27.jpg";
import flyingTie_guide from "../Assets/size_guide/Accessories/Male/26.jpg";
import handbag_guide from "../Assets/size_guide/Accessories/Female/33.jpg";
import bikini_guide from "../Assets/size_guide/Accessories/Female/31.jpg";

// Markeying Models
const tshirt_model = "";

// parts
const roundCapParts = require.context(
  "../Assets/model_parts/Accessories/roundCap_main",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const knittedCapParts = require.context(
  "../Assets/model_parts/Accessories/knittedHat_main_two",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const bowTieParts = require.context(
  "../Assets/model_parts/Accessories/bow_tie_main",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const flyingTieParts = require.context(
  "../Assets/model_parts/Accessories/tie_fixed",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const handbagParts = require.context(
  "../Assets/model_parts/Accessories/handbag",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const bikiniParts = require.context(
  "../Assets/model_parts/Accessories/bikini",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const image_bikini = require("../Assets/welcome_3ds/female/bikini.png");
const image_totebag = require("../Assets/welcome_3ds/others/tote bag.png");
const image_bowtie = require("../Assets/welcome_3ds/others/bow tie.png");

export const mainMaleAccessories = [
  // {
  //   id: uuid(),
  //   name: "Round Cap",
  //   image: h1,
  //   model: round_cap,
  //   myNode: [{ name: "all", yardNeeded: 1 }],
  //   myZoom: 0.5,
  //   price: 20,
  //   parts: roundCapParts.keys().map(roundCapParts),
  //   sizeGuide: roundCap_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 3,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Length (inch)",
  //       value: "",
  //     },
  //     {
  //       label: "Width (inch)",
  //       value: "",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
  // {
  //   id: uuid(),
  //   name: "Knitted Cap",
  //   image: h2,
  //   model: knitted_cap,
  //   myNode: [{ name: "all", yardNeeded: 1 }],
  //   myZoom: 0.5,
  //   price: 20,
  //   parts: knittedCapParts.keys().map(knittedCapParts),
  //   sizeGuide: knittedCap_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 3,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Length (inch)",
  //       value: "",
  //     },
  //     {
  //       label: "Width (inch)",
  //       value: "",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
  // {
  //   name: "Bow Tie",
  //   image: image_bowtie,
  //   model: bow_tie,
  //   myNode: [{ name: "all", yardNeeded: 1 }],
  //   myZoom: 1.5,
  //   price: 20,
  //   parts: bowTieParts.keys().map(bowTieParts),
  //   sizeModels: tshirt_model,
  //   readyIn: 3,
  //   sizeGuide: bowTie_guide,
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
  //       value: "",
  //     },
  //     {
  //       label: "Height (cm)",
  //       value: "",
  //     },
  //   ],
  // },
  // {
  //   name: "Flying Tie",
  //   image: image_flying_tie,
  //   model: tie,
  //   myNode: [{ name: "all", yardNeeded: 1 }],
  //   myZoom: 0.75,
  //   price: 20,
  //   parts: flyingTieParts.keys().map(flyingTieParts),
  //   sizeModels: tshirt_model,
  //   readyIn: 3,
  //   sizeGuide: flyingTie_guide,
  //   sizeOptions: [
  //     { label: "Skinny", value: 0.5 },
  //     { label: "Standard", value: 1 },
  //     { label: "Extra Large", value: 2 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Tie's Head (inch)",
  //     },
  //     {
  //       label: "Tie's End (inch)",
  //     },
  //     {
  //       label: "Length (inch)",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
];

export const mainFemaleAccessories = [
  // {
  //   id: uuid(),
  //   name: "Tote Bag",
  //   image: image_totebag,
  //   model: hand_bag_model,
  //   myNode: [{ name: "all", yardNeeded: 1 }],
  //   myZoom: 1.2,
  //   price: 55,
  //   parts: handbagParts.keys().map(handbagParts),
  //   sizeGuide: handbag_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 3,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Length (inch)",
  //     },
  //     {
  //       label: "Width (inch)",
  //     },
  //     {
  //       label: "Height (inch)",
  //     },
  //   ],
  // },
  {
    id: uuid(),
    name: "Bikini",
    image: image_bikini,
    model: bikini,
    myNode: [
      { name: "top", yardNeeded: 1 },
      { name: "bottom", yardNeeded: 1 },
    ],
    myZoom: 1.3,
    price: 55,
    parts: bikiniParts.keys().map(bikiniParts),
    // sizeModels: tshirt_model,
    readyIn: 3,
    sizeGuide: bikini_guide,
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "2XL", value: 4 },
    ],
    sizeForms: [
      {
        label: "Upper Bust (inch)",
      },
      {
        label: "Under Bust (inch)",
      },
      {
        label: "Waist (inch)",
      },
      {
        label: "Bottom Length (inch)",
      },
      // Add more form fields as needed
    ],
  },
];
