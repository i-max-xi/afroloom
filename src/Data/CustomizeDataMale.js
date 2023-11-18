import { v4 as uuid } from "uuid";

// import tshirt from "../Assets/Customize/Tshirt.jpg";
import shirt from "../Assets/Customize/shirt.jpg";
import flare_shirt from "../Assets/Customize/flare_shirt.png";

import topndown from "../Assets/Customize/topanddown.jpg";

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

export const mainMaleCustomize = [
  {
    id: uuid(),
    name: "Short Sleeve T-Shirt",
    image:
      "https://a5e8126a499f8a963166-f72e9078d72b8c998606fd6e0319b679.ssl.cf5.rackcdn.com/images/variant/large/next-level_3600_black.jpg",
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
    image:
      "https://th.bing.com/th/id/R.090a143032d299d58a1f61c13fdb5224?rik=3IvQRj1AFgeS5A&riu=http%3a%2f%2fmemorythreads.com.au%2fwp-content%2fuploads%2f2015%2f03%2fgrey-marle-longsleeve1.jpg&ehk=mYL6G88axiyKbyZamMLyXt0FEL95o7%2bLvLOeBlxULno%3d&risl=&pid=ImgRaw&r=0",
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
    image: shirt,
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
    image:
      "https://th.bing.com/th/id/OIP.esHHIbeG0pD-IJjavFbqwQAAAA?pid=ImgDet&rs=1",
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
    image: topndown,
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
    image: flare_shirt,
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
    image: "https://www.flannels.com/images/products/32066803_h.jpg",
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
    image:
      "https://th.bing.com/th/id/OIP.tnXk8QDidx4JKGKhl6IU0wHaJQ?pid=ImgDet&rs=1",
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
    image:
      "https://th.bing.com/th/id/R.ea417739b8a3cef995b4681464e7a16b?rik=uhZGGA8vxC1GIg&riu=http%3a%2f%2fi.ebayimg.com%2f00%2fs%2fNjcwWDcxNw%3d%3d%2fz%2fL9UAAOSwEK9UAwm9%2f%24_32.JPG%3fset_id%3d880000500F&ehk=r%2fZD2lrasnGhbmSDvg7rBXMXZGa34as4zF%2bMus%2f3ZIY%3d&risl=&pid=ImgRaw&r=0",
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
    image:
      "https://th.bing.com/th/id/OIP.A9xUqEvW0ADXy3nKfNyxKwHaJZ?pid=ImgDet&w=481&h=610&rs=1",
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
