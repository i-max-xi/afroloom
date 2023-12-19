import React, { useState } from "react";
import "../styles/Dashboard.css";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
import { useSelector } from "react-redux";
import SideBar from "../Sidebar";
import AddProduct from "../AddProduct";
import PackageStickers from "../PackageStickers";
import { Dialog } from "primereact/dialog";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const welcomename = currentUser.firstName;
  const sellerCompany = currentUser.companyName;
  const sellerCountry = currentUser.country;
  const sellerApproved = currentUser.approved;

  const [activeIndex, setActiveIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(!sellerApproved);



  return (
    <>
      <Nav />
      <div className="bg-white fs-3 p-3 text-bold">
        Welcome <span style={{ color: "orange" }}>{welcomename}!</span>{" "}
      </div>
      <div className="d-flex bg-white" style={{ minHeight: "85vh" }}>
        <SideBar
          items={[
            { label: "Home" },
            { label: "Add A New Product" },
            { label: "Package Stickers" },
          ]}
          setActiveIndex={setActiveIndex}
        />
        <div className="dashboard w-75">
          {sellerApproved ? (
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              <TabPanel>
                <Home currentSeller={sellerCompany} />
              </TabPanel>
              <TabPanel header="Add A New Product">
                <AddProduct
                  currentSeller={sellerCompany}
                  sellerCountry={sellerCountry}
                />
              </TabPanel>
              <TabPanel header="Package Stickers">
                <PackageStickers isAdmin={false}/>
              </TabPanel>
            </TabView>
          ) : (
            // Render dialog if seller is not approved
            <Dialog
              header="Access Denied"
              visible={showPopup}
              style={{ width: "40vw", height: "40vh", fontSize: "1.2rem" }}
              onHide={() => {
                navigate("/");
                setShowPopup(false);
              }}
            >
              <div>
                <p>You need to be approved by admin to use the dashboard.</p>
                <p>Approval occurs within 5 working days upon signing up</p>
                <Link to="/">Back to Home</Link>
              </div>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
