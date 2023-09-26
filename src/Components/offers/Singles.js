import React from "react";
import { Link } from "react-router-dom";

const OfferItem = ({ title, imageUrl, linkTo, videoUrl }) => {
  return (
    <div className="offer-card">
      <h3>{title}</h3>
      {videoUrl ? (
        <video
          src={videoUrl}
          alt={title}
          className="item-video"
          autoPlay
          loop
          muted
        />
      ) : (
        <img src={imageUrl} alt={title} />
      )}
      <Link to={linkTo} className="offer-link">
        See More
      </Link>
    </div>
  );
};

export default OfferItem;

