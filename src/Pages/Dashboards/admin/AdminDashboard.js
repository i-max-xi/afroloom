import React, { useState } from "react";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
// import Home from "./Home";
// import AddProduct from "./AddProduct";
import SideBar from "../Sidebar";

const adminSidebarItems = [
  { label: "Home" },
  { label: "Add A New Product" },
];

const AdminDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Nav />
      <div className="d-flex">
        <SideBar items={adminSidebarItems} setActiveIndex={setActiveIndex} />
        <div className="dashboard w-75 mx-5">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel>
              {/* <Home /> */}
            </TabPanel>
            <TabPanel header="Add A New Product">
              {/* <AddProduct /> */}
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
