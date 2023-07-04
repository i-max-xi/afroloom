import { v4 as uuid } from 'uuid';

import tshirt from "../Assets/Customize/Tshirt.jpg";
import shirt from "../Assets/Customize/shirt.jpg";
import long_sleeves from "../Assets/Customize/long_sleeves.jpg";


// tshirts
import tshirt1 from '../Assets/Customize/maleClothingExtras/tshirt/1.jpg'
import tshirt2 from '../Assets/Customize/maleClothingExtras/tshirt/2.jpg'
import tshirt3 from '../Assets/Customize/maleClothingExtras/tshirt/3.jpg'
import tshirt4 from '../Assets/Customize/maleClothingExtras/tshirt/4.jpg'
import tshirt5 from '../Assets/Customize/maleClothingExtras/tshirt/5.jpg'
import tshirt6 from '../Assets/Customize/maleClothingExtras/tshirt/6.jpg'

// shirts
import shirt1 from '../Assets/Customize/maleClothingExtras/shirt/1.jpg'
import shirt2 from '../Assets/Customize/maleClothingExtras/shirt/2.jpg'
import shirt3 from '../Assets/Customize/maleClothingExtras/shirt/3.jpg'
import shirt4 from '../Assets/Customize/maleClothingExtras/shirt/4.jpg'
import shirt5 from '../Assets/Customize/maleClothingExtras/shirt/5.jpg'
import shirt6 from '../Assets/Customize/maleClothingExtras/shirt/6.jpg'

// top n down
import td1 from '../Assets/Customize/maleClothingExtras/topndown/1.jpg'
import td2 from '../Assets/Customize/maleClothingExtras/topndown/2.jpg'
import td3 from '../Assets/Customize/maleClothingExtras/topndown/3.jpg'
import td4 from '../Assets/Customize/maleClothingExtras/topndown/4.jpg'
import td5 from '../Assets/Customize/maleClothingExtras/topndown/5.jpg'
import td6 from '../Assets/Customize/maleClothingExtras/topndown/6.jpg'

// uncategorized
import un1 from '../Assets/Customize/maleClothingExtras/uncategorized/1.jpg'
import un2 from '../Assets/Customize/maleClothingExtras/uncategorized/2.jpg'
import un3 from '../Assets/Customize/maleClothingExtras/uncategorized/3.jpg'
import un4 from '../Assets/Customize/maleClothingExtras/uncategorized/4.jpg'
import un5 from '../Assets/Customize/maleClothingExtras/uncategorized/5.jpg'

// Trousers
import tr1 from '../Assets/Customize/maleClothingExtras/trousers/1.jpg'
import tr2 from '../Assets/Customize/maleClothingExtras/trousers/2.jpg'
import tr3 from '../Assets/Customize/maleClothingExtras/trousers/3.jpg'
import tr4 from '../Assets/Customize/maleClothingExtras/trousers/4.jpg'
import tr5 from '../Assets/Customize/maleClothingExtras/trousers/5.jpg'

// Shorts
import sh1 from '../Assets/Customize/maleClothingExtras/shorts/1.jpg'
import sh2 from '../Assets/Customize/maleClothingExtras/shorts/2.jpg'
import sh3 from '../Assets/Customize/maleClothingExtras/shorts/3.jpg'
import sh4 from '../Assets/Customize/maleClothingExtras/shorts/4.jpg'

import topndown from "../Assets/Customize/topanddown.jpg";

// model imports
import tshirtModel1 from '../Pages/Customize/Configurator/models/MaleClothing/tshirt_main.glb';
import shirtModel1 from '../Pages/Customize/Configurator/models/MaleClothing/short_sleeves_main.glb';
import shirtModel2 from '../Pages/Customize/Configurator/models/MaleClothing/long_sleeves_main_two.glb';
import trousersModel1 from '../Pages/Customize/Configurator/models/MaleClothing/trousers_main_three.glb';


