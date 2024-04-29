import { texture } from "three/examples/jsm/nodes/Nodes.js";

export const isMobile = window.innerWidth <= 767;
export const titleLimit = 50;
export const descriptionLimit = 200;

export const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  // { label: "Unisex", value: "Unisex" },
];

export const braidOptions = {
  colors: ["Natural black", "Platinum blonde", "Chocolate brown", "Wine"],

  length: ["Waist-length", "Shoulder-length", "Mid-back length"],

  curlEnd: ["Tight Curls", "Loose Curls", "Spiral Curls", "S-wave Curls"],

  capSize: ["Small", "Medium", "Large"],
};

export const boxWaveOptions = {
  colors: [
    "BL-66040-1",
    "BL11017-1",
    "BL11018-1",
    "BL11026-1",
    "BL11036-1",
    "BL66010-1",
    "BL66060-1",
    "BL66069-1",
    "BL66084-1",
    "BL66110-1",
    "BL66111-1",
    "BL66122-1",
    // "BL66098-1",
  ],

  length: [
    "Short (8-12 inches)",
    "Medium (14-18 inches)",
    "Long (20-24 inches)",
  ],
  densityPreference: [
    "Light (natural-looking)",
    "Medium (standard density)",
    "Heavy (extra fullness)",
  ],
  laceType: ["Swiss lace", "HD lace", "Transparent lace"],

  capSize: ["Small", "Medium", "Large"],
};

export const boxWigOptions = {
  colors: ["Light Auburn", "Burgundy", "Wine Red"],

  length: [
    "Short (8-10 inches)",
    "Medium (10-12 inches)",
    "Long (12-14 inches)",
  ],

  texture: ["Straight", "Wavy", "Curly"],
  capSize: ["Small", "Medium", "Large"],
  capConstruction: ["Full lace wig", "Lace front wig", "U-part wig"],
};
