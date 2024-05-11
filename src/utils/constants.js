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
    // "Waist-length", "Shoulder-length", "Mid-back length"
    "8 inches",
    "10 inches",
    "12 inches",
    "14 inches",
    "16 inches",
    "18 inches",
    "20 inches",
    "22 inches",
    "24 inches",
    "26 inches",
    "28 inches",
    "30 inches",
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
    "8 inches",
    "10 inches",
    "12 inches",
    "14 inches",
    "16 inches",
    "18 inches",
    "20 inches",
    "22 inches",
    "24 inches",
    "26 inches",
    "28 inches",
    "30 inches",
  ],
  densityPreference: [
    "Light (natural-looking)",
    "Medium (standard density)",
    "Heavy (extra fullness)",
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
    "8 inches",
    "10 inches",
    "12 inches",
    "14 inches",
    "16 inches",
    "18 inches",
    "20 inches",
    "22 inches",
    "24 inches",
    "26 inches",
    "28 inches",
    "30 inches",
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
