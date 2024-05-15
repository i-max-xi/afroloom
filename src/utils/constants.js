import { texture } from "three/examples/jsm/nodes/Nodes.js";
import {
  hair_guide_braziian,
  hair_guide_cambodia,
  hair_guide_capSize,
  hair_guide_frontal,
  hair_guide_indian,
  hair_guide_malasian,
  hair_guide_mongoloian,
  hair_guide_peruvian,
  hair_guide_synthethic,
  nail_guide_type,
  hair_guide_density,
  hair_guide_texture,
} from "../Data/CustomizeDataUnisex";

export const isMobile = window.innerWidth <= 767;
export const titleLimit = 50;
export const descriptionLimit = 200;

export const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  // { label: "Unisex", value: "Unisex" },
];

export const braidOptions = {
  colors: [
    "Natural black",
    "Natural Black with Grey Highlights",
    "Natural Black with Honey Blonde Highlights",
    "Natural Black with Light Auburn Highlights",
  ],

  length: [
    // { title: "8 inches", SDamount: 700, DDamount: 1000, SDDamount: 1200 },
    // { title: "10 inches", SDamount: 900, DDamount: 1250, SDDamount: 1200 },
    // { title: "12 inches", SDamount: 950, DDamount: 1400, SDDamount: 1350 },
    // { title: "14 inches", SDamount: 1100, DDamount: 1600, SDDamount: 1750 },
    // { title: "16 inches", SDamount: 1200, DDamount: 1750, SDDamount: 1950 },
    // { title: "18 inches", SDamount: 1300, DDamount: 1900, SDDamount: 2100 },
    // { title: "20 inches", SDamount: 1400, DDamount: 2350, SDDamount: 2450 },
    { title: "22 inches", SDamount: 1650, DDamount: 2450, SDDamount: 2550 },
    { title: "24 inches", SDamount: 1800, DDamount: 2550, SDDamount: 2750 },
    {
      title: "26 inches",
      SDamount: { standard: 1950, heavy: 2500 },
      DDamount: { standard: 2650, heavy: 3550 },
      SDDamount: { standard: 2850, heavy: 3750 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 2250, heavy: 2950 },
      DDamount: { standard: 2750, heavy: 3700 },
      SDDamount: { standard: 2950, heavy: 3800 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 2450, heavy: 3250 },
      DDamount: { standard: 2850, heavy: 3850 },
      SDDamount: { standard: 3050, heavy: 4000 },
    },
    { title: "32 inches", SDamount: 1800, DDamount: 2550, SDDamount: 2750 },
    { title: "34 inches", SDamount: 1800, DDamount: 2550, SDDamount: 2750 },
    { title: "36 inches", SDamount: 1800, DDamount: 2550, SDDamount: 2750 },
    { title: "38 inches", SDamount: 1800, DDamount: 2550, SDDamount: 2750 },
    { title: "40 inches", SDamount: 1800, DDamount: 2550, SDDamount: 2750 },
  ],

  capSize: ["Small", "Medium", "Large"],
};

