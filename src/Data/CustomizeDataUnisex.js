import { v4 as uuid } from "uuid";

//models
import backpack_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/backpack.glb";
import mini_bag_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/mini_bag_handle_main_body.glb";
import sash_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash.glb";
import sash_model_new from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash_new.glb";
import sash_model_two from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash_two.glb";
import sash_both_down from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash_both_down.glb";
import sash_with_image from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash_with_picture.glb";
import sash_one_top_one_down from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash_one_top_one_down.glb";
import sash_striped_edge from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash_striped_edge.glb";

import jacket from "../Pages/Customize/Configurator/models/Accessories/Unisex/jacket_main.glb";
import bangles_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/bangles.glb";
import earring_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/earring.glb";
import bikini from "../Pages/Customize/Configurator/models/Accessories/bikini.glb";

// Importing size guides
import sash_guide from "../Assets/size_guide/Unisex/the_sash.jpg";
import miniBag_guide from "../Assets/size_guide/Unisex/30.jpg";
import backpack_guide from "../Assets/size_guide/Unisex/29.jpg";
import jacket_guide from "../Assets/size_guide/Unisex/35.jpg";
import bikini_guide from "../Assets/size_guide/Accessories/Female/31.jpg";
import earring_guide from "../Assets/size_guide/Unisex/earring size chart.jpg";
import bangle_guide from "../Assets/size_guide/Unisex/bracelet size chart.jpg";


// Marketing Models
const tshirt_model = "";

