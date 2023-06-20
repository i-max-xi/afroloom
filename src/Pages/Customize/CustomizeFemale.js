import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../Components/Nav";
import { femaleExtras } from "../../Data/CustomizeDataFemale";

const CustomizeFemale = () => {
  const { Id } = useParams();
  const femaleClothing = femaleExtras.filter((c) => c.category === Id);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">
          {femaleClothing.map((category) =>
            category.items.map((item) => (
              <div className="col-3 m-3 mx-3" key={item.name}>
                <div
                  className="card"
                  data-aos="fade-in"
                  data-aos-duration="1500"
                >
                  <img
                    className="card-img-top"
                    src={item.image}
                    alt={item.name}
                    width="200px"
                    height="200px"
                  />
                  <div className="card-body m-0 d-flex justify-content-center flex-column">
                    <h5 className="text-center">{item.name}</h5>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CustomizeFemale;
