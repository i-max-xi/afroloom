import { v4 as uuid } from "uuid";

// import dress from "../Assets/Customize/dress.jpg";
import cloak from "../Assets/Customize/cloak.jpg";
import skirt from "../Assets/Customize/skirt.jpg";
// import femaleTshirt from "../Assets/Customize/femaleTshirt.jpg";
import topndown from "../Assets/Customize/female_topndown.png";
import dress from "../Assets/Customize/dress.png";
import normal_top from "../Assets/Customize/normal_top.png";
import extra_short_img from "../Assets/Customize/female_short_shirt.jpg";
import extra_long_img from "../Assets/Customize/femlae_long_shirt.jpg";
import booty_shorts_img from "../Assets/Customize/booty_shorts.jpg";
import female_suit_img from "../Assets/Customize/femlae_suit.jpg";
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
import tshirt_guide from '../Assets/size_guide/FemaleClothing/tshirt.JPG';
import tshirtlong_guide from '../Assets/size_guide/FemaleClothing/tshirt_long.JPG';
import extraShortShirt_guide from '../Assets/size_guide/FemaleClothing/shirt.JPG';
// import extraLongShirt_guide from '../Assets/size_guide/FemaleClothing/s';
import cropTop_guide from '../Assets/size_guide/FemaleClothing/crop_top.JPG';
// import normalTop_guide from '../Assets/size_guide/FemaleClothing/';
// import topAndDown_guide from '../Assets/size_guide/FemaleClothing/';
// import dress_guide from '../Assets/size_guide/FemaleClothing/';
// import kabaSlit_guide from '../Assets/size_guide/FemaleClothing/';
import extraLongShirt_guide from '../Assets/size_guide/FemaleClothing/shirt_long.JPG';
// import cloak_guide from '../Assets/size_guide/FemaleClothing/';
import blazer_guide from '../Assets/size_guide/FemaleClothing/blazer.jpeg';
import skirt_guide from '../Assets/size_guide/FemaleClothing/skirt_long.JPG';
import miniSkirt_guide from '../Assets/size_guide/FemaleClothing/mini_skirt.JPG';
import bootyShorts_guide from '../Assets/size_guide/FemaleClothing/booty_shorts.JPG';
import leggings_guide from '../Assets/size_guide/FemaleClothing/leggings.JPG';
// import trousers_guide from '../Assets/size_guide/FemaleClothing/'

// models
import tshirt_model from "../Pages/Customize/Configurator/size_guide/male/tshirt.JPG";


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




