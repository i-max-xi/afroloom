import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';
import CurrencyConverter from './CurrencyConverter';
import GoogleTranslate from '../GoogleTranslate';
import { useSelector } from 'react-redux';
import { Badge } from 'primereact/badge';
import { useLocation } from 'react-router-dom';
import { getActiveProduct } from '../utils/productRoutes';

const MobileNav = ({ visible, setVisible }) => {
  const cartItems = useSelector((state) => state.customizedProduct.itemDetails);
  const shopCartItem = useSelector((state) => state.shopCart);
  const location = useLocation();
  const activeProduct = getActiveProduct(location.pathname);
  const cartCount = (cartItems?.length || 0) + (shopCartItem?.length || 0);

  return (
    <Sidebar visible={visible} onHide={() => setVisible(false)} className=" ">
      <div className="custom-header bg-warning text-white p-3 mb-4">
        <h2>Browse Afroloom</h2>
      </div>
      {activeProduct === 'loomstore' && (
        <div className="d-flex justify-content-between">
          <CurrencyConverter />
        </div>
      )}
      <div className="d-flex flex-column align-items-start mt-3">
        <ul className="navbar-nav mobile-nav-item-container">
          <li className="nav-item mobile-nav-item">
            <i className="pi pi-home"></i>
            <Link className="nav-link" to="/" onClick={() => setVisible(false)}>
              Home
            </Link>
          </li>
          <Divider className="custom-divider" />

          <li className="nav-item mobile-nav-item">
            <i className="pi pi-th-large"></i>
            <Link
              className="nav-link"
              to="/products"
              onClick={() => setVisible(false)}
            >
              Products
            </Link>
          </li>
          <Divider className="custom-divider" />

          <li className="nav-item mobile-nav-item">
            <i className="pi pi-shopping-bag"></i>
            <Link
              className="nav-link"
              to="/products/loomstore"
              onClick={() => setVisible(false)}
            >
              <span className="text-[#FFC107]">Loomstore</span>
            </Link>
          </li>
          <Divider className="custom-divider" />

          <li className="nav-item mobile-nav-item">
            <i className="pi pi-comments"></i>
            <Link
              className="nav-link"
              to="/products/kwikhelp"
              onClick={() => setVisible(false)}
            >
              Kwikhelp
            </Link>
          </li>
          <Divider className="custom-divider" />

          {activeProduct === 'loomstore' && (
            <>
              <li className="nav-item mobile-nav-item">
                <i className="pi pi-palette"></i>
                <Link
                  className="nav-link"
                  to="/order-to-sew"
                  onClick={() => setVisible(false)}
                >
                  Customize
                </Link>
              </li>
              <Divider className="custom-divider" />

              <li className="nav-item mobile-nav-item">
                <i className="pi pi-shopping-cart p-overlay-badge">
                  <Badge
                    severity="warning"
                    style={{ scale: '0.5' }}
                    value={cartCount}
                  ></Badge>
                </i>
                <Link
                  className="nav-link"
                  to="/customize-checkout"
                  onClick={() => setVisible(false)}
                >
                  Checkout
                </Link>
              </li>
              <Divider className="custom-divider" />

              <li className="nav-item adjust-nav">
                <i className="pi pi-money-bill"></i>
                <Link
                  className="about"
                  to="/signup"
                  onClick={() => setVisible(false)}
                >
                  Become a Partner
                </Link>
              </li>
              <Divider className="custom-divider" />
            </>
          )}

          <li className="nav-item adjust-nav mobile-nav-item">
            <i className="pi pi-info-circle"></i>
            <Link
              className="about"
              to="/about"
              onClick={() => setVisible(false)}
            >
              About
            </Link>
          </li>
          <Divider className="custom-divider" />

          <li className="nav-item adjust-nav mobile-nav-item">
            <i className="pi pi-phone"></i>
            <Link
              className="about"
              to="/contact"
              onClick={() => setVisible(false)}
            >
              Contact Us
            </Link>
          </li>
          <Divider className="custom-divider" />
        </ul>
      </div>

      <GoogleTranslate />
    </Sidebar>
  );
};

export default MobileNav;
