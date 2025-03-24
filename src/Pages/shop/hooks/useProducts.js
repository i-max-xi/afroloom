

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy, limit, startAfter, where, startAt, endAt } from "firebase/firestore";
import { db } from "../../../firebase";

const PAGE_SIZE = 10; // Number of products per page
const shopCollectionRef = "loomStore";

// Fetch products with category & search filtering
const fetchProducts = async ({ pageParam = null, category, searchQuery, child_category }) => {
  let q = collection(db, shopCollectionRef);
  let conditions = [];

  // Filter by category
  if (category) {
    if (category === "Men's Clothing") {
      conditions.push(where("parent_category", "in", ["Men's Clothing", "Unisex"]));
    } else {
      conditions.push(where("parent_category", "==", category));
    }
  }

  // Filter by child category (only if passed)
  if (child_category) {
    conditions.push(where("child_category", "==", child_category));
  }

  // Filter by search query
  if (searchQuery) {
    q = query(q, where("search_keywords", "array-contains", searchQuery.toLowerCase()));
  }
  

  // Apply conditions to query
  q = query(q, ...conditions, orderBy("__name__"), limit(PAGE_SIZE));

  // Pagination
  if (pageParam) {
    q = query(q, startAfter(pageParam));
  }
  

  const snapshot = await getDocs(q);
  const lastDoc = snapshot.docs[snapshot.docs.length - 1];
  const products = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return { products, lastDoc };
};

// Hook for paginated product fetching
export const useProducts = (category, searchQuery, child_category) => {
  return useInfiniteQuery({
    queryKey: ["products", category, searchQuery, child_category], // Ensure query updates when filters change
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, category, searchQuery, child_category }),
    getNextPageParam: (lastPage) => lastPage.lastDoc || undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

