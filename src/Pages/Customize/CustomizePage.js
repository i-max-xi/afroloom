import React, { useEffect } from 'react';
import Nav from '../../Components/Nav';
import { mainMaleCustomize } from '../../Data/CustomizeDataMale';
import { Link } from 'react-router-dom';
import { mainFemaleCustomize } from '../../Data/CustomizeDataFemale';
import {
  mainFemaleAccessories,
  mainMaleAccessories,
} from '../../Data/CustomizeDataAccessories';
import { mainUnisex, specialSash } from '../../Data/CustomizeDataUnisex';
import { mainFootwear } from '../../Data/CustomizeDataFootwear';
import ListItem from '../../Components/List/ListItem';
import { specialsCustomize } from '../../Data/specials';

const CustomizePage = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <>
      {/* <Nav /> */}
      <div className="container flex flex-col justify-center items-center">
        <h5 className="text-center text-sm lg:text-2xl mt-3 mb-2 capitalize font-normal text-gray-600">
          Choose any item below to kickstart your customization journey!
        </h5>
        <div className="row container my-10">
          {/* Nails */}
          {/* <h5 className="mt-4 footer-header">Nails</h5>
          {mainUnisex.slice(0, 3).map(({ name, image, link }) => (
            <Link
              // to={`/customize-unisex/${name}`}
              to={link ? link : `/configurator-unisex/${name}`}
              className="col-6 col-md-3text-decoration-none  "
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
          {/* hair */}
          {/* <h5 className="mt-4 footer-header">Wigs</h5>
          {mainUnisex.slice(3, 10).map(({ name, image, link }) => (
            <Link
              // to={`/customize-unisex/${name}`}
              to={link ? link : `/configurator-unisex/${name}`}
              className="col-6 col-md-3text-decoration-none  "
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
          {/* Accessories */}
          <div className="border-b  border-b-[#b6b6b6af]  flex-flex-col justify-center items-center gap-2">
            <h5 className="mt-4 footer-header text-sm text-center">
              Design Your Beaded Bracelets & Accessories
            </h5>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 items-center ">
              {mainUnisex
                .slice(13, 18)
                .map(({ name, image, link, description, title }) => (
                  <Link
                    to={link ? link : `/configurator-unisex/${name}`}
                    className="text-decoration-none"
                    key={name}
                    data-aos="fade-in"
                    data-aos-duration="1500"
                  >
                    <ListItem
                      image={image}
                      title={title || name}
                      extraDescription={description}
                    />
                  </Link>
                ))}

              {mainFemaleAccessories.map(
                ({ name, image, link, description, title }) => (
                  <Link
                    to={`/configurator-female-accessories/${name}`}
                    className="text-decoration-none   "
                    key={name}
                    data-aos="fade-in"
                    data-aos-duration="1500"
                  >
                    <ListItem
                      image={image}
                      title={title || name}
                      extraDescription={description}
                    />
                  </Link>
                ),
              )}
              {mainMaleAccessories.map(
                ({ name, image, link, description, title }) => (
                  <Link
                    to={`/configurator-male-accessories/${name}`}
                    className="text-decoration-none   "
                    key={name}
                    data-aos="fade-in"
                    data-aos-duration="1500"
                  >
                    <ListItem
                      image={image}
                      title={title || name}
                      extraDescription={description}
                    />
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Sash */}
          <div className="border-b  border-b-[#b6b6b6af]  flex-flex-col justify-center items-center gap-2 pb-4">
            <h5 className="mt-4 footer-header text-sm text-center">
              Customize Your Perfect Sash
            </h5>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 items-center ">
              {mainUnisex
                .slice(9, 13)
                .map(({ name, image, link, description, title }) => (
                  <Link
                    to={link ? link : `/configurator-unisex/${name}`}
                    className="text-decoration-none   "
                    key={name}
                    data-aos="fade-in"
                    data-aos-duration="1500"
                  >
                    <ListItem
                      image={image}
                      title={title || name}
                      extraDescription={description}
                    />
                  </Link>
                ))}
            </div>
          </div>

          {/* Sash Templates */}
          <div className="border-b  border-b-[#b6b6b6af]  flex-flex-col justify-center items-center gap-2">
            <h5 className="mt-4 footer-header text-sm text-center">
              Personalize Sash Templates
            </h5>
            <div className="flex items-center justify-center">
              {specialSash
                .slice(12, 13)
                .map(({ name, image, link, description, title }) => (
                  <Link
                    to={'sash-templates'}
                    className="text-decoration-none   "
                    key={name}
                    data-aos="fade-in"
                    data-aos-duration="1500"
                  >
                    <ListItem
                      image={image}
                      // title={title || name}
                      extraDescription={description}
                    />
                  </Link>
                ))}
            </div>
          </div>

          {/* specials */}
          <div className="border-b  border-b-[#b6b6b6af]  flex-flex-col justify-center items-center gap-2 pt-2">
            <h5 className="mt-4 footer-header text-sm text-center">
              Craft Your Logo Tees for Men & Women
            </h5>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 items-center ">
              {specialsCustomize.map(
                ({ name, image, link, description, title }) => (
                  <Link
                    to={link ? link : `/configurator-special/${name}`}
                    className="text-decoration-none   "
                    key={name}
                    data-aos="fade-in"
                    data-aos-duration="1500"
                  >
                    <ListItem
                      image={image}
                      title={title || name}
                      extraDescription={description}
                    />
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Female clothing */}

          <div className="border-b  border-b-[#b6b6b6af]  flex-flex-col justify-center items-center gap-2">
            <h5 className="mt-4 footer-header text-sm text-center">
              Tailor Stylish Women's Clothing
            </h5>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3   items-center">
              {mainFemaleCustomize.map(({ name, image, isVariant }) => (
                <Link
                  to={
                    isVariant
                      ? `/configurator-female-variant/${name}`
                      : `/configurator-female/${name}`
                  }
                  className="text-decoration-none  "
                  key={name}
                  data-aos="fade-in"
                  data-aos-duration="1500"
                >
                  <ListItem image={image} description={name} />
                </Link>
              ))}
            </div>
          </div>

          {/* Male clothing */}
          <div className="border-b  border-b-[#b6b6b6af]  flex-flex-col justify-center items-center gap-2">
            <h5 className="mt-4 footer-header text-sm text-center">
              Upgrade Men's Clothing Your Way
            </h5>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3   items-center">
              {mainMaleCustomize.map(({ name, image, isVariant }) => (
                <Link
                  to={
                    isVariant
                      ? `/configurator-male-variant/${name}`
                      : `/configurator/${name}`
                  }
                  className="text-decoration-none   "
                  key={name}
                  data-aos="fade-in"
                  data-aos-duration="1500"
                >
                  <ListItem image={image} description={name} />
                </Link>
              ))}
            </div>
          </div>

          {/* nails */}
          {/* <div className="border-b  border-b-[#b6b6b6af]  flex-flex-col justify-center items-center gap-2">
            <h5 className="mt-4 footer-header text-sm text-center">On Display Only
            <p className="text-xs ">These items are only on display currently and not for sale</p>

            </h5>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 items-center ">
              {mainUnisex
                .slice(0, 3)
                .map(({ name, image, link, description, title }) => (
                  <Link
                    to={link ? link : `/configurator-unisex/${name}`}
                    className="text-decoration-none   "
                    key={name}
                    data-aos="fade-in"
                    data-aos-duration="1500"
                  >
                    
                    <ListItem
                      image={image}
                      title={title || name}
                      extraDescription={description}
                    />
                  </Link>
                ))}
              </div>
          </div> */}

          {/* Male accessories */}

          {/* <div className="border-b  border-b-[#b6b6b6af]  flex-flex-col justify-center items-center gap-2">
            <h5 className="mt-4 footer-header text-sm text-center">Male Accessories</h5>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3   items-center">
              {mainMaleAccessories.map(({ name, image }) => (
              <Link
                to={`/configurator-male-accessories/${name}`}
                className="text-decoration-none   "
                key={name}
                data-aos="fade-in"
                data-aos-duration="1500"
              >
                <ListItem image={image} description={name} />
              </Link>
            ))}
            </div>
          </div> */}

          {/* Female accessories */}
          {/* <h5 className="mt-4 footer-header">Female Accessories</h5>
          {mainFemaleAccessories.map(({ name, image }) => (
            <Link
              to={`/configurator-female-accessories/${name}`}
              className="col-6 col-md-3text-decoration-none  "
              key={name}
            >
              <ListItem image={image} description={name} />
            </Link>
          ))} */}

          {/* Footwear */}
          {/* <h5 className="mt-4 footer-header">Footwear</h5>
          {mainFootwear.map(({ name, image }) => (
            <Link
              to={`/configurator-footwear/${name}`}
              className="col-6 col-md-3text-decoration-none  "
              key={name}
            >
              <ListItem image={image} description={name} />
            </Link>
          ))} */}

          {/* Footwear */}
          <div className="  flex-flex-col justify-center items-center gap-2">
            <h5 className="mt-4 footer-header text-sm text-center">
              Step Up with Custom Footwear
            </h5>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 items-center ">
              {mainFootwear.map(({ name, image, link, description, title }) => (
                <Link
                  to={`/configurator-footwear/${name}`}
                  className="text-decoration-none   "
                  key={name}
                  data-aos="fade-in"
                  data-aos-duration="1500"
                >
                  <ListItem
                    image={image}
                    title={title || name}
                    extraDescription={description}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizePage;
