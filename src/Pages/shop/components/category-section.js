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
    <div className="w-full flex flex-col justify-center items-center my-8">
      <h2 className="text-base md:text-xl font-bold text-center mb-4">
        Shop by Category
      </h2>

      <motion.div
        className="flex items-center justify-center gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredCategories?.map((category, index) => (
          <motion.div
            key={index}
            className="cursor-pointer"
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
            <div
              className={`rounded-lg w-[15rem] overflow-hidden shadow-md hover:shadow-lg transition duration-300 `}
            >
              <img
                src={category.image}
                alt={category.name}
                className={`w-full h-32 ${
                  grandparent_category === 'order to sew'
                    ? 'object-contain'
                    : 'object-cover'
                }`}
              />
              <div className="p-3 flex justify-between items-center">
                <span className="font-semibold text-sm text-gray-800">
                  {category.name}
                </span>
                <FaChevronCircleRight className="text-yellow-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
