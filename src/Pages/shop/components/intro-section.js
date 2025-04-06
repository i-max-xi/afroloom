import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { updateLoomStore } from '../../../Redux/store';

const IntroSection = () => {
  const [selected, setSelected] = useState('order to sew');
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
    <div className=" flex  items-center justify-center mt-6 text-sm">
      <div className="relative flex items-center justify-center  bg-white p-1 rounded-full w-fit border-2 border-yellow-400 shadow-md">
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
      </div>
    </div>
  );
};

export default IntroSection;
