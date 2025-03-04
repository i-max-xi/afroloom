import { motion } from "framer-motion";

export const Disclaimer = () => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center pt-4 lg:p-2 p-1 justify-center text-center lg:text-sm text-xs bg-yellow-100 border border-yellow-300 rounded-lg shadow-md  mx-auto"
  >
    <p className="text-yellow-600 text-sm font-bold">⚠️</p>
    <p className="text-yellow-800 font-medium">
      Please note that the fabric showcased in each Formal and African print is for display purposes only. Clients must select their own fabric to place an order.
    </p>
  </motion.div>
);
