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
import nails_model from "../Pages/Customize/Configurator/models/Accessories/nails.glb";
import coffin_nails_model from "../Pages/Customize/Configurator/models/Accessories/coffin_nails.glb";
import round_nails_model from "../Pages/Customize/Configurator/models/Accessories/round_nails.glb";
import stilletto_nails_model from "../Pages/Customize/Configurator/models/Accessories/stilletto_nails.glb";
import almond_nails_model from "../Pages/Customize/Configurator/models/Accessories/almond_nails.glb";
import square_nails_model from "../Pages/Customize/Configurator/models/Accessories/square_nails.glb";

// Importing size guides
import sash_guide from "../Assets/size_guide/Unisex/the_sash.jpg";
import miniBag_guide from "../Assets/size_guide/Unisex/30.jpg";
import backpack_guide from "../Assets/size_guide/Unisex/29.jpg";
import jacket_guide from "../Assets/size_guide/Unisex/35.jpg";
import bikini_guide from "../Assets/size_guide/Accessories/Female/31.jpg";
import earring_guide from "../Assets/size_guide/Unisex/earring size chart.jpg";
import bangle_guide from "../Assets/size_guide/Unisex/bracelet size chart.jpg";
import hair_guide from "../Assets/size_guide/Unisex/hair length.png";
import nail_guide from "../Assets/size_guide/Unisex/nail length guide.jpg";

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

const image_confirm_1 = require("../Assets/raw3ds/sash1.png");
const image_confirm_2 = require("../Assets/raw3ds/sash2.png");
const image_confirm_3 = require("../Assets/raw3ds/sash3.png");
const image_confirm_4 = require("../Assets/raw3ds/sash4.png");
const image_confirm_5 = require("../Assets/raw3ds/sash5.png");

//box braid
const box_braid = require("../Assets/welcome_3ds/others/Wig/box_braid/profile pic_  Box Braid Wig with Curly End.png");
const box_braid_black = require("../Assets/welcome_3ds/others/Wig/box_braid/black.png");
const box_braid_grey = require("../Assets/welcome_3ds/others/Wig/box_braid/grey.png");
const box_braid_brown = require("../Assets/welcome_3ds/others/Wig/box_braid/brown.png");
const box_braid_wine = require("../Assets/welcome_3ds/others/Wig/box_braid/wine.png");

// body wave
const body_wave = require("../Assets/welcome_3ds/others/Wig/body_wave/body wave wig profile pic.jpg");
const BL_66040_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL_66040-1-.png");
const BL_11017_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL11017-1-.png");
const BL_11018_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL11018-1-.png");
const BL_11026_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL11026-1.png");
const BL_11036_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL11036-1-.png");
const BL_66010_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL66010-1.png");
const BL_66060_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL66060-1-.png");
const BL_66069_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL66069-1-.png");
const BL_66084_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL66084-1.png");
const BL_66110_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL66110-1-.png");
const BL_66111_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL66111-1-.png");
const BL_66122_1 = require("../Assets/welcome_3ds/others/Wig/body_wave/BL66122-1-.png");

//bob wig
const bob_wig = require("../Assets/welcome_3ds/others/Wig/bob_wig/bob wig profile pic.jpg");
const light_auburn = require("../Assets/welcome_3ds/others/Wig/bob_wig/OT30-.png");
const burgundy = require("../Assets/welcome_3ds/others/Wig/bob_wig/530-.png");
const wine_red = require("../Assets/welcome_3ds/others/Wig/bob_wig/99J-.png");

