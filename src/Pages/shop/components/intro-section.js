import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaGift } from "react-icons/fa";

const IntroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center pt-10 pb-16 md:pt-0 md:pb-0 md:h-[80vh] text-center overflow-hidden">
      {/* Heading */}
      <motion.h1
        className="text-3xl md:text-5xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Loom Store
      </motion.h1>
      <p className="text-gray-600 mt-4 max-w-xl">
        Discover the finest clothing collections with styles for everyone.
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4 justify-center relative mt-6">
        {/* Start Shopping Button */}
        <a
          href="#products"
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all relative"
        >
          Start Shopping
          {/* Shopping Cart Icon at Bottom-Left Edge */}
          <motion.div
            className="absolute -bottom-4 -left-4 text-yellow-500 md:text-3xl text-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [10, 0, 10] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          >
            <FaShoppingCart />
          </motion.div>
        </a>
        
        {/* Customize Button */}
        <a
          href="/start-customize"
          className="border border-yellow-500 text-black px-6 py-2 rounded-lg transition-all relative"
        >
          Customize
          {/* Gift Icon at Top-Right Edge */}
          <motion.div
            className="absolute -top-4 -right-4 text-yellow-500 md:text-3xl text-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [-10, 0, -10] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          >
            <FaGift />
          </motion.div>
        </a>
      </div>
    </div>
  );
};

export default IntroSection;
