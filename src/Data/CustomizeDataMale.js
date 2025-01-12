import { v4 as uuid } from "uuid";

// import tshirt from "../Assets/Customize/Tshirt.jpg";
// import shirt from "../Assets/Customize/shirt.jpg";
import flare_shirt from "../Assets/Customize/flare_shirt.png";

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
import jacket from "../Pages/Customize/Configurator/models/Accessories/Unisex/jacket_main.glb";
import cloak_model from "../Pages/Customize/Configurator/models/MaleClothing/kimono.glb";

// ..variations
import v_neck from "../Pages/Customize/Configurator/models/MaleClothing/variations/v_neck.glb";
import tshirt_trousers from "../Pages/Customize/Configurator/models/MaleClothing/variations/tshirt_trousers.glb";
import tshirt_summer_shorts from "../Pages/Customize/Configurator/models/MaleClothing/variations/tshirt_summer_shorts.glb";
import tshirt_material_shorts from "../Pages/Customize/Configurator/models/MaleClothing/variations/tshirt_material_shorts.glb";
import sleeve_less_tshirt from "../Pages/Customize/Configurator/models/MaleClothing/variations/sleeve_less_tshirt.glb";
import short_shirt_trousers from "../Pages/Customize/Configurator/models/MaleClothing/variations/short_shirt_trousers.glb";
import short_shirt_material_shorts from "../Pages/Customize/Configurator/models/MaleClothing/variations/short_shirt_material_shorts.glb";
import blazer_trousers from "../Pages/Customize/Configurator/models/MaleClothing/variations/blazer_trousers.glb";
import blazer_material_shorts from "../Pages/Customize/Configurator/models/MaleClothing/variations/blazer_material_shorts.glb";


//size-guides
// import tshirt_model from "../Pages/Customize/Configurator/size_guide/male/men.JPG";

import tshirt_guide from "../Assets/size_guide/MaleClothing/men short sleeve  t-shirt_.jpg";
import tshirtlong_guide from "../Assets/size_guide/MaleClothing/Men-long-sleeve t-shirt.jpg";
import shirt_guide from "../Assets/size_guide/MaleClothing/men short sleeve shirt.jpg";
import shirtlong_guide from "../Assets/size_guide/MaleClothing/men long sleeve shirt.png";
import top_down_guide from "../Assets/size_guide/MaleClothing/mens kaftan.jpg";
import cloak_guide from "../Assets/size_guide/MaleClothing/mens kimono jacket.jpg";
import loose_top_guide from "../Assets/size_guide/MaleClothing/mens loose short sleeve t shirt.jpg";
import blazer_guide from "../Assets/size_guide/MaleClothing/men blazer.png";
import trouser_guide from "../Assets/size_guide/MaleClothing/mens trousers.jpg";
import summer_shorts_guide from "../Assets/size_guide/MaleClothing/men summer shorts.jpg";
import material_shorts_guide from "../Assets/size_guide/MaleClothing/men material shorts.png";
import jacket_guide from "../Assets/size_guide/MaleClothing/men Bomber_Jacket.jpg";

// const tshirt_image = "https://a5e8126a499f8a963166-f72e9078d72b8c998606fd6e0319b679.ssl.cf5.rackcdn.com/images/variant/large/next-level_3600_black.jpg";
const image_tshirt_short = require("../Assets/welcome_3ds/male/male short sleev ankara.png");
const image_tshirt_long_image = require("../Assets/welcome_3ds/male/male long sleev ankara.png");
const image_shirt_short_image = require("../Assets/welcome_3ds/male/male short sleeve shirt.png");
const image_shirt_long_image = require("../Assets/welcome_3ds/male/male long sleeve shirt.png");
const image_topndown_image = require("../Assets/welcome_3ds/male/male top and down.png");
// const image_top_image = require("../Assets/welcome_3ds/male/male top.jpg");
const image_blazer_image = require("../Assets/welcome_3ds/male/male blazer.png");
const image_trouser_image = require("../Assets/welcome_3ds/male/male trousers.png");
const image_summer_image = require("../Assets/welcome_3ds/male/male summer shorts.png");
const image_shorts_image = require("../Assets/welcome_3ds/male/male shorts.png");
const image_jacket = require("../Assets/welcome_3ds/male/bomber_jacket.png");
const image_kimono = require("../Assets/welcome_3ds/male/kimono.png");

