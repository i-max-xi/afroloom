import React from 'react';
import Tour from 'reactour';



export const tourSteps = [
    {
      selector: '.select-part-container',
      content: 'Click here to select different clothing parts.',
    },
    {
      selector: '.size',
      content: 'Choose your desired size from here.',
    },
    {
        selector: '.fit',
        content: 'Understand what each size means and customize your own size',
      },
    {
      selector: '.color-buttons-container',
      content: 'Select the color that suits you best.',
    },
    {
      selector: '.texture-buttons-container',
      content: 'Pick a texture to personalize your clothing.',
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

  
