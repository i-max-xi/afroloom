import React from 'react';
import { Link } from 'react-router-dom';
import LayoutHeaders from '../Components/LayoutHeaders';

const Top = '/assets/Headers/aboutus.jpg';

const About = () => {
  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <div className="page-container">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
          About Afroloom
        </h2>
        <p>
          Afroloom is a company building everyday products for real people —
          starting with fashion and professional guidance, with more on the way.
        </p>
        <p>
          We focus on quality, trust, and clear experiences across every product
          in our suite, so you can create, shop, or get help with confidence.
        </p>

        <h3 className="mb-3 mt-8 text-xl font-semibold text-gray-900">
          Our products
        </h3>

        <div className="mb-6">
          <h4 className="mb-2 text-lg font-semibold text-amber-700">
            Loomstore
          </h4>
          <p>
            Loomstore is where style meets craftsmanship. Customize Afrocentric
            clothing and accessories with our 3D tools, order bespoke tailoring,
            or shop ready-to-wear pieces — from graduation sashes to full
            outfits — with flexible payments and skilled artisans behind every
            order.
          </p>
          <Link
            to="/products/loomstore"
            className="font-semibold text-amber-700 no-underline hover:underline"
          >
            Visit Loomstore →
          </Link>
        </div>

        <div className="mb-6">
          <h4 className="mb-2 text-lg font-semibold text-blue-600">Kwikhelp</h4>
          <p>
            Kwikhelp connects you with verified professionals for instant
            advice, private consultations, and live events — a trusted
            marketplace for guidance when you need it most.
          </p>
          <Link
            to="/products/kwikhelp"
            className="font-semibold text-blue-600 no-underline hover:underline"
          >
            Visit Kwikhelp →
          </Link>
        </div>

        <p className="mb-0">
          Explore the full{' '}
          <Link
            to="/products"
            className="font-semibold text-amber-700 no-underline hover:underline"
          >
            product suite
          </Link>{' '}
          or{' '}
          <Link
            to="/contact"
            className="font-semibold text-amber-700 no-underline hover:underline"
          >
            contact us
          </Link>{' '}
          if you have questions about Afroloom or any of our products.
        </p>
      </div>
    </>
  );
};

export default About;