export const mainUnisex = [
  {
    id: uuid(),
    name: "Square Nails",
    link: "/configurator-nails/Square Nails",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/273912377-372031824314185-6626888513630609174-n-1676653877.jpg",
    model: square_nails_model,
    myNode: [
      { name: "nails", yardNeeded: 1 },
      { name: "nailHands", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    sizeGuide: nail_guide,
    price: 10,
    readyIn: 7,
  },
  // {
  //   id: uuid(),
  //   name: "Coffin Nails",
  //   link: "/configurator-nails/Coffin Nails",
  //   image:
  //     "https://www.byrdie.com/thmb/nm8BSffq7U2t9kXFFOvjmgnjxRo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/91571257_1539518826223868_2434414556032171702_n-8f4c117bc3a640d8b3e3b4988b3aeaf5.jpg",
  //   model: nails_model,
  //   myNode: [
  //     { name: "nails", yardNeeded: 1 },
  //     { name: "nailHands", yardNeeded: 1 },
  //   ],
  //   otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
  //   myZoom: 0.5,
  //   price: 10,
  //   readyIn: 7,
  //   sizeGuide: nail_guide,
  // },

  {
    id: uuid(),
    name: "Round Nails",
    link: "/configurator-nails/Round Nails",
    image:
      "https://stylemissus.com/cdn/shop/products/product-image-1295848768.jpg?v=1584041580",
    model: round_nails_model,
    myNode: [
      { name: "nails", yardNeeded: 1 },
      { name: "nailHands", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    price: 10,
    readyIn: 7,
    sizeGuide: nail_guide,
  },
  {
    id: uuid(),
    name: "Stiletto Nails",
    link: "/configurator-nails/Stiletto Nails",
    image:
      "https://naildesignsjournal.com/wp-content/uploads/2022/03/nude-stiletto-nails-trends-super-long.jpg",
    model: stilletto_nails_model,
    myNode: [
      { name: "nails", yardNeeded: 1 },
      { name: "nailHands", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    price: 10,
    readyIn: 7,
    sizeGuide: nail_guide,
  },
  {
    id: uuid(),
    name: "Spiral Curls Braids Wig",
    image: box_braid,
    price: 50,
    readyIn: 7,
    link: "/configurator-wig/Spiral Curls Braids Wig",
    colorVariants: [
      box_braid_black,
      box_braid_grey,
      box_braid_brown,
      box_braid_wine,
    ],
    sizeGuide: hair_guide,
  },
  {
    id: uuid(),
    name: "Body Wave Wig",
    // image: body_wave,
    image:
      "https://www.sheshappyhair.com/cdn/shop/products/bodywavewig_sheshappyhair_realhumanhair_da9c25e5-56b9-4364-ad50-8c14a88d249d_835x.png?v=1664464064",
    price: 50,
    readyIn: 7,
    link: "/configurator-wig/Body Wave Wig",
    colorVariants: [
      BL_66040_1,
      BL_11017_1,
      BL_11018_1,
      BL_11026_1,
      BL_11036_1,
      BL_66010_1,
      BL_66060_1,
      BL_66069_1,
      BL_66084_1,
      BL_66110_1,
      BL_66111_1,
      BL_66122_1,
    ],
    sizeGuide: hair_guide,
  },
  {
    id: uuid(),
    name: "Bob Wig",
    // image: bob_wig,
    image:
      "https://www.josephs-wigs.com/media/wysiwyg/Josephs-Wigs-Bob-Wigs-Dark-Bob-Style-Wig.jpg",
    model: bangles_model,
    price: 50,
    readyIn: 7,
    link: "/configurator-wig/Bob Wig",
    colorVariants: [light_auburn, burgundy, wine_red],
    sizeGuide: hair_guide,
  },
  {
    id: uuid(),
    name: "Beads Bracelet",
    image: bangles,
    model: bangles_model,
    myNode: [
      { name: "large_beads", yardNeeded: 1 },
      { name: "small_beads", yardNeeded: 1 },
      { name: "brass", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 50,
    readyIn: 7,
    sizeGuide: bangle_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
    ],
    sizeForms: [
      {
        label: "Wrist size (cm)",
      },
    ],
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
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 10,
    readyIn: 7,
    sizeGuide: earring_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
    ],
    sizeForms: [
      {
        label: "Earlobe (mm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Bikini",
    image: image_bikini,
    model: bikini,
    myNode: [
      { name: "bikini_all", yardNeeded: 3 },
      { name: "bikini_top", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 3, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 80 + 20,
    // parts: bikiniParts.keys().map(bikiniParts),
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: bikini_guide,
    sizeOptions: [
      // { label: "XS", value: 0.5 },
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      { label: "XL", value: 3 },
      { label: "2XL", value: 4 },
    ],
    sizeForms: [
      {
        label: "Upper Bust (cm)",
      },
      {
        label: "Under Bust (cm)",
      },
      {
        label: "Waist (cm)",
      },
      {
        label: "Bottom Length (cm)",
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
  //   readyIn: 7,
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
  //       label: "Min-Max circumference (cm)",
  //     },
  //     {
  //       label: "Width (cm)",
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
  //   readyIn: 7,
  //   sizeGuide: backpack_guide,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Height (cm)",
  //     },
  //     {
  //       label: "Depth (cm)",
  //     },
  //     {
  //       label: "Width (cm)",
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
  //   readyIn: 7,
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
  //       label: "Shoulder (cm)",
  //     },
  //     {
  //       label: "Chest (cm)",
  //     },
  //     {
  //       label: "Body Length (cm)",
  //     },
  //     {
  //       label: "Sleeve Length(cm)",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
  {
    id: uuid(),
    name: "Logo Up, Text Down Sash",
    image: image_sash,
    model: sash_model,
    confirm_image: image_confirm_1,
    myNode: [
      { name: "plain_sections", yardNeeded: 1 },
      { name: "Stripe_1", yardNeeded: 1 },
      { name: "Stripe_2", yardNeeded: 1 },
      { name: "mid_stripes", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 2,
    price: 120,
    // parts: sashParts.keys().map(sashParts),
    // sizeModels: tshirt_model,
    readyIn: 7,
    weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
    ],
    sizeForms: [
      {
        label: "Length (cm)",
      },
      {
        label: "Width (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Text Up, Logo Down Sash",
    image: image_sash_logos_both_down,
    model: sash_both_down,
    confirm_image: image_confirm_2,
    myNode: [
      { name: "plain_section", yardNeeded: 1 },
      { name: "stripe_1", yardNeeded: 1 },
      { name: "stripe_2", yardNeeded: 1 },
      { name: "mid_stripes", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 2,
    price: 120,
    readyIn: 7,
    // weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
    ],
    sizeForms: [
      {
        label: "Length (cm)",
      },
      {
        label: "Width (cm)",
      },
    ],
  },
  {
    id: uuid(),
    name: "Contrasting Logo and Text Sash",
    image: image_sash_logos_one_up_one_down,
    model: sash_striped_edge,
    confirm_image: image_confirm_3,
    myNode: [
      { name: "mid_section", yardNeeded: 1 },
      { name: "stripe_1", yardNeeded: 1 },
      { name: "stripe_2", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 2,
    price: 120,
    readyIn: 7,
    // weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
    ],
    sizeForms: [
      {
        label: "Length (cm)",
      },
      {
        label: "Width (cm)",
      },
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Text Up, Image Down Sash",
  //   image: image_sash_with_images,
  //   model: sash_with_image,
  //   confirm_image: image_confirm_4,
  //   myNode: [
  //     { name: "plain_section", yardNeeded: 1 },
  //     { name: "stripe_1", yardNeeded: 1 },
  //     { name: "stripe_2", yardNeeded: 1 },
  //     { name: "mid_stripes", yardNeeded: 1 },
  //   ],
  //   otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
  //   myZoom: 2,
  //   price: 150,
  //   // parts: sashParts.keys().map(sashParts),
  //   // sizeModels: tshirt_model,
  //   readyIn: 7,
  //   // weight: 0.25,
  //   sizeGuide: sash_guide,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Length (cm)",
  //     },
  //     {
  //       label: "Width (cm)",
  //     },
  //   ],
  // },
  {
    id: uuid(),
    name: "One-Sided Logo, Two-Sided Text Sash",
    image: image_sash_striped_edge,
    model: sash_striped_edge,
    confirm_image: image_confirm_5,
    myNode: [
      { name: "mid_section", yardNeeded: 1 },
      { name: "stripe_1", yardNeeded: 1 },
      { name: "stripe_2", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 2,
    price: 120,
    // parts: sashParts.keys().map(sashParts),
    // sizeModels: tshirt_model,
    readyIn: 7,
    // weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
    ],
    sizeForms: [
      {
        label: "Length (cm)",
      },
      {
        label: "Width (cm)",
      },
    ],
  },
];
