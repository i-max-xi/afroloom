import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Components/Nav';

const KwikhelpHelpSupport = () => (
  <div className="min-h-screen bg-[#f5f7fa] text-[#1a1a2e]">
    <Nav />
    <main className="mx-auto max-w-4xl px-4 py-14 md:px-8 md:py-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-500">
        Kwikhelp Support
      </p>
      <h1 className="mb-6 text-3xl font-bold md:text-4xl">Help & support</h1>
      <div className="space-y-5 text-base leading-relaxed text-gray-600">
        <p>
          Need help with sessions, events, payments, or account safety? Our
          support center is here for clients and professionals using Kwikhelp.
        </p>
        <p>
          For the fastest response, email{' '}
          <a
            href="mailto:info@kwikhelp.help"
            className="font-semibold text-blue-600 no-underline hover:underline"
          >
            info@kwikhelp.help
          </a>
          . You can also review our legal policies for privacy, terms, and
          safety guidance.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/products/kwikhelp/legal-policies"
          className="inline-flex rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-blue-600"
        >
          Legal policies
        </Link>
        <Link
          to="/products/kwikhelp"
          className="inline-flex rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-[#1a1a2e] no-underline transition hover:bg-gray-50"
        >
          Back to Kwikhelp
        </Link>
      </div>
    </main>
  </div>
);

export default KwikhelpHelpSupport;
