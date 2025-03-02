import React from "react";
import { motion } from "framer-motion";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  // Calculate discounted price
  const discountedPrice = product.discount
    ? ((product.price - (product.price * product.discount) / 100) * currencyFactor).toFixed(2)
    : (product.price * currencyFactor).toFixed(2);

  return (
    <motion.div
      initial={{  scale: 1 }}
      whileHover={{ scale: 1.05 }}
      // transition={{ type: "spring", stiffness: 300 }}
      className="bg-white border hover:border-yellow-500 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300"
    
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center pt-2 lg:py-4 lg-4">
        <h3 className="text-xs md:text-base lg:text-lg font-semibold text-center">{product.name}</h3>

        {/* Pricing Section */}
        <div className="flex flex-col items-center ">
          {product.discount > 0 ? (
            <div className="flex items-center gap-2">
              <p className="text-gray-400 line-through text-sm">
                {currencySymbol}{(product.price * currencyFactor ).toFixed(2)}
              </p>
              <p className="text-yellow-500 font-bold">{currencySymbol}{discountedPrice}</p>
            </div>
          ) : (
            <p className="text-yellow-500 font-bold">{currencySymbol}{(product.price * currencyFactor).toFixed(2)}</p>
          )}
        </div>

        {/* Add to Cart Button */}
        {/* <motion.button whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-yellow-500 text-white px-5 py-2  rounded-lg hover:bg-yellow-600 transition-all"
          // onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </motion.button> */}
      </div>
    </motion.div>
  );
};

export default ProductCard;
