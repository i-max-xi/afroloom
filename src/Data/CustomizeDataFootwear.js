import { v4 as uuid } from "uuid";

// sneakers
import s2 from "../Assets/Customize/footwear/sneaker/2.jpg";



// 3d models
import flex_shoe from '../Pages/Customize/Configurator/models/Shoes/flexible_shoe_main_two.glb';
import slippers from '../Pages/Customize/Configurator/models/Shoes/slippers_main.glb';
import heels from '../Pages/Customize/Configurator/models/Shoes/heels_main.glb';
import sneaker_model from '../Pages/Customize/Configurator/models/Shoes/sneaker.glb';

// ... (your existing code)

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
    myZoom: 1,
    price: 20,
    parts: flexShoeParts.keys().map(flexShoeParts),
  },
  {
    id: uuid(),
    name: "Sneaker",
    image:
      "https://th.bing.com/th/id/R.ed02939b666f5978946b4b104022f5ee?rik=N3Ja0bD%2boLeYgw&pid=ImgRaw&r=0",
    model: sneaker_model,
    myNode: ["back", "front", "lace", "sole"],
    myZoom: 0.8,
    price: 20,
    parts: sneakerParts.keys().map(sneakerParts),
  },
  {
    id: uuid(),
    name: "Slipper",
    image: "https://th.bing.com/th/id/OIP.5gl1niRXNH5qhTxWLH4ybQHaHa?pid=ImgDet&w=1000&h=1000&rs=1",
    model: slippers,
    myNode: ["padding", "sole", "top"],
    myZoom: 1,
    price: 20,
    parts: slippersParts.keys().map(slippersParts),
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
  },
];

