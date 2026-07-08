const LOOMSTORE_PATHS = [
  '/shop',
  '/order-to-sew',
  '/start-customize',
  '/customize-checkout',
  '/signup',
  '/products/loomstore',
];

export const isLoomstorePath = (pathname) => {
  if (LOOMSTORE_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return true;
  }
  if (pathname.startsWith('/product/') || pathname.startsWith('/category/')) {
    return true;
  }
  if (pathname.startsWith('/order-to-sew/') || pathname.startsWith('/start-customize/')) {
    return true;
  }
  if (pathname.startsWith('/configurator')) {
    return true;
  }
  return false;
};

export const isKwikhelpPath = (pathname) =>
  pathname === '/products/kwikhelp' || pathname.startsWith('/products/kwikhelp/');

export const getActiveProduct = (pathname) => {
  if (isKwikhelpPath(pathname)) return 'kwikhelp';
  if (isLoomstorePath(pathname)) return 'loomstore';
  return null;
};

export const LOOMSTORE_SUB_NAV = [
  { to: '/products/loomstore', label: 'Home', end: true },
  { to: '/shop', label: 'Ready Made' },
  { to: '/order-to-sew', label: 'Customize' },
  { to: '/customize-checkout', label: 'Checkout', showCartBadge: true },
  { to: '/signup', label: 'Become a Partner' },
  { to: '/products/loomstore/about', label: 'About' },
];

export const KWIKHELP_SUB_NAV = [
  { to: '/products/kwikhelp', label: 'Home', end: true },
  {
    to: '/products/kwikhelp/legal-policies/privacy-policy',
    label: 'Privacy Policy',
  },
  {
    to: '/products/kwikhelp/legal-policies/user-agreement',
    label: 'Terms',
  },
  { to: '/products/kwikhelp/help-support', label: 'Support' },
];
