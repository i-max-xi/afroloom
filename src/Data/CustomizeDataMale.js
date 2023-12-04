import { v4 as uuid } from "uuid";

// import tshirt from "../Assets/Customize/Tshirt.jpg";
// import shirt from "../Assets/Customize/shirt.jpg";
// import flare_shirt from "../Assets/Customize/flare_shirt.png";

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

//size-guides
import tshirt_model from "../Pages/Customize/Configurator/size_guide/male/men.JPG";

import tshirt_guide from "../Assets/size_guide/MaleClothing/4.jpg";
import tshirtlong_guide from "../Assets/size_guide/MaleClothing/1.jpg";
import shirt_guide from "../Assets/size_guide/MaleClothing/3.jpg";
import shirtlong_guide from "../Assets/size_guide/MaleClothing/2.jpg";
import top_down_guide from "../Assets/size_guide/MaleClothing/topndown.jpg";
import cloak_guide from "../Assets/size_guide/MaleClothing/5.jpg";
import blazer_guide from "../Assets/size_guide/MaleClothing/9.jpg";
import trouser_guide from "../Assets/size_guide/MaleClothing/6.jpg";
import summer_shorts_guide from "../Assets/size_guide/MaleClothing/8.jpg";
import material_shorts_guide from "../Assets/size_guide/MaleClothing/7.jpg";

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

// const tshirt_image = "https://a5e8126a499f8a963166-f72e9078d72b8c998606fd6e0319b679.ssl.cf5.rackcdn.com/images/variant/large/next-level_3600_black.jpg";
const image_tshirt_short = require("../Assets/welcome_3ds/male/male short sleev ankara.jpg");
const image_tshirt_long_image = require("../Assets/welcome_3ds/male/male long sleev ankara.jpg");
const image_shirt_short_image = require("../Assets/welcome_3ds/male/male short sleeve shirt.jpg");
const image_shirt_long_image = require("../Assets/welcome_3ds/male/male long sleeve shirt.jpg");
const image_topndown_image = require("../Assets/welcome_3ds/male/male top and down.jpg");
const image_top_image = require("../Assets/welcome_3ds/male/male top.jpg");
const image_blazer_image = require("../Assets/welcome_3ds/male/male blazer.jpg");
const image_trouser_image = require("../Assets/welcome_3ds/male/male trousers.jpg");
const image_summer_image = require("../Assets/welcome_3ds/male/male summer shorts.jpg");
const image_shorts_image = require("../Assets/welcome_3ds/male/male shorts.jpg");


export const mainMaleCustomize = [
  {
    id: uuid(),
    name: "Short Sleeve T-Shirt",
    image: image_tshirt_short,
    model: tshirtModel1,
    myNode: [
      "bottom",
      "collar",
      "left_hand",
      "left_hand_edge",
      "right_hand",
      "right_hand_edge",
      "top_stripe",
      "bottom_stripe",
      "top",
    ],
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 20,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    sizeGuide: tshirt_guide,
    parts: tshirtParts.keys().map(tshirtParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    myNode: [
      "bottom",
      "collar",
      "left_hand",
      "left_hand_cuff",
      "right_hand",
      "right_hand_cuff",
      "top_stripe",
      "bottom_stripe",
      "top",
    ],
    myZoom: 0.7,
    price: 20,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    sizeGuide: tshirtlong_guide,
    parts: tshirtLongParts.keys().map(tshirtLongParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
      "back",
      "buttons",
      "collar",
      "front",
      "left_hand",
      "left_hand_edge",
      "midline",
      "pocket",
      "right_hand",
      "right_hand_edge",
    ],
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 30,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    sizeGuide: shirt_guide,
    parts: shirtParts.keys().map(shirtParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
      // { label: "8XL", value: 10 },
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
      "back",
      "buttons",
      "collar",
      "front",
      "left_hand",
      "left_hand_edge",
      "midline",
      "pocket",
      "right_hand",
      "right_hand_edge",
    ],
    myZoom: 0.8,
    myX: 0,
    myY: 10,
    price: 30,
    sizeGuide: shirtlong_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: shirtLongParts.keys().map(shirtLongParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    name: "Top And Down",
    image: image_topndown_image,
    model: topndown_model,
    myNode: [
      "back",
      "collar",
      "front_left",
      "front_right",
      "left_hand",
      "left_hand_cuff",
      "left_leg",
      "left_leg_edge",
      "midline",
      "right_hand",
      "right_hand_cuff",
      "right_leg",
      "right_leg_edge",
    ],
    myZoom: 0.6,
    price: 55,
    sizeGuide: top_down_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: topndownParts.keys().map(topndownParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    name: "Top",
    image: image_top_image,
    model: cloak,
    myNode: [
      "body",
      "right_hand",
      "left_hand_edge",
      "left_hand",
      "collar",
      "right_hand_edge",
    ],
    myZoom: 0.8,
    myX: 0,
    myY: 10,
    price: 35,
    sizeGuide: cloak_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: topParts.keys().map(topParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    name: "Blazer",
    model: blazer,
    image: image_blazer_image,
    myNode: [
      "back",
      "collar",
      "front_left",
      "front_right",
      "left_hand",
      "left_hand_edge",
      "right_hand",
      "right_hand_edge",
    ],
    myZoom: 0.77,
    price: 20,
    sizeGuide: blazer_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: blazerParts.keys().map(blazerParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    name: "Trousers",
    image: image_trouser_image,
    model: trousersModel1,
    myNode: [
      "left_leg",
      "left_leg_edge",
      "left_pocket",
      "right_leg",
      "right_leg_edge",
      "right_pocket",
      "waist",
    ],
    myZoom: 0.8,
    price: 22,
    sizeGuide: trouser_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "32", value: 4 },
      // { label: "33", value: 5 },
      // { label: "34", value: 6 },
      // { label: "35", value: 7 },
      // { label: "36", value: 8 },
      // { label: "38", value: 9 },
      // { label: "40", value: 10 },
    ],
    parts: trouserParts.keys().map(trouserParts),
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
    myNode: [
      "fasteners",
      "left_leg",
      "left_leg_edge",
      "left_pocket",
      "right_leg",
      "right_leg_edge",
      "right_pocket",
      "waist",
    ],
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 30,
    sizeGuide: summer_shorts_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    myNode: [
      "left_leg",
      "left_leg_edge",
      "left_pocket",
      "right_leg",
      "right_leg_edge",
      "right_pocket",
      "waist",
    ],
    myZoom: 0.5,
    myX: 0,
    myY: 10,
    price: 30,
    sizeGuide: material_shorts_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: materialShortsParts.keys().map(materialShortsParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
