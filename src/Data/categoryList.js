import { Link } from "react-router-dom";
import React from "react";

export const categoryArr = [
  // <Link className="text-decoration-none text-black" to="/category/Home Decor">
  //   Home Decor
  // </Link>,
  <Link className="text-decoration-none text-black" to="/category/Accessories">
    Accessories
  </Link>,
  // <Link className="text-decoration-none text-black" to="/category/Electronics">
  //   Electronics
  // </Link>,
  <Link className="text-decoration-none text-black" to="/category/Furniture">
    Furniture
  </Link>,

  <Link className="text-decoration-none text-black" to="/category/Clothing">
    Clothing
  </Link>,

  <Link className="text-decoration-none text-black" to="/category/Textiles">
    Textile
  </Link>,
  // <Link className="text-decoration-none text-black" to="/category/Bags">
  //   Bags
  // </Link>,
  <Link className="text-decoration-none text-black" to="/category/Footwear">
    Footwear
  </Link>,

  <Link className="text-decoration-none text-warning" to="/category-page">
    See All
  </Link>,
];

export const categoryFilter = [
  "Accessories",
  "Clothing",
  "Textiles",
  "Footwear",
  "Basketry",
  "Pottery",
  "Furniture",
];

export const allCategory = [
  // {
  //   id: "1000",
  //   name: "Home Decor",
  //   filters: [
  //     {
  //       name: "Type",
  //       options: ["Curtains", "Cushions", "Rugs", "Wall Art", "Lamps"],
  //     },
  //   ],
  //   rating: "4",
  //   image:
  //     "https://www.thetrentonline.com/wp-content/uploads/2021/04/mbg_living_room_30_d3f00eab-99b1-4f5a-a236-5dd9404a0942.jpg",
  // },

  {
    id: "2000",
    name: "Accessories",
    filters: [
      {
        name: "Gender",
        options: ["Male", "Female"],
      },

      {
        name: "Product",
        options: [
          "Anklet",
          "Bag",
          "Belt",
          "Bra",
          "Bracelet",
          "Card Holder",
          "Hat",
          "Mask",
          "Headwrap",
          "Necklace",
          "Rings",
          "Sash",
          "Tie",
          "Purse",
          "Wallet",
          "Waist Jewelry",
          "others"
        ],
        maleOptions: [
          "Bag",
          "Belt",
          "Bracelet",
          "Card holder",
          "Hat",
          "Mask",
          "Necklace",
          "Rings",
          "Sash",
          "Tie",
          "Wallet",
          "Others"
        ],
        femaleOptions: [
          "Anklet",
          "Bag",
          "Belt",
          "Bra",
          "Bracelet",
          "Hat",
          "Mask",
          "Headwrap",
          "Necklace",
          "Rings",
          "Sash",
          "Purse",
          "Wallet",
          "Waist Jewelry",
          "others"
        ],
      },

      {
        name: "Size",
        braName: "Size (UK)",
        options: [
          // "Extra small",
          // "Small",
          // "Medium",
          // "Large",
          // "X-Large",
          // "2X-Large",
          // "3X-Large",
          // "4X-Large",
        ],
        hatOptions: [
          "Extra small",
          "Small",
          "Medium",
          "Large",
          "X-Large",
          "2X-Large",
        ],
        braOptions: [
          28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48
        ]
      },
    ],
    rating: "5",
    image:
      "https://pictures-ghana.jijistatic.com/16234874_MTUwMC0xNDY0LWI5ZjczZmY0MDM.jpg",
  },
  // {
  //   id: "200",
  //   name: "Electronics",
  //   filters: [
  //     {
  //       name: "Type",
  //       options: ["Phones", "Laptops", "Tablets", "Headphones", "Speakers"],
  //     },
  //   ],
  //   rating: "3",
  //   image:
  //     "https://media.istockphoto.com/id/178716575/photo/mobile-devices.jpg?s=612x612&w=0&k=20&c=9YyINgAbcmjfY_HZe-i8FrLUS43-qZh6Sx6raIc_9vQ=",
  // },
  // {
  //   id: "300",
  //   name: "Bags",
  //   filters: [
  //     {
  //       name: "Type",
  //       options: ["Backpack", "Handbag", "Purse", "Satchel", "Tote", "Wallet"],
  //     },
  //     {
  //       name: "Gender",
  //       options: ["Male", "Female"],
  //     },
  //   ],
  //   rating: "3",
  //   image:
  //     "https://cdn.shopify.com/s/files/1/1257/5497/products/UbuntuB01167WEB.jpg?v=1670336335&width=512",
  // },
  {
    id: "3000",
    name: "Furniture",
    rating: "2",
    filters: [
      {
        name: "Product",
        options: [
          "Cushion",
          "Chair",
          "Tables",
          "Poufs",
          "Sofa",
          "Stool",
          "Shelve",
        ],
      },
    ],
    image:
      "https://www.ahwenepa.com/wp-content/uploads/2019/06/Update-Your-Furniture-with-African-Prints-600x600.jpg",
  },
  {
    id: "4000",
    name: "Clothing",
    filters: [
      {
        name: "Gender",
        options: ["Male", "Female"],
      },

      {
        name: "Product",
        options: [
          "Blazer",
          "Cloak",
          "Dress",
          "Shorts",
          "Shirt",
          "Skirt",
          "T-shirt",
          "Top",
          "Top & down",
          "Trousers",
        ],
        maleOptions: [
          "Blazer",
          "Shirt",
          "Shorts",
          "T-shirt",
          "Top & down",
          "Trousers",
        ],
        femaleOptions: [
          "Blazer",
          "Cloak",
          "Dress",
          "Shorts",
          "Skirt",
          "Top",
          "Top & down",
          "Trousers",
        ],
      },

      {
        name: "Size",
        options: [
          "Extra small",
          "Small",
          "Medium",
          "Large",
          "X-Large",
          "2X-Large",
          "3X-Large",
          "4X-Large",
        ],
      },
    ],
    rating: "3",
    image: "https://demandafrica.com/wp-content/uploads/2018/07/Dashiki.jpg",
  },
  {
    id: "5000",
    name: "Textiles",
    filters: [
      {
        name: "Product",
        options: ["Batik", "Dashiki", "Kaftan", "Kente", "Smock"],
      },
    ],
    rating: "5",
    image:
      "https://cdn.shopify.com/s/files/1/0558/3725/products/Kente-Nylon-Ripstop-_PU_-Group-Image-242-1X1_540x.jpg?v=1664668135",
  },
  {
    id: "6000",
    name: "Footwear",
    filters: [
      {
        name: "Gender",
        options: ["Male", "Female"],
      },
      {
        name: "Product",
        options: [
          "Afro print heels",
          "Afro Print Shoes",
          "Beads slippers",
          "Leather Boots",
          "Leather Sandals",
          "Leather Shoes",
          "Leather Slippers",
        ],
        maleOptions: [
          "Afro Print Shoes",
          "Leather Boots",
          "Leather Sandals",
          "Leather Shoes",
          "Leather Slippers",
        ],
        femaleOptions: [
          "Afro print heels",
          "Afro Print Shoes",
          "Beads slippers",
          "Leather Boots",
          "Leather Sandals",
          "Leather Shoes",
          "Leather Slippers",
        ],
      },

      {
        name: "Size",
        options: [
          "Extra small",
          "Small",
          "Medium",
          "Large",
          "X-Large",
          "2X-Large",
          "3X-Large",
          "4X-Large",
        ],
      },
    ],
    rating: "5",
    image:
      "https://www.africablooms.com/wp-content/uploads/2020/01/Best-African-Print-Sneakers-Store-1-Ankara-Shoes-Sandals-for-Sale-AFRICA-BLOOMS-2.png",
  },
  {
    id: "7000",
    name: "Art Works",
    filters: [
      {
        name: "Type",
        options: ["Art Doll", "Mask and Wall Decor", "Wall Painting"],
      },
    ],
    rating: "4",
    image:
      "https://www.artmajeur.com/medias/standard/o/w/owolabisegun75/artwork/15766249_img-20220521-wa0012-3.jpg?v=1653986670",
  },
  // {
  //   id: "8000",
  //   name: "Scarves and Sashe",
  //   filters: [
  //     {
  //       name: "Type",
  //       options: ["Scarves", "Sashes"],
  //     },
  //     {
  //       name: "Gender",
  //       options: ["Male", "Female"],
  //     },
  //     {
  //       name: "Size",
  //       options: ["Small", "Medium", "Large", "X-Large"],
  //     },
  //   ],
  //   rating: "4",
  //   image:
  //     "https://africanvibes.storage.googleapis.com/wp-content/uploads/2022/02/24011137/il_794xN.1707905208_tjd8.jpg",
  // },
  {
    id: "9000",
    name: "Basketry",
    filters: [
      {
        name: "Type",
        options: [],
      },
    ],
    rating: "5",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbrcYTkAJ-zYCGyGbaxdmE4Cn-5pr0HxPu21bVVxqx7qE1ICLq4BDKjVYYTWxRu5Uf59Y&usqp=CAU",
  },
  {
    id: "10000",
    name: "Pottery",
    filters: [
      {
        name: "Type",
        options: [],
      },
    ],
    rating: "4",
    image:
      "https://www.contemporary-african-art.com/images/nala-sisters-david-ross.jpg",
  },
];
