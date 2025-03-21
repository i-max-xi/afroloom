import { useEffect, useState } from "react";
import AllServices from "../../../Services/usersService"

export const LoomStoreProducts = () => {
  const [products, setProducts] = useState([])


  useEffect(() => { 
    const fetchContacts = async () => {
      try {
        const response = await AllServices.getAllProducts();
        setProducts(
          response.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
  
    fetchContacts();
  }, []);

  return products

}

// export const products = [
//     // Women's Clothing
//     {
//       id: 1,
//       name: "Office Skirt",
//       price: 79.99,
//       ready_in: "7 days",
//       images: [
//         "https://placehold.co/400",
//         "https://placehold.co/400",
//         "https://placehold.co/400",
//       ],
//       description: "",
//       parent_category: "Women's Clothing",
//       child_category: 
//       discount: 10,
//       sizes: [
//         { name: "XS", value: 0 }, 
//         { name: "S", value: 5 },
//         { name: "M", value: 10 },
//         { name: "L", value: 15 },
//         { name: "XL", value: 20 }
//       ],
//     },
//     {
//       id: 2,
//       name: "African Print Dress",
//       price: 29.99,
//       ready_in: "7 days",
//       images: ["https://placehold.co/400"],
//       description: "",
//       parent_category: "Women's Clothing",
//       child_category: "African Print Dresses",
//       discount: 10,
//       sizes: [
//         { name: "XS", value: 0 }, 
//         { name: "S", value: 5 },
//         { name: "M", value: 10 },
//         { name: "L", value: 15 },
//         { name: "XL", value: 20 }
//       ],
//     },
//     {
//       id: 3,
//       name: "Crop Top",
//       price: 69.99,
//       ready_in: "7 days",
//       images: ["https://placehold.co/400"],
//       description: "",
//       parent_category: "Women's Clothing",
//       child_category: "Casual Wear",
//       discount: 10,
//       sizes: [
//         { name: "XS", value: 0 }, 
//         { name: "S", value: 5 },
//         { name: "M", value: 10 },
//         { name: "L", value: 15 },
//         { name: "XL", value: 20 }
//       ]
//     },
  
//     // Men's Clothing
//     {
//       id: 4,
//       name: "African Print Shirt",
//       price: 39.99,
//       ready_in: "5 days",
//       images: ["https://placehold.co/400"],
//       description: "",
//       parent_category: "Men's Clothing",
//       child_category: "African Print Shirts",
//       discount: 10,
//       sizes: [
//         { name: "XS", value: 0 }, 
//         { name: "S", value: 5 },
//         { name: "M", value: 10 },
//         { name: "L", value: 15 },
//         { name: "XL", value: 20 }
//       ],
//     },
//     {
//       id: 5,
//       name: "Casual Polo Shirt",
//       price: 24.99,
//       ready_in: "5 days",
//       images: ["https://placehold.co/400"],
//       description: "",
//       parent_category: "Men's Clothing",
//       child_category: "Casual Wear",
//       discount: 0,
//       sizes: [
//         { name: "XS", value: 0 }, 
//         { name: "S", value: 5 },
//         { name: "M", value: 10 },
//         { name: "L", value: 15 },
//         { name: "XL", value: 20 }
//       ],
//     },
//     {
//       id: 6,
//       name: "Formal Suit",
//       price: 149.99,
//       ready_in: "10 days",
//       images: ["https://placehold.co/400"],
//       description: "",
//       parent_category: "Men's Clothing",
//       child_category: 
//       discount: 0,
//       sizes: [
//         { name: "XS", value: 0 }, 
//         { name: "S", value: 5 },
//         { name: "M", value: 10 },
//         { name: "L", value: 15 },
//         { name: "XL", value: 20 }
//       ],
//     },
  
//     // Children's Clothing
//     {
//       id: 7,
//       name: "Boys' Traditional Outfit",
//       price: 45.99,
//       ready_in: "6 days",
//       images: ["https://placehold.co/400"],
//       description: "",
//       parent_category: "Children's Clothing",
//       child_category: "Boys’ Outfits (Traditional and Casual)",
//       discount: 0,
//       sizes: [
//       { name: "XS", value: 0 }, 
//       { name: "S", value: 5 },
//       { name: "M", value: 10 },
//       { name: "L", value: 15 },
//       { name: "XL", value: 20 }
//     ],
//     },
//     {
//       id: 8,
//       name: "Girls' Casual Dress",
//       price: 34.99,
//       ready_in: "6 days",
//       images: ["https://placehold.co/400"],
//       description: "",
//       parent_category: "Children's Clothing",
//       child_category: "Girls’ Outfits (Traditional and Casual)",
//       discount: 0,
//       sizes: [
//       { name: "XS", value: 0 }, 
//       { name: "S", value: 5 },
//       { name: "M", value: 10 },
//       { name: "L", value: 15 },
//       { name: "XL", value: 20 }
//     ],
//     },
//     {
//       id: 9,
//       name: "Matching Family Set",
//       price: 99.99,
//       ready_in: "7 days",
//       images: ["https://placehold.co/400"],
//       description: "",
//       parent_category: "Children's Clothing",
//       child_category: "Matching Family Sets",
//       discount: 0,
//       sizes: [
//         { name: "XS", value: 0 }, 
//         { name: "S", value: 5 },
//         { name: "M", value: 10 },
//         { name: "L", value: 15 },
//         { name: "XL", value: 20 }
//       ],
//     },
//     {
//       id: 10,
//       name: "School Uniform",
//       price: 59.99,
//       ready_in: "8 days",
//       images: ["https://placehold.co/400"],
//       description: "",
//       parent_category: "Children's Clothing",
//       child_category: "School Uniforms",
//       discount: 0,
//       sizes: [
//         { name: "XS", value: 0 }, 
//         { name: "S", value: 5 },
//         { name: "M", value: 10 },
//         { name: "L", value: 15 },
//         { name: "XL", value: 20 }
//       ],
//     },
//   ];
  
  
  export const categories = [
    {
      name: "Women's Clothing",
      image: "https://example.com/womens-clothing.jpg",
      children: [
        "T-Shirt",
        
        "Kaftan",
        
       
      ]
    },
    {
      name: "Men's Clothing",
      image: "https://example.com/mens-clothing.jpg",
      children: [
        "T-Shirt",
        "Kaftan",
        
        
       
      ]
    },
    // {
    //   name: "Children's Clothing",
    //   image: "https://example.com/childrens-clothing.jpg",
    //   children: [
    //     "Boys’ Outfits (Traditional and Casual)",
    //     "Girls’ Outfits (Traditional and Casual)",
    //     "Matching Family Sets",
    //     "School Uniforms",
    //     
    //     "T-Shirt",
    //     "Trousers",
    //     "Shorts"
        
    //   ]
    // },
    {
      name: "Unisex",
      image: "https://example.com/mens-clothing.jpg",
      children: [
        
        
        "T-Shirt",
       
      ]
    },
    {
      name: "Accessories",
      image: "https://example.com/mens-clothing.jpg",
      children: [
        "Necklace",
        "Bangles",
        "Necklace & Bangles"
        
      ]
    },
    {
      name: "Style & Sew",
      image: "https://example.com/mens-clothing.jpg",
      children: [
        "Male",
        "Female",
        
      ]
    },
  ];


  export const categoriesBreakdown = {
    "Women's Clothing": ["T-Shirt",  "Kaftan",  "Trousers"],
    "Men's Clothing": ["T-Shirt",  "Kaftan",   "Trousers"],
    // "Children's Clothing": [
    //   "Boys’ Outfits (Traditional and Casual)",
    //   "Girls’ Outfits (Traditional and Casual)",
    //   "Matching Family Sets",
    //   "School Uniforms",
    //   "T-Shirt",
    // ],
   "Unisex": [  "T-Shirt", "Trousers"],
   "Accessories": ["Necklace ", "Bangles", "Necklace & Bangles"],
   "Style & Sew": ["Male ", "Female"],
  };
  