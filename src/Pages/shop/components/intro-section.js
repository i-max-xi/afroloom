import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoomStore } from '../../../Redux/store';

const IntroSection = () => {
  const { grandparent_category } = useSelector((state) => state.loomstore);
  const [selected, setSelected] = useState(grandparent_category);
  const dispatch = useDispatch();

  const onChangeGrandparent = (category) => {
    setSelected(category);
    dispatch(
      updateLoomStore({
        grandparent_category: category,
      }),
    );
  };

  return (
    <div className=" flex  items-center justify-center  text-xs md:text-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative flex items-center justify-center  bg-white  rounded-full w-fit border-2 border-yellow-400 shadow-md"
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
          initial={{ width: '50%', left: 0 }}
          animate={{ left: selected === 'ready to wear' ? '50%' : '0%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ width: '50%' }}
        />

        <button
          onClick={() => onChangeGrandparent('order to sew')}
          className={`relative p-2  w-40 rounded-full transition-all font-semibold z-10 flex justify-center items-center ${
            selected === 'order to sew' ? 'text-white' : 'text-yellow-600'
          }`}
        >
          Order to get it sewed
        </button>

        <button
          onClick={() => onChangeGrandparent('ready to wear')}
          className={`relative p-2 w-40 rounded-full transition-all font-semibold z-10 flex justify-center items-center ${
            selected === 'ready to wear' ? 'text-white' : 'text-yellow-600'
          }`}
        >
          Ready to wear
        </button>
      </motion.div>
    </div>
  );
};

export default IntroSection;
