import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getOptimizedImageUrl } from '../../../utils/functions';
import { updateLoomStore } from '../../../Redux/store';
import { Image } from 'primereact/image';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  // Calculate discounted price
  // const discountedPrice = product?.discount
  //   ? (
  //       (product?.price - (product?.price * product?.discount) / 100) *
  //       currencyFactor
  //     ).toFixed(2)
  //   : (product?.price * currencyFactor).toFixed(2);

  const finalPrice = useMemo(() => {
    if (!product) return '0.00';
    const price = product?.price * currencyFactor;
    if (product?.discount) {
      return (
        (product?.price - (product?.price * product?.discount) / 100) *
        currencyFactor
      ).toFixed(2);
    }
    return price.toFixed(2);
  }, [product, currencyFactor]);

  const originalPrice = useMemo(() => {
    return (product?.price * currencyFactor).toFixed(2);
  }, [product, currencyFactor]);

  // const firebaseImagePath = product.images[0].replace(
  //   'https://firebasestorage.googleapis.com/',
  //   '',
  // );

  // const imageUrl = useMemo(() => {
  //   return `https://ik.imagekit.io/q1qpjuotl/firebase/${firebaseImagePath}`;
  // }, [product?.images?.[0]]);

  const imageUrl = useMemo(() => {
    return product.images[0];
  }, [product?.images?.[0]]);

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      // transition={{ type: "spring", stiffness: 300 }}
      className="cursor-pointer"
      onClick={() => {
        dispatch(
          updateLoomStore({
            currentProduct: product,
          }),
        );
        navigate(`/product/${product?.id}`);
      }}
    >
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-200 rounded-lg relative overflow-hidden flex items-center justify-center">
        {/* <img
          // src={getOptimizedImageUrl(images[0], 500, 80)}
          src={product?.images[0]}
          alt={product?.name}
          className="w-full h-full object-contain"
          // loading="lazy"
        /> */}
        {/* <LazyLoadImage
          // src={getOptimizedImageUrl(product?.images[0], 400, 75)}
          src={imageUrl}
          alt={product?.name}
          height="100"
          width="100"
          className="w-full h-full object-contain"
          effect="blur"
          loading="eager"
        /> */}

        <Image
          src={imageUrl}
          alt={product?.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col  pt-2 lg:py-4">
        <h3 className="text-xs md:text-sm lg:text-sm font-medium">
          {product?.name}
        </h3>

        {/* Pricing Section */}
        <div className="flex flex-col">
          {product?.discount > 0 ? (
            <div className="flex  gap-2">
              <p className="text-gray-400 line-through text-sm">
                {currencySymbol}
                {/* {(product?.price * currencyFactor).toFixed(2)} */}
                {originalPrice}
              </p>
              <p className="text-yellow-500 font-bold">
                {currencySymbol}
                {finalPrice}
              </p>
            </div>
          ) : (
            <p className="text-yellow-500 font-bold">
              {currencySymbol}
              {originalPrice}
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
