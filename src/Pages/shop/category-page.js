import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { categories } from "./Data/products";
import ProductCard from "./components/product-card";
import Nav from "../../Components/Nav";
import { useProducts } from "./hooks/useProducts";
import { LazyScreen } from "./components/lazy-screen";

const CategoryPage = () => {
  const { id } = useParams();
  
    // Find the selected category by name
  const category = categories.find((cat) => 
    cat.name.toLowerCase().replace(/\s+/g, "-") === id
  );

  // State for selected subcategory
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useProducts();

  const products = data
  ? data.pages.flatMap((page) => page.products) || []
  : [];


  // Get filtered products based on the selected subcategory
  const filteredProducts = products.filter((product) =>
    // product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedSubcategory ? product.child_category === selectedSubcategory : product.parent_category === category?.name)
  );
  


    if (isLoading) {
      return (
        <LazyScreen />
      );
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
      return <div className="text-center text-red-500">Error loading products</div>;
    }

  return (
    <>
      <Nav />

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Main Category Name */}
        <div className="h-[20vh] flex items-center justify-center">
          <h2 className="text-3xl font-bold">{category.name}</h2>
        </div>

        {/* Subcategory Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 ">
          <motion.button
            className={`px-4 py-2 text-xs md:text-sm rounded-full border-2 ${
              selectedSubcategory === "" ? "bg-yellow-500 text-white" : "border-gray-300"
            } hover:border-yellow-500 transition`}
            onClick={() => setSelectedSubcategory("")}
            whileHover={{ scale: 1.1 }}
          >
            All
          </motion.button>

          {category?.children.map((sub, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full text-xs md:text-sm border-2 ${
                selectedSubcategory === sub ? "bg-yellow-500 text-white" : "border-gray-300"
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
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">No products available.</p>
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
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          )}
        </div>

      </div>
    </>
  );
};

export default CategoryPage;
