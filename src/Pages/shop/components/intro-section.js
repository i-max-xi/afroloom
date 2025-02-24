import React from "react";
import { motion } from "framer-motion";

const floatingIcons = [
  { id: 1, src: "https://placehold.co/50", x: "-50%", y: "-30%" },
  { id: 2, src: "https://placehold.co/50", x: "50%", y: "-40%" },
  { id: 3, src: "https://placehold.co/50", x: "-60%", y: "50%" },
];

const IntroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[80vh] text-center">
      {/* Floating Icons */}
      {floatingIcons.map((icon) => (
        <motion.img
          key={icon.id}
          src={icon.src}
          alt="User Icon"
          className="absolute w-12 h-12 rounded-full shadow-lg"
          initial={{ opacity: 0, x: icon.x, y: icon.y }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
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
      
      {/* CTA Button */}
      <a href="#products"  className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all">
        Start Shopping
      </a>
    </div>
  );
};

export default IntroSection;
