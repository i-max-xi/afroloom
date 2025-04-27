import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getOptimizedImageUrl } from '../../../utils/functions';

const ProductCard = ({ id, name, price, discount, images }) => {
  const navigate = useNavigate();

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  // Calculate discounted price
  const discountedPrice = discount
    ? ((price - (price * discount) / 100) * currencyFactor).toFixed(2)
    : (price * currencyFactor).toFixed(2);

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      // transition={{ type: "spring", stiffness: 300 }}
      className="cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-200 rounded-lg">
        <img
          // src={getOptimizedImageUrl(images[0], 500, 80)}
          src={images}
          alt={name}
          className="w-full h-full object-contain"
          // loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col  pt-2 lg:py-4">
        <h3 className="text-xs md:text-sm lg:text-sm font-medium">{name}</h3>

        {/* Pricing Section */}
        <div className="flex flex-col">
          {discount > 0 ? (
            <div className="flex  gap-2">
              <p className="text-gray-400 line-through text-sm">
                {currencySymbol}
                {(price * currencyFactor).toFixed(2)}
              </p>
              <p className="text-yellow-500 font-bold">
                {currencySymbol}
                {discountedPrice}
              </p>
            </div>
          ) : (
            <p className="text-yellow-500 font-bold">
              {currencySymbol}
              {(price * currencyFactor).toFixed(2)}
            </p>
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

export default React.memo(ProductCard);

// export default ProductCard;
