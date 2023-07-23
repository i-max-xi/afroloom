import { v4 as uuid } from "uuid";

// backpacks
import bp1 from '../Assets/Customize/unisex/backpack/1.jpg'
import bp2 from '../Assets/Customize/unisex/backpack/2.jpg'

// sash
import s1 from '../Assets/Customize/unisex/sash/1.jpg'
import s2 from '../Assets/Customize/unisex/sash/2.jpg'
import s3 from '../Assets/Customize/unisex/sash/3.jpg'

import jacket_img from '../Assets/Customize/jacket.jpg'

//models 
import backpack_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/backpack.glb";
import mini_bag_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/mini_bag_handle_main_body.glb";
import sash_model from "../Pages/Customize/Configurator/models/Accessories/Unisex/sash.glb";
import jacket from "../Pages/Customize/Configurator/models/Accessories/Unisex/jacket_main.glb";


export const mainUnisex = [
  {
    id: uuid(),
    name: "Sash",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/61Kp8a2HpQL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg",
    model: sash_model,
    myNode: ["all"],
    myZoom: 1,
    price: 55,
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
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5286/5286137cv12d.jpg",
    model: backpack_model,
    myNode: ["all"],
    myZoom: 0.8,
    price: 55,
  },
  {
    id: uuid(),
    name: "Jacket",
    image: jacket_img,
    model: jacket,
    myNode: ["body", "collar", "left_hand", "left_hand_cuff", "right_hand", "right_hand_cuff"],
    myZoom: 1,
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
