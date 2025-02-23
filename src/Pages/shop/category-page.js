import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { categories, products } from "./Data/products";
import ProductCard from "./components/product-card";
import Nav from "../../Components/Nav";

const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Find the selected category by name
  const category = categories.find((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === id);

  if (!category) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <h2 className="text-2xl font-bold">Category Not Found</h2>
        <p>Please check the category name.</p>
      </div>
    );
  }

  return (
    <>
      <Nav />

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Category Name */}
        <div className="h-[20vh] flex items-center justify-center">
          <h2 className="text-3xl font-bold">{category.name}</h2>
        </div>

        {/* Subcategories */}
        {category.children.map((sub, index) => {
          const subcategoryProducts = products.filter(
            (product) => product.child_category === sub
          );

          return (
            <div key={index} className="mt-10">
              <h3 className="text-2xl font-bold mb-6">{sub}</h3>

              {subcategoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {subcategoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No products available in this subcategory.</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryPage;
