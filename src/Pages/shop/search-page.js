import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from './Data/products';
import ProductCard from './components/product-card';
import Nav from '../../Components/Nav';
import { useProducts } from './hooks/useProducts';
import { LazyScreen } from './components/lazy-screen';
import { Spinner } from './components/spinner';

const SearchPage = () => {
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState('');

  // Find the selected category by name
  const category = categories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === id,
  );

  // State for selected subcategory
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [firstLoad, setFirstLoad] = useState(true); // Track first load

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isFetching,
  } = useProducts('', category?.name, searchQuery, selectedSubcategory);

  const products = data
    ? data.pages.flatMap((page) => page.products) || []
    : [];

  useEffect(() => {
    if (!isFetching) {
      setFirstLoad(false); // Disable LazyScreen after first load
    }
  }, [isFetching]);

  if (firstLoad && isFetching) {
    return <LazyScreen />;
  }

  if (!category) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <h2 className="text-2xl font-bold">Category Not Found</h2>
        <p>Please check the category name.</p>
      </div>
    );
  }

  if (error) {
    console.log('error loading products:', error);
    return (
      <div className="text-center text-red-500">Error loading products</div>
    );
  }

  return (
    <>
      <Nav />

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Main Category Name */}
        <div className="h-[20vh] flex items-center justify-center">
          <h2 className="text-3xl font-bold">{category.name}</h2>
        </div>

        {/* Search & Filter Bar */}
        <div className="w-full flex justify-center items-center my-6">
          <div
            id="products"
            className="relative w-full max-w-lg flex items-center justify-between bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm"
          >
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border-none outline-none p-2 text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <p className="relative flex items-center mt-2">
              {isFetching && (
                <Spinner className="absolute right-28 top-1/2 transform -translate-y-1/2 " />
              )}
            </p>
          </div>
        </div>

        {/* Subcategory Buttons */}
        <div className="flex whitespace-nowrap gap-2 mt-6 overflow-x-auto pb-2">
          <motion.button
            className={`px-4 py-2 text-xs md:text-sm rounded-full border-2 ${
              selectedSubcategory === ''
                ? 'bg-yellow-500 text-white'
                : 'border-gray-300'
            } hover:border-yellow-500 transition`}
            onClick={() => setSelectedSubcategory('')}
            whileHover={{ scale: 1.1 }}
          >
            All
          </motion.button>

          {category?.children.map((sub, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full text-xs md:text-sm border-2 ${
                selectedSubcategory === sub
                  ? 'bg-yellow-500 text-white'
                  : 'border-gray-300'
              } hover:border-yellow-500 transition`}
              onClick={() => setSelectedSubcategory(sub)}
              // whileHover={{ scale: 1.1 }}
            >
              {sub}
            </motion.button>
          ))}
        </div>

        {/* Product List */}
        <div className="mt-10">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))} */}
              {products.map(({ id, name, price, discount, images }) => (
                <ProductCard
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  discount={discount}
                  images={images}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">
              No products matching query.
            </p>
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center my-6">
          {hasNextPage && !isLoading && (
            <button
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
              className="border-1 border-yellow-500 text-black py-2 px-6 rounded-md hover:bg-yellow-500 hover:text-white transition"
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
