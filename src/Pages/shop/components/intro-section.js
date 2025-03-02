import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaGift, FaTag } from "react-icons/fa";

const floatingIcons = [
  { id: 1, icon: <FaShoppingCart />, x: "5vw", y: "5vh", top: "2%", left: "5%" }, // Top Left
  { id: 2, icon: <FaGift />, x: "-5vw", y: "5vh", top: "50%", right: "2%" }, // Middle Right
  { id: 3, icon: <FaTag />, x: "5vw", y: "-5vh", bottom: "2%", left: "2%" }, // Bottom Left
];

const IntroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[80vh] text-center overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute text-yellow-500 md:text-4xl text-2xl animate"
          style={{
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
          }}
          initial={{ opacity: 1, x: icon.x, y: icon.y }}
          animate={{
            opacity: 1,
            y: [icon.y, icon.y - 10, icon.y], // Floating effect
          }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          whileHover={{ scale: 1.2 }}
        >
          {icon.icon}
        </motion.div>
      ))}

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
      <div className="flex items-center gap-4 justify-center">
        <a
          href="#products"
          className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all"
        >
          Start Shopping
        </a>
        <a
          href="/start-customize"
          className="mt-6 border-1 border-yellow-500 text-black px-6 py-2 rounded-lg transition-all"
        >
          Customize
        </a>
      </div>
    </div>
  );
};

export default IntroSection;
