import React from 'react';
import TextureItem from './TextureItem';
import { textureDescriptions } from './arrays/neededArrays';

export const SeeAll = ({ array, title, onClose, others, titleDisplay }) => {
  return (
    <div className="flex flex-col gap-2 w-full h-[24rem] p-0 m-0 ">
        <div className='flex justify-between w-full'>
            <h2 className="text-sm font-medium uppercase">{titleDisplay}</h2>

            <button
            onClick={onClose}
            type="button"
            className="btn-close self-end"
            aria-label="Close"
            >
            
        </button>
        </div>
      
      <div className="grid grid-cols-4 gap-2 overflow-y-scroll h-[80%]  scrollbar-hidden">
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
          <p className='text-sm lowercase w-full'>No textures available</p>
        )}
      </div>
    </div>
  );
};