export const boxWaveOptions = {
  colors: [
    "Natural Black",
    "Dark Brown",
    // "Light Brown",
    "Blonde",
    "Burgundy",
    // "Ombre Black to Blonde",
    // "Ombre Brown to Caramel",
    // "Ombre Blonde to Platinum Blonde",
    // "Ombre Dark Brown to Light Brown",
    // "Ombre Burgundy to Pink",
    // "Ombre Purple to Lavender",
    // "Ombre Blue to Teal",
    // "Ombre Red to Orange",
  ],

  length: [
    { title: "8 inches", SDamount: 700, DDamount: 1000, SDDamount: 1200 },
    { title: "10 inches", SDamount: 900, DDamount: 1250, SDDamount: 1200 },
    { title: "12 inches", SDamount: 950, DDamount: 1400, SDDamount: 1350 },
    { title: "14 inches", SDamount: 1100, DDamount: 1600, SDDamount: 1750 },
    { title: "16 inches", SDamount: 1200, DDamount: 1750, SDDamount: 1950 },
    { title: "18 inches", SDamount: 1300, DDamount: 1900, SDDamount: 2100 },
    { title: "20 inches", SDamount: 1400, DDamount: 2350, SDDamount: 2450 },
    { title: "22 inches", SDamount: 1650, DDamount: 2450, SDDamount: 2550 },
    { title: "24 inches", SDamount: 1800, DDamount: 2550, SDDamount: 2750 },
    {
      title: "26 inches",
      SDamount: { standard: 1950, heavy: 2500 },
      DDamount: { standard: 2650, heavy: 3550 },
      SDDamount: { standard: 2850, heavy: 3750 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 2250, heavy: 2950 },
      DDamount: { standard: 2750, heavy: 3700 },
      SDDamount: { standard: 2950, heavy: 3800 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 2450, heavy: 3250 },
      DDamount: { standard: 2850, heavy: 3850 },
      SDDamount: { standard: 3050, heavy: 4000 },
    },
  ],

  densityPreference: [
    // "Light (natural-looking)",
    "Standard (200grams)",
    "Heavy (300grams)",
  ],
  laceType: [
    "Swiss lace",
    "HD lace",
    "Transparent lace",
    "None (for those who prefer a non-lace wig)",
  ],

  capSize: ["Small", "Medium", "Large"],
  additionalOption: ["Fringe", "Curtain Bangs", "Side Bangs"],
  typeOfHair: ["Human"],
  humanHairType: [
    "Brazilian",
    "Cambodian",
    "Indian",
    "Malaysian",
    "Mongolian",
    "Peruvian",
  ].sort(),
  hairQuality: ["Single Drawn", "Double Drawn", "Super Double Drawn"],
  hairStyling: ["Middle Part", "Side Part"],
  hairClosure: ["Closure (4x4)", "Frontal (13 x 4)"],
  hamanHairGrades: [],
};

export const boneStrightWigOptions = {
  colors: ["Burgundy", "Natural Black", "Blonde", "Brown"],

  length: [
    { title: "8 inches", SDamount: 1450, DDamount: 1560, SDDamount: 1800 },
    { title: "10 inches", SDamount: 1600, DDamount: 1720, SDDamount: 1940 },
    { title: "12 inches", SDamount: 1750, DDamount: 1850, SDDamount: 2190 },
    { title: "14 inches", SDamount: 1880, DDamount: 2060, SDDamount: 2440 },
    { title: "16 inches", SDamount: 2140, DDamount: 2240, SDDamount: 2740 },
    { title: "18 inches", SDamount: 2320, DDamount: 2500, SDDamount: 3000 },
    { title: "20 inches", SDamount: 2480, DDamount: 2640, SDDamount: 3240 },
    { title: "22 inches", SDamount: 2580, DDamount: 2860, SDDamount: 3240 },
    {
      title: "24 inches",
      SDamount: { standard: 2750, heavy: 3540 },
      DDamount: { standard: 3030, heavy: 3030 },
      SDDamount: { standard: 3770, heavy: 3770 },
    },
    {
      title: "26 inches",
      SDamount: { standard: 2910, heavy: 3740 },
      DDamount: { standard: 3290, heavy: 4310 },
      SDDamount: { standard: 4050, heavy: 5450 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 3040, heavy: 3910 },
      DDamount: { standard: 3440, heavy: 4510 },
      SDDamount: { standard: 4500, heavy: 6100 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 3160, heavy: 4090 },
      DDamount: { standard: 3580, heavy: 4720 },
      SDDamount: { standard: 4700, heavy: 6400 },
    },
  ],

  texture: ["Straight", "Wavy", "Curly"],
  capSize: ["Small", "Medium", "Large"],
  additionalOption: ["Fringe", "Curtain Bangs", "Side Bangs"],
  laceType: [
    "Swiss lace",
    "HD lace",
    "Transparent lace",
    "None (for those who prefer a non-lace wig)",
  ],
  typeOfHair: ["Human"],
  humanHairType: [
    "Brazilian",
    "Cambodian",
    "Indian",
    "Malaysian",
    "Mongolian",
    "Peruvian",
  ].sort(),
  hairQuality: ["Single Drawn", "Double Drawn", "Super Double Drawn"],
  hairStyling: ["Middle Part", "Side Part"],
  hairClosure: ["Closure (4x4)", "Frontal (13 x 4)"],
  hamanHairGrades: [],
};

