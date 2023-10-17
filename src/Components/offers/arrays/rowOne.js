import crop from "../../../Assets/vid/crop.MP4";
import booty from "../../../Assets/vid/booty.MP4";
import store from "../../../Redux/store";

const Products = store.getState().allProducts.products;

// const maleUnder10 = Products.filter(
//   (item) => item.gender === "Male" && item.price <= 10
// );

// const selectedmaleUnder10 = maleUnder10.slice(0,2).map((item) => ({
//   imageUrl: item.item,
//   id: item.id,
// }));

// const femaleUnder10 = Products.filter(
//   (item) => item.gender === "Female" && item.price <= 10
// );

// const selectedfemaleUnder10 = femaleUnder10.slice(0,4).map((item) => ({
//   imageUrl: item.item,
//   id: item.id,
// }));

const fashionAccessories = Products.filter(
  (item) => item.category === "Accessories"
);

const selectedfashionAccessories = fashionAccessories.slice(0,4).map((item) => ({
  imageUrl: item.item,
  id: item.id,
}));

const feet = Products.filter(
  (item) => item.category === "Footwear"
);

const selectedFeet = feet.slice(0,4).map((item) => ({
  imageUrl: item.item,
  id: item.id,
}));





export const rowSix = [
  {
    title: "Lowest Prices in 60 Days",
    imageUrl: require("../../../Assets/Offers/lowest/fad8186bb3f502194ae34274a7727066--charleston-gardens-charleston-sc.jpg"),
    linkTo: "/offers/Lowest Prices in 60 Days",
  },

  {
    title: "Most Popular",
    imageUrl: require("../../../Assets/Offers/popular/royal-blue-maasai-earrings.jpg"),
    linkTo: "/offers/popular",
  },
  {
    title: "We make your thoughts into reality",
    videoUrl: crop,
    linkTo: "/customize",
  },
  {
    headTitle: "New Products this Week",
    linkTo: "/offers/New Products this Week",
    array: [
      {
        title: "Pouf",
        imageUrl: require("../../../Assets/Offers/this_week/215c79eaf1c3f53f0fa798617be97ba8.jpg"),
      },
      {
        title: "Purse",
        imageUrl: require("../../../Assets/Offers/this_week/OIP.jpg"),
      },
      {
        title: "Bikini",
        imageUrl: require("../../../Assets/Offers/this_week/R (1).jpg"),
      },
      {
        title: "Straw Hat",
        imageUrl: require("../../../Assets/Offers/this_week/il_1588xN.3179152889_30w3.webp"),
      },
    ],
  },
];

export const rowNine = [
  {
    headTitle: "Fashion Accessories Made Perfect",
    linkTo: "/category/Accessories",
    array: selectedfashionAccessories,

    // array: [
    //   {
    //     title: "Bangles",
    //     imageUrl: require("../../../Assets/Offers/accessories/61uZKuQzPEL._SL1500_.jpg"),
    //   },
    //   {
    //     title: "Earings",
    //     imageUrl: require("../../../Assets/Offers/accessories/kente earrings 11.07.02 PM.webp"),
    //   },
    //   {
    //     title: "Cowie Shell Necklace",
    //     imageUrl: require("../../../Assets/Offers/accessories/cowie shell necklace1.jpg"),
    //   },
    //   {
    //     title: "Belt",
    //     imageUrl: require("../../../Assets/Offers/accessories/8db62ff84ace3029cdd223c553bacee6.jpg"),
    //   },
    // ],
  },
  {
    title: "Discover Fashion Trends",
    imageUrl: require("../../../Assets/Offers/fashion_trend/cd664fd6d9e14b009b2657e27345a94b.jpg"),
    linkTo: "/category/Clothing",
  },
  {
    title: "We get it done like you design it",
    videoUrl: booty,
    linkTo: "/customize",
  },
  {
    headTitle: "Get Value for your Feet",
    linkTo: "/category/Footwear",
    array: selectedFeet,
    // array: [
    //   {
    //     // title: "Bangles",
    //     imageUrl: require("../../../Assets/Offers/footwear/ccb78d9160c59b8990e5d8b3b9064598--african-shoes-african-fashion-ankara.jpg"),
    //     // linkTo: "/category/Footwear",
    //   },
    //   {
    //     // title: "Earings",
    //     imageUrl: require("../../../Assets/Offers/footwear/021111-BOHO-Twelfth-St-400_0-15afb40a28924b9fafeba0a986eedeb4.jpg"),
    //     // linkTo: "/category/Footwear",
    //   },
    //   {
    //     // title: "Cowie Shell Necklace",
    //     imageUrl: require("../../../Assets/Offers/footwear/KANT2847.jpg"),
    //     // linkTo: "/category/Footwear",
    //   },
    //   {
    //     // title: "Belt",
    //     imageUrl: require("../../../Assets/Offers/footwear/R 11.20.36 PM.jpg"),
    //     // linkTo: "/category/Footwear",
    //   },
    // ],
  },

];

