import { v4 as uuid } from "uuid";

// backpacks
import bp1 from '../Assets/Customize/unisex/backpack/1.jpg'
import bp2 from '../Assets/Customize/unisex/backpack/2.jpg'

// sash
import s1 from '../Assets/Customize/unisex/sash/1.jpg'
import s2 from '../Assets/Customize/unisex/sash/2.jpg'
import s3 from '../Assets/Customize/unisex/sash/3.jpg'

//models 
import backpack_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/backpack.glb";
import mini_bag_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/mini_bag_handle_main_body.glb";


export const mainUnisex = [
  {
    name: "Sashe",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/61Kp8a2HpQL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg",
  },
  {
    id: uuid(),
    name: "Mini Bag",
    image: bp1,
    model: mini_bag_model,
    myNode: ["handle", "main_body"],
    myZoom: 0.8,
    price: 55,
  },
  {
    id: uuid(),
    name: "Backpack",
    image: "",
    model: backpack_model,
    myNode: ["all"],
    myZoom: 0.8,
    price: 55,
  },
];

export const unisexExtras = [
  {
    category: "Sashe",
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
    category: "Back Pack",
    items: [
      {
        name: "",
        image: bp1,
      },
      {
        name: "",
        image: bp2,
      },
    ],
  },
];
