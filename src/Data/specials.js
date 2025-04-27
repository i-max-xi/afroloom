import { v4 as uuid } from 'uuid';

// model imports
import tshirtModel1 from '../Pages/Customize/Configurator/models/MaleClothing/tshirt_main.glb';
import tshirtModel2 from '../Pages/Customize/Configurator/models/MaleClothing/tshirt_long_best.glb';
import tshirt_female_Model1 from '../Pages/Customize/Configurator/models/FemaleClothing/tshirt_short_two.glb';
import tshirt_female_Model2 from '../Pages/Customize/Configurator/models/FemaleClothing/tshirt_long_two.glb';
import v_neck from '../Pages/Customize/Configurator/models/MaleClothing/variations/v_neck.glb';
import female_v_neck from '../Pages/Customize/Configurator/models/FemaleClothing/variations/v_neck.glb';

const tshirt_guide =
  '/assets/size_guide/MaleClothing/men short sleeve  t-shirt_.jpg';
const tshirtlong_guide =
  '/assets/size_guide/MaleClothing/Men-long-sleeve t-shirt.jpg';
const tshirt_female_guide =
  '/assets/size_guide/FemaleClothing/short_sleeves_tshirt.png';
const tshirtlong_female_guide =
  '/assets/size_guide/FemaleClothing/women long t shirt.jpg';

const image_tshirt_long =
  '/assets/welcome_3ds/male/male_longsleeves_with_logo.webp';
const image_female_tshirt_long =
  '/assets/welcome_3ds/female/female_longsleeves_with_logo.webp';
const image_v_neck = '/assets/welcome_3ds/male/v_neck_on_logo.jpg';
const image_v_neck_on_logo = '/assets/welcome_3ds/female/v_neck_on_logo.jpg';

export const specialsCustomize = [
  {
    id: uuid(),
    name: 'Short Sleeve T-Shirt',
    image:
      'https://ih1.redbubble.net/image.641582551.3228/ssrco,classic_tee,mens,0d162e:9880ee6111,front_alt,square_product,600x600.u1.jpg',
    model: tshirtModel1,
    myNode: [{ name: 'all', yardNeeded: 3 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 60,
    logo: {
      translate: {
        x: '-47%',
        y: '-45%',
      },
      size: {
        width: '6rem',
        height: '6rem',
      },
    },
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirt_guide,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: 'Neck Size (cm)',
      },
      {
        label: 'Half Across Back (cm)',
      },
      {
        label: 'Chest (cm)',
      },
      {
        label: 'Sleeve Length (cm)',
      },
    ],
  },
  {
    id: uuid(),
    name: 'Long Sleeve T-Shirt',
    image: image_tshirt_long,
    model: tshirtModel2,
    myNode: [{ name: 'all', yardNeeded: 3 }],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 60,
    logo: {
      translate: {
        x: '-50%',
        y: '-45%',
      },
      size: {
        width: '5.5rem',
        height: '5.5rem',
      },
    },
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirtlong_guide,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: 'Neck Size (cm)',
      },
      {
        label: 'Half Across Back (cm)',
      },
      {
        label: 'Chest (cm)',
      },
      {
        label: 'Sleeve Length (cm)',
      },
    ],
  },

  {
    id: uuid(),
    name: 'Short Sleeve V-Neck T-Shirt',
    image: image_v_neck,
    model: v_neck,
    myNode: [{ name: 'all', yardNeeded: 3 }],
    otherYards: { small: 3, large: 4, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 60,
    logo: {
      translate: {
        x: '-50%',
        y: '-45%',
      },
      size: {
        width: '5.5rem',
        height: '5.5rem',
      },
    },
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirtlong_guide,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: 'Neck Size (cm)',
      },
      {
        label: 'Half Across Back (cm)',
      },
      {
        label: 'Chest (cm)',
      },
      {
        label: 'Sleeve Length (cm)',
      },
    ],
  },

  {
    id: uuid(),
    name: 'Female Short Sleeve T-Shirt',
    image:
      'https://image.spreadshirtmedia.com/image-server/v1/products/T347A2PA4306PT17X28Y26D1028774765W19472H19472/views/1,width=550,height=550,appearanceId=2,backgroundColor=F2F2F2,modelId=2564,crop=list/pan-africanism-adinkra-symbol-of-gods-tree-womens-t-shirt.jpg',
    model: tshirt_female_Model1,
    myNode: [{ name: 'all', yardNeeded: 3 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 60,
    logo: {
      translate: {
        x: '-47%',
        y: '-45%',
      },
      size: {
        width: '6rem',
        height: '6rem',
      },
    },
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirt_female_guide,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: 'Neck Size (cm)',
      },
      {
        label: 'Half Across Back (cm)',
      },
      {
        label: 'Chest (cm)',
      },
      {
        label: 'Sleeve Length (cm)',
      },
    ],
  },
  {
    id: uuid(),
    name: 'Female V-Neck T-Shirt',
    image: image_v_neck_on_logo,
    model: female_v_neck,
    myNode: [{ name: 'all', yardNeeded: 3 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 60,
    logo: {
      translate: {
        x: '-47%',
        y: '-45%',
      },
      size: {
        width: '6rem',
        height: '6rem',
      },
    },
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirt_female_guide,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: 'Neck Size (cm)',
      },
      {
        label: 'Half Across Back (cm)',
      },
      {
        label: 'Chest (cm)',
      },
      {
        label: 'Sleeve Length (cm)',
      },
    ],
  },

  {
    id: uuid(),
    name: 'Female Long Sleeve T-Shirt',
    image: image_female_tshirt_long,
    model: tshirt_female_Model2,
    myNode: [{ name: 'all', yardNeeded: 3 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 60,
    logo: {
      translate: {
        x: '-47%',
        y: '-45%',
      },
      size: {
        width: '6rem',
        height: '6rem',
      },
    },
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: tshirtlong_female_guide,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: 'Neck Size (cm)',
      },
      {
        label: 'Half Across Back (cm)',
      },
      {
        label: 'Chest (cm)',
      },
      {
        label: 'Sleeve Length (cm)',
      },
    ],
  },
];
