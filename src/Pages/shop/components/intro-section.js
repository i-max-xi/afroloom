import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IntroSection = () => {
  const [selected, setSelected] = useState('sew');

  return (
    <div className=" flex  items-center justify-center mt-6 text-sm">
      <div className="relative flex items-center justify-center  bg-white p-1 rounded-full w-fit border-2 border-yellow-400 shadow-md">
        <motion.div
          className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
          initial={{ width: '50%', left: 0 }}
          animate={{ left: selected === 'ready' ? '50%' : '0%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ width: '50%' }}
        />

        <button
          onClick={() => setSelected('sew')}
          className={`relative p-2  w-40 rounded-full transition-all font-semibold z-10 flex justify-center items-center ${
            selected === 'sew' ? 'text-white' : 'text-yellow-600'
          }`}
        >
          Order to get it sewed
        </button>

        <button
          onClick={() => setSelected('ready')}
          className={`relative p-2 w-40 rounded-full transition-all font-semibold z-10 flex justify-center items-center ${
            selected === 'ready' ? 'text-white' : 'text-yellow-600'
          }`}
        >
          Ready to wear
        </button>
      </div>
    </div>
  );
};

export default IntroSection;
