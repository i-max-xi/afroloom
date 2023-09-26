import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Offers.css';

const Singles = ({ title, imageUrl, linkTo }) => {
  return (
    <div className="offer-card">
      <h3>{title}</h3>
      <img src={imageUrl} alt={title} width='100%'/>
      <Link to={linkTo} className="offer-link">
        See More
      </Link>
    </div>
  );
};

export default Singles;
