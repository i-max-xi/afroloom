import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Components/Nav';
import { Card } from 'primereact/card'; // Import the Card component from PrimeReact

const HomePage = () => {
  const image1 = require('../Assets/hero/3d-casual-life-black-girl-holding-box-and-bags.png');

  const randomImage1 = require('../Assets/femlae.png');
  const randomImage2 = require('../Assets/male.png');

  return (
    <div>
      <Nav />
      <section className="hero-section">
        <img height="auto" width="auto" src={image1} alt="hero" />

        <div className="hero-bottom">
          <h3>Hi There!</h3>
          <p>Looking to personalize your fashion sense?</p>
          <p>Afroloom has you covered.</p>
        </div>
      </section>

      <section className="down-section">
        <Link to="/order-to-sew">
          <button className="btn btn-warning text-white">
            Create Your Own Fashion Wear
          </button>
        </Link>
      </section>
      {/* Review section */}
      <section className="review">
        <div className="container mt-5">
          <h3 className="text-center mb-3">Customer Reviews</h3>
          <div className="row">
            <div className="col-md-6 mb-4">
              <Card style={{ width: '100%' }}>
                <p>
                  "I absolutely love the custom African dress I bought from
                  Afroloom. The quality is amazing and I get compliments every
                  time I wear it!"
                </p>

                <div className="d-flex align-items-center">
                  <img
                    src={randomImage1}
                    alt="Naa Ayeley Aryee"
                    className="rounded-circle me-3"
                    style={{ width: 50, height: 50 }}
                    height="auto"
                    width="auto"
                  />
                  <div>
                    <strong>Naa Ayeley Aryee</strong>
                    <p>Customer</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Second Review */}
            <div className="col-md-6 mb-4">
              <Card style={{ width: '100%' }}>
                {/* Review text */}
                <p>
                  "As a designer, I appreciate the ability to customize my own
                  unique African accessories. Afroloom has become my go-to for
                  all things African-inspired."
                </p>

                {/* Image, name, and position */}
                <div className="d-flex align-items-center">
                  <img
                    src={randomImage2}
                    alt="Abeiku Egypt"
                    className="rounded-circle me-3"
                    style={{ width: 50, height: 50 }}
                    height="auto"
                    width="auto"
                  />
                  <div>
                    <strong>Abeiku Egyir</strong>
                    <p>Designer</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
