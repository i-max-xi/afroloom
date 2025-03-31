import React, { useEffect, useState } from 'react';
import ProductCard from './components/product-card';
import Nav from '../../Components/Nav';
import { CategorySection } from './components/category-section';
import IntroSection from './components/intro-section';
import { useProducts } from './hooks/useProducts';

import { FaFilter } from 'react-icons/fa';
import { categories } from './Data/products';
import { LazyScreen } from './components/lazy-screen';
import { Spinner } from './components/spinner';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { HiDotsVertical } from 'react-icons/hi';

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChildCategory, setSelectedChildCategory] = useState(''); // Child category
  const [childCategories, setChildCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const [firstLoad, setFirstLoad] = useState(true); // Track first load

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const PriceFilters = [
    { label: `All Prices`, min: null, max: null },
    {
      label: `Under ${currencySymbol}${(30 * currencyFactor).toFixed(0)}`,
      min: 0,
      max: 30,
    },
    {
      label: `${currencySymbol}${(30 * currencyFactor).toFixed(
        0,
      )} - ${currencySymbol}${(50 * currencyFactor).toFixed(0)}`,
      min: 20,
      max: 50,
    },
    {
      label: `${currencySymbol}${(50 * currencyFactor).toFixed(
        0,
      )} - ${currencySymbol}${(100 * currencyFactor).toFixed(0)}`,
      min: 50,
      max: 100,
    },
    {
      label: `Above ${currencySymbol}${(100 * currencyFactor).toFixed(0)}`,
      min: 100,
      max: null,
    },
  ];

  // Fetch products based on search or category
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isFetching,
  } = useProducts(
    selectedCategory,
    searchQuery,
    selectedChildCategory,
    selectedPrice,
  );

  const products = data ? data.pages.flatMap((page) => page.products) : [];

  useEffect(() => {
    if (!isFetching) {
      setFirstLoad(false); // Disable LazyScreen after first load
    }
  }, [isFetching]);

  const handleParentCategoryChange = (e) => {
    const parent = e.target.value;
    setSelectedCategory(parent);
    setSearchQuery(''); // Reset search query
    setSelectedPrice(null); // Reset price filter
    setSelectedChildCategory(''); // Reset child category

    // Find corresponding child categories
    const selectedParentCategory = categories.find(
      (cat) => cat.name === parent,
    );
    setChildCategories(
      selectedParentCategory ? selectedParentCategory.children || [] : [],
    );
  };

  // Show LazyScreen only on first load
  if (firstLoad && isFetching) {
    return <LazyScreen />;
  }

  if (error) {
    console.log(error);
    return (
      <div className="text-center text-red-500 flex justify-center items-center">
        Error loading products
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="">
        <IntroSection />
        <div
          id="shopp"
          className="mx-auto flex flex-col items-center justify-center w-full"
        >
          <CategorySection />
        </div>

        {/* Search & Filter Bar */}
        <div className="w-full flex flex-col  items-center justify-center my-4 mx-auto">
          {/* Search Bar */}
          {/* <div className="relative w-full sm:max-w-lg mx-auto flex justify-center items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border-none outline-none p-2 text-gray-700"
              value={searchQuery}
              onChange={(e) => {
                setSelectedCategory('');
                setSelectedPrice(null);
                setSelectedChildCategory('');
                setSearchQuery(e.target.value);
              }}
            />
          </div> */}

          {/* Filter Icon (Opens Modal on Mobile) */}
          {/* <button
            className="mt-3 flex items-center text-gray-700 relative after:absolute after:left-0 after:bottom-[-3px] after:h-[3px] after:w-0 after:bg-yellow-500 after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => setShowFilter(true)}
          >
            <FaFilter className="text-lg" />
            <span className="ml-2">Filters</span>
          </button> */}

          {/* Desktop Filters */}
          {/* <div className="hidden sm:flex items-center gap-2 text-xs w-full ">
            <div>
              <select
                className="bg-transparent border-none outline-none text-gray-700 cursor-pointer"
                value={selectedCategory}
                onChange={handleParentCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {selectedCategory && (
                <select
                  className="bg-transparent border-none outline-none text-gray-700 cursor-pointer"
                  value={selectedChildCategory}
                  onChange={(e) => setSelectedChildCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {childCategories.map((child) => (
                    <option key={child} value={child}>
                      {child}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="relative flex items-center cursor-pointer">
              Price Filter
              <HiDotsVertical
                className="text-gray-500 ml-2 cursor-pointer"
                onClick={() => setShowFilter(true)}
              />
            </div>
          </div> */}

          {/* Mobile Filter Modal using PrimeReact Dialog */}
          <Dialog
            visible={showFilter}
            onHide={() => setShowFilter(false)}
            header="Filters"
            className="p-4 md:w-[40vw] w-[100vw] "
          >
            {/* Category Filters */}
            <div className="relative w-full sm:max-w-lg mx-auto flex justify-center items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border-none outline-none p-2 text-gray-700"
                value={searchQuery}
                onChange={(e) => {
                  setSelectedCategory('');
                  setSelectedPrice(null);
                  setSelectedChildCategory('');
                  setSearchQuery(e.target.value);
                }}
              />
            </div>
            <select
              className="w-full mt-3 p-2 border rounded"
              value={selectedCategory}
              onChange={handleParentCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {selectedCategory && (
              <select
                className="w-full mt-2 p-2 border rounded"
                value={selectedChildCategory}
                onChange={(e) => {
                  setShowFilter(false);
                  setSelectedChildCategory(e.target.value);
                }}
              >
                <option value="">All</option>
                {childCategories.map((child) => (
                  <option key={child} value={child}>
                    {child}
                  </option>
                ))}
              </select>
            )}

            {/* Price Filters */}
            <div className="mt-3">
              <h4 className="font-medium">Price Range</h4>
              {PriceFilters.map((filter, index) => (
                <button
                  key={index}
                  className={`block w-full text-left p-2 hover:bg-gray-100 ${
                    selectedPrice?.label === filter.label
                      ? 'font-bold text-yellow-500'
                      : ''
                  }`}
                  onClick={() => {
                    setSelectedPrice(filter);
                    setSelectedCategory('');
                    setSearchQuery('');
                    setSelectedChildCategory('');
                    setShowFilter(false);
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </Dialog>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 px-4 md:px-8 lg:px-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              {isFetching ? 'Loading...' : 'No products found.'}
            </p>
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
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
