import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../../../firebase";


const shopCollectionRef = "loomStore"

const fetchProducts = async ({ pageParam = null }) => {
  let q;
  

  q = query(collection(db, shopCollectionRef), orderBy("name"));


  const snapshot = await getDocs(q);
  
  // Get last document for pagination
  const lastDoc = snapshot.docs[snapshot.docs.length - 1];

  // Format the data
  const products = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return { products, lastDoc };
};

// Hook for paginated product fetching
export const useAllProducts = () => {
  return useInfiniteQuery({
    queryKey: ["all_products"],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.lastDoc || undefined, // Track last document
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
