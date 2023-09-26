import React from "react";
import "../../Styles/Offers.css";
import { Link } from "react-router-dom";

const Fours = ({ items }) => {
  return (
    <div className="four-in-a-card">
      {items.map((item, index) => (
        <div className="item" key={index}>
          <img src={item.imageUrl} alt={item.title} width="100%" />
          {item.title && <h4>{item.title}</h4>}
          {item.link && (
            <Link to={item.link} className="item-link">
              See More
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Fours;
