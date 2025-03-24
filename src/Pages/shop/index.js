import React, { useEffect, useState } from "react";
import ProductCard from "./components/product-card";
import Nav from "../../Components/Nav";
import { CategorySection } from "./components/category-section";
import IntroSection from "./components/intro-section";
import { useProducts } from "./hooks/useProducts";

import { FaFilter } from "react-icons/fa";
import { categories } from "./Data/products";
import { LazyScreen } from "./components/lazy-screen";
import { Spinner } from "./components/spinner";
import { useSelector } from "react-redux";

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChildCategory, setSelectedChildCategory] = useState(""); // Child category
  const [childCategories, setChildCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showFilter, setShowFilter] = useState(false);


  const [firstLoad, setFirstLoad] = useState(true); // Track first load

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
    const currencyFactor = useSelector((state) => state.currencySymbol.factor);

    const PriceFilters = [
      { label: `All Prices`, min: null, max: null },
      { label: `Under ${currencySymbol}${(30 * currencyFactor).toFixed(0)}`, min: 0, max: 30 },
      { label: `${currencySymbol}${(30 * currencyFactor).toFixed(0)} - ${currencySymbol}${(50 * currencyFactor).toFixed(0)}`, min: 20, max: 50 },
      { label: `${currencySymbol}${(50 * currencyFactor).toFixed(0)} - ${currencySymbol}${(100 * currencyFactor).toFixed(0)}`, min: 50, max: 100 },
      { label: `Above ${currencySymbol}${(100 * currencyFactor).toFixed(0)}`, min: 100, max: null },
    ];
  

  // Fetch products based on search or category
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, isFetching } =
    useProducts(selectedCategory, searchQuery, selectedChildCategory, selectedPrice);

  const products = data
    ? data.pages.flatMap((page) => page.products)
    : [];

  useEffect(() => {
    if (!isFetching) {
      setFirstLoad(false); // Disable LazyScreen after first load
    }
  }, [isFetching]);

  const handleParentCategoryChange = (e) => {
    const parent = e.target.value;
    setSelectedCategory(parent);
    setSelectedChildCategory(""); // Reset child category

    // Find corresponding child categories
    const selectedParentCategory = categories.find((cat) => cat.name === parent);
    setChildCategories(selectedParentCategory ? selectedParentCategory.children || [] : []);
  };

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
        <div className="w-full flex justify-center items-center my-6">
          <div id="products" className="relative w-full max-w-lg flex items-center justify-between bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border-none outline-none p-2 text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <p className="relative flex items-center mt-2">
              {isFetching && <Spinner className="absolute right-28 top-1/2 transform -translate-y-1/2 " />}
            </p>      
            <div className="flex items-center gap-1 text-xs w-[60%] justify-end">
              {/* Parent Category Filter */}
              <select
                className=" bg-transparent border-none outline-none text-gray-700 cursor-pointer max-w-[55%]"
                value={selectedCategory}
                onChange={handleParentCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>

              {/* Child Category Filter (Only visible when a parent category is selected) */}
              {childCategories.length > 0 && (
                <select
                  className=" bg-transparent border-none outline-none text-gray-700 cursor-pointer max-w-[40%]"
                  value={selectedChildCategory}
                  onChange={(e) => setSelectedChildCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {childCategories.map((child) => (
                    <option key={child} value={child}>{child}</option>
                  ))}
                </select>
              )}

              {/* Filter Icon */}
              <div className="relative">
                <FaFilter className="text-gray-500 ml-2 cursor-pointer" onClick={() => setShowFilter(!showFilter)} />

                {/* Price Filter Dropdown */}
                {showFilter && (
                  <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md p-2 w-48 z-50">
                    {PriceFilters.map((filter, index) => (
                      <button
                        key={index}
                        className={`w-full text-left p-2 hover:bg-gray-100 ${
                          selectedPrice?.label === filter.label ? "font-bold text-yellow-500" : ""
                        }`}
                        onClick={() => {
                          setSelectedPrice(filter);
                          setShowFilter(false);
                        }}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>            </div>      
            
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
