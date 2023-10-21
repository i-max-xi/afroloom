import React from "react";
import { Link } from "react-router-dom";

const OfferItem = ({ title, imageUrl, linkTo, videoUrl, itemID }) => {
  return (
    <div className="offer-card">
      <h3 className="headTitle">{title}</h3>
      {videoUrl ? (
        <video
          src={videoUrl}
          alt={title}
          className="item-video"
          autoPlay
          loop
          muted
        />
      ) : itemID !== undefined ? (
        <Link to={`/product/${itemID}`}>
          <img src={imageUrl} alt={title} width="100%" />
        </Link>
      ) : (
        <img src={imageUrl} alt={title} width="100%" />
      )}
      <Link to={linkTo} className="offer-link">
        {videoUrl ? "Customize" : "See More"}
      </Link>
    </div>
  );
};

export default OfferItem;
