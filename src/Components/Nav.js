import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/AFRO LOGO 4.jpg";
import GoogleTranslate from "../GoogleTranslate";
import CurrencyConverter from "./CurrencyConverter";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";

const Nav = ({ noCurrency }) => {
  const [visible, setVisible] = useState(false);
  const cartItems = useSelector((state) => state.customizedProduct.itemDetails);
  const signedin = useSelector((state) => state.user.signedIn);
  const dashboardPath = useSelector((state) => state.user.dashboardPath);

  return (
    <nav className="w-full border-b bg-white text-black px-4 py-2 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Hamburger Icon */}
        <button
          className="lg:hidden relative"
          onClick={() => setVisible(true)}
          aria-label="Toggle Navigation"
        >
          <i className="pi pi-align-justify text-2xl"></i>
          {cartItems.length > 0 && (
            <Badge
              className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs"
              value={cartItems.length}
            />
          )}
        </button>

        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Afro Logo" className="h-10 lg:h-14 w-auto" />
        </Link>
      </div>

      {/* Center Section: Nav Links */}
      <ul className="hidden lg:flex gap-6 items-center text-base font-normal justify-center mt-2">
        <li>
          <Link
            to="/"
            className="relative group text-black no-underline transition duration-300 ease-in-out hover:text-yellow-500"
          >
            Home
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/start-customize"
            className="relative group text-black no-underline transition duration-300 ease-in-out hover:text-yellow-500"
          >
            Customize
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="relative group text-black no-underline transition duration-300 ease-in-out hover:text-yellow-500"
          >
            About
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="relative group text-black no-underline transition duration-300 ease-in-out hover:text-yellow-500"
          >
            Contact Us
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="relative group text-black no-underline transition duration-300 ease-in-out hover:text-yellow-500"
          >
            Become a Partner
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        {!noCurrency && <CurrencyConverter />}
      </ul>


      {/* Right Section */}
      <div className="flex items-center gap-4">
        {!signedin ? (
          <Link
            to="/signin"
            className="text-sm font-medium bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 transition no-underline"
          >
            Login & Cash Out
          </Link>
        ) : (
          <Link to={dashboardPath}>
            <Avatar
              icon="pi pi-user"
              className="bg-secondary text-white text-xl"
              size="large"
              shape="circle"
            />
          </Link>
        )}

        {/* Google Translate */}
        <div className="hidden lg:block">
          <GoogleTranslate />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav visible={visible} setVisible={setVisible} />
    </nav>
  );
};

export default Nav;
