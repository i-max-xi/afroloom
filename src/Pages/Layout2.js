import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import React from "react";
import { ScrollTop } from 'primereact/scrolltop';
import Nav from "../Components/Nav";
import LayoutHeaders from "../Components/LayoutHeaders";


const Layout2 = () => {
  return (
    <>
      <Nav />
      <LayoutHeaders />

      <Outlet />
      <ScrollTop className="bg-warning"/>
      <Footer />

    </>
  )
};

export default Layout2;