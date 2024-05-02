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
  colors: [
    "Natural black",
    "Natural Black with Grey Highlights",
    "Natural Black with Honey Blonde Highlights",
    "Natural Black with Light Auburn Highlights",
  ],

  length: ["Waist-length", "Shoulder-length", "Mid-back length"],

  curlEnd: ["Tight Curls", "Loose Curls", "Spiral Curls", "S-wave Curls"],

  capSize: ["Small", "Medium", "Large"],
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
    "Short (8-12 inches)",
    "Medium (14-18 inches)",
    "Long (20-24 inches)",
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
  capConstruction: [
    "Full lace wig",
    "Lace front wig",
    "U-part wig",
    "None (for those who prefer a non-lace wig)",
  ],
};

export const allNailOptions = {
  length: [
    "Very Short (less than 1 cm)",
    "Short (1-2 cm)",
    "Medium (2-3 cm)",
    "Long (3-4 cm)",
    " Extra Long (more than 4 cm)",
  ],
  size: [
    "Size 0 (XS)",
    "Size 1 (S)",
    "Size 2 (M)",
    "Size 3 (L)",
    "Size 4 (XL)",
    "Size 5 (XXL)",
    "Size 6 (XXXL)",
    "Size 7",
    "Size 8",
    "Size 9",
  ],
  width: ["Narrow", "Medium", "Wide", "Extra-wide"],
  material: [
    "Acrylic",
    "Gel",
    "Press-on nails",
    "Dip powder",
    "Silk or fiberglass wraps",
  ],
};
