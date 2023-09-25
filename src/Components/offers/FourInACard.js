import React from "react";
import "../../Styles/Offers.css";

const FourInACard = ({ items }) => {
  return (
    <div className="four-in-a-card">
      {items.map((item, index) => (
        <div className="item" key={index}>
          <img src={item.imageUrl} alt={item.title} width="100%" />
          {item.title && <h4>{item.title}</h4>}
          {item.link && (
            <a href={item.link} className="item-link">
              See More
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default FourInACard;
