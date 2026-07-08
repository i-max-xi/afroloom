import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '../Components/Nav';
import { AFROLOOM_PRODUCTS } from '../Data/productsSuite';

const values = [
  {
    title: 'Quality first',
    description:
      'Every product under Afroloom is built to clear standards — whether it’s a custom sash or a verified consultation.',
    icon: 'pi-verified',
  },
  {
    title: 'Built for people',
    description:
      'We design for real everyday needs: expressing yourself, getting guidance, and doing business with confidence.',
    icon: 'pi-heart',
  },
  {
    title: 'Transparent & trusted',
    description:
      'Clear policies, secure payments, and honest experiences across fashion and professional services.',
    icon: 'pi-shield',
  },
];

const CorporateHome = () => (
  <div className="min-h-screen bg-[#f5f7fa] text-[#1a1a2e]">
    <Nav noSubNav />

    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-white via-[#fffaf0] to-[#fff1d6]">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 left-8 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-white/80 px-3 py-1 shadow-sm backdrop-blur">
                <img
                  src="/assets/AFRO_LOGO_4_transparent.webp"
                  alt=""
                  className="h-5 w-auto"
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                  Afroloom
                </span>
              </div>
              <h1 className="mb-4 max-w-xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Everyday products for real people
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                Afroloom is a growing company building a suite of products —
                from Afrocentric fashion and customization to professional
                guidance. Explore what we offer today; more is on the way.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white no-underline shadow-sm shadow-amber-500/25 transition hover:bg-amber-600"
                >
                  Explore products
                </Link>
                <Link
                  to="/products/loomstore"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-[#1a1a2e] no-underline transition hover:bg-gray-50"
                >
                  Visit Loomstore
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.08 }}
            >
              <div className="absolute inset-8 rounded-[2rem] bg-gradient-to-br from-amber-400/20 via-blue-300/10 to-transparent blur-2xl" />
              <img
                src="/assets/afroloom-hero.svg"
                alt="Illustration of the Afroloom product suite including Loomstore and Kwikhelp"
                className="relative mx-auto w-full max-w-lg drop-shadow-sm"
              />
              <img
                src="/assets/hero/3d-casual-life-black-girl-holding-box-and-bags.png"
                alt=""
                className="pointer-events-none absolute -bottom-2 right-0 hidden w-36 drop-shadow-lg sm:block md:w-44 lg:right-2"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <div className="mb-10">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">Our products</h2>
          <p className="mb-0 max-w-2xl text-base text-gray-600">
            Each product under Afroloom has its own experience — built with the
            same focus on quality, trust, and clarity.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {AFROLOOM_PRODUCTS.map((product, index) => (
            <motion.article
              key={product.name}
              className={`rounded-2xl border bg-white p-8 shadow-sm ${product.accent}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 * index }}
            >
              <div className="mb-5 flex items-start gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white ${product.iconBg}`}
                >
                  {product.icon}
                </span>
                <div>
                  <span
                    className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${product.badge}`}
                  >
                    {product.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-[#1a1a2e]">
                    {product.name}
                  </h3>
                </div>
              </div>
              <p className="mb-2 text-lg font-semibold text-gray-800">
                {product.title}
              </p>
              <p className="mb-6 leading-relaxed text-gray-600">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={product.href}
                  className={`inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white no-underline transition ${
                    product.tagColor === 'blue'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-amber-500 hover:bg-amber-600'
                  }`}
                >
                  {product.cta}
                </Link>
                <Link
                  to={product.ctaSecondaryHref}
                  className="inline-flex rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#1a1a2e] no-underline transition hover:bg-gray-50"
                >
                  {product.ctaSecondary}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-600">
              Why Afroloom
            </p>
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              One company. Shared standards.
            </h2>
            <p className="mb-0 text-base leading-relaxed text-gray-600">
              Whether you use Loomstore, Kwikhelp, or what comes next, you get
              the same commitment to craft, clarity, and care.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                className="rounded-2xl border border-gray-200 bg-[#f5f7fa] p-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 * index }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <i className={`pi ${value.icon} text-lg`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="mb-0 text-sm leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-blue-50 p-8 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                Ready to explore Afroloom?
              </h2>
              <p className="mb-0 max-w-xl text-base leading-relaxed text-gray-600">
                Start with Loomstore for fashion and customization, or head to
                Kwikhelp for verified professional guidance. Questions about the
                company? We&apos;re happy to help.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/products"
                className="inline-flex items-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-amber-600"
              >
                View all products
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-[#1a1a2e] no-underline transition hover:bg-gray-50"
              >
                About Afroloom
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-amber-700 no-underline transition hover:text-amber-800"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export default CorporateHome;
