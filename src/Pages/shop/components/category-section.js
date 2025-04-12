import { categories } from '../Data/products';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';

export const CategorySection = () => {
  const navigate = useNavigate();
  const { grandparent_category } = useSelector((state) => state.loomstore);

  const filteredCategories = categories.filter(
    (sub) => sub.grandparent === grandparent_category,
  );

  return (
    <div className="w-full flex  items-center px-2 bg-gray-800 ">
      <h2 className="text-sm font-bold mt-1 text-start mr-5 text-yellow-500 whitespace-nowrap">
        Shop by Category
      </h2>

      <motion.div
        className="flex items-center  gap-3 overflow-x-auto py-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredCategories?.map((category, index) => (
          <motion.button
            key={index}
            className="cursor-pointer font-semibold text-xs md:text-sm text-white whitespace-nowrap"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              navigate(
                `/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
              )
            }
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
