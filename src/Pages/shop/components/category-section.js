import { categories } from '../Data/products';
import { motion } from 'framer-motion';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CategorySection = ({ grandparent_category }) => {
  const navigate = useNavigate();
  // const { grandparent_category } = useSelector((state) => state.loomstore);

  const filteredCategories = categories.filter(
    (sub) => sub.grandparent === grandparent_category,
  );

  return (
    <div className="w-full flex  items-center px-2 bg-gray-800/85 ">
      <h2 className="text-sm font-bold mt-1 text-start mr-5 text-yellow-500 whitespace-nowrap">
        Shop by Category
      </h2>

      <motion.div
        className="flex items-center  gap-3 overflow-x-auto py-3 no-scrollbar "
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        // variants={{
        //   hidden: { opacity: 0, x: 50 },
        //   visible: { opacity: 1, x: 0 },
        // }}
      >
        {filteredCategories?.map((category, index) => (
          <button
            key={index}
            className="cursor-pointer font-semibold text-xs md:text-sm  whitespace-nowrap hover:text-yellow-500 text-white "
            // variants={{
            //   hidden: { opacity: 0, y: 30 },
            //   visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            // }}
            // whileHover={{ scale: 1.05 }}
            onClick={() =>
              navigate(
                `/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
              )
            }
          >
            {category.name}
          </button>
        ))}
      </motion.div>
    </div>
  );
};
