import React from "react";
import Nav from "../Components/Nav";

const NoPage = () => {
  return (
    <>
      <Nav />
      <div className="d-flex flex-column align-items-center justify-content-center p-5">
        <h1>404</h1>
        <h4>Page Not Found</h4>
      </div>
    </>
  );
};

export default NoPage;
