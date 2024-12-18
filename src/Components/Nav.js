import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/AFRO LOGO 4.jpg";
import GoogleTranslate from "../GoogleTranslate";
import CurrencyConverter from "./CurrencyConverter";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import {useLocation} from "react-router-dom"



const NavLink = ({ to, label, isActive }) => (
  <li className="p-overlay-badge">
    <Link
      to={to}
      className={`relative group text-black no-underline transition duration-300 ease-in-out hover:text-yellow-500 ${
        isActive ? "text-yellow-500" : ""
      }`}
    >
      {label}
      <span
        className={`absolute left-0 bottom-[-2px] ${
          isActive ? "w-full" : "w-0"
        } h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full`}
      ></span>
    </Link>
  </li>
);

const Nav = ({ noCurrency }) => {
  const [visible, setVisible] = useState(false);
  const cartItems = useSelector((state) => state.customizedProduct.itemDetails);
  const signedin = useSelector((state) => state.user.signedIn);
  const dashboardPath = useSelector((state) => state.user.dashboardPath);

  const location = useLocation(); // Get the current location

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/start-customize", label: "Customize" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact Us" },
    { to: "/customize-checkout", label: "Checkout", badge: cartItems.length },
    { to: "/signup", label: "Become a Partner" },
  ];


  return (
    <nav className="w-full border-b bg-white text-black px-4 py-2 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Hamburger Icon */}
        <button
          className="lg:hidden relative p-overlay-badge"
          onClick={() => setVisible(true)}
          aria-label="Toggle Navigation"
        >
          <i className="pi pi-align-justify text-2xl"></i>
          {cartItems.length > 0 && (
            <Badge
            severity="warning"
            style={{ scale: "0.8", translate: "0.3rem", color: "white" }}
            value={cartItems.length}
          ></Badge>
          )}
        </button>

        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Afro Logo" className="h-10 lg:h-14 w-auto" />
        </Link>
      </div>

      {/* Center Section: Nav Links */}
      <ul className="hidden lg:flex gap-6 items-center text-base font-normal justify-center mt-2">
        {navLinks.map(({ to, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            label={
              <>
                {label}
                {badge ? (
                  <Badge
                    severity="warning"
                    style={{
                      scale: "0.8",
                      translate: "0.3rem",
                      color: "white",
                    }}
                    value={badge}
                  />
                ) : null}
              </>
            }
            isActive={activePath === to}
          />
        ))}
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
