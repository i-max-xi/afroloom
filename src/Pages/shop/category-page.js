import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from './Data/products';
import ProductCard from './components/product-card';
import Nav from '../../Components/Nav';
import { useProducts } from './hooks/useProducts';
import { LazyScreen } from './components/lazy-screen';
import { Spinner } from './components/spinner';
import { IoMdCloseCircle } from 'react-icons/io';
import { Dialog } from 'primereact/dialog';
import { Badge } from 'primereact/badge';
import { FaFilter } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  // Find the selected category by name
  const category = categories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === id,
  );

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

  // State for selected subcategory
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [firstLoad, setFirstLoad] = useState(true); // Track first load

  const activeFiltersCount = selectedPrice !== null ? 1 : 0;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isFetching,
  } = useProducts('', category?.name, searchQuery, selectedSubcategory);

  const products = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.products) : [];
  }, [data]);

  useEffect(() => {
    if (!isFetching) {
      setFirstLoad(false); // Disable LazyScreen after first load
    }
  }, [isFetching]);

  const observer = useRef();

  const lastProductElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return; // Don't observe while loading
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // Fetch more when the last product is visible
        }
      });

      if (node) observer.current.observe(node); // Observe the last node
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const productRender = useMemo(() => {
    if (firstLoad && isFetching && !isFetchingNextPage) {
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
            products.map(({ id, name, price, discount, images }, index) => {
              if (products.length === index + 1) {
                // Last item
                return (
                  <div ref={lastProductElementRef} key={id}>
                    <ProductCard
                      id={id}
                      name={name}
                      price={price}
                      discount={discount}
                      images={images}
                    />
                  </div>
                );
              } else {
                return (
                  <ProductCard
                    key={id}
                    id={id}
                    name={name}
                    price={price}
                    discount={discount}
                    images={images}
                  />
                );
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
  }, [firstLoad, isFetching, products, category, isFetchingNextPage, error]);

  return (
    <>
      <Nav />

      <div className="max-w-6xl mx-auto px-6 py-2 md:px-10 md:py-5">
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full flex flex-col mt-2 items-center justify-center max-w-xs sm:max-w-lg mx-auto"
        >
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full   flex justify-center items-center bg-white border border-gray-300 rounded-2xl px-3 "
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border-none outline-none p-1 text-gray-700"
              value={searchQuery}
              onChange={(e) => {
                setSelectedPrice(null);
                setSearchQuery(e.target.value);
              }}
            />
            <div className="hidden sm:flex items-center justify-between gap-2 text-xs w-full">
              <div className="flex items-center gap-1"></div>
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
          </motion.div>

          {/* Mobile Filter Modal using PrimeReact Dialog */}
          <Dialog
            visible={showFilter}
            onHide={() => setShowFilter(false)}
            header="Filters"
            className="p-4 md:w-[40vw] w-[100vw] "
          >
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
                    setSearchQuery('');
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
                  setSearchQuery('');
                  setShowFilter(false);
                }}
                className="bg-red-500 px-2 py-1 rounded-lg text-white flex items-center gap-1"
              >
                <span className="mb-1">Clear</span> <IoMdCloseCircle />
              </button>
            </div>
          </Dialog>
        </motion.div>

        {/* Main Category Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-fit  mt-2 flex flex-col gap-1  items-center justify-center"
        >
          {/* <div className="flex items-center justify-center  bg-yellow-500 text-white text-[9px]  rounded-full w-fit border-2 border-yellow-400 px-2 py-1">
            {category?.grandparent}
          </div> */}
          <h2 className="text-3xl font-bold ">{category?.name}</h2>
        </motion.div>

        {/* Subcategory Buttons */}
        {category?.children?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="no-scrollbar flex whitespace-nowrap gap-2 mt-2 overflow-x-auto pb-2"
          >
            {category?.children?.length > 1 && (
              <motion.button
                className={`px-4 py-2 text-xs md:text-sm rounded-lg  ${
                  selectedSubcategory === ''
                    ? 'bg-yellow-400 text-yellow-800'
                    : 'bg-gray-200'
                } hover:border-yellow-100 transition`}
                onClick={() => setSelectedSubcategory('')}
                whileHover={{ scale: 1.1 }}
              >
                All
              </motion.button>
            )}

            {category?.children.map((sub, index) => (
              <motion.button
                key={index}
                className={`px-3 py-1 rounded-lg text-xs md:text-sm  ${
                  selectedSubcategory === sub
                    ? 'bg-yellow-300 text-yellow-800'
                    : 'bg-gray-200'
                } hover:border-yellow-100 transition`}
                onClick={() => setSelectedSubcategory(sub)}
                // whileHover={{ scale: 1.1 }}
              >
                {sub}
              </motion.button>
            ))}
          </motion.div>
        )}

        {productRender}
      </div>
    </>
  );
};

export default CategoryPage;