export const mainFemaleCustomize = [
  {
    id: uuid(),
    name: "T-Shirt short",
    image: "https://th.bing.com/th/id/OIP.ikUETESsVO_PcDoaCrIQnAHaIw?pid=ImgDet&w=1588&h=1879&rs=1",
    model: t_shirt_short,
    myNode: ["bottom", "left_hand", "left_hand_edge", "right_hand", "right_hand_edge", "top", "top_stripe", "bottom_stripe"],
    myZoom: 0.9,
    price: 20,
    sizeGuide: tshirt_guide,
    sizeModels: tshirt_model,
    parts: tShirtShortParts.keys().map(tShirtShortParts),
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
        label: "Bust (inch)",
      },
      {
        label: "Length (inch)",
      },
      {
        label: "Sleeve (inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "T-Shirt long",
    image: "https://images.bloomingdalesassets.com/is/image/BLM/products/0/optimized/10183950_fpx.tif?$filterlrg$&wid=327",
    model: t_shirt_long,
    myNode: ["bottom", "left_hand", "left_hand_cuff", "right_hand", "right_hand_cuff", "stripe", "top"],
    myZoom: 0.9,
    price: 20,
    sizeGuide: tshirtlong_guide,
    sizeModels: tshirt_model,
    parts: tShirtLongParts.keys().map(tShirtLongParts),
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "XXL", value: 4 },
      { label: "3XL", value: 5 },
      { label: "4XL", value: 6 },
      { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
    ],
    sizeForms: [
      {
        label: "Body Length (inch)",
      },
      
      {
        label: "Chest Width (inch)",
      },
      {
        label: "Sleeve length (inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Short Sleeves Shirt",
    image: extra_short_img,
    model: extra_short,
    myNode: ["back", "collar", "front", "left_hand", "midline", "right_hand", "buttons"],
    myZoom: 0.7,
    price: 30,
    sizeGuide: extraShortShirt_guide,
    sizeModels: tshirt_model,
    parts: extraShortShirtParts.keys().map(extraShortShirtParts),
    sizeOptions: [
      { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "XXL", value: 4 },
      { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
    ],
    sizeForms: [
      {
        label: "Chest Width(inch)",
      },
      {
        label: "Cuff (inch)",
      },
      {
        label: "Sleeve Length (inch)",
      },
      {
        label: "Center Back (inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Long Sleeves Shirt",
    image: extra_long_img,
    model: extra_long,
    myNode: ["back", "collar", "front", "left_hand", "midline", "right_hand", "buttons"],
    myZoom: 0.8,
    price: 30,
    sizeGuide: extraLongShirt_guide,
    sizeModels: tshirt_model,
    parts: extraLongShirtParts.keys().map(extraLongShirtParts),
    sizeOptions: [
      { label: "6", value: 0.5 },
      { label: "8", value: 1 },
      { label: "10", value: 2 },
      { label: "12", value: 3 },
      { label: "14", value: 4 },
      { label: "16", value: 5 },
      { label: "18", value: 6 },
      { label: "20", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
    ],
    sizeForms: [
      {
        label: "Bust (inch)",
      },
      {
        label: "Waist (inch)",
      },
      {
        label: "Hip (inch)",
      },
      {
        label: "Sleeve Length(inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Crop Top",
    image: "https://sportsfore.com/wp-content/uploads/2020/05/5-68.jpg",
    model: top_model,
    myNode: ["left_hand", "mid_body", "right_hand", "top_edge"],
    myZoom: 1.2,
    price: 20,
    sizeGuide: cropTop_guide,
    sizeModels: tshirt_model,
    parts: cropTopParts.keys().map(cropTopParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "2XL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
    ],
    sizeForms: [
      {
        label: "Bust (inch)",
      },
      {
        label: "Length (inch)",
      },
      {
        label: "Waist (inch)",
      },
      {
        label: "Sleeve (inch)",
      },
      {
        label: "Shoulder (inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Normal Top",
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
    // sizeGuide: normalTop_guide,
    sizeModels: tshirt_model,
    parts: normalTopParts.keys().map(normalTopParts),
    sizeOptions: [
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
    name: "Top & Down",
    model: topndown_model,
    image: topndown,
    myNode: [
      "left_hand",
      "left_hand_cuff",
      "left_leg",
      "mid_section",
      "right_hand",
      "right_hand_cuff",
      "right_leg",
      "waist",
    ],
    myZoom: 0.95,
    price: 20,
    // sizeGuide: topAndDown_guide,
    sizeModels: tshirt_model,
    parts: topAndDownParts.keys().map(topAndDownParts),
    sizeOptions: [
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
    // sizeGuide: dress_guide,
    sizeModels: tshirt_model,
    parts: dressParts.keys().map(dressParts),
    sizeOptions: [
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
    name: "Kaba and Slit",
    model: kaba_slit,
    image: kabanslit,
    myNode: ["left_hand", "right_hand", "top", "top_pattern", "down"],
    myZoom: 1.15,
    price: 20,
    // sizeGuide: kabaSlit_guide,
    sizeModels: tshirt_model,
    parts: kabaSlitParts.keys().map(kabaSlitParts),
    sizeOptions: [
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
    name: "Blazer",
    model: blazer,
    image: female_suit_img,
    myNode: [
      "back",
      "collar",
      "front_left",
      "front_right",
      "left_hand",
      "right_hand",
    ],
    myZoom: 1.1,
    price: 20,
    sizeGuide: blazer_guide,
    sizeModels: tshirt_model,
    parts: blazerParts.keys().map(blazerParts),
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
        label: "Chest Width (inch)",
      },
      {
        label: "Waist Width (inch)",
      },
      {
        label: "Shoulder Width (inch)",
      },
      {
        label: "Body Length (inch)",
      },
      {
        label: "Bottom Width (inch)",
      },
      {
        label: "Sleeve Length (inch)",
      },
      // Add more form fields as needed
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
    // sizeGuide: cloak_guide,
    sizeModels: tshirt_model,
    parts: cloakParts.keys().map(cloakParts),
    sizeOptions: [
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
    name: "Skirt",
    model: skirt_model,
    image: skirt,
    myNode: ["all"],
    myZoom: 0.7,
    price: 20,
    sizeGuide: skirt_guide,
    sizeModels: tshirt_model,
    parts: skirtParts.keys().map(skirtParts),
    sizeOptions: [
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
        label: "Waist (inch)",
      },
      {
        label: "Hip (inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Mini Skirt",
    model: mini_skirt_model,
    image: "https://i.pinimg.com/736x/18/7d/c1/187dc19dca6861408cfd6d824437852e.jpg",
    myNode: ["all"],
    myZoom: 0.8,
    price: 20,
    sizeGuide: miniSkirt_guide,
    sizeModels: tshirt_model,
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
        label: "Waist (inch)",
      },
      {
        label: "Hip (inch)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Booty Shorts",
    model: booty_shorts,
    image: booty_shorts_img,
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
    parts: bootyShortsParts.keys().map(bootyShortsParts),
    sizeOptions: [
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
    image: "https://th.bing.com/th/id/R.4bc7f18679c3f2be48f44daefe523175?rik=zl2oxw9NZ7WSYw&riu=http%3a%2f%2fnibh.com%2fwp-content%2fuploads%2f2017%2f05%2fLP3.jpeg&ehk=pofT6edwVxSrGznLoVPwRpmV4ZLjt7oYMlkOzLi%2bms0%3d&risl=&pid=ImgRaw&r=0",
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
    // sizeGuide: trousers_guide,
    sizeModels: tshirt_model,
    parts: trousersParts.keys().map(trousersParts),
    sizeOptions: [
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
    name: "Leggings",
    model: leggings,
    image: "https://i5.walmartimages.com/asr/8f17c018-a54f-403f-bda5-6b726d940ff6.38077f69b4dc21dbee1253fd234148ff.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
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
    parts: leggingsParts.keys().map(leggingsParts),
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      // { label: "XL", value: 3 },
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
        label: "Rise (inch)",
      },
      {
        label: "Length (inch)",
      },
      {
        label: "Enseam (inch)",
      },
      // Add more form fields as needed
    ],
  },
];




