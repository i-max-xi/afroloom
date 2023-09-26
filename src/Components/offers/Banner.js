import React from 'react';
import '../../Styles/Offers.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const Banner = ({items}) => {
  

  return (
    <div className="clickable-banner">
      {items.map((item, index) => (
        <Link to={item.link} className="clickable-item" key={index}>
          {item.videoUrl ? (
            <video src={item.videoUrl} alt={item.title} className="item-video" autoPlay loop muted />
          ) : (
            <img src={item.imageUrl} alt={item.title} className="item-image" />
          )}
          <h4 className="item-title">{item.title}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Banner;
