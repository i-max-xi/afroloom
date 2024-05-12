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

  curlEnd: ["Tight Curls", "Loose Curls", "Spiral Curls", "S-wave Curls"],

  capSize: ["Small", "Medium", "Large"],
  additionalOption: ["Fringe", "Curtain Bangs", "Side Bangs"],
  laceType: [
    "Swiss lace",
    "HD lace",
    "Transparent lace",
    "None (for those who prefer a non-lace wig)",
  ],
  typeOfHair: ["Human", "Synthetic"],
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

export const boxWaveOptions = {
  colors: [
    "Natural Black",
    "Dark Brown",
    "Light Brown",
    "Blonde",
    "Red",
    "Ombre Black to Blonde",
    "Ombre Brown to Caramel",
    "Ombre Blonde to Platinum Blonde",
    "Ombre Dark Brown to Light Brown",
    "Ombre Burgundy to Pink",
    "Ombre Purple to Lavender",
    "Ombre Blue to Teal",
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
  typeOfHair: ["Human", "Synthetic"],
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

export const boxWigOptions = {
  colors: ["Light Auburn", "Burgundy", "Wine Red"],

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
  typeOfHair: ["Human", "Synthetic"],
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
