import { v4 as uuid } from "uuid";

// import dress from "../Assets/Customize/dress.jpg";
import cloak from "../Assets/Customize/cloak.jpg";
import skirt from "../Assets/Customize/skirt.jpg";
// import femaleTshirt from "../Assets/Customize/femaleTshirt.jpg";
import topndown from "../Assets/Customize/female_topndown.png";
import dress from "../Assets/Customize/dress.png";
import normal_top from "../Assets/Customize/normal_top.png";



// tshirts
import tshirt1 from "../Assets/Customize/femaleClothingExtras/tshirt/1.jpg";
import tshirt2 from "../Assets/Customize/femaleClothingExtras/tshirt/2.jpg";
import tshirt3 from "../Assets/Customize/femaleClothingExtras/tshirt/3.jpg";
import tshirt4 from "../Assets/Customize/femaleClothingExtras/tshirt/4.jpg";
import tshirt5 from "../Assets/Customize/femaleClothingExtras/tshirt/5.jpg";
import tshirt6 from "../Assets/Customize/femaleClothingExtras/tshirt/6.jpg";

//top
import top1 from "../Assets/Customize/femaleClothingExtras/top/1.jpg";
import top2 from "../Assets/Customize/femaleClothingExtras/top/2.jpg";
import top3 from "../Assets/Customize/femaleClothingExtras/top/3.jpg";

//top and down
import tnd1 from "../Assets/Customize/femaleClothingExtras/topndown/1.jpg";
import tnd2 from "../Assets/Customize/femaleClothingExtras/topndown/2.jpg";
import tnd3 from "../Assets/Customize/femaleClothingExtras/topndown/3.jpg";
import tnd4 from "../Assets/Customize/femaleClothingExtras/topndown/4.jpg";
import tnd5 from "../Assets/Customize/femaleClothingExtras/topndown/5.jpg";

// dress
import d1 from "../Assets/Customize/femaleClothingExtras/dress/1.jpg";
import d2 from "../Assets/Customize/femaleClothingExtras/dress/2.jpg";
import d3 from "../Assets/Customize/femaleClothingExtras/dress/3.jpg";
import d4 from "../Assets/Customize/femaleClothingExtras/dress/4.jpg";
import d5 from "../Assets/Customize/femaleClothingExtras/dress/5.jpg";

// uncategorized
import un1 from "../Assets/Customize/femaleClothingExtras/uncategorized/1.jpg";
import un2 from "../Assets/Customize/femaleClothingExtras/uncategorized/2.jpg";
import un3 from "../Assets/Customize/femaleClothingExtras/uncategorized/3.jpg";

//skirt
import sk1 from "../Assets/Customize/femaleClothingExtras/skirt/1.jpg";
import sk2 from "../Assets/Customize/femaleClothingExtras/skirt/2.jpg";
import sk3 from "../Assets/Customize/femaleClothingExtras/skirt/3.jpg";
import sk4 from "../Assets/Customize/femaleClothingExtras/skirt/4.jpg";
import sk5 from "../Assets/Customize/femaleClothingExtras/skirt/5.jpg";

// trousers
import t1 from "../Assets/Customize/femaleClothingExtras/trousers/1.jpg";
import t2 from "../Assets/Customize/femaleClothingExtras/trousers/2.jpg";
import t3 from "../Assets/Customize/femaleClothingExtras/trousers/3.jpg";
import t4 from "../Assets/Customize/femaleClothingExtras/trousers/4.jpg";

//models
import t_shirt_short from "../Pages/Customize/Configurator/models/FemaleClothing/tshirt_short_two.glb";
import t_shirt_long from "../Pages/Customize/Configurator/models/FemaleClothing/tshirt_long_two.glb";
import skirt_model from "../Pages/Customize/Configurator/models/FemaleClothing/skirt_main.glb";
import trousers from "../Pages/Customize/Configurator/models/FemaleClothing/female_actual_trousers.glb";
import leggings from "../Pages/Customize/Configurator/models/FemaleClothing/trousers_main.glb";
import dress_model from "../Pages/Customize/Configurator/models/FemaleClothing/shoulder_dress.glb";
import top_model from "../Pages/Customize/Configurator/models/FemaleClothing/shoulders_top.glb";
import normal_top_model from "../Pages/Customize/Configurator/models/FemaleClothing/ladies_normal_top.glb";
import mini_skirt_model from "../Pages/Customize/Configurator/models/FemaleClothing/mini_skirt_main.glb";
import cloak_model from "../Pages/Customize/Configurator/models/FemaleClothing/cloak.glb";
import topndown_model from "../Pages/Customize/Configurator/models/FemaleClothing/female_topndown_top_down.glb";
import blazer from "../Pages/Customize/Configurator/models/FemaleClothing/female_suit_main.glb";
import extra_long from "../Pages/Customize/Configurator/models/FemaleClothing/female_shirt_extra_long_two.glb";
import extra_short from "../Pages/Customize/Configurator/models/FemaleClothing/female_shirt_extra_short.glb";
import booty_shorts from "../Pages/Customize/Configurator/models/FemaleClothing/booty_shorts.glb";

