import { v4 as uuid } from "uuid";

// sneakers
import s2 from "../Assets/Customize/footwear/sneaker/2.jpg";



// 3d models
import flex_shoe from '../Pages/Customize/Configurator/models/Shoes/flexible_shoe_main_two.glb';
import slippers from '../Pages/Customize/Configurator/models/Shoes/slippers_main.glb';
import heels from '../Pages/Customize/Configurator/models/Shoes/heels_main.glb';
import sneaker_model from '../Pages/Customize/Configurator/models/Shoes/sneaker.glb';

// Importing size guides
// import flatShoe_guide from '../Assets/size_guide/Footwear/';
// import sneaker_guide from '../Assets/size_guide/Footwear/sneaker.JPG';
// import slipper_guide from '../Assets/size_guide/Footwear/slipper.JPG';
import heels_guide from '../Assets/size_guide/Footwear/heels.JPG';


// models
import tshirt_model from "../Pages/Customize/Configurator/size_guide/male/tshirt.JPG";

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
    myNode: ["back", "front", "sole"],
    myZoom: 0.8,
    price: 20,
    parts: flexShoeParts.keys().map(flexShoeParts),
    // sizeGuide: flatShoe_guide,
    sizeModels: tshirt_model,
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    myNode: ["back", "front", "lace", "sole"],
    myZoom: 0.7,
    price: 20,
    parts: sneakerParts.keys().map(sneakerParts),
    // sizeGuide: sneaker_guide,
    sizeModels: tshirt_model,
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    myZoom: 0.8,
    price: 20,
    sizeModels: tshirt_model,
    parts: slippersParts.keys().map(slippersParts),
    // sizeGuide: slipper_guide,
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    name: "Heels",
    image:
      "https://th.bing.com/th/id/OIP.UMGJguReHwKJtDNEdf5-NQHaHa?pid=ImgDet&rs=1",
    model: heels,
    myNode: ["sole", "top"],
    myZoom: 0.6,
    price: 20,
    parts: heelsParts.keys().map(heelsParts),
    sizeGuide: heels_guide,
    sizeModels: tshirt_model,
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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


