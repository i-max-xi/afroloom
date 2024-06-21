import React from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import { Divider } from "primereact/divider";
import CurrencyConverter from "./CurrencyConverter";
import GoogleTranslate from "../GoogleTranslate";

const MobileNav = ({ visible, setVisible }) => {
  return (
    <Sidebar visible={visible} onHide={() => setVisible(false)} className=" ">
      <div className="custom-header bg-warning text-white p-3 mb-4">
        <h2>Browse Afroloom</h2>
      </div>
      <div className="d-flex justify-content-between">
        <CurrencyConverter />
      </div>
      <div className="d-flex flex-column align-items-start mt-3">
        <ul className="navbar-nav mobile-nav-item-container">
          <li className="nav-item mobile-nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <Divider className="custom-divider" />

          <li className="nav-item mobile-nav-item">
            <Link className="nav-link" to="/start-customize">
              Customize
            </Link>
          </li>
          <Divider className="custom-divider" />

          <li className="nav-item adjust-nav mobile-nav-item">
            <Link className="about" to="/about">
              About
            </Link>
          </li>
          <Divider className="custom-divider" />

          <li className="nav-item adjust-nav mobile-nav-item">
            <Link className="about" to="/contact">
              Contact Us
            </Link>
          </li>
          <Divider className="custom-divider" />

          <li className="nav-item adjust-nav">
            <Link className="about" to="/signup">
              Become a Partner
            </Link>
          </li>
          <Divider className="custom-divider" />
        </ul>
        {/* <Divider className="custom-divider" /> */}
      </div>

      <GoogleTranslate />
    </Sidebar>
  );
};

export default MobileNav;
