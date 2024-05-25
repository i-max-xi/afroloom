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

import darkTone from "../Assets/human/dark.jpg";
import mediumDarkTone from "../Assets/human/medium_dark.jpg";
import mediumLightTone from "../Assets/human/medum_light.jpg";
import lightTone from "../Assets/human/light.jpg";

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
    { title: "12 inches", amount: 350 },
    { title: "14 inches", amount: 400 },
    { title: "16 inches", amount: 450 },
    { title: "18 inches", amount: 500 },
    { title: "20 inches", amount: 600 },
    { title: "22 inches", amount: 700 },
    { title: "24 inches", amount: 850 },
    { title: "26 inches", amount: 850 },
    { title: "28 inches", amount: 900 },
    { title: "30 inches", amount: 900 },
  ],

  capSize: ["Small", "Medium", "Large"],

  // hairQuality: ["Single Drawn", "Double Drawn", "Super Double Drawn"],
  hairStyling: ["Middle Part", "Left Part", "Right Part"],
  hairClosure: ["Closure (4x4)", "Frontal (13 x 4)"],
  hamanHairGrades: [],
};

export const bodyWaveOptions = {
  colors: ["Natural Black", "Dark Brown", "Blonde", "Burgundy"],

  frontalLength: [
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

  length: [
    { title: "8 inches", SDamount: 500, DDamount: 800, SDDamount: 1000 },
    { title: "10 inches", SDamount: 550, DDamount: 950, SDDamount: 1150 },
    { title: "12 inches", SDamount: 700, DDamount: 1150, SDDamount: 1250 },
    { title: "14 inches", SDamount: 850, DDamount: 1300, SDDamount: 1350 },
    { title: "16 inches", SDamount: 950, DDamount: 1450, SDDamount: 1550 },
    { title: "18 inches", SDamount: 1050, DDamount: 1600, SDDamount: 1750 },
    { title: "20 inches", SDamount: 1150, DDamount: 2000, SDDamount: 2100 },
    { title: "22 inches", SDamount: 1250, DDamount: 2100, SDDamount: 2250 },
    {
      title: "24 inches",
      SDamount: { standard: 1400, heavy: 1700 },
      DDamount: { standard: 2250, heavy: 3050 },
      SDDamount: { standard: 2400, heavy: 3150 },
    },
    {
      title: "26 inches",
      SDamount: { standard: 1600, heavy: 2100 },
      DDamount: { standard: 2300, heavy: 3100 },
      SDDamount: { standard: 2500, heavy: 3200 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 1900, heavy: 2600 },
      DDamount: { standard: 2400, heavy: 3300 },
      SDDamount: { standard: 2600, heavy: 3000 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 2100, heavy: 2800 },
      DDamount: { standard: 2500, heavy: 3500 },
      SDDamount: { standard: 2700, heavy: 3700 },
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
  hairStyling: ["Middle Part", "Left Part", "Right Part"],
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

  frontalLength: [
    { title: "8 inches", SDamount: 2050, DDamount: 2160, SDDamount: 2400 },
    { title: "10 inches", SDamount: 2260, DDamount: 2380, SDDamount: 2600 },
    { title: "12 inches", SDamount: 2410, DDamount: 2510, SDDamount: 2850 },
    { title: "14 inches", SDamount: 2540, DDamount: 2720, SDDamount: 3100 },
    { title: "16 inches", SDamount: 2850, DDamount: 2950, SDDamount: 3450 },
    { title: "18 inches", SDamount: 3070, DDamount: 3250, SDDamount: 3750 },
    { title: "20 inches", SDamount: 3290, DDamount: 3450, SDDamount: 4050 },
    { title: "22 inches", SDamount: 3480, DDamount: 3760, SDDamount: 4400 },
    {
      title: "24 inches",
      SDamount: { standard: 3730, heavy: 4520 },
      DDamount: { standard: 4010, heavy: 4010 },
      SDDamount: { standard: 4750, heavy: 4750 },
    },
    {
      title: "26 inches",
      SDamount: { standard: 3940, heavy: 4770 },
      DDamount: { standard: 4320, heavy: 5340 },
      SDDamount: { standard: 5080, heavy: 6480 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 4120, heavy: 4990 },
      DDamount: { standard: 4520, heavy: 5590 },
      SDDamount: { standard: 5580, heavy: 7180 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 4240, heavy: 5170 },
      DDamount: { standard: 4660, heavy: 5800 },
      SDDamount: { standard: 5780, heavy: 7480 },
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
  hairStyling: ["Middle Part", "Left Part", "Right Part"],
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

  frontalLength: [
    { title: "8 inches", SDamount: 1000, DDamount: 1200, SDDamount: 1350 },
    { title: "10 inches", SDamount: 1050, DDamount: 1250, SDDamount: 1550 },
    { title: "12 inches", SDamount: 1200, DDamount: 1400, SDDamount: 1750 },
    { title: "14 inches", SDamount: 1300, DDamount: 1500, SDDamount: 2000 },
    { title: "16 inches", SDamount: 1450, DDamount: 1700, SDDamount: 2250 },
    { title: "18 inches", SDamount: 1550, DDamount: 1850, SDDamount: 2350 },
    { title: "20 inches", SDamount: 1750, DDamount: 1950, SDDamount: 2600 },
    { title: "22 inches", SDamount: 1900, DDamount: 2050, SDDamount: 2800 },
    { title: "24 inches", SDamount: 2000, DDamount: 2250, SDDamount: 2900 },
    {
      title: "26 inches",
      SDamount: { standard: 2200, heavy: 2800 },
      DDamount: { standard: 2400, heavy: 3000 },
      SDDamount: { standard: 3000, heavy: 3800 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 2400, heavy: 3100 },
      DDamount: { standard: 2500, heavy: 3300 },
      SDDamount: { standard: 3100, heavy: 3950 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 2500, heavy: 3250 },
      DDamount: { standard: 2700, heavy: 3500 },
      SDDamount: { standard: 3200, heavy: 4150 },
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
  hairStyling: ["Middle Part", "Left Part", "Right Part"],
  hairClosure: ["Closure (4x4)", "Frontal (13 x 4)"],
  hamanHairGrades: [],
};

export const straightHairWigOptions = {
  colors: ["Natural Black", "Blonde", "Burgundy"],

  frontalLength: [
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

  length: [
    { title: "8 inches", SDamount: 500, DDamount: 800, SDDamount: 1000 },
    { title: "10 inches", SDamount: 550, DDamount: 950, SDDamount: 1150 },
    { title: "12 inches", SDamount: 700, DDamount: 1150, SDDamount: 1250 },
    { title: "14 inches", SDamount: 850, DDamount: 1300, SDDamount: 1350 },
    { title: "16 inches", SDamount: 950, DDamount: 1450, SDDamount: 1550 },
    { title: "18 inches", SDamount: 1050, DDamount: 1600, SDDamount: 1750 },
    { title: "20 inches", SDamount: 1150, DDamount: 2000, SDDamount: 2100 },
    { title: "22 inches", SDamount: 1250, DDamount: 2100, SDDamount: 2250 },
    {
      title: "24 inches",
      SDamount: { standard: 1400, heavy: 1700 },
      DDamount: { standard: 2250, heavy: 3050 },
      SDDamount: { standard: 2400, heavy: 3150 },
    },
    {
      title: "26 inches",
      SDamount: { standard: 1600, heavy: 2100 },
      DDamount: { standard: 2300, heavy: 3100 },
      SDDamount: { standard: 2500, heavy: 3200 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 1900, heavy: 2600 },
      DDamount: { standard: 2400, heavy: 3300 },
      SDDamount: { standard: 2600, heavy: 3000 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 2100, heavy: 2800 },
      DDamount: { standard: 2500, heavy: 3500 },
      SDDamount: { standard: 2700, heavy: 3700 },
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
  hairStyling: ["Middle Part", "Left Part", "Right Part"],
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

  frontalLength: [
    { title: "8 inches", SDamount: 900, DDamount: 1050, SDDamount: 1150 },
    { title: "10 inches", SDamount: 1000, DDamount: 1200, SDDamount: 1300 },
    { title: "12 inches", SDamount: 1100, DDamount: 1350, SDDamount: 1500 },
    { title: "14 inches", SDamount: 1200, DDamount: 1400, SDDamount: 1600 },
    { title: "16 inches", SDamount: 1300, DDamount: 1500, SDDamount: 1700 },
    { title: "18 inches", SDamount: 1400, DDamount: 1600, SDDamount: 1800 },
    { title: "20 inches", SDamount: 1600, DDamount: 1800, SDDamount: 2000 },
    { title: "22 inches", SDamount: 1700, DDamount: 1950, SDDamount: 2150 },
    { title: "24 inches", SDamount: 1800, DDamount: 2050, SDDamount: 2250 },
    {
      title: "26 inches",
      SDamount: { standard: 1900, heavy: 2350 },
      DDamount: { standard: 2150, heavy: 2700 },
      SDDamount: { standard: 2300, heavy: 3000 },
    },
    {
      title: "28 inches",
      SDamount: { standard: 2000, heavy: 2500 },
      DDamount: { standard: 2250, heavy: 2850 },
      SDDamount: { standard: 2500, heavy: 3200 },
    },
    {
      title: "30 inches",
      SDamount: { standard: 2100, heavy: 2650 },
      DDamount: { standard: 2350, heavy: 3500 },
      SDDamount: { standard: 2600, heavy: 3500 },
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
  hairStyling: ["Middle Part", "Left Part", "Right Part"],
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
  { title: "Dark", image: darkTone },
  { title: "Medium Dark", image: mediumDarkTone },
  { title: "Medium Light", image: mediumLightTone },
  { title: "Light", image: lightTone },
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
