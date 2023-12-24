import { v4 as uuid } from "uuid";

// import dress from "../Assets/Customize/dress.jpg";
import cloak from "../Assets/Customize/cloak.jpg";
import skirt from "../Assets/Customize/skirt.jpg";
// import femaleTshirt from "../Assets/Customize/femaleTshirt.jpg";
import topndown from "../Assets/Customize/female_topndown.png";
import dress from "../Assets/Customize/dress.png";
import normal_top from "../Assets/Customize/normal_top.png";
// import extra_short_img from "../Assets/Customize/female_short_shirt.jpg";
// import extra_long_img from "../Assets/Customize/femlae_long_shirt.jpg";
// import booty_shorts_img from "../Assets/Customize/booty_shorts.jpg";
// import female_suit_img from "../Assets/Customize/femlae_suit.jpg";
import kabanslit from "../Assets/Customize/kabanslit.JPG";

//models
import t_shirt_short from "../Pages/Customize/Configurator/models/FemaleClothing/tshirt_short_two.glb";
import t_shirt_long from "../Pages/Customize/Configurator/models/FemaleClothing/tshirt_long_two.glb";
import skirt_model from "../Pages/Customize/Configurator/models/FemaleClothing/skirt_main.glb";
import trousers from "../Pages/Customize/Configurator/models/FemaleClothing/female_actual_trousers.glb";
import leggings from "../Pages/Customize/Configurator/models/FemaleClothing/trousers_main.glb";
import dress_model from "../Pages/Customize/Configurator/models/FemaleClothing/shoulder_dress.glb";
import top_model from "../Pages/Customize/Configurator/models/FemaleClothing/shoulders_top.glb";
import normal_top_model from "../Pages/Customize/Configurator/models/FemaleClothing/ladies_normal_top.glb";
import mini_skirt_model from "../Pages/Customize/Configurator/models/FemaleClothing/mini_skirt_main.glb";
import cloak_model from "../Pages/Customize/Configurator/models/FemaleClothing/cloak.glb";
import topndown_model from "../Pages/Customize/Configurator/models/FemaleClothing/female_topndown_top_down.glb";
import blazer from "../Pages/Customize/Configurator/models/FemaleClothing/female_suit_main.glb";
import extra_long from "../Pages/Customize/Configurator/models/FemaleClothing/female_shirt_extra_long_two.glb";
import extra_short from "../Pages/Customize/Configurator/models/FemaleClothing/female_shirt_extra_short.glb";
import booty_shorts from "../Pages/Customize/Configurator/models/FemaleClothing/booty_shorts.glb";
import kaba_slit from "../Pages/Customize/Configurator/models/FemaleClothing/gown.glb";

// size guides
import tshirt_guide from "../Assets/size_guide/FemaleClothing/13.jpg";
import tshirtlong_guide from "../Assets/size_guide/FemaleClothing/11.jpg";
import extraShortShirt_guide from "../Assets/size_guide/FemaleClothing/15.jpg";
import extraLongShirt_guide from "../Assets/size_guide/FemaleClothing/12.jpg";
import cropTop_guide from "../Assets/size_guide/FemaleClothing/21.jpg";
import normalTop_guide from "../Assets/size_guide/FemaleClothing/top.jpg";
import topAndDown_guide from "../Assets/size_guide/FemaleClothing/25.jpg";
import dress_guide from "../Assets/size_guide/FemaleClothing/23.jpg";
// import kabaSlit_guide from '../Assets/size_guide/FemaleClothing/';
import cloak_guide from "../Assets/size_guide/FemaleClothing/24.jpg";
import blazer_guide from "../Assets/size_guide/FemaleClothing/22.jpg";
import skirt_guide from "../Assets/size_guide/FemaleClothing/long_skirt.jpg";
import miniSkirt_guide from "../Assets/size_guide/FemaleClothing/19 copy.jpg";
import bootyShorts_guide from "../Assets/size_guide/FemaleClothing/17.jpg";
import leggings_guide from "../Assets/size_guide/FemaleClothing/leggings.JPG";
import trousers_guide from "../Assets/size_guide/FemaleClothing/16.jpg";

// models
import tshirt_model from "../Pages/Customize/Configurator/size_guide/female/women.JPG";

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

