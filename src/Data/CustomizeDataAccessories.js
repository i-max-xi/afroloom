import { v4 as uuid } from "uuid";

import handbag from "../Assets/Customize/hand_bag.png";
// import bikini_img from "../Assets/Customize/bikini.png";


// hats
import h1 from "../Assets/Customize/maleAccessories/hat/1.jpg";
import h2 from "../Assets/Customize/maleAccessories/hat/2.jpg";


// uncat
import un2 from "../Assets/Customize/maleAccessories/Uncat/2.jpg";


// 3d models
import tie from "../Pages/Customize/Configurator/models/Accessories/tie_main.glb";
import bow_tie from "../Pages/Customize/Configurator/models/Accessories/bow_tie_main.glb";
import knitted_cap from "../Pages/Customize/Configurator/models/Accessories/knittedHat_main_two.glb";
import round_cap from "../Pages/Customize/Configurator/models/Accessories/roundCap_main.glb";
import bikini from "../Pages/Customize/Configurator/models/Accessories/bikini.glb";
import hand_bag_model from "../Pages/Customize/Configurator/models/Accessories/handbag.glb";

// Importing size guides
// import roundCap_guide from '../Assets/size_guide/Accessories/Male/';
// import knittedCap_guide from '../Assets/size_guide/Accessories/Male/';
import bowTie_guide from '../Assets/size_guide/Accessories/Male/bow_tie.JPG';
import flyingTie_guide from '../Assets/size_guide/Accessories/Male/flying_tie.JPG';
// import handbag_guide from '../Assets/size_guide/Accessories/Female/';
import bikini_guide from '../Assets/size_guide/Accessories/Female/bikini.JPG';


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



export const mainMaleAccessories = [
  {
    id: uuid(),
    name: "Round Cap",
    image: h1,
    model: round_cap,
    myNode: ["bottom_section", "top_section"],
    myZoom: 0.5,
    price: 20,
    parts: roundCapParts.keys().map(roundCapParts),
    // sizeGuide: roundCap_guide,
  },

  {
    id: uuid(),
    name: "Knitted Cap",
    image: h2,
    model: knitted_cap,
    myNode: ["bottom_section", "mid_section", "top_section"],
    myZoom: 0.5,
    price: 20,
    parts: knittedCapParts.keys().map(knittedCapParts),
    // sizeGuide: knittedCap_guide,
  },

  {
    name: "Bow Tie",
    image: "https://th.bing.com/th/id/OIP.9hwERmR98yWFEa-sH29WIAAAAA?pid=ImgDet&w=400&h=400&rs=1",
    model: bow_tie,
    myNode: ["binder", "bow"],
    myZoom: 1.5,
    price: 20,
    parts: bowTieParts.keys().map(bowTieParts),
    sizeGuide: bowTie_guide, // Adding size guide for Bow Tie
  },

  {
    name: "Flying Tie",
    image: un2,
    model: tie,
    myNode: ["lower_section" ,"top_section"],
    myZoom: 0.6,
    price: 20,
    parts: flyingTieParts.keys().map(flyingTieParts),
    sizeGuide: flyingTie_guide, // Adding size guide for Flying Tie
  },
];

export const mainFemaleAccessories = [
  {
    id: uuid(),
    name: "Hand Bag",
    image: handbag,
    model: hand_bag_model,
    myNode: ["handle", "left_section", "mid_section", "right_section", "zippers_and_locks"],
    myZoom: 0.8,
    price: 55,
    parts: handbagParts.keys().map(handbagParts),
    // sizeGuide: handbag_guide,
  },
  {
    id: uuid(),
    name: "Bikini",
    image: "https://cf.ltkcdn.net/teens/images/std/231007-275x421-low-rise-bikini.jpg",
    model: bikini,
    myNode: ["top", "bottom"],
    myZoom: 1.3,
    price: 55,
    parts: bikiniParts.keys().map(bikiniParts),
    sizeGuide: bikini_guide, // Adding size guide for Bikini
  },
];
