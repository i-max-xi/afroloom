import React, { useState } from "react";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
// import Home from "./Home";
// import AddProduct from "./AddProduct";
import MyOrders from "./MyOrders";
import { useSelector } from "react-redux";
import CustomSideBar from "../CustomSidebar";
import { Button } from "primereact/button";

const userSidebarItems = [
  { label: "My Orders" },
  // { label: "My orders" },
];

const UserDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const welcomename = useSelector((state) => state.user.currentUser.firstName);

  const [visible, setVisible] = useState(true);

  return (
    <>
      <Nav noCurrency={true} />
      <div className="bg-white fs-3 p-3 text-bold">
        Welcome <span style={{ color: "orange", textTransform: "capitalize" }}>{welcomename}!</span>
      </div>
      <div className="d-flex bg-white">
        <div className="side-bar-closed-container">
          <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
        <CustomSideBar
          items={userSidebarItems}
          setActiveIndex={setActiveIndex}
          visible={visible}
          setVisible={setVisible}
        />
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
