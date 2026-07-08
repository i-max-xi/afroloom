import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Components/Nav';

const DOCS = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary: 'How Kwikhelp collects, uses, and protects your information.',
  },
  {
    slug: 'user-agreement',
    title: 'User Agreement',
    summary: 'Terms that govern use of the Kwikhelp marketplace.',
  },
];

const KwikhelpLegalCenter = () => (
  <div className="min-h-screen bg-[#f5f7fa] text-[#1a1a2e]">
    <Nav />
    <main className="mx-auto max-w-4xl px-4 py-14 md:px-8 md:py-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-500">
        Legal
      </p>
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">Legal policies</h1>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-600">
        Transparent policies for clients and professionals on Kwikhelp.
      </p>

      <div className="grid gap-4">
        {DOCS.map((doc) => (
          <Link
            key={doc.slug}
            to={`/products/kwikhelp/legal-policies/${doc.slug}`}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm no-underline transition hover:border-blue-200"
          >
            <h2 className="mb-2 text-lg font-semibold text-[#1a1a2e]">
              {doc.title}
            </h2>
            <p className="mb-0 text-sm text-gray-600">{doc.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  </div>
);

export default KwikhelpLegalCenter;
