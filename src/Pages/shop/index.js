import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { IoMdCloseCircle } from 'react-icons/io';
import { Badge } from 'primereact/badge';
import { motion } from 'framer-motion';

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChildCategory, setSelectedChildCategory] = useState(''); // Child category
  const [childCategories, setChildCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const activeFiltersCount =
    (selectedCategory && selectedCategory !== 'All Categories' ? 1 : 0) +
    (selectedChildCategory ? 1 : 0) +
    (selectedPrice !== null ? 1 : 0);

  const [firstLoad, setFirstLoad] = useState(true); // Track first load

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);
  const { grandparent_category } = useSelector((state) => state.loomstore);

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
    grandparent_category,
    selectedCategory,
    searchQuery,
    selectedChildCategory,
    selectedPrice,
  );

  const products = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.products) : [];
  }, [data]);

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

  const observer = useRef();

  const lastProductElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return; // Don't observe while loading
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // Fetch more when the last 5 products are visible
        }
      });

      // Only observe every 5th product
      if (node && (products.indexOf(node) + 1) % 5 === 0) {
        observer.current.observe(node); // Observe the 5th product
      }
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage, products],
  );

  const productRender = useMemo(() => {
    if (firstLoad && isFetching && !isFetchingNextPage) {
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
      <section>
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 px-4 md:px-8 lg:px-8">
          {products?.length > 0 ? (
            products.map((product, index) => {
              const triggerOffset = 50;

              if (products.length - index === triggerOffset) {
                // Last item
                return (
                  <div ref={lastProductElementRef} key={index}>
                    <ProductCard id={index} product={product} />
                  </div>
                );
              } else {
                return <ProductCard id={index} product={product} />;
              }
            })
          ) : (
            <p className="col-span-full text-center text-gray-500">
              {isFetching ? 'Loading...' : 'No products found.'}
            </p>
          )}
        </div>

        {/* Spinner when loading more */}
        {isFetchingNextPage && (
          <div className="flex justify-center my-4">
            <Spinner />
          </div>
        )}

        {/* Load More Button */}
        {/* <div className="text-center my-6">
          {hasNextPage && !isLoading && !searchQuery && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="border-1 border-yellow-500 text-black py-2 px-6 rounded-md"
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div> */}
      </section>
    );
  }, [firstLoad, isFetching, products, isFetchingNextPage, error]);

  return (
    <>
      <Nav />
      <div className="flex flex-col gap-3 my-2">
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full flex flex-col  items-center justify-center max-w-xs sm:max-w-lg mx-auto"
        >
          {/* Search Bar */}
          <div className="relative w-full   flex justify-center items-center bg-white border border-gray-300 rounded-2xl px-3 ">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border-none outline-none p-1 text-gray-700"
              value={searchQuery}
              onChange={(e) => {
                setSelectedCategory('');
                setSelectedPrice(null);
                setSelectedChildCategory('');
                setSearchQuery(e.target.value);
              }}
            />
            <div className="hidden sm:flex items-center justify-between gap-2 text-xs w-full">
              <div className="flex items-center gap-1">
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
              <div
                onClick={() => setShowFilter(true)}
                className="relative flex items-center cursor-pointer whitespace-nowrap"
              >
                Price Filter
                <p className=" p-overlay-badge mt-3">
                  <FaFilter className="text-gray-500 ml-2 " />
                  {activeFiltersCount > 0 && (
                    <Badge
                      severity="warning"
                      style={{ scale: '0.5' }}
                      value={activeFiltersCount}
                    ></Badge>
                  )}
                </p>
                {/* <HiDotsVertical className="text-gray-500 ml-2 cursor-pointer" /> */}
              </div>
            </div>
            {/* <button className="rounded-full bg-yellow-500 px-3 py-2 flex justify-end text-white">
              Search
            </button> */}
            <button
              className=" whitespace-nowrap cursor-pointer text-xs flex justify-center md:hidden items-center text-gray-700 relative after:absolute after:left-0 after:bottom-[-3px] after:h-[3px] after:w-0 after:bg-yellow-500 after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => setShowFilter(true)}
            >
              Filter
              <p className=" p-overlay-badge mt-3">
                <FaFilter className="text-gray-500 ml-2 " />
                {activeFiltersCount > 0 && (
                  <Badge
                    severity="warning"
                    style={{ scale: '0.5' }}
                    value={activeFiltersCount}
                  ></Badge>
                )}
              </p>
            </button>
          </div>

          {/* Mobile Filter Modal using PrimeReact Dialog */}
          <Dialog
            visible={showFilter}
            onHide={() => setShowFilter(false)}
            header="Filters"
            className="p-4 md:w-[40vw] w-[100vw] "
          >
            <div className="md:hidden">
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
            </div>

            {/* Price Filters */}
            <div className="mt-3">
              <h4 className="font-medium text-sm md:text-base">Price Range</h4>
              {PriceFilters.map((filter, index) => (
                <button
                  key={index}
                  className={`block w-full text-left p-2 hover:bg-gray-100 ${
                    !selectedPrice && filter.label === 'All Prices' && ''
                  } ${
                    selectedPrice?.label === filter.label
                      ? 'font-bold text-yellow-500 relative'
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

            <div className="mt-4 w-full flex justify-center items-center">
              <button
                onClick={() => {
                  setSelectedPrice(null);
                  setSelectedCategory('');
                  setSearchQuery('');
                  setSelectedChildCategory('');
                  setShowFilter(false);
                }}
                className="bg-red-500 px-2 py-1 rounded-lg text-white flex items-center gap-1"
              >
                <span className="mb-1">Clear</span> <IoMdCloseCircle />
              </button>
            </div>
          </Dialog>
        </motion.div>

        {/* <IntroSection /> */}

        <CategorySection grandparent_category="ready to wear" />

        {productRender}
      </div>
    </>
  );
};

export default ShopPage;
