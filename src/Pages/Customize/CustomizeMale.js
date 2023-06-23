import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../Components/Nav";
import { maleExtras } from "../../Data/CustomizeDataMale";
import { Link } from "react-router-dom";

const CustomizeMale = () => {
  const { customizeId } = useParams();
  const maleClothing = maleExtras.filter(
    (c) => c.category === customizeId
  );


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <div className="container ">
        <Link to="/configurator" className="row justify-content-center p-2 pb-5">
          {maleClothing.map(({ items }) =>
            items.map(({ name, image }) => (
              <div className="col-3 m-3 mx-3" key={name}>
                <div className="card" data-aos="fade-in" data-aos-duration="1500">
                  <img
                    className="card-img-top"
                    src={image}
                    alt={name}
                    width="300px"
                    height="300px"
                  />
                </div>
              </div>
            ))
          )}
        </Link>
      </div>
    </>
  );
};

export default CustomizeMale;
