import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import React, { useEffect } from "react";
import { ScrollTop } from "primereact/scrolltop";
//

const Layout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* <Nav /> */}

      <div className="min-h-[100vh]"><Outlet /></div>
      <ScrollTop className="bg-warning" />
      <Footer />
    </>
  );
};

export default Layout;
