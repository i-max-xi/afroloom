import batik1 from "../textures/batik1.jpg";
import batik2 from "../textures/batik2.jpg";
import batik3 from "../textures/batik3.jpg";
import batik4 from "../textures/batik4.jpg";
import batik5 from "../textures/batik5.jpg";

import dashiki1 from "../textures/dashiki1.jpg";
import dashiki2 from "../textures/dashiki2.jpg";
import dashiki3 from "../textures/dashiki3.jpg";
import dashiki4 from "../textures/dashiki4.jpg";
import dashiki5 from "../textures/dashiki5.jpg";

import kente1 from "../textures/kente1.jpg";
import kente2 from "../textures/kente2.jpg";
import kente3 from "../textures/kente3.jpg";
import kente4 from "../textures/kente4.jpg";
import kente5 from "../textures/kente5.jpg";

import waxPrint1 from "../textures/waxPrint1.jpg";
import waxPrint2 from "../textures/waxPrint2.jpg";
import waxPrint3 from "../textures/waxPrint3.jpg";
import waxPrint4 from "../textures/waxPrint4.jpg";
import waxPrint5 from "../textures/waxPrint5.jpg";

import smock1 from "../textures/smock1.jpg";
import smock2 from "../textures/smock2.jpg";
import smock3 from "../textures/smock3.jpg";
import smock4 from "../textures/smock4.jpeg";
// import smock5 from "../textures/smock5.jpg";

import lace1 from "../textures/lace1.jpg";
import lace2 from "../textures/lace2.jpg";
import lace3 from "../textures/lace3.jpg";
import lace4 from "../textures/lace4.jpg";
import lace5 from "../textures/lace5.jpg";

import s_fabric1 from "../textures/suit_fabric1.jpeg";
import s_fabric2 from "../textures/suit_fabric2.jpg";
import s_fabric3 from "../textures/suit_fabric3.jpg";
import s_fabric4 from "../textures/suit_fabric4.jpg";
import s_fabric5 from "../textures/suit_fabric5.jpg";

import p_kente1 from "../textures/p_kente1.jpg";
import p_kente2 from "../textures/p_kente2.jpg";
import p_kente3 from "../textures/p_kente3.jpg";
import p_kente4 from "../textures/p_kente4.jpg";

export const colorOptions = [
    { color: "#ff0000", label: "Red" },
    { color: "#ffffff", label: "White" },
    { color: "#00ff00", label: "Green" },
    { color: "#0000ff", label: "Blue" },
    { color: "#87ceeb", label: "Seablue" },
    { color: "#ff7f50", label: "Coral" },
    { color: "#008080", label: "Teal" },
    { color: "#808000", label: "Olive" },
    { color: "#e0b0ff", label: "Mauve" },
    { color: "#c0c0c0", label: "Silver" },
    { color: "#000000", label: "Black" },
    { color: "#ffff00", label: "Yellow" },
    { color: "#ffa500", label: "Orange" },
    { color: "#800080", label: "Purple" },
    { color: "#ff69b4", label: "Pink" },
    { color: "#a52a2a", label: "Brown" },
    { color: "#808080", label: "Gray" },
    { color: "#00ffff", label: "Cyan" },
    { color: "#ff00ff", label: "Magenta" },
    { color: "#ffd700", label: "Gold" },
  ];

export const textureArrays = {
    batik: [batik1, batik2, batik3, batik4, batik5,],
    dashiki: [dashiki1, dashiki2, dashiki3, dashiki4, dashiki5,],
    kente: [kente1, kente2, kente3, kente4, kente5],
    waxPrint: [waxPrint1, waxPrint2, waxPrint3, waxPrint4, waxPrint5],
    smock: [smock1, smock2, smock3, smock4 , smock3], // Uncomment if needed
    Crochet: [lace1, lace2, lace3, lace4, lace5],
    printed_kente: [p_kente1, p_kente2, p_kente3, p_kente4, p_kente3],
    Funerals: [s_fabric1, s_fabric2, s_fabric3, s_fabric4, s_fabric5],
  };

export const textureDescriptions = {
  batik: [
    "Description for batik1",
    "Description for batik2",
    "Description for batik3",
    "Description for batik4",
    "Description for batik5",
    "Description for batik1",
    "Description for batik2",
    "Description for batik3",
    "Description for batik4",
    "Description for batik5",
  ],
  dashiki: [
    "Description for dashiki1",
    "Description for dashiki2",
    "Description for dashiki3",
    "Description for dashiki4",
    "Description for dashiki5",
  ],
  kente: [
    "Description for kente1",
    "Description for kente2",
    "Description for kente3",
    "Description for kente4",
    "Description for kente5",
  ],
  waxPrint: [
    "Description for waxPrint1",
    "Description for waxPrint2",
    "Description for waxPrint3",
    "Description for waxPrint4",
    "Description for waxPrint5",
  ],
  smock: [
    "Description for smock1",
    "Description for smock2",
    "Description for smock3",
    "Description for smock4",
  ],
  Crochet: [
    "Description for lace1",
    "Description for lace2",
    "Description for lace3",
    "Description for lace4",
    "Description for lace5",
  ],
  printed_kente: [
    "Description for p_kente1",
    "Description for p_kente2",
    "Description for p_kente3",
    "Description for p_kente4",
  ],
  Funerals: [
    "Description for s_fabric1",
    "Description for s_fabric2",
    "Description for s_fabric3",
    "Description for s_fabric4",
    "Description for s_fabric5",
  ],
};

export const textureValues = {
  batik: 10,
  dashiki: 15,
  kente: 20,
  waxPrint: 25,
  smock: 30,
  Crochet: 35,
  printed_kente: 40,
  Funerals: 45,
  // Add values for other texture categories if needed
};

export const sizeOptions = [
  { label: "S", value: 0.5 },
  { label: "M", value: 1 },
  { label: "L", value: 2 },
  { label: "XL", value: 3 },
  { label: "2XL", value: 4 },
  { label: "3XL", value: 5 },
  { label: "4XL", value: 6 },
  { label: "5XL", value: 7 },
  { label: "6XL", value: 8 },
  { label: "7XL", value: 9 },
];

export const responsiveNess = [
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "576px",
    numVisible: 1,
    numScroll: 1,
  },
]

export const responsiveColor = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "576px",
      numVisible: 1,
      numScroll: 1,
    },
]