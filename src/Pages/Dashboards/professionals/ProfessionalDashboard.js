import React, { useState } from "react";
import "../styles/Dashboard.css";
import Nav from "../../../Components/Nav";
import { TabPanel, TabView } from "primereact/tabview";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import Home from "./Home";
import CustomSideBar from "../CustomSidebar";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import UpdateInfo from "./UpdateInfo";

const ProfessionalDashboard = () => {
  const { professionalType } = useParams();

  const currentUser = useSelector((state) => state.user.currentUser);
  const welcomename = currentUser.name;
  // const sellerCompany = currentUser.companyName;

  console.log(currentUser);

  const sellerCountry = currentUser.country;
  const professionalApproved = currentUser.approved;

  const [activeIndex, setActiveIndex] = useState(0);

  const [visible, setVisible] = useState(true);

  return (
    <>
      <Nav />
      <div className="bg-white fs-3 p-3 text-bold d-flex justify-content-between">
        <div>
          Welcome <span style={{ color: "orange" }}>{welcomename}!</span>
        </div>
        <div>
          {professionalApproved ? (
            <Badge value="Verified" severity="success"></Badge>
          ) : (
            <button className="btn btn-danger">Complete Profile</button>
          )}
        </div>
      </div>
      <div className="d-flex bg-white">
        <div className="side-bar-closed-container">
          <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
        <CustomSideBar
          items={[
            { label: "Home" },
            { label: "Update Profile Info" },
          ]}
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
              <Home
                proffesionalType={professionalType}
                currentProfessional={welcomename}
              />
            </TabPanel>
            <TabPanel header="Update Profile Info">
              <UpdateInfo
                currentUser={currentUser}
                proffesionalType={professionalType}
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default ProfessionalDashboard;
