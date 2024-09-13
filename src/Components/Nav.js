import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/AFRO LOGO 4.jpg";
import GoogleTranslate from "../GoogleTranslate";
import CurrencyConverter from "./CurrencyConverter";
import "primeicons/primeicons.css";
import MobileNav from "./MobileNav";
import { isMobile } from "../utils/constants";
import { Avatar } from "primereact/avatar";
import { useSelector } from "react-redux";
import { Badge } from "primereact/badge";

const Nav = ({ noCurrency }) => {
  const [visible, setVisible] = useState(false);
  const cartItems = useSelector((state) => state.customizedProduct.itemDetails);

  const signedin = useSelector((state) => state.user.signedIn);
  const dashboardPath = useSelector((state) => state.user.dashboardPath);

  return (
    <nav className="navbar navbar-expand-lg text-black d-flex px-3 bg-white border-bottom">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex gap-2 justify-items-center align-items-center">
          <i
            className="pi pi-align-justify p-overlay-badge mb-3"
            id="mobileNavToggler"
            style={{ fontSize: "2rem" }}
            onClick={() => setVisible(true)}
          >
            {cartItems.length > 0 && (
              <Badge
                severity="warning"
                style={{ scale: "0.5" }}
                value={cartItems.length}
              ></Badge>
            )}
          </i>

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

        <div className="d-flex align-items-center justify-content-center gap-2">
          {!signedin ? (
            <button className="btn btn-outline-warning ">
              <Link to="/signin" className="text-decoration-none text-reset">
                Login & Cash Out
              </Link>
            </button>
          ) : (
            <>
              <Link to={dashboardPath}>
                <Avatar
                  icon="pi pi-user"
                  className="mx-1 bg-secondary text-white "
                  size="large"
                  shape="circle"
                />
              </Link>
            </>
          )}
        </div>
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

          <li className="nav-item adjust-nav">
            <Link className="about" to="/signup">
              Become a Partner
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