export const mainMaleCustomize = [
  {
    id: uuid(),
    name: "Short Sleeve T-Shirt",
    image: image_tshirt_short,
    model: tshirtModel1,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
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
    name: "Short Sleeve V-Shirt",
    image: "https://i.etsystatic.com/45328719/c/2400/2400/0/0/il/66fc66/5174621510/il_300x300.5174621510_n7oa.jpg",
    model: v_neck,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    isVariant: true,
    myX: 0,
    myY: 10,
    price: 110 + 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
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
    name: "Sleeveless T-shirt",
    image: "https://greatoutdoorprovision.com/wp-content/uploads/2020/03/500x500.png",
    model: sleeve_less_tshirt,
    isVariant: true,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110 + 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: "",
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
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
     
    ],
  },
  {
    id: uuid(),
    name: "Long Sleeve T-Shirt",
    image: image_tshirt_long_image,
    model: tshirtModel2,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 120,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirtlong_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 5, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 5, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 5, colorPriceValue: 125 },
      { label: "XL", value: 3, priceValue: 40, colorPriceValue: 125 },
      { label: "2XL", value: 4, priceValue: 40, colorPriceValue: 125 },
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
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: shirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
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
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    myX: 0,
    myY: 10,
    price: 120,
    sizeGuide: shirtlong_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 15, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 15, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 15, colorPriceValue: 125 },
      { label: "XL", value: 3, priceValue: 40, colorPriceValue: 125 },
      { label: "2XL", value: 4, priceValue: 40, colorPriceValue: 125 },
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
    name: "T-Shirt With Material Shorts",
    image: "https://greatoutdoorprovision.com/wp-content/uploads/2020/03/500x500.png",
    model: tshirt_material_shorts,
    isVariant: true,
    myNode: [
      { name: "all", yardNeeded: 3 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110 + 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [

    ],
  },

  {
    id: uuid(),
    name: "T-Shirt With Summer Shorts",
    image: "https://greatoutdoorprovision.com/wp-content/uploads/2020/03/500x500.png",
    model: tshirt_summer_shorts,
    isVariant: true,
    myNode: [
      { name: "all", yardNeeded: 3 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110+200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
     
    ],
  },

  {
    id: uuid(),
    name: "Tshirt With Trousers",
    image: "https://greatoutdoorprovision.com/wp-content/uploads/2020/03/500x500.png",
    model: tshirt_trousers,
    isVariant: true,
    myNode: [
      { name: "all", yardNeeded: 3 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110 + 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: shirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      
    ],
  },

  {
    id: uuid(),
    name: "Shirt With Material Shorts",
    image: "https://greatoutdoorprovision.com/wp-content/uploads/2020/03/500x500.png",
    model: short_shirt_material_shorts,
    isVariant: true,

    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110 + 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: shirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
      
    ],
  },
  {
    id: uuid(),
    name: "Shirt With Trousers",
    image: "https://greatoutdoorprovision.com/wp-content/uploads/2020/03/500x500.png",
    model: short_shirt_trousers,
    isVariant: true,

    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110 + 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: shirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
    ],
  },
  {
    id: uuid(),
    name: "Blazer With Material Shorts",
    image: "https://greatoutdoorprovision.com/wp-content/uploads/2020/03/500x500.png",
    model: blazer_material_shorts,
    isVariant: true,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110 + 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: shirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
     
    ],
  },
  {
    id: uuid(),
    name: "Blazer With Trousers",
    image: "https://greatoutdoorprovision.com/wp-content/uploads/2020/03/500x500.png",
    model: blazer_trousers,
    isVariant: true,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 110 + 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: shirt_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
    sizeForms: [
     
    ],
  },
  
  {
    id: uuid(),
    name: "Long Sleeve Top And Down Kaftan",
    image: image_topndown_image,
    model: topndown_model,
    myNode: [
      { name: "all", yardNeeded: 3 },
      // { name: "trousers", yardNeeded: 2 },
    ],
    otherYards: { small: 3, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    price: 210,
    sizeGuide: top_down_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: -45, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: -45, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: -20, colorPriceValue: 120 },
      { label: "XL", value: 3, priceValue: -20, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 120 },
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
    name: "Loose Short Sleeve Shirt",
    image: flare_shirt,
    model: cloak,
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.8,
    myX: 0,
    myY: 10,
    price: 110,
    sizeGuide: loose_top_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 120 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
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
    name: "Bomber Jacket",
    image: image_jacket,
    model: jacket,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 1 },
    ],
    otherYards: { small: 3, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.9,
    price: 140,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: jacket_guide,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 25, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 25, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 25, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 25, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 25, colorPriceValue: 120 },
    ],
    sizeForms: [
      {
        label: "Shoulder (cm)",
      },
      {
        label: "Chest (cm)",
      },
      {
        label: "Body Length (cm)",
      },
      {
        label: "Sleeve Length(cm)",
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: "Blazer",
    model: blazer,
    image: image_blazer_image,
    myNode: [
      { name: "all", yardNeeded: 3 },
      { name: "buttons", yardNeeded: 0 },
    ],
    otherYards: { small: 3, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.77,
    price: 390,
    sizeGuide: blazer_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 25, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 25, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 50, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 50, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
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
    name: "Kimono Jacket",
    model: cloak_model,
    image: image_kimono,
    myNode: [{ name: "all", yardNeeded: 3 }],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 110,
    sizeGuide: cloak_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    // parts: cloakParts.keys().map(cloakParts),
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 55, colorPriceValue: 85 },
      { label: "M", value: 1, priceValue: 55, colorPriceValue: 85 },
      { label: "L", value: 2, priceValue: 55, colorPriceValue: 120 },
      { label: "XL", value: 3, priceValue: 55, colorPriceValue: 120 },
      { label: "2XL", value: 4, priceValue: 55, colorPriceValue: 120 },
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
    name: "Trousers",
    image: image_trouser_image,
    model: trousersModel1,

    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 120,
    sizeGuide: trouser_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 25, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 25, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 50, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 50, colorPriceValue: 85 },
      { label: "2XL", value: 4, priceValue: 50, colorPriceValue: 120 },
    ],
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
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 100,
    sizeGuide: summer_shorts_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 0, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 0, colorPriceValue: 85 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 85 },
    ],
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
    myNode: [{ name: "all", yardNeeded: 2 }],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.5,
    myX: 0,
    myY: 10,
    price: 100,
    sizeGuide: material_shorts_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 50 },
      { label: "M", value: 1, priceValue: 0, colorPriceValue: 50 },
      { label: "L", value: 2, priceValue: 0, colorPriceValue: 85 },
      { label: "XL", value: 3, priceValue: 0, colorPriceValue: 85 },
      { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 85 },
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
