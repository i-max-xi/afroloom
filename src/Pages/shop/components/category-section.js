import { categories } from '../Data/products';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CategorySection = () => {
  const navigate = useNavigate();
  const { grandparent_category } = useSelector((state) => state.loomstore);

  const filteredCategories = categories.filter(
    (sub) => sub.grandparent === grandparent_category,
  );

  return (
    <div className="w-full flex flex-col justify-center items-center py-5 md:py-10">
      <h2 className="text-lg md:text-xl font-bold text-center mb-10">
        Shop by Category
      </h2>
      <motion.div
        className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-4 md:gap-10 justify-center items-center place-items-center content-center"
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
            className="flex flex-col items-center cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() =>
              navigate(
                `/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
              )
            }
          >
            <div
              className={`w-32 h-32 ${
                category.name === 'Style & Sew'
                  ? 'bg-yellow-500'
                  : 'bg-gray-800'
              }  text-white rounded-full flex items-center justify-center shadow-lg overflow-hidden`}
            >
              {/* <img
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover"
              /> */}
              <div className="md:text-base font-semibold text-center flex flex-col gap-1 items-center justify-center">
                <span>{category.name}</span>
                {/* <span>{category.name.split(" ")[0]}</span>
                <span>{category.name.split(" ")[1]}</span>
                <span>{category.name.split(" ")[2]}</span> */}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
