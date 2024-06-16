import { v4 as uuid } from "uuid";

// import handbag from "../Assets/Customize/hand_bag.png";
// import bikini_img from "../Assets/Customize/bikini.png";


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
  //   sizeGuide: roundCap_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
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
  //       label: "Width (cm)",
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
  //   sizeGuide: knittedCap_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
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
  //       label: "Width (cm)",
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
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
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
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
  //   sizeGuide: flyingTie_guide,
  //   sizeOptions: [
  //     { label: "Skinny", value: 0.5 },
  //     { label: "Standard", value: 1 },
  //     { label: "Extra Large", value: 2 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Tie's Head (cm)",
  //     },
  //     {
  //       label: "Tie's End (cm)",
  //     },
  //     {
  //       label: "Length (cm)",
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
  //   sizeGuide: handbag_guide,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Length (cm)",
  //     },
  //     {
  //       label: "Width (cm)",
  //     },
  //     {
  //       label: "Height (cm)",
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
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 1.3,
    price: 55,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: bikini_guide,
    sizeOptions: [
      // // { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "2XL", value: 4 },
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
];
