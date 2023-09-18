import { v4 as uuid } from "uuid";

// backpacks
import bp1 from '../Assets/Customize/unisex/backpack/1.jpg'


import jacket_img from '../Assets/Customize/jacket.jpg'

//models 
import backpack_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/backpack.glb";
import mini_bag_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/mini_bag_handle_main_body.glb";
import sash_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash.glb";
import jacket from "../Pages/Customize/Configurator/models/Accessories/Unisex/jacket_main.glb";

// Importing size guides
import sash_guide from '../Assets/size_guide/Unisex/sash.JPG';
import miniBag_guide from '../Assets/size_guide/Unisex/mini_bag.JPG';
import backpack_guide from '../Assets/size_guide/Unisex/back_pack.JPG';
import jacket_guide from '../Assets/size_guide/Unisex/jacket.JPG';

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



export const mainUnisex = [
  {
    id: uuid(),
    name: 'Sash',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/61Kp8a2HpQL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg',
    model: sash_model,
    myNode: ['all'],
    myZoom: 0.8,
    price: 55,
    parts: sashParts.keys().map(sashParts),
    sizeGuide: sash_guide, // Adding size guide for Sash
    sizeForms: [
      {
        label: 'Length (inch)',
        value: '',
      },
      {
        label: 'Width (inch)',
        value: '',
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: 'Mini Bag',
    image: bp1,
    model: mini_bag_model,
    myNode: ['handle', 'big_section', 'small_section'],
    myZoom: 0.6,
    price: 55,
    parts: miniBagParts.keys().map(miniBagParts),
    sizeGuide: miniBag_guide, // Adding size guide for Mini Bag
    sizeForms: [
      {
        label: 'Length (inch)',
        value: '',
      },
      {
        label: 'Width (inch)',
        value: '',
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: 'Backpack',
    image:
      'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5286/5286137cv12d.jpg',
    model: backpack_model,
    myNode: [
      'front_1',
      'front_2',
      'front_3',
      'left_handle',
      'right_handle',
      'top_handle',
    ],
    myZoom: 0.7,
    price: 55,
    parts: backpackParts.keys().map(backpackParts),
    sizeGuide: backpack_guide, // Adding size guide for Backpack
    sizeForms: [
      {
        label: 'Length (inch)',
        value: '',
      },
      {
        label: 'Width (inch)',
        value: '',
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: 'Jacket',
    image: jacket_img,
    model: jacket,
    myNode: [
      'back',
      'collar',
      'front_left',
      'front_right',
      'left_hand',
      'left_hand_cuff',
      'midline',
      'right_hand',
      'right_hand_cuff',
    ],
    myZoom: 0.8,
    price: 55,
    parts: jacketParts.keys().map(jacketParts),
    sizeGuide: jacket_guide, // Adding size guide for Jacket
    sizeForms: [
      {
        label: 'Length (inch)',
        value: '',
      },
      {
        label: 'Width (inch)',
        value: '',
      },
      // Add more form fields as needed
    ],
  },
];


