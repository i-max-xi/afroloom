import React from 'react';
import { Link } from 'react-router-dom';
import LayoutHeaders from '../../Components/LayoutHeaders';

const Top = '/assets/Headers/aboutus.jpg';

const LoomstoreAbout = () => (
  <>
    <LayoutHeaders selectedBg={Top} />
    <div className="page-container">
      <p>Welcome to Loomstore — where style meets craftsmanship.</p>
      <p>
        At Loomstore, we believe every individual is unique and deserves to
        express themselves through their clothing and accessories. That&apos;s
        why we offer a one-of-a-kind experience to customize pieces and have
        them expertly sewn to perfection.
      </p>
      <p>
        Whether you&apos;re looking to make a bold statement with a vibrant
        print or keep it classic with a timeless design, Loomstore has you
        covered. Our team of skilled artisans will bring your vision to life,
        creating pieces that are not only stylish but also made with the highest
        quality materials.
      </p>
      <p>
        So why settle for off-the-rack when you can have a custom-made
        masterpiece? Design your look, shop ready-to-wear Afrocentric fashion,
        and wear your style your way.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          to="/order-to-sew"
          className="inline-block rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-yellow-600"
        >
          Order to get it sewed
        </Link>
        <Link
          to="/shop"
          className="inline-block rounded-lg border border-yellow-500 px-4 py-2 text-sm font-semibold text-black no-underline hover:bg-yellow-50"
        >
          Ready to wear
        </Link>
      </div>
    </div>
  </>
);

export default LoomstoreAbout;
