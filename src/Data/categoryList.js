// const book = require("../Assets/vid/book.jpg");
const herbal = require("../Assets/vid/herbal.jpg");


export const categoryArr = [
  {
    name: "Accessories",
    link: "/category/Accessories",
    variant: "black"
  },
  {
    name: "Clothing",
    link: "/category/Clothing",
    variant: "black"
  },
  {
    name: "Footwear",
    link: "/category/Footwear",
    variant: "black"
  },
  {
    name: "Furniture",
    link: "/category/Furniture",
    variant: "black"
  },
  {
    name: "Herbal and Beauty Supplies",
    link: "",
    variant: "black"
  },

  {
    name: "Textile",
    link: "/category/Textiles",
    variant: "black"
  },

  {
    name: "See All",
    link: "/category-page",
    variant: "warning"
  },
];

export const mobileCategoryArr = [
  {
    name: "Accessories",
    link: "/category/Accessories",
    variant: "black"
  },
  {
    name: "Basketry",
    link: "/category/Basketry",
    variant: "black"
  },
  {
    name: "Books",
    link: "/category/Books",
    variant: "black"
  },
  {
    name: "Clothing",
    link: "/category/Clothing",
    variant: "black"
  },
  {
    name: "Footwear",
    link: "/category/Footwear",
    variant: "black"
  },
  {
    name: "Furniture",
    link: "/category/Furniture",
    variant: "black"
  },
  {
    name: "Handicrafts",
    link: "/category/Handicrafts",
    variant: "black"
  },
  {
    name: "Herbal and Beauty Supplies",
    link: "/category/Herbal and Beauty Supplies",
    variant: "black"
  },
  {
    name: "Pottery",
    link: "/category/Pottery",
    variant: "black"
  },

  {
    name: "Textiles",
    link: "/category/Textiles",
    variant: "black"
  },


];

export const categoryFilter = [
  "Accessories",
  "Basketry",
  "Books",
  "Clothing",
  "Footwear",
  "Furniture",
  "Handicrafts",
  "Herbal and Beauty Supplies",
  "Pottery",
  "Textiles",
];

export const allCategory = [

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
          "Extra small",
          "Small",
          "Medium",
          "Large",
          "X-Large",
          "2X-Large",
          "3X-Large",
          "4X-Large",
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
          "28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48"
        ]
      },
    ],
    rating: "5",
    image:
      "https://pictures-ghana.jijistatic.com/16234874_MTUwMC0xNDY0LWI5ZjczZmY0MDM.jpg",
  },
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
      "https://i.pinimg.com/736x/61/f3/ea/61f3ea932eb9f32df5869b8b7d61f573.jpg",
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
        options: ["Batik", "Dashiki", "Kaftan", "Kente", "Smock", "Wax Print"],
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
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
        ],
      },
    ],
    rating: "5",
    image:
      "https://www.africablooms.com/wp-content/uploads/2020/01/Best-African-Print-Sneakers-Store-1-Ankara-Shoes-Sandals-for-Sale-AFRICA-BLOOMS-2.png",
  },
  {
    id: "7000",
    name: "Handicrafts",
    filters: [
      {
        name: "Product",
        options: ["Art Doll", "Mask and Wall Decor", "Wall Painting"],
      },
    ],
    rating: "4",
    image:
      "https://www.artmajeur.com/medias/standard/o/w/owolabisegun75/artwork/15766249_img-20220521-wa0012-3.jpg?v=1653986670",
  },
  {
    id: "9000",
    name: "Basketry",
    filters: [
      {
        name: "Product",
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
        name: "Product",
        options: [],
      },
    ],
    rating: "4",
    image:
      "https://www.contemporary-african-art.com/images/nala-sisters-david-ross.jpg",
  },
  {
    id: "10000",
    name: "Herbal and Beauty Supplies",
    filters: [
      {
        name: "Product",
        options: [],
      },
    ],
    rating: "4",
    image: herbal,
  },
  {
    id: "12000",
    name: "Books",
    filters: [
      {
        name: "Product",
        options: [
          "Fiction",
          "Non-Fiction",
          "Poetry",
          "Drama",
          "Children's Literature",
          "Cookbooks",
          "Mystery",
          "Academic Books",
          "Religious Books"
        ],
        
      },
    ],
    rating: "4",
    image: "https://eagle.co.ug/wp-content/uploads/2022/08/Best-Africa-Books-Feature-Image-1-1.png",
  },
];
