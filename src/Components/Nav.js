import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/AFRO LOGO 4.jpg";
import GoogleTranslate from "../GoogleTranslate";
import CurrencyConverter from "./CurrencyConverter";
import "primeicons/primeicons.css";
import MobileNav from "./MobileNav";
import { isMobile } from "../utils/constants";

const Nav = ({ noCurrency }) => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg text-black d-flex px-3 bg-white border-bottom">
      <div>
        <i
          className="pi pi-align-justify"
          id="mobileNavToggler"
          style={{ fontSize: "2rem" }}
          onClick={() => setVisible(true)}
        ></i>

        <MobileNav visible={visible} setVisible={setVisible} />
        <Link to="/" className="navbar-brand">
          <h3>
            <img
              height="auto"
              width="auto"
              src={Logo}
              alt="africa-logo"
              className="logo"
            />
          </h3>
        </Link>
      </div>

      {/* actual navs */}
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="bg-warning fw-bold nav-category"></li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item adjust-nav">
            <Link className="about" to="/start-customize">
              Customize
            </Link>
          </li>

          <li className="nav-item adjust-nav">
            <Link className="about" to="/about">
              About
            </Link>
          </li>

          <li className="nav-item adjust-nav">
            <Link className="about" to="/contact">
              Contact Us
            </Link>
          </li>

          {noCurrency ? null : <CurrencyConverter />}

          <div className="d-flex justify-content-around align-items-center"></div>
        </ul>
      </div>
      {isMobile ? null : <GoogleTranslate />}
    </nav>
  );
};

export default Nav;
