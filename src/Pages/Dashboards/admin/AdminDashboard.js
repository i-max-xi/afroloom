import React, { useState } from "react";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
import Home from "./Home";
import AllSellers from "./AllSellers";
import AddProduct from "../AddProduct";
import AddDeliveryService from "../AddDeliveryService";
import { useSelector } from "react-redux";
import PackageStickers from "../PackageStickers";
import AddPackageSticker from "./AddPackageSticker";
import CustomSideBar from "../CustomSidebar";
import { Button } from "primereact/button";
import AllModels from "./AllModels";
import AllTourGuides from "./AllTourGuide";
import AllPhotographers from "./AllPhotographers";

const adminSidebarItems = [
  { label: "Home" },
  { label: "All Sellers" },
  { label: "All Models" },
  { label: "All Tour Guides" },
  { label: "All Photographers" },
  { label: "Add A New Product" },
  { label: "Add A New Delivery Service" },
  { label: "Add New Package Sticker" },
  { label: "Package Stickers" },
];

const AdminDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const welcomename = "Kobby";
  const currentUser = useSelector((state) => state.user.currentUser);
  const welcomename = currentUser.firstName;

  const adminSeller = "Admin";

  const [visible, setVisible] = useState(true);

  return (
    <>
      <Nav noCurrency={true} />
      <div className="bg-white fs-3 p-3 text-bold welcome">
        Welcome <span style={{ color: "orange",  textTransform: "capitalize" }}>{welcomename}!</span>
      </div>

      <div className="d-flex bg-white">
        <div className="side-bar-closed-container">
          <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>

        <CustomSideBar
          isAdmin="Admin"
          items={adminSidebarItems}
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
              <Home />
            </TabPanel>
            <TabPanel header="All Sellers">
              <AllSellers />
            </TabPanel>
            <TabPanel header="All Models">
              <AllModels />
            </TabPanel>
            <TabPanel header="All Tour Guides">
              <AllTourGuides />
            </TabPanel>
            <TabPanel header="All Photographers / Videographers">
              <AllPhotographers />
            </TabPanel>
            <TabPanel header="Add A New Product">
              <AddProduct currentSeller={adminSeller} sellerCountry="Ghana" />
            </TabPanel>
            <TabPanel header="Add A New Delivery Service">
              <AddDeliveryService />
            </TabPanel>
            <TabPanel header="Add New Package Sticker">
              <AddPackageSticker />
            </TabPanel>
            <TabPanel header="Package Stickers">
              <PackageStickers isAdmin={true} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
