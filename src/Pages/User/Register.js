import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import signUpBg from "../../Assets/backgrounds/2.jpg";
import Nav from "../../Components/Nav";
import SignUp from "./SignUp";
import ExtraInfo from "./ExtraInfo";
import Verification from "./Verification";

const Register = () => {
  return (
    <>
      <Nav />
      <div
        style={{
          backgroundImage: `url(${signUpBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container d-flex flex-column align-items-center justify-content-center p-5">
          <TabView className="w-50 mt-2 shadow rounded">
            <TabPanel header="Step 1">
              <SignUp />
            </TabPanel>
            <TabPanel header="Step 2">
              <ExtraInfo />
            </TabPanel>
            <TabPanel header="Step 3">
              <Verification />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default Register;
