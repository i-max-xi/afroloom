import React from "react";
import "../../Styles/Offers.css";
import { Link } from "react-router-dom";

const Fours = ({ items, headTitle, linkTo }) => {
  return (
    <div className="four-in-a-card-container">
      <h3 className="headTitle">{headTitle}</h3>
      <div className="four-in-a-card">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="item" key={index}>
              <Link to={`/product/${item.id}`}>
                <img src={item.imageUrl} alt={item.title} width="100%" />
              </Link>
              {item.title && <h4>{item.title}</h4>}
            </div>
          ))
        ) : (
          <p>Currently Out Of Stock</p>
        )}
        <Link to={linkTo} className="fours-link">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Fours;