export const mainFemaleCustomize = [
  {
    id: uuid(),
    name: "T-Shirt short",
    image: "https://th.bing.com/th/id/OIP.ikUETESsVO_PcDoaCrIQnAHaIw?pid=ImgDet&w=1588&h=1879&rs=1",
    model: t_shirt_short,
    myNode: ["body", "left_hand", "right_hand"],
    myZoom: 0.8,
    price: 20,
  },

  {
    id: uuid(),
    name: "T-Shirt long",
    image: "https://images.bloomingdalesassets.com/is/image/BLM/products/0/optimized/10183950_fpx.tif?$filterlrg$&wid=327",
    model: t_shirt_long,
    myNode: ["body", "left_hand", "right_hand"],
    myZoom: 0.8,
    price: 20,
  },

  {
    id: uuid(),
    name: "Short Sleeves Shirt",
    image: "",
    model: extra_short,
    myNode: ["back", "collar", "front", "left_hand", "midline", "right_hand"],
    myZoom: 1,
    price: 30
  },

  {
    id: uuid(),
    name: "Long Sleeves Shirt",
    image: "",
    model: extra_long,
    myNode: ["back", "collar", "front", "left_hand", "midline", "right_hand"],
    myZoom: 1,
    price: 30
  },

  {
    id: uuid(),
    name: "Crop Top",
    image: "https://sportsfore.com/wp-content/uploads/2020/05/5-68.jpg",
    model: top_model,
    myNode: ["all"],
    myZoom: 1,
    price: 20,
  },

  {
    id: uuid(),
    name: "Normal Top",
    image: normal_top,
    model: normal_top_model,
    myNode: ["body", "left_hand", "right_hand"],
    myZoom: 1,
    price: 20,
  },
  {
    id: uuid(),
    name: "Top & Down",
    model: topndown_model,
    image: topndown,
    myNode: ["top", "down"],
    myZoom: 0.6,
    price: 20,
  },
  {
    id: uuid(),
    name: "Dress",
    model: dress_model,
    image: dress,
    myNode: ["all"],
    myZoom: 0.7,
    price: 20,
  },
  {
    id: uuid(),
    name: "Blazer",
    model: blazer,
    image: "",
    myNode: ["back", "collar", "front_left", "front_right", "left_hand", "right_hand"],
    myZoom: 1,
    price: 20,
  },
  {
    id: uuid(),
    name: "Cloak",
    model: cloak_model,
    image: cloak,
    myNode: ["all"],
    myZoom: 0.8,
    price: 20,
  },
  {
    id: uuid(),
    name: "Skirt",
    model: skirt_model,
    image: skirt,
    myNode: ["all"],
    myZoom: 0.6,
    price: 20,
  },
  {
    id: uuid(),
    name: "Mini Skirt",
    model: mini_skirt_model,
    image: "https://i.pinimg.com/736x/18/7d/c1/187dc19dca6861408cfd6d824437852e.jpg",
    myNode: ["main_body", "waist"],
    myZoom: 1,
    price: 20,
  },
  {
    id: uuid(),
    name: "Booty Shorts",
    model: booty_shorts,
    image: "",
    myNode: ["all"],
    myZoom: 0.9,
    price: 20,
  },
  {
    id: uuid(),
    name: "Trousers",
    model: trousers,
    image: "https://th.bing.com/th/id/R.4bc7f18679c3f2be48f44daefe523175?rik=zl2oxw9NZ7WSYw&riu=http%3a%2f%2fnibh.com%2fwp-content%2fuploads%2f2017%2f05%2fLP3.jpeg&ehk=pofT6edwVxSrGznLoVPwRpmV4ZLjt7oYMlkOzLi%2bms0%3d&risl=&pid=ImgRaw&r=0",
    myNode: ["all"],
    myZoom: 0.7,
    price: 20,
  },
  {
    id: uuid(),
    name: "Leggings",
    model: leggings,
    image:
      "https://cdna.lystit.com/photos/yoox/0a0e7406/vero-moda-Black-Casual-Pants.jpeg",
    myNode: ["all"],
    myZoom: 0.8,
    price: 20,
  },
];

export const femaleExtras = [
  {
    category: "T-Shirt",
    items: [
      {
        name: "",
        image: tshirt1,
      },
      {
        name: "",
        image: tshirt2,
      },
      {
        name: "",
        image: tshirt3,
      },
      {
        name: "",
        image: tshirt4,
      },
      {
        name: "",
        image: tshirt5,
      },
      {
        name: "",
        image: tshirt6,
      },
    ],
  },
  {
    category: "Top",
    items: [
      {
        name: "",
        image: top1,
      },
      {
        name: "",
        image: top2,
      },
      {
        name: "",
        image: top3,
      },
    ],
  },
  {
    category: "Top & Down",
    items: [
      {
        name: "",
        image: tnd1,
      },
      {
        name: "",
        image: tnd2,
      },
      {
        name: "",
        image: tnd3,
      },
      {
        name: "",
        image: tnd4,
      },
      {
        name: "",
        image: tnd5,
      },
    ],
  },
  {
    category: "Dress",
    items: [
      {
        name: "",
        image: d1,
      },
      {
        name: "",
        image: d2,
      },
      {
        name: "",
        image: d3,
      },
      {
        name: "",
        image: d4,
      },
      {
        name: "",
        image: d5,
      },
    ],
  },
  {
    category: "Uncategorized",
    items: [
      {
        name: "",
        image: un1,
      },
      {
        name: "",
        image: un2,
      },
      {
        name: "",
        image: un3,
      },
    ],
  },

  {
    category: "Skirt",
    items: [
      {
        name: "",
        image: sk1,
      },
      {
        name: "",
        image: sk2,
      },
      {
        name: "",
        image: sk3,
      },
      {
        name: "",
        image: sk4,
      },
      {
        name: "",
        image: sk5,
      },
    ],
  },
  {
    category: "Trousers",
    items: [
      {
        name: "",
        image: t1,
      },
      {
        name: "",
        image: t2,
      },
      {
        name: "",
        image: t3,
      },
      {
        name: "",
        image: t4,
      },
    ],
  },
];
