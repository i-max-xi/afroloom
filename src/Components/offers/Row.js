import React from "react";
import "../../Styles/Offers.css";
import FourInACard from "./Fours";
import OfferCard from "./Singles";

const Row = ({ mainItems }) => {
  // Initialize an array to store the rendered items
  const renderedItems = [];

  // Iterate through the mainItems prop array
  mainItems.forEach((item) => {
    if (item.array) {
      // If the item has an array property, render it as a FourInACard
      renderedItems.push(
        <FourInACard key={item.title} items={item.array} />
      );
    } else {
      // If the item doesn't have an array property, render it as an OfferCard
      renderedItems.push(
        <OfferCard
          key={item.title}
          title={item.title}
          imageUrl={item.imageUrl}
          linkTo={item.linkTo}
          videoUrl={item.videoUrl}
        />
      );
    }
  });

  return <div className="offer-container">{renderedItems}</div>;
};

export default Row;
