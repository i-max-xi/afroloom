import store from "../../../Redux/store";

const Products = store.getState().allProducts.products;

const handicraft = Products.filter(
  (item) => item.category === "Handicrafts"
);

const selectedHandicraft = handicraft.slice(0,5).map((item) => ({
  imageUrl: item.item,
  id: item.id,
}));

const discount = Products.filter(
  (item) => item.discount > 0
);

const selectedDiscount = discount.slice(0,5).map((item) => ({
  imageUrl: item.item,
  id: item.id,
}));

const fabric = Products.filter(
  (item) => item.category === "Textiles"
);

const selectedFabric = fabric.slice(0,5).map((item) => ({
  imageUrl: item.item,
  id: item.id,
}));

const furniture = Products.filter(
  (item) => item.category === "Furniture"
);

const selectedFurniture = furniture.slice(0,5).map((item) => ({
  imageUrl: item.item,
  id: item.id,
}));

export const bannerone =  selectedHandicraft;
// [

//   {
//     // title: "Dolls",
//     imageUrl: require("../../../Assets/Offers/handicrafts/carved Figures.jpg"),
//     link: "/category/Accessories",
//   },
//   {
//     // title: "Drum",
//     imageUrl: require("../../../Assets/Offers/handicrafts/hand Drum.jpg"),
//     link: "/category/Accessories",
//   },
//   {
//     // title: "Drum",
//     imageUrl: require("../../../Assets/Offers/handicrafts/maracas.webp"),
//     link: "/category/Accessories",
//   },
//   {
//     // title: "Mask",
//     imageUrl: require("../../../Assets/Offers/handicrafts/wood wall mask.webp"),
//     link: "/category/Accessories",
//   },
//   {
//     // title: "Basket",
//     imageUrl: require("../../../Assets/Offers/handicrafts/storage basket with lid.jpg"),
//     link: "/category/Accessories",
//   },
// ];

export const bannerfive = selectedDiscount;
// [
//   {
//     title: "Ring",
//     imageUrl: require("../../../Assets/Offers/discount/OIP(1).jpg"),
//     link: "/category/Accessories",
//     discount: 50,
//   },
//   {
//     title: "Shirt",
//     imageUrl: require("../../../Assets/Offers/discount/R (1)(1).jpg"),
//     link: "/category/Clothing",
//     discount: 20,
//   },
//   {
//     title: "Carved Sculpture",
//     imageUrl: require("../../../Assets/Offers/discount/thing.jpg"),
//     link: "/category/Clothing",
//     discount: 30,
//   },
//   {
//     title: "Key Holder",
//     imageUrl: require("../../../Assets/Offers/discount/a3009b7d0b2e800ac7764e16a9577c98.jpg"),
//     link: "/category/Accessories",
//     discount: 10,
//   },
//   {
//     title: "Bow Tie",
//     imageUrl: require("../../../Assets/Offers/discount/e6db628543ec3d9d3266ddddb9bd23b2.jpg"),
//     link: "/category/Accessories",
//     discount: 25,
//   },
// ];

export const bannereight = selectedFabric;

// [
//   {
//     // title: "Afro Heel",
//     imageUrl: require("../../../Assets/Offers/fabric/R (1).jpg"),
//     link: "/category/Textiles",
//   },
//   {
//     // title: "Cain Chair",
//     imageUrl: require("../../../Assets/Offers/fabric/OIP.jpg"),
//     link: "/category/Textiles",
//   },
//   {
//     // title: "Waist Jewelry",
//     imageUrl: require("../../../Assets/Offers/fabric/OIP (2).jpg"),
//     link: "/category/Textiles",
//   },
//   {
//     // title: "Necklace",
//     imageUrl: require("../../../Assets/Offers/fabric/8ed01397ebbe38df4373f0288cbe8184.jpg"),
//     link: "/category/Textiles",
//   },
//   {
//     // title: "Necklace",
//     imageUrl: require("../../../Assets/Offers/fabric/R 11.15.44 PM.jpg"),
//     link: "/category/Textiles",
//   },
  
// ];

export const bannerten = selectedFurniture;
// [
//   {
//     // title: "Wall mask",
//     imageUrl: require("../../../Assets/Offers/furniture/leopard2_l.jpg"),
//     link: "/category/Furniture",
//   },
  
//   {
//     // title: "Cain Chair",
//     imageUrl: require("../../../Assets/Offers/furniture/OIP (1) 11.28.45 PM.jpg"),
//     link: "/category/Furniture",
//   },
//   {
//     // title: "Pouf",
//     imageUrl: require("../../../Assets/Offers/furniture/Mvelo_Desk_3_Photo_by_Michelle_Reynolds_1024x1024_african+furniture.jpg"),
//     link: "/category/Furniture",
//   },
//   {
//     // title: "Head Wrap",
//     imageUrl: require("../../../Assets/Offers/furniture/OIP 11.28.45 PM.jpg"),
//     link: "/category/Furniture",
//   },
//   {
//     // title: "Wall mask",
//     imageUrl: require("../../../Assets/Offers/furniture/c23eedd22f19ae4ee1aeabab18142090.png"),
//     link: "/category/Furniture",
//   },
// ];
