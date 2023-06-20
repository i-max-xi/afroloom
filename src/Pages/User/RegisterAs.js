import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../Components/Nav";

const RegisterAs = () => {
  return (
    <>
      <Nav />
      <h4 className="mb-4 text-center">
        <span className="text-warning">Register</span> As
      </h4>
      <div className="container d-flex p-5">
        <Link
          to="/buyer-signup"
          className="w-50 text-decoration-none text-black m-5"
        >
          <div className="card" data-aos="fade-in" data-aos-duration="1500">
            <div className="card-body d-flex justify-content-center flex-column">
              <h5 className="text-center">Buyer</h5>
            </div>
          </div>
        </Link>
        <Link
          to="/supplier-signup"
          className="w-50 text-decoration-none text-black m-5"
        >
          <div className="card" data-aos="fade-in" data-aos-duration="1500">
            <div className="card-body d-flex justify-content-center flex-column">
              <h5 className="text-center">Supplier</h5>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default RegisterAs;