export const mainMaleCustomize = [
  {
    id: uuid(),
    name: "T-Shirt",
    image: tshirt,
    model: tshirtModel1,
    myNode: ["back", "collar", "front", "left_hand", "right_hand"],
    myZoom: 0.6,
    myX: 0,
    myY: 10,
    price: 20,
  },
  {
    id: uuid(),
    name: "Short Sleeves Shirt",
    image: shirt,
    model: shirtModel1,
    myNode: ["back", "buttons", "collar", "front", "left_hand", "left_hand_edge", "midline", "pocket", "right_hand", "right_hand_edge"],
    myZoom: 0.6,
    myX: 0,
    myY: 10,
    price: 30
  },
  {
    id: uuid(),
    name: "Long Sleeves Shirt",
    image: long_sleeves,
    model: shirtModel2,
    myNode: ["back", "buttons", "collar", "front", "left_hand", "left_hand_edge", "midline", "pocket", "right_hand", "right_hand_edge"],
    myZoom: 6.2,
    myX: 0,
    myY: 10,
    price: 30
  },
  {
    id: uuid(),
    name: "Top & Down",
    image: topndown,
    model: "",
    myNode: [],
    myZoom: 10,
    myX: 0,
    myY: 10,
    price: 55
  },
  {
    id: uuid(),
    name: "Uncategorized",
    image: un3,
    model: "",
    myNode: [],
    myZoom: 600,
    myX: 0,
    myY: 10,
    price: 35
  },
  {
    id: uuid(),
    name: "Trousers",
    image:
      "https://th.bing.com/th/id/OIP.tnXk8QDidx4JKGKhl6IU0wHaJQ?pid=ImgDet&rs=1",
    model: trousersModel1,
    myNode: ["all"],
    myZoom: 6,
    myX: 0,
    myY: 10,
    price: 22
    },
  {
    id: uuid(),
    name: "Shorts",
    image:
      "https://th.bing.com/th/id/R.6ec8827c0923427e41a6aae927497784?rik=yJj91xAEmRogeQ&pid=ImgRaw&r=0",
    model: [],
    myZoom: 10,
    myX: 0,
    myY: 10,
    price: 30
    },
];

export const maleExtras = [
  {
    category: "T-Shirt",
    items: [
      {
        id: uuid(),
        name: "One",
        image: tshirt1,
        model: tshirtModel1,
        price: 20
      },
      {
        id: uuid(),
        name: "Two",
        image: tshirt2,
      },
      {
        id: uuid(),
        name: "Three",
        image: tshirt3,
      },
      {
        id: uuid(),
        name: "4",
        image: tshirt4,
      },
      {
        id: uuid(),
        name: "5",
        image: tshirt5,
      },
      {
        id: uuid(),
        name: "6",
        image: tshirt6,
      },
    ],
  },
  {
    category: "Shirt",
    items: [
      {
        id: uuid(),
        name: "",
        image: shirt1,
      },
      {
        id: uuid(),
        name: "",
        image: shirt2,
      },
      {
        id: uuid(),
        name: "",
        image: shirt3,
      },
      {
        id: uuid(),
        name: "",
        image: shirt4,
      },
      {
        id: uuid(),
        name: "",
        image: shirt5,
      },
      {
        id: uuid(),
        name: "",
        image: shirt6,
      },
    ],
  },
  {
    category: "Top & Down",
    items: [
      {
        id: uuid(),
        name: "",
        image: td1,
      },
      {
        id: uuid(),
        name: "",
        image: td2,
      },
      {
        id: uuid(),
        name: "",
        image: td3,
      },
      {
        id: uuid(),
        name: "",
        image: td4,
      },
      {
        id: uuid(),
        name: "",
        image: td5,
      },
      {
        id: uuid(),
        name: "",
        image: td6,
      },
    ],
  },
  {
    category: "Uncategorized",
    items: [
      {
        id: uuid(),
        name: "",
        image: un1,
      },
      {
        id: uuid(),
        name: "",
        image: un2,
      },
      {
        id: uuid(),
        name: "",
        image: un3,
      },
      {
        id: uuid(),
        name: "",
        image: un4,
      },
      {
        id: uuid(),
        name: "",
        image: un5,
      },
    ],
  },
  {
    category: "Trousers",
    items: [
      {
        id: uuid(),
        name: "",
        image: tr1,
      },
      {
        id: uuid(),
        name: "",
        image: tr2,
      },
      {
        id: uuid(),
        name: "",
        image: tr3,
      },
      {
        id: uuid(),
        name: "",
        image: tr4,
      },
      {
        id: uuid(),
        name: "",
        image: tr5,
      },
    ],
  },
  {
    category: "Shorts",
    items: [
      {
        id: uuid(),
        name: "",
        image: sh1,
      },
      {
        id: uuid(),
        name: "",
        image: sh2,
      },
      {
        id: uuid(),
        name: "",
        image: sh3,
      },
      {
        id: uuid(),
        name: "",
        image: sh4,
      },
    ],
  },
];
