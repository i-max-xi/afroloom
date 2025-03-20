// import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
// import { collection, getDocs, query, orderBy, limit, startAfter, where } from "firebase/firestore";
// import { db } from "../../../firebase";

// const PAGE_SIZE = 10; // Number of products per page

// const shopCollectionRef = "loomStore"

// const fetchProducts = async ({ pageParam = null, category }) => {
//   let q;

//   if (pageParam) {
//     q = query(
//       collection(db, shopCollectionRef),
//       orderBy("name"),
//       startAfter(pageParam),
//       limit(PAGE_SIZE)
//     );
//   } else {
//     q = query(
//       collection(db, shopCollectionRef),
//       orderBy("name"),
//       limit(PAGE_SIZE)
//     );
//   }

//   if (category) {
//     if(category === "Men's Clothing") {
//       q = query(collection(db, shopCollectionRef), 
//       // orderBy("name"), 
//       where("parent_category", "in", ["Men's Clothing", "Unisex"]), // Filter products by category
//       limit(PAGE_SIZE)
//     )
//   } else {
//     q = query(collection(db, shopCollectionRef), 
//       // orderBy("name"), 
//       where("parent_category", "==", category), // Filter products by category
//       limit(PAGE_SIZE)
//     )
//   }
//   }

//   const snapshot = await getDocs(q);
//   const lastDoc = snapshot.docs[snapshot.docs.length - 1];
//   const products = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

//   return { products, lastDoc };
// };


// // Hook for paginated product fetching
// export const useProducts = (category) => {
//   return useInfiniteQuery({
//     queryKey: ["products", category], // Ensure query updates when category changes
//     queryFn: ({ pageParam }) => fetchProducts({ pageParam, category }),
//     getNextPageParam: (lastPage) => lastPage.lastDoc || undefined,
//     staleTime: 1000 * 60 * 5,
//     refetchOnWindowFocus: false,
//   });
// };

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy, limit, startAfter, where } from "firebase/firestore";
import { db } from "../../../firebase";

const PAGE_SIZE = 10; // Number of products per page
const shopCollectionRef = "loomStore";

// Fetch products with category & search filtering
const fetchProducts = async ({ pageParam = null, category, searchQuery }) => {
  let q = collection(db, shopCollectionRef);

  // Filter by category
  if (category) {
    q = query(q, where("parent_category", "==", category));
  }

  // Filter by search query
  if (searchQuery) {
    
    q = query(q, where("name", "in", ["a"]));
  }

  // Pagination
  q = pageParam
    ? query(q,  startAfter(pageParam), limit(PAGE_SIZE))
    : query(q, limit(PAGE_SIZE));

  const snapshot = await getDocs(q);
  const lastDoc = snapshot.docs[snapshot.docs.length - 1];
  const products = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return { products, lastDoc };
};

// Hook for paginated product fetching
export const useProducts = (category, searchQuery) => {
  return useInfiniteQuery({
    queryKey: ["products", category, searchQuery], // Ensure query updates when filters change
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, category, searchQuery }),
    getNextPageParam: (lastPage) => lastPage.lastDoc || undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

