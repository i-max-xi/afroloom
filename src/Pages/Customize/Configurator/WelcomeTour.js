import React from "react";
import Tour from "reactour";

export const tourSteps = [
  {
    selector: ".select-part-container",
    content:
      "Clothes are seperated into parts which to you can apply individual colors/textures",
  },
  {
    selector: ".size-button-container",
    content: "Choose your desired size from here.",
  },
  {
    selector: ".fit",
    content: "Understand what each size means and customize your own size",
  },
  {
    selector: ".color-button",
    content: "Select the color that suits you best.",
  },
  {
    selector: ".texture-category",
    content: "Pick a texture to personalize your clothing.",
  },
  // {
  //   selector: ".expect-to-be-ready",
  //   content: "Time expected for you design to be ready",
  // },
  // {
  //   selector: ".estimated-shipping",
  //   content: "Estimated Shipping Time",
  // },
  {
    selector: ".price-text",
    content: "Price may change slightly based on chosen Size and Textile",
  },
  {
    selector: ".rotation-button",
    content: "Spin model to have a 3D view of your customized design.",
  },
  {
    selector: ".complete",
    content:
      "Hit this button when you are ready to complete your customization.",
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
