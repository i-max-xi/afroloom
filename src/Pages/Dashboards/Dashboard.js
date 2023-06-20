import React from "react";
import Sidebar from "./Sidebar";
import "../../Styles/Dashboard.css";
import Nav from "../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import SellerDashboard from "./SellerDashboard";
import Products from "../../Components/dashboard/Products";

const Dashboard = () => {
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
              <SellerDashboard />
            </TabPanel>
            <TabPanel header="Header II">
              <Products />
            </TabPanel>
            <TabPanel header="Header III">
              <p className="m-0">
                <h1>List of Customers</h1>
              </p>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