export const deepWaveWigOptions = {
  colors: ["Burgundy", "Natural Black", "Blonde"],

  length: [
    { title: "8 inches", SDamount: 700, DDamount: 1000, SDDamount: 1200 },
    { title: "10 inches", SDamount: 900, DDamount: 1250, SDDamount: 1200 },
    { title: "12 inches", SDamount: 950, DDamount: 1400, SDDamount: 1350 },
    { title: "14 inches", SDamount: 1100, DDamount: 1600, SDDamount: 1750 },
    { title: "16 inches", SDamount: 1200, DDamount: 1750, SDDamount: 1950 },
    { title: "18 inches", SDamount: 1300, DDamount: 1900, SDDamount: 2100 },
    { title: "20 inches", SDamount: 1400, DDamount: 2350, SDDamount: 2450 },
    { title: "22 inches", SDamount: 1650, DDamount: 2450, SDDamount: 2550 },
    { title: "24 inches", SDamount: 1800, DDamount: 2550, SDDamount: 2750 },
    {
      title: "26 inches",
      SDamount: { standard: 1950, heavy: 2500 },
      DDamount: { standard: 2650, heavy: 3550 },
      SDDamount: { standard: 2850, heavy: 3750 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 2250, heavy: 2950 },
      DDamount: { standard: 2750, heavy: 3700 },
      SDDamount: { standard: 2950, heavy: 3800 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 2450, heavy: 3250 },
      DDamount: { standard: 2850, heavy: 3850 },
      SDDamount: { standard: 3050, heavy: 4000 },
    },
  ],

  texture: ["Straight", "Wavy", "Curly"],
  capSize: ["Small", "Medium", "Large"],
  additionalOption: ["Fringe", "Curtain Bangs", "Side Bangs"],
  laceType: [
    "Swiss lace",
    "HD lace",
    "Transparent lace",
    "None (for those who prefer a non-lace wig)",
  ],
  typeOfHair: ["Human"],

  hairQuality: ["Single Drawn", "Double Drawn", "Super Double Drawn"],
  hairStyling: ["Middle Part", "Side Part"],
  hairClosure: ["Closure (4x4)", "Frontal (13 x 4)"],
  hamanHairGrades: [],
};

export const straightHairWigOptions = {
  colors: ["Natural Black", "Blonde", "Burgundy"],

  length: [
    { title: "8 inches", SDamount: 700, DDamount: 1000, SDDamount: 1200 },
    { title: "10 inches", SDamount: 900, DDamount: 1250, SDDamount: 1200 },
    { title: "12 inches", SDamount: 950, DDamount: 1400, SDDamount: 1350 },
    { title: "14 inches", SDamount: 1100, DDamount: 1600, SDDamount: 1750 },
    { title: "16 inches", SDamount: 1200, DDamount: 1750, SDDamount: 1950 },
    { title: "18 inches", SDamount: 1300, DDamount: 1900, SDDamount: 2100 },
    { title: "20 inches", SDamount: 1400, DDamount: 2350, SDDamount: 2450 },
    { title: "22 inches", SDamount: 1650, DDamount: 2450, SDDamount: 2550 },
    { title: "24 inches", SDamount: 1800, DDamount: 2550, SDDamount: 2750 },
    {
      title: "26 inches",
      SDamount: { standard: 1950, heavy: 2500 },
      DDamount: { standard: 2650, heavy: 3550 },
      SDDamount: { standard: 2850, heavy: 3750 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 2250, heavy: 2950 },
      DDamount: { standard: 2750, heavy: 3700 },
      SDDamount: { standard: 2950, heavy: 3800 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 2450, heavy: 3250 },
      DDamount: { standard: 2850, heavy: 3850 },
      SDDamount: { standard: 3050, heavy: 4000 },
    },
  ],

  texture: ["Straight", "Wavy", "Curly"],
  capSize: ["Small", "Medium", "Large"],
  additionalOption: ["Fringe", "Curtain Bangs", "Side Bangs"],
  laceType: [
    "Swiss lace",
    "HD lace",
    "Transparent lace",
    "None (for those who prefer a non-lace wig)",
  ],
  typeOfHair: ["Human"],
  humanHairType: [
    "Brazilian",
    "Cambodian",
    "Indian",
    "Malaysian",
    "Mongolian",
    "Peruvian",
  ].sort(),
  hairQuality: ["Single Drawn", "Double Drawn", "Super Double Drawn"],
  hairStyling: ["Middle Part", "Side Part"],
  hairClosure: ["Closure (4x4)", "Frontal (13 x 4)"],
  hamanHairGrades: [],
};

