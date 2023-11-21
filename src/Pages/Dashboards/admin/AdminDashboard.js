import React, { useState } from "react";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
import SideBar from "../Sidebar";
import Home from "./Home";
import AllSellers from "./AllSellers";
import AddProduct from "../AddProduct";
import AddDeliveryService from "../AddDeliveryService";

const adminSidebarItems = [
  { label: "Home" },
  { label: "All Sellers" },
  { label: "Add A New Product" },
  { label: "Add A New Delivery Service" },
];

const AdminDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const welcomename = "Kobby";
  const adminSeller = "Admin";


  return (
    <>
      <Nav />
      <div className="bg-white fs-3 p-3 text-bold">
        Welcome <span style={{color: "orange"}}>{welcomename}!</span>{" "}
      </div>
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
            <TabPanel header="All Sellers">
              <AllSellers />
            </TabPanel>
            <TabPanel header="Add A New Product">
              <AddProduct currentSeller={adminSeller}/>
            </TabPanel>
            <TabPanel header="Add A New Delivery Service">
              <AddDeliveryService/>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
