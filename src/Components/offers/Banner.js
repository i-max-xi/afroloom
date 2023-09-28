import React from "react";
import "../../Styles/Offers.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";

const Banner = ({ items, headTitle, seeMore }) => {
  return (
    <div className="clickable-banner-container">
      <h3 className="headTitle">
        {headTitle}{" "}
        {seeMore ? <span className="more-deals"> - {seeMore}</span> : ""}
      </h3>
      <div className="clickable-banner">
        {items.map((item, index) => (
          <Link to={item.link} className="clickable-item" key={index}>
            {item.videoUrl ? (
              <video
                src={item.videoUrl}
                alt={item.title}
                className="item-video"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="item-image"
              />
            )}
            {item.discount ? (
              <span className="discount">{item.discount}% off </span>
            ) : (
              ""
            )}
            <h4 className="item-title">{item.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Banner;
