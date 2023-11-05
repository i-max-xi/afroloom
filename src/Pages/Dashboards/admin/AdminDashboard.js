import React, { useState } from "react";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
import SideBar from "../Sidebar";
import Home from "./Home";
import AllSellers from "./AllSellers";
import AddProduct from "../AddProduct";

const adminSidebarItems = [
  { label: "Home" },
  { label: "Add A New Product" },
  { label: "All Sellers" },
];

const AdminDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Nav />
      <div className="d-flex bg-white" style={{minHeight: '85vh'}}>
        <SideBar items={adminSidebarItems} setActiveIndex={setActiveIndex} />
        <div className="dashboard w-75">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel>
              <Home />
            </TabPanel>
            <TabPanel header="Add A New Product">
              <AddProduct />
            </TabPanel>
            <TabPanel header="All Sellers">
              <AllSellers />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
