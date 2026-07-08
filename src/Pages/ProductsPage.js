import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Components/Nav';
import { AFROLOOM_PRODUCTS } from '../Data/productsSuite';

const ProductsPage = () => (
  <div className="bg-white min-h-screen">
    <Nav noSubNav />

    <section className="border-b border-gray-100 bg-gradient-to-b from-amber-50/40 to-white">
      <div className="container mx-auto px-4 py-14 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-3">
          Afroloom products
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 max-w-3xl">
          Explore our product suite
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed mb-0">
          Afroloom builds everyday products for real people — from fashion and
          customization to professional guidance. Browse our current offerings
          below; more products are on the way.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-14 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {AFROLOOM_PRODUCTS.map((product) => (
          <article
            key={product.name}
            className={`rounded-2xl border p-8 lg:p-10 bg-white ${product.accent}`}
          >
            <div className="flex items-start gap-4 mb-6">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${product.iconBg} text-white text-xl font-bold`}
              >
                {product.icon}
              </span>
              <div>
                <span
                  className={`inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-2 ${product.badge}`}
                >
                  {product.tag}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">
                  {product.name}
                </h2>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {product.title}
            </h3>
            <p className="text-gray-600 mb-5 leading-relaxed">
              {product.description}
            </p>
            <ul className="mb-6 space-y-2 list-none p-0">
              {product.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <i
                    className={`pi pi-check-circle mt-0.5 shrink-0 ${
                      product.tagColor === 'blue'
                        ? 'text-blue-500'
                        : 'text-amber-500'
                    }`}
                  ></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                to={product.href}
                className={`inline-block font-semibold px-5 py-2.5 rounded-lg no-underline text-white transition ${
                  product.tagColor === 'blue'
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                {product.cta}
              </Link>
              <Link
                to={product.ctaSecondaryHref}
                className="inline-block border border-gray-300 text-gray-800 font-semibold px-5 py-2.5 rounded-lg no-underline hover:bg-gray-50 transition"
              >
                {product.ctaSecondary}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* <div className="mt-12 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Coming soon
        </p>
        <p className="text-gray-600 max-w-xl mx-auto mb-0">
          Afroloom is actively building new products for everyday life. Check back
          here as our suite grows.
        </p>
      </div> */}
    </section>
  </div>
);

export default ProductsPage;
