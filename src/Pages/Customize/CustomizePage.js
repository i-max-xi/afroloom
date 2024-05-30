import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import { mainMaleCustomize } from "../../Data/CustomizeDataMale";
import { Link } from "react-router-dom";
import { mainFemaleCustomize } from "../../Data/CustomizeDataFemale";
import {
  mainFemaleAccessories,
  mainMaleAccessories,
} from "../../Data/CustomizeDataAccessories";
import { mainUnisex } from "../../Data/CustomizeDataUnisex";
import { mainFootwear } from "../../Data/CustomizeDataFootwear";

const CustomizePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <div className="container">
        <h1 className="text-center mt-3 mb-2">Design your own product</h1>
        <div className="row">
          {/* Nails */}
          <h5 className="mt-4 footer-header">Nails</h5>
          {mainUnisex.slice(0, 3).map(({ name, image, link }) => (
            <Link
              // to={`/customize-unisex/${name}`}
              to={link ? link : `/configurator-unisex/${name}`}
              className="col-6 col-md-3 customise-front text-decoration-none"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img className="card-img-top" src={image} alt={name} />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}
          {/* hair */}
          <h5 className="mt-4 footer-header">Hair</h5>
          {mainUnisex.slice(3, 8).map(({ name, image, link }) => (
            <Link
              // to={`/customize-unisex/${name}`}
              to={link ? link : `/configurator-unisex/${name}`}
              className="col-6 col-md-3 customise-front text-decoration-none"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img className="card-img-top" src={image} alt={name} />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}
          {/* Accessories */}
          <h5 className="mt-4 footer-header">Accessories</h5>
          {mainUnisex.slice(9, 14).map(({ name, image, link }) => (
            <Link
              // to={`/customize-unisex/${name}`}
              to={link ? link : `/configurator-unisex/${name}`}
              className="col-6 col-md-3 customise-front text-decoration-none"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img className="card-img-top" src={image} alt={name} />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}
          {/* Female clothing */}
          <h5 className="mt-4 footer-header">Female Clothing</h5>
          {mainFemaleCustomize.map(({ name, image }) => (
            <Link
              to={`/configurator-female/${name}`}
              className="col-6 col-md-3 customise-front text-decoration-none"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img className="card-img-top" src={image} alt={name} />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}

          {/* Male clothing */}
          <h5 className="mt-4 footer-header">Male Clothing</h5>
          {mainMaleCustomize.map(({ name, image }) => (
            <Link
              to={`/configurator/${name}`}
              className="col-6 col-md-3 customise-front text-decoration-none "
              key={name}
            >
              <div
                className="card contained-image-container"
                data-aos="fade-in"
                data-aos-duration="1500"
              >
                <img
                  className="card-img-top contained-image"
                  src={image}
                  alt={name}
                />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}

          {/* Male accessories */}
          {/* <h5 className="mt-4 footer-header">Male Accessories</h5>
          {mainMaleAccessories.map(({ name, image }) => (
            <Link
              to={`/configurator-male-accessories/${name}`}
              className="col-6 col-md-3 customise-front text-decoration-none"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img
                  className="card-img-top"
                  src={image}
                  alt={name}
                
                />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))} */}

          {/* Female accessories */}
          {/* <h5 className="mt-4 footer-header">Female Accessories</h5>
          {mainFemaleAccessories.map(({ name, image }) => (
            <Link
              to={`/configurator-female-accessories/${name}`}
              className="col-6 col-md-3 customise-front text-decoration-none"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img className="card-img-top" src={image} alt={name} />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))} */}

          {/* Footwear */}
          {/* <h5 className="mt-4 footer-header">Footwear</h5>
          {mainFootwear.map(({ name, image }) => (
            <Link
              // to={`/customize-footwear/${name}`}
              to={`/configurator-footwear/${name}`}
              className="col-6 col-md-3 customise-front text-decoration-none"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img
                  className="card-img-top"
                  src={image}
                  alt={name}
                 
                />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default CustomizePage;
