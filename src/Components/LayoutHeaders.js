import React, { useEffect } from "react";
import Nav from "./Nav";
// import { useOutlet } from "react-router-dom";

function LayoutHeaders({ selectedBg }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      {/* <div
        style={{
          backgroundImage: `url(${selectedBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "13rem",
          width: "100%",
        }}
        className="page-banner"
      ></div> */}
      <img alt="header" src={selectedBg} width="100%" />
    </>
  );
}

export default LayoutHeaders;
