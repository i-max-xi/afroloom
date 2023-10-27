import React from "react";
import "../styles/Dashboard.css";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import Home from "./Home";
import AddProduct from "./AddProduct";
import SideBar from "../Sidebar";

const sellerSidebarItems = [
  { label: "Home" },
  { label: "Add A New Product" },
];


const SellerDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Nav />
      <div className="d-flex">
      <SideBar items={sellerSidebarItems} setActiveIndex={setActiveIndex} />

        <div className="dashboard w-75 px-5">
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
