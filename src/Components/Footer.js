import React from "react";
// import footerBG from "../Assets/Afrk.jpg";
import { Link } from "react-router-dom";
// import Logo from "../Assets/logo_removed_bg.png";
import Logo from "../Assets/AFRO LOGO 4_footer.jpg";
import SocialMedia from "./SocialMedia";
import Header2 from "./Header2";
import { FooterContact } from "./FooterContact";
import contactInfo from "../Data/contactList";

const Footer = () => {
  return (
    <div className="bg-black text-center text-white footer">
      <Header2 color="black" bgColor="orange" />

      <div
      // style={{
      //   backgroundImage: `url(${footerBG})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   opacity: "0.8",
      // }}
      >
        {/* special contact  */}
        <div className="container p-4 pb-0">
          <div className="d-flex justify-content-around">
            {contactInfo.map((contact) => (
              <FooterContact
                key={contact.id}
                infoDetail={contact.detail}
                infoImage={contact.img}
                infoTitle={contact.title}
              />
            ))}
          </div>

          <hr />
        </div>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-3 mx-auto mb-4">
                <Link to="/" className="navbar-brand">
                  <h3>
                    {" "}
                    <img src={Logo} alt="africa-logo" className="logo w-75" />
                  </h3>
                </Link>
                <h5 className="mx-3">Follow Us</h5>
                <SocialMedia />
              </div>

              <div className="col-6 mx-auto mb-4">
                <h5 className="mb-4 footer-header">About Us</h5>
                <p>
                  We specialize in providing a wide range of African products
                  through our e-commerce platform, offering customers the option
                  to customize their shopping experience and explore the rich
                  cultural heritage of Africa.
                </p>
              </div>

              <div className="col-3 mx-auto mb-4">
                <h5 className="mb-4 footer-header">Useful Links</h5>
                <div className="d-flex justify-content-between">
                  <div>
                    <p>
                      <Link to="/artisancomingsoon" className="text-reset">
                        Become an Artisan
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
                      <Link to="/about" className="text-reset">
                        About Us
                      </Link>
                    </p>
                  </div>
                  <div>
                    <p>
                      <Link to="/category-page" className="text-reset">
                        All Categories
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
                      <Link to="/contact" className="text-reset">
                        Contact Us
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
        © 2023 Copyright: Shop in Africa
      </div>
    </div>
  );
};

export default Footer;
