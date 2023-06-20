import cap from "../Assets/Customize/cap.jpg";
import femalebag from "../Assets/Customize/femalebag.jpg";

// hats
import h1 from '../Assets/Customize/maleAccessories/hat/1.jpg'
import h2 from '../Assets/Customize/maleAccessories/hat/2.jpg'
import h3 from '../Assets/Customize/maleAccessories/hat/3.jpg'
import h4 from '../Assets/Customize/maleAccessories/hat/4.jpg'

// uncat
import un1 from '../Assets/Customize/maleAccessories/Uncat/1.jpg'
import un2 from '../Assets/Customize/maleAccessories/Uncat/2.jpg'

// femal bags
import fb1 from '../Assets/Customize/femaleAccessories/Bags/1.jpg'
import fb2 from '../Assets/Customize/femaleAccessories/Bags/2.jpg'
import fb3 from '../Assets/Customize/femaleAccessories/Bags/3.jpg'
import fb4 from '../Assets/Customize/femaleAccessories/Bags/4.jpg'

//female uncat
import fun1 from '../Assets/Customize/femaleAccessories/uncat/1.jpg'
import fun2 from '../Assets/Customize/femaleAccessories/uncat/2.jpg'
import fun3 from '../Assets/Customize/femaleAccessories/uncat/3.jpg'


export const mainMaleAccessories = [
  {
    name: "Hat",
    image: cap,
  },

  {
    name: "Uncategorized",
    image: un1,
  },
];

export const mainFemaleAccessories = [
    {
        name: "Bag",
        image: femalebag,
      },
      {
        name: "Uncategorized",
        image: fun3,
      },
]

export const maleAccessoriesExtras = [
  {
    category: "Hat",
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
    ],
  },
]

export const femaleAccessoriesExtras = [
  {
    category: "Bag",
    items: [
      {
        name: "",
        image: fb1,
      },
      {
        name: "",
        image: fb2,
      },
      {
        name: "",
        image: fb3,
      },
      {
        name: "",
        image: fb4,
      },
    ],
  },
  {
    category: "Uncategorized",
    items: [
      {
        name: "",
        image: fun1,
      },
      {
        name: "",
        image: fun2,
      },
      {
        name: "",
        image: fun3,
      },
    ],
  },
]
