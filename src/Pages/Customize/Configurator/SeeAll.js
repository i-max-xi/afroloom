import React from 'react';
import { motion } from 'framer-motion';
import TextureItem from './TextureItem';
import { textureDescriptions } from './arrays/neededArrays';

export const SeeAll = ({ array, title, onClose, others, titleDisplay }) => {
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <motion.div
      className="flex flex-col gap-2 w-full h-[25rem] p-0 m-0"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={animationVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex justify-between w-full">
        <h2 className="text-sm font-medium uppercase">{titleDisplay}</h2>

        <button
          onClick={onClose}
          type="button"
          className="btn-close self-end"
          aria-label="Close"
        >
          
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 overflow-y-scroll h-[80%] scrollbar-hidden grid-auto-rows-[minmax(0, 1fr)] place-content-start">
        {array.length > 0 ? (
          array.map((texture, index) => (
            <TextureItem
              key={index}
              texture={texture}
              Title={title}
              selectedTexture={others.selectedPrintOn}
              handleTextureChange={others.handleTextureChange}
              currencySymbol={others.currencySymbol}
              currencyFactor={others.currencyFactor}
              subTextureDescriptions={textureDescriptions[title]}
              textureIndex={array[title]?.indexOf(texture)}
            />
          ))
        ) : (
          <p className="text-sm lowercase w-full">No textures available</p>
        )}
      </div>
    </motion.div>
  );
};
