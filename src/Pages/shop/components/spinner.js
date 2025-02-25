import { motion } from "framer-motion";

export const Spinner = () => (
  <motion.div
    className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1 }}
  />
);