// parts
const sashParts = require.context(
  "../Assets/model_parts/Accessories/Unisex/sash",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const miniBagParts = require.context(
  "../Assets/model_parts/Accessories/Unisex/mini_bag_handle_main_body",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const backpackParts = require.context(
  "../Assets/model_parts/Accessories/Unisex/backpack",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const jacketParts = require.context(
  "../Assets/model_parts/Accessories/Unisex/jacket_main",
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const image_waist_bag = require("../Assets/welcome_3ds/others/waist bag.jpg");
const image_jacket = require("../Assets/welcome_3ds/others/jacket.png");
const image_backpack = require("../Assets/welcome_3ds/others/backpack.png");
const image_sash = require("../Assets/welcome_3ds/others/sash.jpg");
const bangles = require("../Assets/welcome_3ds/others/bangles.jpg");
const earring = require("../Assets/welcome_3ds/others/earring.jpg");
const image_bikini = require("../Assets/welcome_3ds/female/bikini.png");
const image_sash_logos_both_down = require("../Assets/welcome_3ds/others/sash_both_logos_down.jpg");
const image_sash_logos_one_up_one_down = require("../Assets/welcome_3ds/others/sash_one_up_one_down.jpg");
const image_sash_with_images = require("../Assets/welcome_3ds/others/sash_with_image.jpg");
const image_sash_striped_edge = require("../Assets/welcome_3ds/others/sash_with_edges.png");

export const mainUnisex = [
  {
    id: uuid(),
    name: "Beads Bracelet",
    image: bangles,
    model: bangles_model,
    // myNode: ["large_beads", "small_beads", "mid_section"],
    myNode: [
      { name: "large_beads", yardNeeded: 1 },
      { name: "small_beads", yardNeeded: 1 },
      { name: "brass", yardNeeded: 1 },
    ],

    myZoom: 0.8,
    price: 55,
    parts: sashParts.keys().map(sashParts),
    // sizeModels: tshirt_model,
    readyIn: 3,
    sizeGuide: bangle_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      // { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
    ],
    // sizeForms: [
    //   {
    //     label: "Length (inch)",
    //   },
    //   {
    //     label: "Width (inch)",
    //   },
    // ],
  },
  {
    id: uuid(),
    name: "Earring",
    image: earring,
    model: earring_model,
    myNode: [
      { name: "balls", yardNeeded: 1 },
      { name: "brass", yardNeeded: 1 },
    ],

    myZoom: 0.8,
    price: 55,
    parts: sashParts.keys().map(sashParts),
    // sizeModels: tshirt_model,
    readyIn: 3,
    sizeGuide: earring_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      // { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
    ],
    // sizeForms: [
    //   {
    //     label: "Length (inch)",
    //   },
    //   {
    //     label: "Width (inch)",
    //   },
    // ],
  },
  {
    id: uuid(),
    name: "Bikini",
    image: image_bikini,
    model: bikini,
    myNode: [
      { name: "top", yardNeeded: 1 },
      { name: "bottom", yardNeeded: 1 },
    ],
    myZoom: 1.3,
    price: 55,
    // parts: bikiniParts.keys().map(bikiniParts),
    // sizeModels: tshirt_model,
    readyIn: 3,
    sizeGuide: bikini_guide,
    sizeOptions: [
      // { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      // { label: "XL", value: 3 },
      // { label: "2XL", value: 4 },
    ],
    sizeForms: [
      {
        label: "Upper Bust (inch)",
      },
      {
        label: "Under Bust (inch)",
      },
      {
        label: "Waist (inch)",
      },
      {
        label: "Bottom Length (inch)",
      },
      // Add more form fields as needed
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Waist Bag",
  //   image: image_waist_bag,
  //   model: mini_bag_model,
  //   myNode: [{ name: "all", yardNeeded: 1 }],
  //   myZoom: 0.6,
  //   price: 55,
  //   parts: miniBagParts.keys().map(miniBagParts),
  //   sizeModels: tshirt_model,
  //   readyIn: 3,
  //   sizeGuide: miniBag_guide,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Min-Max circumference (inch)",
  //     },
  //     {
  //       label: "Width (inch)",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
  // {
  //   id: uuid(),
  //   name: "Backpack",
  //   image: image_backpack,
  //   model: backpack_model,
  //   myNode: [{ name: "all", yardNeeded: 2 }],
  //   myZoom: 0.75,
  //   price: 55,
  //   parts: backpackParts.keys().map(backpackParts),
  //   sizeModels: tshirt_model,
  //   readyIn: 3,
  //   sizeGuide: backpack_guide,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Height (inch)",
  //     },
  //     {
  //       label: "Depth (inch)",
  //     },
  //     {
  //       label: "Width (inch)",
  //     },
  //   ],
  // },
  // {
  //   id: uuid(),
  //   name: "Jacket",
  //   image: image_jacket,
  //   model: jacket,
  //   myNode: [
  //     { name: "torso", yardNeeded: 2 },
  //     { name: "hands", yardNeeded: 1 },
  //     { name: "buttons", yardNeeded: 1 },
  //   ],
  //   myZoom: 0.9,
  //   price: 55,
  //   parts: jacketParts.keys().map(jacketParts),
  //   sizeModels: tshirt_model,
  //   readyIn: 3,
  //   sizeGuide: jacket_guide,
  //   sizeOptions: [
  //     // { label: "XS", value: 0.5 },
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Shoulder (inch)",
  //     },
  //     {
  //       label: "Chest (inch)",
  //     },
  //     {
  //       label: "Body Length (inch)",
  //     },
  //     {
  //       label: "Sleeve Length(inch)",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
  {
    id: uuid(),
    name: "Logo Up, Text Down Sash",
    image: image_sash,
    model: sash_model,
    myNode: [
      { name: "plain_sections", yardNeeded: 1 },
      { name: "Stripe_1", yardNeeded: 1 },
      { name: "Stripe_2", yardNeeded: 1 },
      { name: "mid_stripes", yardNeeded: 1 },
      { name: "cuttings", yardNeeded: 1 },
    ],
    myZoom: 2,
    price: 55,
    parts: sashParts.keys().map(sashParts),
    // sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
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
    name: "Text Up, Logo Down Sash",
    image: image_sash_logos_both_down,
    model: sash_both_down,
    myNode: [
      { name: "plain_section", yardNeeded: 1 },
      { name: "stripe_1", yardNeeded: 1 },
      { name: "stripe_2", yardNeeded: 1 },
      { name: "mid_stripes", yardNeeded: 1 },
      { name: "cuttings", yardNeeded: 1 },
    ],
    myZoom: 2,
    price: 55,
    readyIn: 3,
    // weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
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
    name: "Contrasting Logo and Text Sash",
    image: image_sash_logos_one_up_one_down,
    model: sash_striped_edge,
    myNode: [
      { name: "mid_section", yardNeeded: 1 },
      { name: "stripe_1", yardNeeded: 1 },
      { name: "stripe_2", yardNeeded: 1 },
    ],
    myZoom: 2,
    price: 55,
    readyIn: 3,
    // weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
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
    name: "Text Up, Image Down Sash",
    image: image_sash_with_images,
    model: sash_with_image,
    myNode: [
      { name: "plain_section", yardNeeded: 1 },
      { name: "stripe_1", yardNeeded: 1 },
      { name: "stripe_2", yardNeeded: 1 },
      { name: "mid_stripes", yardNeeded: 1 },
      { name: "cuttings", yardNeeded: 1 },
    ],
    myZoom: 2,
    price: 55,
    // parts: sashParts.keys().map(sashParts),
    // sizeModels: tshirt_model,
    readyIn: 3,
    // weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
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
    name: "One-Sided Logo, Two-Sided Text Sash",
    image: image_sash_striped_edge,
    model: sash_striped_edge,
    myNode: [
      { name: "mid_section", yardNeeded: 1 },
      { name: "stripe_1", yardNeeded: 1 },
      { name: "stripe_2", yardNeeded: 1 },
    ],
    myZoom: 2,
    price: 55,
    // parts: sashParts.keys().map(sashParts),
    // sizeModels: tshirt_model,
    readyIn: 3,
    // weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
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
];
