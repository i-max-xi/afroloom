import { v4 as uuid } from 'uuid';

// import tshirt from "../Assets/Customize/Tshirt.jpg";
import shirt from "../Assets/Customize/shirt.jpg";
import flare_shirt from "../Assets/Customize/flare_shirt.png";



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
import tshirtModel2 from '../Pages/Customize/Configurator/models/MaleClothing/tshirt_long_best.glb';
import shirtModel1 from '../Pages/Customize/Configurator/models/MaleClothing/short_sleeves_main.glb';
import shirtModel2 from '../Pages/Customize/Configurator/models/MaleClothing/long_sleeves_main_two.glb';
import trousersModel1 from '../Pages/Customize/Configurator/models/MaleClothing/male_trousers_better.glb';
import material_shorts from '../Pages/Customize/Configurator/models/MaleClothing/material_shorts.glb';
import summer_shorts from '../Pages/Customize/Configurator/models/MaleClothing/summer_shorts.glb';
import cloak from '../Pages/Customize/Configurator/models/MaleClothing/cloak.glb';
import topndown_model from '../Pages/Customize/Configurator/models/MaleClothing/male_topndown.glb';
import blazer from '../Pages/Customize/Configurator/models/MaleClothing/male_suit.glb';

export const mainMaleCustomize = [
  {
    id: uuid(),
    name: "T-Shirt",
    image: "https://a5e8126a499f8a963166-f72e9078d72b8c998606fd6e0319b679.ssl.cf5.rackcdn.com/images/variant/large/next-level_3600_black.jpg",
    model: tshirtModel1,
    myNode: ["body_bottom", "body_stripe", "body_top", "collar", "left_hand", "left_hand_edge", "right_hand", "right_hand_edge"],
    myZoom: 0.6,
    myX: 0,
    myY: 10,
    price: 20,
  },
  {
    id: uuid(),
    name: "T-Shirt Long",
    image: "https://th.bing.com/th/id/R.090a143032d299d58a1f61c13fdb5224?rik=3IvQRj1AFgeS5A&riu=http%3a%2f%2fmemorythreads.com.au%2fwp-content%2fuploads%2f2015%2f03%2fgrey-marle-longsleeve1.jpg&ehk=mYL6G88axiyKbyZamMLyXt0FEL95o7%2bLvLOeBlxULno%3d&risl=&pid=ImgRaw&r=0",
    model: tshirtModel2,
    myNode: ["body_bottom", "body_stripe", "body_top", "collar", "left_hand", "left_hand_cuff", "right_hand", "right_hand_cuff"],
    myZoom: 0.6,
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
    image: "https://th.bing.com/th/id/OIP.esHHIbeG0pD-IJjavFbqwQAAAA?pid=ImgDet&rs=1",
    model: shirtModel2,
    myNode: ["back", "buttons", "collar", "front", "left_hand", "left_hand_edge", "midline", "pocket", "right_hand", "right_hand_edge"],
    myZoom: 0.8,
    myX: 0,
    myY: 10,
    price: 30
  },
  {
    id: uuid(),
    name: "Top & Down",
    image: topndown,
    model: topndown_model,
    myNode: ["back", "collar", "front_left", "front_right", "left_hand", "left_hand_cuff", "left_leg", "left_leg_edge", "midline", "right_hand", "right_hand_cuff", "right_leg", "right_leg_edge"],
    myZoom: 0.6,
    price: 55
  },
  {
    id: uuid(),
    name: "Top",
    image: flare_shirt,
    model: cloak,
    myNode: ["body", "collar", "left_hand", "left_hand_edge", "right_hand", "right_hand_edge"],
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 35
  },
  {
    id: uuid(),
    name: "Blazer",
    model: blazer,
    image: "https://www.flannels.com/images/products/32066803_h.jpg",
    myNode: ["back", "collar", "front_left", "front_right", "left_hand", "left_hand_edge", "right_hand", "right_hand_edge"],
    myZoom: 1,
    price: 20,
  },
  {
    id: uuid(),
    name: "Trousers",
    image:
      "https://th.bing.com/th/id/OIP.tnXk8QDidx4JKGKhl6IU0wHaJQ?pid=ImgDet&rs=1",
    model: trousersModel1,
    myNode: ["left_leg", "left_leg_edge", "left_pocket", "right_leg", "right_leg_edge", "right_pocket", "waist"],
    myZoom: 0.7,
    price: 22
    },
  {
    id: uuid(),
    name: "Summer Shorts",
    image: "https://th.bing.com/th/id/R.ea417739b8a3cef995b4681464e7a16b?rik=uhZGGA8vxC1GIg&riu=http%3a%2f%2fi.ebayimg.com%2f00%2fs%2fNjcwWDcxNw%3d%3d%2fz%2fL9UAAOSwEK9UAwm9%2f%24_32.JPG%3fset_id%3d880000500F&ehk=r%2fZD2lrasnGhbmSDvg7rBXMXZGa34as4zF%2bMus%2f3ZIY%3d&risl=&pid=ImgRaw&r=0",
    model: summer_shorts,
    myNode: ["fasteners", "left_leg", "left_leg_edge", "left_pocket", "right_leg", "right_leg_edge", "right_pocket", "waist"],
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 30
    },
    {
    id: uuid(),
    name: "Material Shorts",
    image: "https://th.bing.com/th/id/OIP.A9xUqEvW0ADXy3nKfNyxKwHaJZ?pid=ImgDet&w=481&h=610&rs=1",
    model: material_shorts,
    myNode: ["left_leg", "left_leg_edge", "left_pocket", "right_leg", "right_leg_edge", "right_pocket", "waist"],
    myZoom: 0.7,
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
