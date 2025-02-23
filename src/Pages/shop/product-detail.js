
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { products } from "./Data/products";
import ProductCard from "./components/product-card";
import Nav from "../../Components/Nav";
import { addToShopCart } from "../../Redux/store";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || null);


  if (!product) {
    return <div className="text-center text-xl mt-10">Product not found</div>;
  }

    // Find related products
const relatedProducts = products?.filter(
  (item) =>
    item.parent_category === product.parent_category &&
    item.id !== product.id
);

  // Base price with no discount
  const originalPrice = (((product.price * quantity) + selectedSize.value) * currencyFactor).toFixed(2);

  // Base price with discount applied
  const basePrice = product.discount
    ? (product.price - (product.price * product.discount) / 100)
    : product.price;


  // Adjusted price based on selected size
  const finalPrice = selectedSize
    ? (basePrice + selectedSize.value) * currencyFactor
    : basePrice * currencyFactor;

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) return;

    dispatch(
      addToShopCart({
        id: product.id,
        name: product.name,
        price: finalPrice * quantity,
        selectedSize: selectedSize.name,
        quantity,
        image: product.images[0],
      })
    );
  };

  return (
    <>
      <Nav />

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2">
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Thumbnail Images */}
            <div className="flex gap-2 mt-4">
              {product.images.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                    selectedImage === img ? "border-yellow-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{product.name}</h2>

            {/* Price Section */}
            <div className="flex items-center gap-4">
              {product.discount > 0 && (
                <span className="text-gray-400 line-through text-lg">
                  {currencySymbol}{(originalPrice)}
                </span>
              )}
              <span className="text-yellow-500 text-2xl font-bold">
                {currencySymbol}{(finalPrice * quantity).toFixed(2)}
              </span>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="">
                <h3 className="text-base font-semibold mb-2">Select Size:</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`px-3 py-2 rounded-full border-2 text-sm ${
                        selectedSize?.name === size.name
                          ? "border-yellow-500 bg-yellow-500 text-white"
                          : "border-gray-300"
                      } hover:border-yellow-500 transition`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="">
              <h3 className="text-base font-semibold mb-2">Select Quantity:</h3>
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                >
                  -
                </button>
                <span className="text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600">Ready in: {product.ready_in}</p>

            {/* Add to Cart Button */}
            <button
              disabled={!selectedSize}
              onClick={handleAddToCart}
              className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:hover:bg-yellow-500"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-4 lg:mt-10">
          <p className="text-sm text-gray-400 mt-2">
            Category: {product.parent_category} : {product.child_category}
          </p>
          <p className="text-gray-500 mt-2">
            {product.description || "No description available."}
          </p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
