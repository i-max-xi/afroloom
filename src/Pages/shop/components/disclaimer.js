import { motion } from "framer-motion";

export const Disclaimer = () => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center pt-4 p-2 justify-center text-center text-sm bg-yellow-100 border border-yellow-300 rounded-lg shadow-md  mx-auto"
  >
    <p className="text-yellow-600 text-sm font-bold">⚠️</p>
    <p className="text-yellow-800 font-medium">
      Please note that the fabric showcased in each Ankara style is for display purposes only. Clients must select their own fabric to place an order.
    </p>
  </motion.div>
);
