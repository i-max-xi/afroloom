import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '../../Components/Nav';

const features = [
  {
    title: 'Instant advice',
    description:
      'Connect with verified professionals in real time when you need guidance fast.',
    icon: 'pi-bolt',
  },
  {
    title: 'Scheduled sessions',
    description:
      'Book one-on-one sessions that fit your calendar and work at your pace.',
    icon: 'pi-calendar',
  },
  {
    title: 'Live events',
    description:
      'Join group sessions and webinars hosted by professionals in your field.',
    icon: 'pi-video',
  },
  {
    title: 'Secure payments',
    description:
      'Pay safely through supported providers with clear refund policies per professional.',
    icon: 'pi-lock',
  },
  {
    title: 'Trust & verification',
    description:
      'Professionals go through identity and credential checks before joining the marketplace.',
    icon: 'pi-verified',
  },
  {
    title: 'Two-sided marketplace',
    description:
      'Clients and independent professionals meet on one platform built for clarity and safety.',
    icon: 'pi-sitemap',
  },
];

const KwikhelpPage = () => (
  <div className="min-h-screen bg-[#f5f7fa] text-[#1a1a2e]">
    <Nav />

    <main>
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-white via-[#f5f9ff] to-[#e8f1fe]">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1 shadow-sm backdrop-blur">
                <img
                  src="/assets/kwikhelp-icon.png"
                  alt=""
                  className="h-5 w-5 rounded-md"
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                  Professional help, on your terms
                </span>
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Expert guidance when you need it most
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                Kwikhelp connects you with verified professionals for instant
                advice, private consultations, and live events — all in one
                trusted marketplace.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products/kwikhelp/help-support"
                  className="inline-flex items-center rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white no-underline shadow-sm shadow-blue-500/25 transition hover:bg-blue-600"
                >
                  Get support
                </Link>
                <Link
                  to="/products/kwikhelp/legal-policies"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-[#1a1a2e] no-underline transition hover:bg-gray-50"
                >
                  Privacy & policies
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-white/90 p-3 shadow-sm backdrop-blur">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                    <i className="pi pi-users text-sm" />
                  </div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-500">
                    For clients
                  </p>
                  <h2 className="mb-1 text-base font-semibold">
                    Browse, book, and join
                  </h2>
                  <p className="mb-0 text-sm leading-relaxed text-gray-600">
                    Explore categories and connect with the right professional.
                  </p>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-white/90 p-3 shadow-sm backdrop-blur">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                    <i className="pi pi-briefcase text-sm" />
                  </div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-500">
                    For professionals
                  </p>
                  <h2 className="mb-1 text-base font-semibold">
                    Grow your practice
                  </h2>
                  <p className="mb-0 text-sm leading-relaxed text-gray-600">
                    Offer sessions and events while we handle trust and payouts.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.08 }}
            >
              <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-blue-200/10 to-transparent blur-2xl" />
              <img
                src="/assets/kwikhelp-hero.svg"
                alt="Illustration of live advice, video sessions, and verified professionals on Kwikhelp"
                className="relative mx-auto w-full max-w-lg drop-shadow-sm"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Everything you need in one place
          </h2>
          <p className="mb-0 text-base leading-relaxed text-gray-600">
            Whether you need a quick answer or a longer engagement, Kwikhelp
            keeps the experience simple, secure, and transparent.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.04 * index }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                <i className={`pi ${feature.icon} text-lg`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="mb-0 text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-14">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 md:p-10">
            <h2 className="mb-3 text-2xl font-bold">Questions or need help?</h2>
            <p className="mb-6 max-w-2xl text-base leading-relaxed text-gray-600">
              Visit our support center for guides on sessions, events, payments,
              and safety — or email us directly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products/kwikhelp/help-support"
                className="inline-flex items-center rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-blue-600"
              >
                Visit support
              </Link>
              <a
                href="mailto:info@kwikhelp.help"
                className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-blue-600 no-underline transition hover:text-blue-700"
              >
                info@kwikhelp.help
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export default KwikhelpPage;
