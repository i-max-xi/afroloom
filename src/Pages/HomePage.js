import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";

const HomePage = () => {
  const image1 = require("../Assets/hero/3d-casual-life-black-girl-holding-box-and-bags.png");
  const image2 = require("../Assets/hero/3d-casual-life-joyful-young-woman-jumping-with-shopping-bags.png");

  return (
    <div>
      <Nav />
      <section className="hero-section">
        <img src={image1} alt="hero" />

        <div className="hero-bottom">
          <h3>Hi There</h3>
          <p>Looking to personalize your fashion sense?</p>
          <p>Afroloom has you covered</p>
        </div>
      </section>

      <section className="down-section">
        <Link to="/start-customize">
          <button className="btn btn-warning text-white">Get Started</button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
