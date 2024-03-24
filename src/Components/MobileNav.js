import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import { Divider } from "primereact/divider";
import CurrencyConverter from "./CurrencyConverter";

const MobileNav = ({ visible, setVisible }) => {
  const [showAllDepartments, setShowAllDepartments] = useState(false);


  return (
    <Sidebar visible={visible} onHide={() => setVisible(false)} className=" ">
      <div className="custom-header bg-warning text-white p-3 mb-4"><h2>Browse Afroloom</h2></div>
      <div className="d-flex justify-content-between">
        <CurrencyConverter />
      </div>
      <div className="d-flex flex-column align-items-start mt-3">
        <ul className="navbar-nav">

          <li className="nav-item">
            <Link to="/" className="navbar-brand">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/supplier-signup">
              Sell
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
        <Divider className="custom-divider" />

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/customize">
              Create Your Own
            </Link>
          </li>
        </ul>

        <Divider className="custom-divider" />

        <h5>Book Professionals</h5>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/professional/TourGuide">
              Tour Guide
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/professional/Photographer">
              Photographer / Videographer
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/professional/Model">
              Model
            </Link>
          </li>
        </ul>

        <Divider className="custom-divider" />
        <h5>Shopping Departments</h5>
        <ul className="navbar-nav">
          
        </ul>

        <Divider className="custom-divider" />
      </div>
    </Sidebar>
  );
};

export default MobileNav;
