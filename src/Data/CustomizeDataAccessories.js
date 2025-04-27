import { v4 as uuid } from 'uuid';

// const handbag = "/assets/Customize/hand_bag.png";
// const bikini_img = "/assets/Customize/bikini.png";

// uncat
// const un2 = "/assets/Customize/maleAccessories/Uncat/2.jpg";

// 3d models
const tie = '../Pages/Customize/Configurator/models/Accessories/tie_main.glb';
const bow_tie =
  '../Pages/Customize/Configurator/models/Accessories/bow_tie_main.glb';
const knitted_cap =
  '../Pages/Customize/Configurator/models/Accessories/knittedHat_main_two.glb';
const round_cap =
  '../Pages/Customize/Configurator/models/Accessories/roundCap_main.glb';
const bikini = '../Pages/Customize/Configurator/models/Accessories/bikini.glb';
const hand_bag_model =
  '../Pages/Customize/Configurator/models/Accessories/handbag.glb';

// consting size guides
const roundCap_guide = '/assets/size_guide/Accessories/Male/28.jpg';
const knittedCap_guide = '/assets/size_guide/Accessories/Male/knited.jpg';
const bowTie_guide = '/assets/size_guide/Accessories/Male/27.jpg';
const flyingTie_guide = '/assets/size_guide/Accessories/Male/26.jpg';
const handbag_guide = '/assets/size_guide/Accessories/Female/33.jpg';
const bikini_guide = '/assets/size_guide/Accessories/Female/31.jpg';

const image_bikini = '/assets/welcome_3ds/female/bikini.png';
const image_totebag = '/assets/welcome_3ds/others/tote bag.png';
const image_bowtie = '/assets/welcome_3ds/others/bow tie.png';

export const mainMaleAccessories = [
  {
    id: uuid(),
    name: 'Kufi Hat',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMrekCG26FoYzQlY6mv6Ez-PhApN2QhTEFag&s',
    model: round_cap,
    myNode: [
      { name: 'all', yardNeeded: 1 },
      // { name: "top_section", yardNeeded: 1 },
    ],
    myZoom: 0.5,
    price: 150,
    sizeGuide: roundCap_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: 'Length (cm)',
        value: '',
      },
      {
        label: 'Width (cm)',
        value: '',
      },
      // Add more form fields as needed
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Knitted Cap",
  //   image:
  //     "https://image.made-in-china.com/202f0j00orGqiInWvEzg/Jamaican-Rasta-Hat-Multi-Colour-Striped-Slouchy-Beanie-Gorro-Reggae-Free-Rasta-Hat-Crochet-Pattern-Beanie-Cap.webp",
  //   model: knitted_cap,
  //   myNode: [
  //     { name: "bottom_section", yardNeeded: 1 },
  //     { name: "mid_section", yardNeeded: 1 },
  //     { name: "top_section", yardNeeded: 1 },
  //   ],
  //   myZoom: 0.5,
  //   price: 80,
  //   sizeGuide: knittedCap_guide,
  //   // sizeModels: tshirt_model,
  //   readyIn: 7,
  //   sizeOptions: [
  //     { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 0 },
  //     { label: "M", value: 1, priceValue: 0, colorPriceValue: 0 },
  //     { label: "L", value: 2, priceValue: 0, colorPriceValue: 0 },
  //     { label: "XL", value: 3, priceValue: 0, colorPriceValue: 0 },
  //     { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 0 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Length (cm)",
  //       value: "",
  //     },
  //     {
  //       label: "Width (cm)",
  //       value: "",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
  {
    name: 'Bow Tie',
    image: image_bowtie,
    model: bow_tie,
    myNode: [
      { name: 'all', yardNeeded: 1 },
      // { name: "bow", yardNeeded: 1 },
    ],

    myZoom: 1.5,
    price: 150,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: bowTie_guide,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: 'Length (cm)',
        value: '',
      },
      {
        label: 'Height (cm)',
        value: '',
      },
    ],
  },
  {
    name: 'Flying Tie',
    image:
      'https://cdn11.bigcommerce.com/s-tld76p/images/stencil/1440x1440/products/3196/15724/hoggs-of-fife-flying-pheasant-silk-tie-green__69312.1686653195.jpg?c=2',
    model: tie,
    myNode: [
      { name: 'all', yardNeeded: 1 },
      // { name: "top_section", yardNeeded: 1 },
    ],
    myZoom: 0.75,
    price: 150,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: flyingTie_guide,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: "Tie's Head (cm)",
      },
      {
        label: "Tie's End (cm)",
      },
      {
        label: 'Length (cm)',
      },
      // Add more form fields as needed
    ],
  },
];

export const mainFemaleAccessories = [
  {
    id: uuid(),
    name: 'Tote Bag',
    image: image_totebag,
    model: hand_bag_model,
    myNode: [
      { name: 'handle', yardNeeded: 1 },
      // { name: "left_section", yardNeeded: 1 },
      // { name: "mid_section", yardNeeded: 1 },
      // { name: "right_section", yardNeeded: 1 },
      { name: 'zippers_and_locks', yardNeeded: 1 },
    ],
    myZoom: 0.9,
    price: 150,
    sizeGuide: handbag_guide,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeOptions: [
      { label: 'S', value: 0.5, priceValue: 0, colorPriceValue: 0 },
      { label: 'M', value: 1, priceValue: 0, colorPriceValue: 0 },
      { label: 'L', value: 2, priceValue: 0, colorPriceValue: 0 },
      { label: 'XL', value: 3, priceValue: 0, colorPriceValue: 0 },
      { label: '2XL', value: 4, priceValue: 0, colorPriceValue: 0 },
    ],
    sizeForms: [
      {
        label: 'Length (cm)',
      },
      {
        label: 'Width (cm)',
      },
      {
        label: 'Height (cm)',
      },
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Bikini",
  //   image: image_bikini,
  //   model: bikini,
  //   myNode: [
  //     { name: "top", yardNeeded: 1 },
  //     { name: "bottom", yardNeeded: 1 },
  //   ],
  //   otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
  //   myZoom: 1.3,
  //   price: 55,
  //   // sizeModels: tshirt_model,
  //   readyIn: 7,
  //   sizeGuide: bikini_guide,
  //   sizeOptions: [
  //     // // { label: "XS", value: 0.5 },
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Upper Bust (cm)",
  //     },
  //     {
  //       label: "Under Bust (cm)",
  //     },
  //     {
  //       label: "Waist (cm)",
  //     },
  //     {
  //       label: "Bottom Length (cm)",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
];
