import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { specialSash } from '../../../Data/CustomizeDataUnisex';
import ListItem from '../../../Components/List/ListItem';
import Nav from '../../../Components/Nav';

const SashTemplatePage = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <>
      <Nav />
      <div className="container flex flex-col justify-center items-center">
        <h5 className="text-center text-sm lg:text-2xl mt-3 mb-2 capitalize font-normal text-gray-600">
          Choose any item below to kickstart your customization journey!
        </h5>
        <div className="row container my-10">
          {/* Sash Templates */}
          <div className="flex-flex-col justify-center items-center gap-2">
            <h5 className="mt-4 footer-header text-sm text-center">
              Personalize Sash Templates
            </h5>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 items-center ">
              {specialSash.map(({ name, image, link, description, title }) => (
                <Link
                  to={link ? link : `/configurator-sash-special/${name}`}
                  className="text-decoration-none lg:mx-10  "
                  key={name}
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

export default SashTemplatePage;
