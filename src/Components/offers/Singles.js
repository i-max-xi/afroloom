import React from "react";
import { Link } from "react-router-dom";

const OfferItem = ({ title, imageUrl, linkTo, videoUrl, itemID, action }) => {
  return (
    <div className="offer-card ">
      <h3 className="headTitle">{title}</h3>
      {videoUrl ? (
        <div>
          <video
            src={videoUrl}
            alt={title}
            className="item-video"
            autoPlay
            playsInline
            loop
            muted
          />
        </div>
      ) : itemID !== undefined ? (
        <Link
          to={`/product/${itemID}`}
          className="d-flex justify-content-center"
        >
          <img
            src={imageUrl}
            alt={title}
            width="100%"
            height="250rem"
            style={{ objectFit: 'cover',  }}
          />
        </Link>
      ) : (
        <Link to={linkTo} className="d-flex justify-content-center">
          <img src={imageUrl} alt={title} width="92%" />
        </Link>
      )}
      <Link to={linkTo} className="offer-link">
        {action ? action : videoUrl ? "Customize" : "See More"}
      </Link>
    </div>
  );
};

export default OfferItem;
