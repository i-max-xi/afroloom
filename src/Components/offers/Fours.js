import React from "react";
import "../../Styles/Offers.css";
import { Link } from "react-router-dom";

const Fours = ({ items, headTitle, linkTo }) => {
  return (
    <div className="four-in-a-card-container"style={{ maxHeight: "92%" }}>
      <h3 className="headTitle">{headTitle}</h3>
      <div>
        {items.length > 0 ? (
          <div className="four-in-a-card">
            {items.map((item, index) => (
              <div className="item" key={index}>
                <Link to={`/product/${item.id}`}>
                  <img src={item.imageUrl} alt={item.title} width="80%" />
                </Link>
                {item.title && <h4>{item.title}</h4>}
              </div>
            ))}
          </div>
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
