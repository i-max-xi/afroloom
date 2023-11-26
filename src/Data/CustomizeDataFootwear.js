import { v4 as uuid } from "uuid";

// sneakers
import s2 from "../Assets/Customize/footwear/sneaker/2.jpg";



// 3d models
import flex_shoe from '../Pages/Customize/Configurator/models/Shoes/flexible_shoe_main_two.glb';
import slippers from '../Pages/Customize/Configurator/models/Shoes/slippers_main.glb';
import heels from '../Pages/Customize/Configurator/models/Shoes/heels_main.glb';
import sneaker_model from '../Pages/Customize/Configurator/models/Shoes/sneaker.glb';

// Importing size guides
import flatShoe_guide from '../Assets/size_guide/Footwear/slipper.jpg';
import sneaker_guide from '../Assets/size_guide/Footwear/slipper.jpg';
import slipper_guide from '../Assets/size_guide/Footwear/slipper.jpg';
import heels_guide from '../Assets/size_guide/Footwear/34.jpg';


// models
const tshirt_model = "";

// parts
const flexShoeParts = require.context(
  "../Assets/model_parts/Shoes/flexible_shoe_main_two",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const sneakerParts = require.context(
  "../Assets/model_parts/Shoes/sneaker_best",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const slippersParts = require.context(
  "../Assets/model_parts/Shoes/slippers_main",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const heelsParts = require.context(
  "../Assets/model_parts/Shoes/heels_main",
  false,
  /\.(png|jpg|jpeg|gif)$/
);



export const mainFootwear = [
  {
    id: uuid(),
    name: "Flat Shoe",
    image: s2,
    model: flex_shoe,
    myNode: ["sole", "front", "back"],
    myZoom: 0.9,
    price: 20,
    parts: flexShoeParts.keys().map(flexShoeParts),
    sizeGuide: flatShoe_guide,
sizeModels: tshirt_model,
    readyIn: 3,    sizeOptions: [
      { label: "35", value: 0.5 },
      { label: "36", value: 1 },
      { label: "37", value: 2 },
      { label: "38", value: 3 },
      { label: "39", value: 4 },
      { label: "40", value: 5 },
      { label: "41", value: 6 },
      { label: "42", value: 7 },
      { label: "43", value: 5 },
      { label: "44", value: 6 },
      { label: "45", value: 7 },
      { label: "46", value: 8 },
    ],
    sizeForms: [
      {
        label: "Length (inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Sneaker",
    image:
      "https://th.bing.com/th/id/R.ed02939b666f5978946b4b104022f5ee?rik=N3Ja0bD%2boLeYgw&pid=ImgRaw&r=0",
    model: sneaker_model,
    myNode: ["front", "lace", "sole", "back",],
    myZoom: 0.9,
    price: 20,
    parts: sneakerParts.keys().map(sneakerParts),
    sizeGuide: sneaker_guide,
sizeModels: tshirt_model,
    readyIn: 3,    sizeOptions: [
      { label: "35", value: 0.5 },
      { label: "36", value: 1 },
      { label: "37", value: 2 },
      { label: "38", value: 3 },
      { label: "39", value: 4 },
      { label: "40", value: 5 },
      { label: "41", value: 6 },
      { label: "42", value: 7 },
      { label: "43", value: 5 },
      { label: "44", value: 6 },
      { label: "45", value: 7 },
      { label: "46", value: 8 },
    ],
    sizeForms: [
      {
        label: "Length (inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Slipper",
    image: "https://th.bing.com/th/id/OIP.5gl1niRXNH5qhTxWLH4ybQHaHa?pid=ImgDet&w=1000&h=1000&rs=1",
    model: slippers,
    myNode: ["padding", "sole", "top"],
    myZoom: 1.2,
    price: 20,
sizeModels: tshirt_model,
    readyIn: 3,    parts: slippersParts.keys().map(slippersParts),
    sizeGuide: slipper_guide,
    sizeOptions: [
      { label: "35", value: 0.5 },
      { label: "36", value: 1 },
      { label: "37", value: 2 },
      { label: "38", value: 3 },
      { label: "39", value: 4 },
      { label: "40", value: 5 },
      { label: "41", value: 6 },
      { label: "42", value: 7 },
      { label: "43", value: 5 },
      { label: "44", value: 6 },
      { label: "45", value: 7 },
      { label: "46", value: 8 },
      // { label: "7XL", value: 9 },
    ],
    sizeForms: [
      {
        label: "Length (inch)",
      },
      {
        label: "Width (inch)",
      },
    ],
  },
  {
    id: uuid(),
    name: "High Heel",
    image:
      "https://th.bing.com/th/id/OIP.UMGJguReHwKJtDNEdf5-NQHaHa?pid=ImgDet&rs=1",
    model: heels,
    myNode: ["sole", "top"],
    myZoom: 0.6,
    price: 20,
    parts: heelsParts.keys().map(heelsParts),
    sizeGuide: heels_guide,
sizeModels: tshirt_model,
    readyIn: 3,    sizeOptions: [
      { label: "35", value: 0.5 },
      { label: "36", value: 1 },
      { label: "37", value: 2 },
      { label: "38", value: 3 },
      { label: "39", value: 4 },
      { label: "40", value: 5 },
      { label: "41", value: 6 },
      { label: "42", value: 7 },
    ],
    sizeForms: [
      {
        label: "Heel-to-Toe Length (inch)",
      },
      {
        label: "Heel Height (inch)",
      },
      // Add more form fields as needed
    ],
  },
];


