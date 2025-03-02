import React, { useState } from "react";
import ProductCard from "./components/product-card";
import Nav from "../../Components/Nav";
import { CategorySection } from "./components/category-section";
import IntroSection from "./components/intro-section";
import Logo from "../../Assets/AFRO_LOGO_4_transparent.png"
import { useProducts } from "./hooks/useProducts";
import { Spinner } from "./components/spinner";

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

    const { data: allProducts, isLoading, error } = useProducts();
  

  // Filter products based on search query
  const filteredProducts = allProducts?.filter((product) =>
    product?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );


   if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col gap-1 items-center justify-center">
          <p className="animate-pulse flex w-full items-center justify-center">
           <img src={Logo} alt="logo" width="15%" height="15%"/>
          </p>
          <div className="">
          <Spinner />
         
          </div>
          </div>
       
        </div>
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
        <div id="products" className="my-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
