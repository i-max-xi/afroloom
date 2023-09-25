import React from 'react';
import '../../Styles/Offers.css';
import { Link } from 'react-router-dom'; // Import React Router's Link
import FourInACard from './FourInACard';

const FourInARow = () => {
  return (
    <div className="offer-container">
      <div className="offer-card">
        <h3>Top Clothing</h3>
        <FourInACard />
        <Link to="/top-clothing" className="offer-link">
          See More
        </Link>
      </div>

      <div className="offer-card">
        <h3>Clothing under $20</h3>
        <img src="url_to_image2" alt="Offer 2" />
        <Link to="/clothing-under-20" className="offer-link">
          See More
        </Link>
      </div>

      <div className="offer-card">
        <h3>Another Offer</h3>
        <img src="url_to_image3" alt="Offer 3" />
        <Link to="/another-offer" className="offer-link">
          See More
        </Link>
      </div>

      <div className="offer-card">
        <h3>Yet Another Offer</h3>
        <img src="url_to_image4" alt="Offer 4" />
        <Link to="/yet-another-offer" className="offer-link">
          See More
        </Link>
      </div>
    </div>
  );
};

export default FourInARow;
