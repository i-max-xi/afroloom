import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";
import CurrencyConverter from "./CurrencyConverter";
import { categoryArr, mobileCategoryArr } from "../Data/categoryList";
import Logo from "../Assets/AFRO LOGO 4.jpg";

const MobileNav = ({ visible, setVisible }) => {
  const cartItems = useSelector((state) => state.cartItems);
  const [showAllDepartments, setShowAllDepartments] = useState(false);

  const initialDepartmentsToShow = 6;
  const visibleDepartments = showAllDepartments
    ? mobileCategoryArr
    : mobileCategoryArr.slice(0, initialDepartmentsToShow);

  return (
    <Sidebar visible={visible} onHide={() => setVisible(false)} className=" ">
      <div className="custom-header bg-warning text-white p-3 mb-2"><h2>Browse Afroloom</h2></div>
      <div className="d-flex justify-content-between">
        <CurrencyConverter />

        {/* <li className="nav-item list-unstyled">
          <Link to="/checkout" className="nav-link" href="#cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart4 cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
            {cartItems.length !== 0 ? (
              <Badge
                value={cartItems.length}
                style={{ backgroundColor: "rgb(0, 153, 255)" }}
              />
            ) : (
              <span></span>
            )}
          </Link>
        </li> */}
      </div>
      <div className="d-flex flex-column align-items-start mt-3">
        <ul className="navbar-nav">
          {/* <li className="bg-warning fw-bold nav-category"></li> */}

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
            <Link className="nav-link" to="/professional/Tour Guide">
              Tour Guide
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/professional/Photographer">
              Photographer / VideoGrapher
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
          {visibleDepartments.map((option) => (
            <li className="nav-item">
              <Link
                to={option.link}
                className={`mb-2 nav-link cat-dropdown text-decoration-none text-${option.variant}`}
                key={option.name}
              >
                {option.name}
              </Link>
            </li>
          ))}
          {categoryArr.length > initialDepartmentsToShow && (
            <div
              className="text-warning"
              onClick={() => setShowAllDepartments(!showAllDepartments)}
            >
              {showAllDepartments ? "See Less" : "See More"}<i className={showAllDepartments ? "pi pi-angle-up": "pi pi-angle-down"} style={{ fontSize: '1rem', marginLeft: "0.5rem" }}></i>

            </div>
          )}
        </ul>

        <Divider className="custom-divider" />
      </div>
    </Sidebar>
  );
};

export default MobileNav;
