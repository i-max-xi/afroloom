import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GoogleTranslate from '../GoogleTranslate';
import CurrencyConverter from './CurrencyConverter';
import MobileNav from './MobileNav';
import ProductSubNav from './ProductSubNav';
import { useSelector } from 'react-redux';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { getActiveProduct } from '../utils/productRoutes';

const Logo = '/assets/AFRO LOGO 4.webp';

const NavLink = ({ to, label, isActive, highlight }) => (
  <li className="p-overlay-badge">
    <Link
      to={to}
      className={`relative group text-black no-underline transition duration-300 ease-in-out hover:text-yellow-500 ${
        isActive ? 'text-yellow-500' : ''
      }`}
    >
      <span className={highlight ? 'text-[#FFC107]' : undefined}>{label}</span>
      <span
        className={`absolute left-0 bottom-[-2px] ${
          isActive ? 'w-full' : 'w-0'
        } h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full`}
      ></span>
    </Link>
  </li>
);

const Nav = ({ noCurrency, noSubNav }) => {
  const [visible, setVisible] = useState(false);
  const cartItems = useSelector((state) => state.customizedProduct.itemDetails);
  const shopCartItem = useSelector((state) => state.shopCart);
  const signedin = useSelector((state) => state.user.signedIn);
  const dashboardPath = useSelector((state) => state.user.dashboardPath);

  const location = useLocation();
  const activePath = useMemo(() => location.pathname, [location.pathname]);
  const activeProduct = getActiveProduct(activePath);
  const cartCount = (cartItems?.length || 0) + (shopCartItem?.length || 0);
  const showCurrency = !noCurrency && activeProduct === 'loomstore';

  const companyLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/products', label: 'Products' },
    { to: '/products/loomstore', label: 'Loomstore', highlight: true },
    { to: '/products/kwikhelp', label: 'Kwikhelp' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const isCompanyLinkActive = (link) => {
    if (link.end) return activePath === link.to;
    if (link.to === '/products') {
      return activePath === '/products';
    }
    return activePath === link.to || activePath.startsWith(`${link.to}/`);
  };

  return (
    <>
      <nav className="w-full border-b bg-white text-black px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden relative p-overlay-badge"
            onClick={() => setVisible(true)}
            aria-label="Toggle Navigation"
          >
            <i className="pi pi-align-justify text-2xl"></i>
            {cartCount > 0 && (
              <Badge
                severity="warning"
                style={{ scale: '0.8', translate: '0.3rem', color: 'white' }}
                value={cartCount}
              ></Badge>
            )}
          </button>

          <Link to="/">
            <img src={Logo} alt="Afro Logo" className="h-10 lg:h-14 w-auto" />
          </Link>
        </div>

        <ul className="hidden lg:flex gap-6 items-center text-base font-normal justify-center mt-2">
          {companyLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              label={link.label}
              highlight={link.highlight}
              isActive={isCompanyLinkActive(link)}
            />
          ))}
          {showCurrency && <CurrencyConverter />}
        </ul>

        <div className="flex items-center gap-4">
          {activeProduct === 'loomstore' && (
            <div className="flex md:hidden">
              <li className="nav-item mobile-nav-item list-none">
                <Link className="nav-link" to="/customize-checkout">
                  <i className="pi pi-shopping-cart p-overlay-badge">
                    <Badge
                      severity="warning"
                      style={{ scale: '0.5' }}
                      value={cartCount}
                    ></Badge>
                  </i>
                </Link>
              </li>
            </div>
          )}
          {!signedin ? (
            <Link
              to="/signin"
              className="text-sm font-medium bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 transition no-underline"
            >
              Login
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

          <div className="hidden lg:block">
            <GoogleTranslate />
          </div>
        </div>

        <MobileNav visible={visible} setVisible={setVisible} />
      </nav>
      {!noSubNav && <ProductSubNav />}
    </>
  );
};

export default Nav;
