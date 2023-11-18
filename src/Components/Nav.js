import React from "react";
import DropDowner from "./DropDowner";
import { Link } from "react-router-dom";
import Logo from "../Assets/AFRO LOGO 4.jpg";
import { Badge } from "primereact/badge";
import { categoryArr } from "../Data/categoryList";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
// import { setVisible } from "../Redux/store";
import GoogleTranslate from "../GoogleTranslate";
// import SearchBar from "./SearchBar";
import CurrencyConverter from "./CurrencyConverter";
import SearchBar2 from "./SearchBar2";
import "primeicons/primeicons.css";

const Nav = ({ handleToggleDropdown, Language, Currency }) => {
  const cartItems = useSelector((state) => state.cartItems);
  // const dispatch = useDispatch();

  const signedin = useSelector((state) => state.user.signedIn);
  const dashboardPath = useSelector((state) => state.user.dashboardPath);

  // const isVisible = useSelector((state) => state.search.visible);

  // const showHideSearch = () => {
  //   dispatch(setVisible(true));
  // };

  const hamburger = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-list"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );

  return (
    <nav className="navbar navbar-expand-lg text-black d-flex px-3 bg-white border-bottom">
      <div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand">
          <h3>
            <img src={Logo} alt="africa-logo" className="logo" />
          </h3>
        </Link>
      </div>

      {/* actual navs */}
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="bg-warning pb-1 fw-bold nav-category">
            <DropDowner
              key={uuid()}
              title=""
              alternative="Category"
              icon={hamburger}
              options={categoryArr}
              selectedColor="white"
            />
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customize">
              Create Your Own
            </Link>
          </li>
          <div className="vr"></div>

          <li className="nav-item" style={{ translate: "0 0.5rem" }}>
            <Link className="about" to="/supplier-signup">
              Sell
            </Link>
          </li>

          <div className="vr"></div>

          <li className="nav-item" style={{ translate: "0 0.5rem" }}>
            <Link className="about" to="/about">
              About
            </Link>
          </li>
          <div className="vr"></div>

          <li className="nav-item">
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
          </li>

          <CurrencyConverter />

          <SearchBar2 />
        </ul>
      </div>
      {signedin === false ? (
        <div className="d-flex">
          <GoogleTranslate />

          <button className="mx-2 btn btn-warning signup">
            <Link to="/registeras" className="text-reset text-decoration-none">
              Sign Up
            </Link>
          </button>

          <button className="btn btn-outline-warning bg-white signin">
            <Link to="/signin" className="text-decoration-none text-reset">
              Login
            </Link>
          </button>
        </div>
      ) : (
        <>
          <GoogleTranslate />
          <Link to={dashboardPath}>
            <Avatar
              icon="pi pi-user"
              className="mx-1 bg-secondary text-white"
              size="large"
              shape="circle"
            />
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
