import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../Components/Nav';

const BODIES = {
  'privacy-policy': {
    title: 'Privacy Policy',
    body: [
      'Kwikhelp respects your privacy. We collect account details, session information, and payment-related data needed to operate the marketplace safely.',
      'We do not sell personal data. Information is shared only with providers required to run payments, verification, and communications — under clear contractual controls.',
      'For privacy questions, contact info@kwikhelp.help.',
    ],
  },
  'user-agreement': {
    title: 'User Agreement',
    body: [
      'By using Kwikhelp you agree to use the platform lawfully, respect other users, and follow verification and payment rules for your account type.',
      'Professionals are responsible for the accuracy of credentials they submit. Clients are responsible for attending booked sessions and following cancellation rules shown at booking.',
      'Afroloom may update these terms to reflect product changes; continued use means you accept the current agreement.',
    ],
  },
};

const KwikhelpLegalDoc = () => {
  const { slug } = useParams();
  const doc = BODIES[slug] || {
    title: 'Document not found',
    body: ['This legal document is not available yet.'],
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#1a1a2e]">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-14 md:px-8 md:py-16">
        <Link
          to="/products/kwikhelp/legal-policies"
          className="mb-6 inline-block text-sm font-semibold text-blue-600 no-underline hover:underline"
        >
          ← Legal policies
        </Link>
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">{doc.title}</h1>
        <div className="space-y-5 text-base leading-relaxed text-gray-600">
          {doc.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </main>
    </div>
  );
};

export default KwikhelpLegalDoc;
