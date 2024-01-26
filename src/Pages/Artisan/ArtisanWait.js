import React from "react";
import Nav from "../../Components/Nav";
import comingsoon from '../../Assets/artisan_wait.jpg'

const ArtisanWait = () => {
  return (
    <>
      <Nav />
      <div className="d-flex justify-content-center align-items-center bg-white artisan-wait">
        <img src={comingsoon} alt="coming soon" className="m-3"/>

      </div>
    </>
  );
};

export default ArtisanWait;