export const JerryCurlWigOptions = {
  colors: ["Burgundy", "Blonde"],

  length: [
    { title: "8 inches", SDamount: 650, DDamount: 850, SDDamount: 950 },
    { title: "10 inches", SDamount: 750, DDamount: 950, SDDamount: 1050 },
    { title: "12 inches", SDamount: 800, DDamount: 1050, SDDamount: 1150 },
    { title: "14 inches", SDamount: 900, DDamount: 1100, SDDamount: 1300 },
    { title: "16 inches", SDamount: 960, DDamount: 1200, SDDamount: 1400 },
    { title: "18 inches", SDamount: 1050, DDamount: 1300, SDDamount: 1500 },
    { title: "20 inches", SDamount: 1160, DDamount: 1450, SDDamount: 1650 },
    { title: "22 inches", SDamount: 1270, DDamount: 1550, SDDamount: 1750 },
    { title: "24 inches", SDamount: 1370, DDamount: 1650, SDDamount: 1850 },
    {
      title: "26 inches",
      SDamount: { standard: 1500, heavy: 1950 },
      DDamount: { standard: 1750, heavy: 2300 },
      SDDamount: { standard: 1950, heavy: 2500 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 1600, heavy: 2100 },
      DDamount: { standard: 1850, heavy: 2450 },
      SDDamount: { standard: 2050, heavy: 2550 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 1700, heavy: 2250 },
      DDamount: { standard: 1850, heavy: 2450 },
      SDDamount: { standard: 2150, heavy: 2600 },
    },
  ],

  texture: ["Straight", "Wavy", "Curly"],
  capSize: ["Small", "Medium", "Large"],
  additionalOption: ["Fringe", "Curtain Bangs", "Side Bangs"],
  laceType: [
    "Swiss lace",
    "HD lace",
    "Transparent lace",
    "None (for those who prefer a non-lace wig)",
  ],
  typeOfHair: ["Human"],
  humanHairType: [
    "Brazilian",
    "Cambodian",
    "Indian",
    "Malaysian",
    "Mongolian",
    "Peruvian",
  ].sort(),
  hairQuality: ["Single Drawn", "Double Drawn", "Super Double Drawn"],
  hairStyling: ["Middle Part", "Side Part"],
  hairClosure: ["Closure (4x4)", "Frontal (13 x 4)"],
  hamanHairGrades: [],
};

export const allNailOptions = {
  length: ["S", "M", "L", "XL", "XXL", "XXXL"],

  material: [
    "Standard Press-on Nails",
    "Gel Press-on Nails",
    "Acrylic Press-on Nails",
  ],
};

export const skinTone = [
  { title: "Dark", color: "#6e4b35" },
  { title: "Medium Dark", color: "#9b7653" },
  { title: "Medium Light", color: "#c19a6b" },
  { title: "Light", color: "#e0b291" },
];

export const hairGuidesHuman = [
  hair_guide_braziian,
  hair_guide_cambodia,
  hair_guide_indian,
  hair_guide_malasian,
  hair_guide_peruvian,
  hair_guide_mongoloian,
];

export const hairGuidesFrontal = [hair_guide_frontal];

export const hairGuidesTexture = [hair_guide_texture];

export const hairGuidesDensity = [hair_guide_density];

export const hairGuidesSynthethic = [hair_guide_synthethic];

export const hairGuidesCapSize = [hair_guide_capSize];

export const nailGuidesType = [nail_guide_type];

export const allowedDensityPrefences = ["26 inches", "28 inches", "30 inches"];