const topAndDownParts = require.context(
  "../Assets/model_parts/FemaleClothing/female_topndown",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const dressParts = require.context(
  "../Assets/model_parts/FemaleClothing/shoulder_dress",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const kabaSlitParts = require.context(
  "../Assets/model_parts/FemaleClothing/gown",
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

const leggingsParts = require.context(
  "../Assets/model_parts/FemaleClothing/leggings",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const image_tshirt_short = require("../Assets/welcome_3ds/female/short slleev t shirt.png");
const image_tshirt_long = require("../Assets/welcome_3ds/female/long sleev t shirt.png");
const image_shirt_short = require("../Assets/welcome_3ds/female/women short sleev shirt.png");
const image_shirt_long = require("../Assets/welcome_3ds/female/women long sleev shirt.png");
const image_crop_top = require("../Assets/welcome_3ds/female/crop top.png");
// const image_top = require("../Assets/welcome_3ds/female/");
// const image_topndown = require("../Assets/welcome_3ds/female/");
// const image_dress = require("../Assets/welcome_3ds/female/");
// const image_kaba_slit = require("../Assets/welcome_3ds/female/");
const image_blazer = require("../Assets/welcome_3ds/female/women blazer.png");
// const image_cloak = require("../Assets/welcome_3ds/female/");
// const image_long_skirt = require("../Assets/welcome_3ds/female/long skirt.jpg");
const image_mini_skirt = require("../Assets/welcome_3ds/female/mini skirt.png");
const image_booty_shorts = require("../Assets/welcome_3ds/female/booty 2.png");
const image_trousers = require("../Assets/welcome_3ds/female/women trousers.png");
const image_leggings = require("../Assets/welcome_3ds/female/leggings.png");

export const mainFemaleCustomize = [
  {
    id: uuid(),
    name: "Short Sleeve T-Shirt",
    // image: "https://th.bing.com/th/id/OIP.ikUETESsVO_PcDoaCrIQnAHaIw?pid=ImgDet&w=1588&h=1879&rs=1",
    image: image_tshirt_short,
    model: t_shirt_short,
    myNode: [
      "bottom",
      "bottom_stripe",
      "left_hand",
      "left_hand_edge",
      "right_hand",
      "right_hand_edge",
      "top",
      "top_stripe",
    ],
    myZoom: 0.9,
    price: 20,
    sizeGuide: tshirt_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: tShirtShortParts.keys().map(tShirtShortParts),
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    // image: "https://images.bloomingdalesassets.com/is/image/BLM/products/0/optimized/10183950_fpx.tif?$filterlrg$&wid=327",
    image: image_tshirt_long,
    model: t_shirt_long,
    myNode: [
      "bottom",
      "bottom_stripe",
      "left_hand",
      "left_hand_cuff",
      "right_hand",
      "right_hand_cuff",
      "top",
      "top_stripe",
    ],
    myZoom: 0.9,
    price: 20,
    sizeGuide: tshirtlong_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: tShirtLongParts.keys().map(tShirtLongParts),
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    // image: extra_short_img,
    image: image_shirt_short,
    model: extra_short,
    myNode: [
      "back",
      "buttons",
      "collar",
      "front",
      "left_hand",
      "midline",
      "right_hand",
    ],
    myZoom: 0.7,
    price: 30,
    sizeGuide: extraShortShirt_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: extraShortShirtParts.keys().map(extraShortShirtParts),
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    // image: extra_long_img,
    image: image_shirt_long,
    model: extra_long,
    myNode: [
      "back",
      "buttons",
      "collar",
      "front",
      "left_hand",
      "midline",
      "right_hand",
    ],
    myZoom: 0.8,
    price: 30,
    sizeGuide: extraLongShirt_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: extraLongShirtParts.keys().map(extraLongShirtParts),
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "14", value: 4 },
      // { label: "16", value: 5 },
      // { label: "18", value: 6 },
      // { label: "20", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    name: "Crop Top",
    // image: "https://sportsfore.com/wp-content/uploads/2020/05/5-68.jpg",
    image: image_crop_top,
    model: top_model,
    myNode: ["mid_body", "left_hand", "right_hand", "top_edge"],
    myZoom: 1.2,
    price: 20,
    sizeGuide: cropTop_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: cropTopParts.keys().map(cropTopParts),
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
    name: "Top",
    image: normal_top,
    model: normal_top_model,
    myNode: [
      "body",
      "shoulder_edge",
      "right_hand",
      "left_hand",
      "right_hand_edge",
      "left_hand_edge",
    ],
    myZoom: 0.8,
    price: 20,
    sizeGuide: normalTop_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: normalTopParts.keys().map(normalTopParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    name: "Top And Down",
    model: topndown_model,
    image: topndown,
    myNode: [
      "mid_section",
      "right_leg",
      "left_hand",
      "left_hand_cuff",
      "right_hand",
      "right_hand_cuff",
      "waist",
      "left_leg",
    ],
    myZoom: 0.95,
    price: 20,
    sizeGuide: topAndDown_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: topAndDownParts.keys().map(topAndDownParts),
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
        label: "Sleeve Length (cm)",
      },
      {
        label: "Around arm (cm)",
      },
      {
        label: "Cuff (cm)",
      },
      {
        label: "Short Length (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Dress",
    model: dress_model,
    image: dress,
    myNode: [
      "down",
      "left_hand",
      "left_hand_cuff",
      "right_hand",
      "right_hand_cuff",
      "top",
      "top_edge",
    ],
    myZoom: 1,
    price: 20,
    sizeGuide: dress_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: dressParts.keys().map(dressParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
        label: "Shoulder-to-waist (cm)",
      },
      {
        label: "Sleeve Length (cm)",
      },
      {
        label: "Around arm (cm)",
      },
      {
        label: "Cuff (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Kaba and Slit",
    model: kaba_slit,
    image: kabanslit,
    myNode: ["left_hand", "right_hand", "top", "top_pattern", "down"],
    myZoom: 1.15,
    price: 20,
    // sizeGuide: kabaSlit_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: kabaSlitParts.keys().map(kabaSlitParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
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
    name: "Blazer",
    model: blazer,
    // image: female_suit_img,
    image: image_blazer,
    myNode: [
      "back",
      "left_hand",
      "front_left",
      "collar",
      "front_right",
      "right_hand",
    ],
    myZoom: 1.1,
    price: 20,
    sizeGuide: blazer_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: blazerParts.keys().map(blazerParts),
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
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
    name: "Cloak",
    model: cloak_model,
    image: cloak,
    myNode: ["all"],
    myZoom: 0.8,
    price: 20,
    sizeGuide: cloak_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: cloakParts.keys().map(cloakParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    myNode: ["all"],
    myZoom: 0.7,
    price: 20,
    sizeGuide: skirt_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: skirtParts.keys().map(skirtParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    // image: "https://i.pinimg.com/736x/18/7d/c1/187dc19dca6861408cfd6d824437852e.jpg",
    image: image_mini_skirt,
    myNode: ["all"],
    myZoom: 0.8,
    price: 20,
    sizeGuide: miniSkirt_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: miniSkirtParts.keys().map(miniSkirtParts),
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "2XL", value: 4 },
      { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
    // image: booty_shorts_img,
    image: image_booty_shorts,
    myNode: [
      "button",
      "left_leg",
      "left_leg_edge",
      "left_pocket",
      "right_leg",
      "right_leg_edge",
      "right_pocket",
      "waist",
    ],
    myZoom: 0.6,
    price: 20,
    sizeGuide: bootyShorts_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: bootyShortsParts.keys().map(bootyShortsParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
    ],
    sizeForms: [
      {
        label: "Waist (inch)",
      },
      {
        label: "Hip (inch)",
      },
      {
        label: "Length (inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Trousers",
    model: trousers,
    // image: "https://th.bing.com/th/id/R.4bc7f18679c3f2be48f44daefe523175?rik=zl2oxw9NZ7WSYw&riu=http%3a%2f%2fnibh.com%2fwp-content%2fuploads%2f2017%2f05%2fLP3.jpeg&ehk=pofT6edwVxSrGznLoVPwRpmV4ZLjt7oYMlkOzLi%2bms0%3d&risl=&pid=ImgRaw&r=0",
    image: image_trousers,
    myNode: [
      "waist",
      "right_pocket",
      "left_pocket",
      "right_leg_edge",
      "left_leg_edge",
      "right_leg",
      "left_leg",
    ],
    myZoom: 0.7,
    price: 20,
    sizeGuide: trousers_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: trousersParts.keys().map(trousersParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
  {
    id: uuid(),
    name: "Leggings",
    model: leggings,
    // image: "https://i5.walmartimages.com/asr/8f17c018-a54f-403f-bda5-6b726d940ff6.38077f69b4dc21dbee1253fd234148ff.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    image: image_leggings,
    myNode: [
      "left_leg",
      "waist",
      "left_pocket",
      "right_pocket",
      "right_leg_edge",
      "left_leg_edge",
      "right_leg",
    ],
    myZoom: 0.8,
    price: 20,
    sizeGuide: leggings_guide,
    sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    parts: leggingsParts.keys().map(leggingsParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
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
];
