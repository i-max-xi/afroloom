import React from 'react';
import Tour from 'reactour';



export const tourSteps = [
    {
      selector: '.select-part-container',
      content: 'Clothes are seperated into parts which to you can apply individual colors/textures',
    },
    {
      selector: '.size',
      content: 'Choose your desired size from here. (Bigger sizes attract minor extra charges)',
    },
    {
        selector: '.fit',
        content: 'Understand what each size means and customize your own size ',
      },
    {
      selector: '.color-buttons-container',
      content: 'Select the color that suits you best.',
    },
    {
      selector: '.texture-buttons-container',
      content: 'Pick a texture to personalize your clothing. (Attracts minor extra charges)',
    },
    {
      selector: '.rotation-button',
      content: 'Spin model to have a 3D view of your customized design.',
    },
    {
      selector: '.btn-success',
      content: 'Hit this button when you are ready to complete your customization.',
    },
  ];


  const WelcomeTour = ({ isOpen, onRequestClose, steps }) => {
    return (
      <Tour
        steps={steps}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        // You can add more options to customize the tour appearance and behavior
      />
    );
  };

  export default WelcomeTour;

  
