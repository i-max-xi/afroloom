import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from 'primereact/badge';
import {
  LOOMSTORE_SUB_NAV,
  KWIKHELP_SUB_NAV,
  getActiveProduct,
} from '../utils/productRoutes';

const SubNavLink = ({ to, label, isActive, badge, href, external }) => {
  const className = `relative whitespace-nowrap px-3 py-2 text-sm font-medium no-underline transition-colors ${
    isActive
      ? 'text-amber-600 border-b-2 border-amber-500'
      : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
  }`;

  if (external && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {label}
      {badge ? (
        <Badge
          severity="warning"
          style={{ scale: '0.7', translate: '0.2rem', color: 'white' }}
          value={badge}
        />
      ) : null}
    </Link>
  );
};

const KwikhelpSubNavLink = ({ to, label, isActive, badge, href, external }) => {
  const className = `relative whitespace-nowrap px-3 py-2 text-sm font-medium no-underline transition-colors ${
    isActive
      ? 'text-blue-600 border-b-2 border-blue-500'
      : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
  }`;

  if (external && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {label}
      {badge ? (
        <Badge
          severity="info"
          style={{ scale: '0.7', translate: '0.2rem', color: 'white' }}
          value={badge}
        />
      ) : null}
    </Link>
  );
};

const ProductSubNav = () => {
  const location = useLocation();
  const product = getActiveProduct(location.pathname);
  const cartItems = useSelector((state) => state.customizedProduct.itemDetails);
  const shopCartItem = useSelector((state) => state.shopCart);
  const cartCount = (cartItems?.length || 0) + (shopCartItem?.length || 0);

  if (!product) return null;

  const isKwikhelp = product === 'kwikhelp';
  const links = isKwikhelp ? KWIKHELP_SUB_NAV : LOOMSTORE_SUB_NAV;
  const LinkComponent = isKwikhelp ? KwikhelpSubNavLink : SubNavLink;

  const isLinkActive = (link) => {
    if (link.end) return location.pathname === link.to;
    return (
      location.pathname === link.to ||
      (link.to !== '/' && location.pathname.startsWith(link.to))
    );
  };

  return (
    <div
      className={`w-full border-b ${
        isKwikhelp ? 'bg-blue-50/60 border-blue-100' : 'bg-amber-50/60 border-amber-100'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          <span
            className={`mr-2 shrink-0 text-xs font-semibold uppercase tracking-wide ${
              isKwikhelp ? 'text-blue-600' : 'text-amber-700'
            }`}
          >
            {isKwikhelp ? 'Kwikhelp' : 'Loomstore'}
          </span>
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <LinkComponent
                key={link.to || link.href}
                to={link.to}
                href={link.href}
                external={link.external}
                label={link.label}
                isActive={!link.external && isLinkActive(link)}
                badge={link.showCartBadge && cartCount > 0 ? cartCount : null}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSubNav;
