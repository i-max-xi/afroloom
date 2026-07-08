import React from 'react';
import { Link } from 'react-router-dom';
import SocialMedia from './SocialMedia';
import Header2 from './Header2';
import { FooterContact } from './FooterContact';
import contactInfo from '../Data/contactList';
import { isMobile } from '../utils/constants';
const Logo = '/assets/AFRO LOGO 4_footer.webp';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black text-center text-white footer">
      <Header2 color="black" bgColor="orange" />

      <div>
        {/* special contact  */}
        <div className="container p-2 pb-0">
          <div className="flex justify-content-between policy-header">
            {contactInfo().map((contact) => (
              <FooterContact
                key={contact.id}
                infoDetail={contact.detail}
                infoDetail2={contact.detail2}
                infoImage={contact.img}
                infoTitle={contact.title}
              />
            ))}
          </div>

          <hr />
        </div>

        <div className="col-12 mb-4 d-flex flex-column justify-content-center footer-about">
          <h5 className="footer-header">About Us</h5>
          <p
            className=" mx-auto w-75"
            style={{ textAlign: isMobile ? 'justify' : 'center' }}
            // style={{textAlign: "justify"}}
          >
            Afroloom is a growing company with a suite of everyday products.
            Explore Loomstore for custom and ready-to-wear Afrocentric fashion,
            and Kwikhelp for verified professional guidance. Quality, trust, and
            clear experiences across every product we build.
          </p>
        </div>

        <section className="footer-space">
          <div className="container  mt-5">
            <div className="row d-flex justify-content-between">
              <div className="col-3 mb-4 footer-item" id="footer-social-media">
                <Link to="/" className="navbar-brand">
                  <h3>
                    {' '}
                    <img
                      height="auto"
                      width="auto"
                      src={Logo}
                      alt="africa-logo"
                      className="logo w-100"
                    />
                  </h3>
                </Link>
                <h5 className="mx-3">Follow Us</h5>
                <SocialMedia />
              </div>

              <div className="col-10 col-sm-4 mb-4 footer-item">
                <h5 className="footer-header">Useful Links</h5>
                <div className="d-flex justify-content-between">
                  <div>
                    <p>
                      <Link to="/products" className="text-reset">
                        Products
                      </Link>
                    </p>
                    <p>
                      <Link to="/tnc" className="text-reset">
                        Terms and Conditions
                      </Link>
                    </p>
                    <p>
                      <Link to="/shippingPolicy" className="text-reset">
                        Shipping Policy
                      </Link>
                    </p>
                    <p>
                      <Link to="/contact" className="text-reset">
                        Contact Us
                        <br />
                      </Link>
                    </p>

                    <p>
                      <Link to="/admin-signin" className="text-reset">
                        Admin
                        <br />
                      </Link>
                    </p>
                  </div>
                  <div>
                    <p>
                      <Link to="/products/loomstore" className="text-reset">
                        Loomstore
                      </Link>
                    </p>
                    <p>
                      <Link to="/products/kwikhelp" className="text-reset">
                        Kwikhelp
                      </Link>
                    </p>
                    <p>
                      <Link to="/privacyPolicy" className="text-reset">
                        Privacy Policy
                      </Link>
                    </p>
                    <p>
                      <Link to="/returnPolicy" className="text-reset">
                        Return Policy
                      </Link>
                    </p>
                    <p>
                      <Link to="/about" className="text-reset">
                        About Us
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center p-3 bg-dark">
        &copy; {currentYear} AfroLoom
      </div>
    </div>
  );
};

export default Footer;
