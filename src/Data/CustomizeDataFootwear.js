import { v4 as uuid } from "uuid";

// sneakers
import s1 from "../Assets/Customize/footwear/sneaker/1.jpg";
import s2 from "../Assets/Customize/footwear/sneaker/2.jpg";
import s3 from "../Assets/Customize/footwear/sneaker/3.jpg";

// slipper
import sl1 from "../Assets/Customize/footwear/slippers/1.jpg";
import sl2 from "../Assets/Customize/footwear/slippers/2.jpg";
import sl3 from "../Assets/Customize/footwear/slippers/3.jpg";

//heels
import h1 from "../Assets/Customize/footwear/heels/1.jpg";
import h2 from "../Assets/Customize/footwear/heels/2.jpg";
import h3 from "../Assets/Customize/footwear/heels/3.jpg";
import h4 from "../Assets/Customize/footwear/heels/4.jpg";
import h5 from "../Assets/Customize/footwear/heels/5.jpg";


// 3d models
import shoeModel1 from '../Pages/Customize/Configurator/models/Shoes/flexible_shoe_main.glb';


export const mainFootwear = [
  {
    id: uuid(),
    name: "Flat Shoe",
    image: s2,
    model: shoeModel1,
    myNode: ["flat_shoe"],
    myZoom: 1,
    price: 20,
    },
  {
    id: uuid(),
    name: "Sneaker",
    image:
      "https://th.bing.com/th/id/R.ed02939b666f5978946b4b104022f5ee?rik=N3Ja0bD%2boLeYgw&pid=ImgRaw&r=0",
    model: "",
    // myNode: ["uploads files 261545 Red+shoe left"],
    myZoom: 0.6,
    price: 20,
    },
  {
    id: uuid(),
    name: "Slipper",
    image: sl1,
    model: "",
    myNode: ["T_Shirt_male"],
    myZoom: 0.6,
    price: 20,
  },
  {
    id: uuid(),
    name: "Heels",
    image:
      "https://th.bing.com/th/id/OIP.UMGJguReHwKJtDNEdf5-NQHaHa?pid=ImgDet&rs=1",
    model: "",
    myNode: ["T_Shirt_male"],
    myZoom: 0.6,
    price: 20,
  },
];

export const footwearExtras = [
  {
    category: "Sneaker",
    items: [
      {
        name: "",
        image: s1,
      },
      {
        name: "",
        image: s2,
      },
      {
        name: "",
        image: s3,
      },
    ],
  },
  {
    category: "Slipper",
    items: [
      {
        name: "",
        image: sl1,
      },
      {
        name: "",
        image: sl2,
      },
      {
        name: "",
        image: sl3,
      },
    ],
  },
  {
    category: "Heels",
    items: [
      {
        name: "",
        image: h1,
      },
      {
        name: "",
        image: h2,
      },
      {
        name: "",
        image: h3,
      },
      {
        name: "",
        image: h4,
      },
      {
        name: "",
        image: h5,
      },
    ],
  },
];
