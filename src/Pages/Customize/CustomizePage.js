import React from "react";
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
  return (
    <>
      <Nav />
      <div className="container p-5">
        <h1 className="text-center mb-5">Design your own product</h1>
        <div className="row">
          {/* Male clothing */}
          <h5 className="mt-4 footer-header">Male Clothing</h5>
          {mainMaleCustomize.map(({ name, image }) => (
            <Link
              to={`/configurator/${name}`}
              className="col-3 m-3 mx-3"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img
                  className="card-img-top"
                  src={image}
                  alt={name}
                  width="250px"
                  height="250px"
                />
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
              className="col-3 m-3 mx-3"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img
                  className="card-img-top"
                  src={image}
                  alt={name}
                  width="250px"
                  height="250px"
                />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}

          {/* Male accessories */}
          <h5 className="mt-4 footer-header">Male Accessories</h5>
          {mainMaleAccessories.map(({ name, image }) => (
            <Link
              to={`/configurator-male-accessories/${name}`}
              className="col-3 m-3 mx-3"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img
                  className="card-img-top"
                  src={image}
                  alt={name}
                  width="250px"
                  height="250px"
                />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}

          {/* Female accessories */}
          <h5 className="mt-4 footer-header">Female Accessories</h5>
          {mainFemaleAccessories.map(({ name, image }) => (
            <Link
              // to={`/customize-female-accessories/${name}`}
              to={`/configurator-female-accessories/${name}`}
              className="col-3 m-3 mx-3"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img
                  className="card-img-top"
                  src={image}
                  alt={name}
                  width="250px"
                  height="250px"
                />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}

          {/* Unisex */}
          <h5 className="mt-4 footer-header">Unisex</h5>
          {mainUnisex.map(({ name, image }) => (
            <Link
              // to={`/customize-unisex/${name}`}
              to={`/configurator-unisex/${name}`}
              className="col-3 m-3 mx-3"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img
                  className="card-img-top"
                  src={image}
                  alt={name}
                  width="250px"
                  height="250px"
                />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}

          {/* Footwear */}
          <h5 className="mt-4 footer-header">Footwear</h5>
          {mainFootwear.map(({ name, image }) => (
            <Link
              // to={`/customize-footwear/${name}`}
              to={`/configurator-footwear/${name}`}
              className="col-3 m-3 mx-3"
              key={name}
            >
              <div className="card" data-aos="fade-in" data-aos-duration="1500">
                <img
                  className="card-img-top"
                  src={image}
                  alt={name}
                  width="250px"
                  height="250px"
                />
                <div className="card-body m-0 d-flex justify-content-center flex-column">
                  <h5 className="text-center">{name}</h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomizePage;
