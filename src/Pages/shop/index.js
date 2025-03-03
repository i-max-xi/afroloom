import React, { useEffect, useState } from "react";
import ProductCard from "./components/product-card";
import Nav from "../../Components/Nav";
import { CategorySection } from "./components/category-section";
import IntroSection from "./components/intro-section";
import { useProducts } from "./hooks/useProducts";

import { FaFilter } from "react-icons/fa";
import { categories } from "./Data/products";
import { LazyScreen } from "./components/lazy-screen";


const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

    const { data: allProducts, isLoading, error } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState(""); // Category filter state

  

  // Filter products based on search query
  // const filteredProducts = allProducts?.filter((product) =>
  //   product?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  // );

  const filteredProducts = allProducts?.filter((product) => {
    const matchesSearch = product?.name?.toLowerCase().includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory ? product?.parent_category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });


  useEffect(() => {
    window.scrollTo(0,0)
  }, [])



   if (isLoading) {
      return (
        <LazyScreen />
      );
    }
  
    if (error) {
      return <div className="text-center text-red-500">Error loading products</div>;
    }
    
    
  return (
    <>
      <Nav />
      <div className="p-8">
        {/* Intro Section */}
        <IntroSection />
        <div className="mx-auto flex flex-col items-center justify-center w-full">
          <CategorySection />
        </div>

        {/* Search Bar */}
        <div className="w-full justify-center items-center ">
        <div id="products" className="my-6 flex justify-center relative w-full max-w-md justify-self-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Category Filter Dropdown */}
          <div className="absolute text-xs right-3 top-1/2 transform -translate-y-1/2">
            <select
              className="bg-transparent border-none outline-none text-gray-700 cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <FaFilter className="text-gray-500 inline-block ml-2" />
          </div>
        </div>
        </div>

        {/* Product Grid */}
        <div
          
          
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
             
              
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
