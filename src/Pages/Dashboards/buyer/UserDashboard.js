import React, { useState } from "react";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
// import Home from "./Home";
// import AddProduct from "./AddProduct";
import SideBar from "../Sidebar";
import MyOrders from "./MyOrders";
import { useSelector } from "react-redux";

const userSidebarItems = [
  { label: "My Orders" },
  // { label: "My orders" },
];

const UserDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const welcomename = useSelector((state) => state.user.currentUser.firstName);

  return (
    <>
      <Nav />
      <div className="bg-white fs-3 p-3 text-bold">
        Welcome <span style={{color: "orange"}}>{welcomename}!</span>{" "}
      </div>
      <div className="d-flex bg-white" >
        <SideBar items={userSidebarItems} setActiveIndex={setActiveIndex} />
        <div className="dashboard w-75">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel>
              <MyOrders />
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

export default UserDashboard;
