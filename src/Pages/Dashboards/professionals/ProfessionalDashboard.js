import React, { useEffect, useMemo, useState } from "react";
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
import EditProfessionalProfile from "./EditProfile";

const ProfessionalDashboard = () => {
  const { professionalType } = useParams();

  const currentUser = useSelector((state) => state.user.currentUser);
  const welcomename = currentUser.name;
  // const sellerCompany = currentUser.companyName;

  // const sellerCountry = currentUser.country;

  const professionalApproved = currentUser.approved;
  const profileCompleted = currentUser.completed;

  const [activeIndex, setActiveIndex] = useState(0);

  const [visible, setVisible] = useState(true);

  const StatusBadge = useMemo(() => {
    if (professionalApproved && profileCompleted)
      return <Badge value="Verified" size="large" severity="success"></Badge>;
    if (!profileCompleted && !profileCompleted)
      return (
        <button onClick={() => setActiveIndex(1)} className="btn btn-danger">
          Complete Profile
        </button>
      );
    if (profileCompleted && !professionalApproved)
      return (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <Badge
            value="Verification pending"
            size="large"
            severity="info"
          ></Badge>
          <p className="fs-6">
            Your profile would only be listed after approval
          </p>
        </div>
      );
  }, [professionalApproved, profileCompleted]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav noCurrency={true} />
      <div className="bg-white fs-3 p-3 text-bold d-flex justify-content-between">
        <div>
          Welcome <span style={{ color: "orange" }}>{welcomename}!</span>
        </div>
        <div>{StatusBadge}</div>
      </div>
      <div className="d-flex bg-white">
        <div className="side-bar-closed-container">
          <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
        <CustomSideBar
          items={[
            { label: "Home" },
            profileCompleted
              ? { label: "Edit Profile Info" }
              : { label: "Complete Profile Info" },
          ]}
          setActiveIndex={setActiveIndex}
          visible={visible}
          setVisible={setVisible}
        />
        <div className="dashboard">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel>
              <Home
                proffesionalType={professionalType}
                currentProfessionalId={currentUser.id}
              />
            </TabPanel>
            {profileCompleted ? (
              <TabPanel header="Edit Profile Info">
                <EditProfessionalProfile
                  currentUser={currentUser}
                  proffesionalType={professionalType}
                />
              </TabPanel>
            ) : (
              <TabPanel header="Complete Profile Info">
                <UpdateInfo
                  currentUser={currentUser}
                  proffesionalType={professionalType}
                />
              </TabPanel>
            )}
          </TabView>
        </div>
      </div>
    </>
  );
};

export default ProfessionalDashboard;
