import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  startAt,
  endAt,
} from 'firebase/firestore';
import { db } from '../../../firebase';

const PAGE_SIZE = 100; // Number of products per page
const shopCollectionRef = 'loomStore';

// Fetch products with category & search filtering
const fetchProducts = async ({
  pageParam = null,
  grandparent_category,
  category,
  searchQuery,
  child_category,
  selectedPrice,
}) => {
  let q = collection(db, shopCollectionRef);
  let conditions = [];
  let orderField = '__name__'; // default alphabetical order

  let page_size = PAGE_SIZE;

  if (grandparent_category && grandparent_category !== '') {
    conditions.push(where('grandparent_category', '==', grandparent_category));
  }

  // Filter by category
  if (category) {
    if (category === "Men's Clothing") {
      conditions.push(
        where('parent_category', 'in', ["Men's Clothing", 'Unisex']),
      );
    } else {
      conditions.push(where('parent_category', '==', category));
    }
  }

  // Filter by child category (only if passed)
  if (child_category) {
    conditions.push(where('child_category', '==', child_category));
  }

  // Filter by search query
  if (searchQuery) {
    page_size = 1000;
    q = query(
      q,
      where('search_keywords', 'array-contains', searchQuery.toLowerCase()),
    );
  }

  // if (selectedPrice && selectedPrice.min !== null)
  //   conditions.push(where('price', '>=', selectedPrice.min));
  // if (selectedPrice && selectedPrice.max !== null)
  //   conditions.push(where('price', '<=', selectedPrice.max));

  // // Apply conditions to query
  // q =
  //   selectedPrice && selectedPrice.min !== null
  //     ? query(q, ...conditions, orderBy('price'), limit(page_size))
  //     : query(q, ...conditions, orderBy('name'), limit(page_size));

  // Filter by price
  if (selectedPrice && selectedPrice.min !== null) {
    conditions.push(where('price', '>=', selectedPrice.min));
    orderField = 'price'; // Sort by price if we're filtering by it
  }

  if (selectedPrice && selectedPrice.max !== null) {
    conditions.push(where('price', '<=', selectedPrice.max));
    orderField = 'price'; // Sort by price if we're filtering by it
  }

  // Construct final query
  q = query(q, ...conditions, orderBy(orderField), limit(page_size));

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
export const useProducts = (
  grandparent_category,
  category,
  searchQuery,
  child_category,
  selectedPrice,
) => {
  return useInfiniteQuery({
    queryKey: [
      'products',
      category,
      searchQuery,
      child_category,
      selectedPrice,
      grandparent_category,
    ], // Ensure query updates when filters change
    queryFn: ({ pageParam }) =>
      fetchProducts({
        pageParam,
        category,
        searchQuery,
        child_category,
        selectedPrice,
        grandparent_category,
      }),
    getNextPageParam: (lastPage) => lastPage.lastDoc || undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
