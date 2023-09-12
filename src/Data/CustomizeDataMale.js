import { v4 as uuid } from 'uuid';

// import tshirt from "../Assets/Customize/Tshirt.jpg";
import shirt from "../Assets/Customize/shirt.jpg";
import flare_shirt from "../Assets/Customize/flare_shirt.png";

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

//size-guides
import tshirt_guide from '../Pages/Customize/Configurator/size_guide/male/tshirt.JPG';
import tshirt_pattern from '../Pages/Customize/Configurator/size_guide/male/tshirt_pattern.jpg';

// parts
const tshirtParts = require.context('../Assets/model_parts/MaleClothing/tshirt', false, /\.(png|jpg|jpeg|gif)$/);
// const tshirtLongParts = require.context('../Assets/model_parts/MaleClothing/tshirt_long', false, /\.(png|jpg|jpeg|gif)$/);
// const shirtParts = require.context('../Assets/model_parts/MaleClothing/shirt', false, /\.(png|jpg|jpeg|gif)$/);
// const shirtLongParts = require.context('../Assets/model_parts/MaleClothing/shirt_long', false, /\.(png|jpg|jpeg|gif)$/);
// const topndownParts = require.context('../Assets/model_parts/MaleClothing/topndown', false, /\.(png|jpg|jpeg|gif)$/);
// const topParts = require.context('../Assets/model_parts/MaleClothing/top', false, /\.(png|jpg|jpeg|gif)$/);
// const blazerParts = require.context('../Assets/model_parts/MaleClothing/blazer', false, /\.(png|jpg|jpeg|gif)$/);
// const trouserParts = require.context('../Assets/model_parts/MaleClothing/trouser', false, /\.(png|jpg|jpeg|gif)$/);
// const summerShortsParts = require.context('../Assets/model_parts/MaleClothing/summer_shorts', false, /\.(png|jpg|jpeg|gif)$/);
// const materialShortsParts = require.context('../Assets/model_parts/MaleClothing/material_shorts', false, /\.(png|jpg|jpeg|gif)$/);


export const mainMaleCustomize = [
  {
    id: uuid(),
    name: "T-Shirt",
    image: "https://a5e8126a499f8a963166-f72e9078d72b8c998606fd6e0319b679.ssl.cf5.rackcdn.com/images/variant/large/next-level_3600_black.jpg",
    model: tshirtModel1,
    myNode: ["bottom", "collar", "left_hand", "left_hand_edge", "right_hand", "right_hand_edge", "stripe", "top"],
    myZoom: 0.55,
    myX: 0,
    myY: 10,
    price: 20,
    sizeGuide: tshirt_guide,
    sizePattern: tshirt_pattern,
    parts: tshirtParts.keys().map(tshirtParts)
  },
  {
    id: uuid(),
    name: "T-Shirt Long",
    image: "https://th.bing.com/th/id/R.090a143032d299d58a1f61c13fdb5224?rik=3IvQRj1AFgeS5A&riu=http%3a%2f%2fmemorythreads.com.au%2fwp-content%2fuploads%2f2015%2f03%2fgrey-marle-longsleeve1.jpg&ehk=mYL6G88axiyKbyZamMLyXt0FEL95o7%2bLvLOeBlxULno%3d&risl=&pid=ImgRaw&r=0",
    model: tshirtModel2,
    myNode: ["bottom", "collar", "left_hand", "left_hand_cuff", "right_hand", "right_hand_cuff", "stripe", "top"],
    myZoom: 0.8,
    price: 20,
    // parts: tshirtLongParts.keys().map(tshirtLongParts),
  },
  {
    id: uuid(),
    name: "Short Sleeves Shirt",
    image: shirt,
    model: shirtModel1,
    myNode: ["back", "buttons", "collar", "front", "left_hand", "left_hand_edge", "midline", "pocket", "right_hand", "right_hand_edge"],
    myZoom: 0.7,
    myX: 0,
    myY: 10,
    price: 30,
    // parts: shirtParts.keys().map(shirtParts),
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
    price: 30,
    // parts: shirtLongParts.keys().map(shirtLongParts),
  },
  {
    id: uuid(),
    name: "Top & Down",
    image: topndown,
    model: topndown_model,
    myNode: ["back", "collar", "front_left", "front_right", "left_hand", "left_hand_cuff", "left_leg", "left_leg_edge", "midline", "right_hand", "right_hand_cuff", "right_leg", "right_leg_edge"],
    myZoom: 0.6,
    price: 55,
    // parts: topndownParts.keys().map(topndownParts),
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
    price: 35,
    // parts: topParts.keys().map(topParts),
  },
  {
    id: uuid(),
    name: "Blazer",
    model: blazer,
    image: "https://www.flannels.com/images/products/32066803_h.jpg",
    myNode: ["back", "collar", "front_left", "front_right", "left_hand", "left_hand_edge", "right_hand", "right_hand_edge"],
    myZoom: 1,
    price: 20,
    // parts: blazerParts.keys().map(blazerParts),
  },
  {
    id: uuid(),
    name: "Trousers",
    image:
      "https://th.bing.com/th/id/OIP.tnXk8QDidx4JKGKhl6IU0wHaJQ?pid=ImgDet&rs=1",
    model: trousersModel1,
    myNode: ["left_leg", "left_leg_edge", "left_pocket", "right_leg", "right_leg_edge", "right_pocket", "waist"],
    myZoom: 0.8,
    price: 22,
    // parts: trouserParts.keys().map(trouserParts),
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
    price: 30,
    // parts: summerShortsParts.keys().map(summerShortsParts),
    },
    {
    id: uuid(),
    name: "Material Shorts",
    image: "https://th.bing.com/th/id/OIP.A9xUqEvW0ADXy3nKfNyxKwHaJZ?pid=ImgDet&w=481&h=610&rs=1",
    model: material_shorts,
    myNode: ["left_leg", "left_leg_edge", "left_pocket", "right_leg", "right_leg_edge", "right_pocket", "waist"],
    myZoom: 0.8,
    myX: 0,
    myY: 10,
    price: 30,
    // parts: materialShortsParts.keys().map(materialShortsParts)
    },
];
