import React from "react";
import "../../Styles/Offers.css";
import { Link } from "react-router-dom";
import { isMobile } from "../../utils/constants";

const Fours = ({ items, headTitle, linkTo }) => {
  return (
    <div className="four-in-a-card-container">
      <h3 className="headTitle">
        {headTitle}
      </h3>
      <div>
        {items.length > 0 ? (
          <>
            <div style={{ flex: 5 }} className="four-in-a-card">
              {items.map((item, index) => (
                <div
                  style={{
                    height: isMobile ? "10rem" : "10rem",
                    overflow: "hidden",
                  }}
                  className="item"
                  key={index}
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: 'scale-down',
                      }}
                    />
                  </Link>
                  {item.title && <h4>{item.title}</h4>}
                </div>
              ))}
            </div>
            <Link to={linkTo} className="fours-link">
              Shop Now
            </Link>
          </>
        ) : (
          <p>Currently Out Of Stock</p>
        )}
      </div>
    </div>
  );
};

export default Fours;
