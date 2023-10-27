import React from "react";
import Nav from "../../Components/Nav";
import comingsoon from '../Assets/artisan_wait.jpg'

const ArtisanWait = () => {
  return (
    <>
      <Nav />
      <div className="d-flex justify-content-center align-items-center bg-white">
        <img src={comingsoon} alt="coming soon" width="50%" className="m-3"/>

      </div>
    </>
  );
};

export default ArtisanWait;
