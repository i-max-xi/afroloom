import React, { useEffect, useState } from "react";
import ProductCard from "./components/product-card";
import Nav from "../../Components/Nav";
import { CategorySection } from "./components/category-section";
import IntroSection from "./components/intro-section";
import { useProducts } from "./hooks/useProducts";

import { FaFilter, FaSpinner } from "react-icons/fa";
import { categories } from "./Data/products";
import { LazyScreen } from "./components/lazy-screen";
import { useAllProducts } from "./hooks/useAllProducts";
import { Spinner } from "./components/spinner";

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Category filter state
  const [firstLoad, setFirstLoad] = useState(true); // Track first load

  // Fetch products based on search or category
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, isFetching } =
    useProducts(selectedCategory, searchQuery);

  const products = data
    ? data.pages.flatMap((page) => page.products)
    : [];

  useEffect(() => {
    if (!isFetching) {
      setFirstLoad(false); // Disable LazyScreen after first load
    }
  }, [isFetching]);

  // Show LazyScreen only on first load
  if (firstLoad && isFetching) {
    return <LazyScreen />;
  }

  if (error) {
    console.log(error);
    return <div className="text-center text-red-500 flex justify-center items-center">Error loading products</div>;
  }

  return (
    <>
      <Nav />
      <div className="p-8">
        {/* Intro Section */}
        <IntroSection />
        <div id="shopp" className="mx-auto flex flex-col items-center justify-center w-full">
          <CategorySection />
        </div>

        {/* Search & Filter Bar */}
        <div className="w-full flex justify-center items-center">
          <div id="products" className="my-6 flex justify-center relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isFetching && (
              <div className="absolute text-xs right-5 top-1/2 transform -translate-y-1/2 ">
                <Spinner />
              </div>

            )}
            {/* Category Filter Dropdown */}
            <div className="absolute text-xs right-12 top-1/2 transform -translate-y-1/2">
              <select
                className="bg-transparent border-none outline-none text-gray-700 cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((el) => el.name).map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <FaFilter className="text-gray-500 inline-block ml-2" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center my-6">
          {hasNextPage && !isLoading && !searchQuery && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="border-1 border-yellow-500 text-black py-2 px-6 rounded-md"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
