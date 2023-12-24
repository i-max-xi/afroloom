import { v4 as uuid } from "uuid";

// backpacks
// import bp1 from '../Assets/Customize/unisex/backpack/1.jpg'


// import jacket_img from '../Assets/Customize/jacket.jpg'

//models 
import backpack_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/backpack.glb";
import mini_bag_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/mini_bag_handle_main_body.glb";
import sash_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash.glb";
import jacket from "../Pages/Customize/Configurator/models/Accessories/Unisex/jacket_main.glb";

// Importing size guides
import sash_guide from "../Assets/size_guide/Unisex/the_sash.jpg";
import miniBag_guide from '../Assets/size_guide/Unisex/30.jpg';
import backpack_guide from '../Assets/size_guide/Unisex/29.jpg';
import jacket_guide from '../Assets/size_guide/Unisex/35.jpg';


// Marketing Models
const tshirt_model = "";

// parts
const sashParts = require.context(
  '../Assets/model_parts/Accessories/Unisex/sash',
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const miniBagParts = require.context(
  '../Assets/model_parts/Accessories/Unisex/mini_bag_handle_main_body',
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const backpackParts = require.context(
  '../Assets/model_parts/Accessories/Unisex/backpack',
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const jacketParts = require.context(
  '../Assets/model_parts/Accessories/Unisex/jacket_main',
  false,
  /\.(png|jpg|jpeg|gif)$/
);

const image_waist_bag = require("../Assets/welcome_3ds/others/waist bag.jpg");
const image_jacket = require("../Assets/welcome_3ds/others/jacket.png");
const image_backpack = require("../Assets/welcome_3ds/others/backpack.png");
const image_sash = require("../Assets/welcome_3ds/others/sash.jpg");


export const mainUnisex = [
  {
    id: uuid(),
    name: 'Sash',
    // image:
    //   'https://images-na.ssl-images-amazon.com/images/I/61Kp8a2HpQL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg',
    image: image_sash,
    model: sash_model,
    myNode: ['plain_sections', 'Stripe_1', 'Stripe_2', 'mid_stripes', ],
    myZoom: 1.5,
    price: 55,
    parts: sashParts.keys().map(sashParts),
sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,    sizeGuide: sash_guide,
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
        label: 'Length (inch)',
      },
      {
        label: 'Width (inch)',
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: 'Waist Bag',
    // image: bp1,
    image: image_waist_bag,
    model: mini_bag_model,
    myNode: ['main_body', 'handle', 'cover', 'zippers'],
    myZoom: 0.6,
    price: 55,
    parts: miniBagParts.keys().map(miniBagParts),
sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,    sizeGuide: miniBag_guide,
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
        label: 'Min-Max circumference (inch)',
      },
      {
        label: 'Width (inch)',
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: 'Backpack',
    // image:
    //   'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5286/5286137cv12d.jpg',
    image: image_backpack,
    model: backpack_model,
    myNode: [
      'front_1',
      'front_2',
      'front_3',
      'left_handle',
      'right_handle',
      'top_handle',
      "zippers",
    ],
    myZoom: 0.75,
    price: 55,
    parts: backpackParts.keys().map(backpackParts),
sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,    sizeGuide: backpack_guide,
    sizeOptions: [
      { label: "S", value: 0.5 },
      { label: "M", value: 1 },
      { label: "L", value: 2 },
      // { label: "35L", value: 3 },
      // { label: "XXL", value: 4 },
      // { label: "3XL", value: 5 },
      // { label: "4XL", value: 6 },
      // { label: "5XL", value: 7 },
      // { label: "6XL", value: 8 },
      // { label: "7XL", value: 9 },
    ],
    sizeForms: [
      {
        label: 'Height (inch)',
      },
      {
        label: 'Depth (inch)',
      },
      {
        label: 'Width (inch)',
      },
    ],
  },
  {
    id: uuid(),
    name: 'Jacket',
    // image: jacket_img,
    image: image_jacket,
    model: jacket,
    myNode: [
      'midline',
      'left_hand',
      'left_hand_cuff',
      'right_hand',
      'right_hand_cuff',
      'collar',
      'front_right',
      'front_left',
      'back',
    ],
    myZoom: 0.9,
    price: 55,
    parts: jacketParts.keys().map(jacketParts),
sizeModels: tshirt_model,
    readyIn: 3,
    weight: 0.25,    sizeGuide: jacket_guide,
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
        label: 'Shoulder (inch)',
      },
      {
        label: 'Chest (inch)',
      },
      {
        label: 'Body Length (inch)',
      },
      {
        label: 'Sleeve Length(inch)',
      },
      // Add more form fields as needed
    ],
  },
];


