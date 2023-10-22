import React from "react";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import Home from "./Home";
import AddProduct from "./AddProduct";

const SellerDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Nav />
      <div className="d-flex">
        <Sidebar setActiveIndex={setActiveIndex} />

        <div className="dashboard w-75 mx-5">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel>
              <Home />
            </TabPanel>
            <TabPanel header="Add A New Product">
              <AddProduct/>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
