import React from "react";
import { categories } from "../Data/products";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col justify-center items-center py-5 md:py-10">
      <h2 className="text-lg md:text-xl font-bold text-center mb-10">Shop by Category</h2>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-10 justify-center items-center">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`)}
          >
            <div className="w-32 h-32 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              {/* <img
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover"
              /> */}
            <div className="md:text-base font-semibold  text-center flex flex-col gap-1 items-center justify-center ">
              <span>{category.name.split(" ")[0]}</span>
              <span>{category.name.split(" ")[1]}</span>
            </div>

            </div>
            {/* <h3 className="text-lg font-semibold mt-4 text-center">{category.name}</h3> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
