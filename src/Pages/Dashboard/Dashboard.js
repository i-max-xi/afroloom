import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import AllServices from '../../Services/usersService';
import Nav from '../../Components/Nav';
import { Button } from 'primereact/button';
import CustomSideBar from './CustomSidebar';
import Home from './Home';
import RequestPayout from './RequestPayout';
import { TabPanel, TabView } from "primereact/tabview";
import AdminDashboard from './admin/AdminHome';




const userSidebarItems = [
    { label: "Home" },
    {label: "Request Payout"}
  ];



const Dashboard = () => {
    const {userID} = useParams();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        partner_code: "",
        count: 0,
        paid_count: 0,
        salesData: []
    });

    const fetchUserData = async () => {
        try {
          const partnerInfo = await AllServices.getPartnerByField("id", userID);
          return partnerInfo.data();
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      };

    useEffect(() => {
        fetchUserData().then(data =>  {
            console.log({data})
            if (data) {
                setUserData(data)
            }
            else {
                setUserData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    partner_code: "",
                    count: 0,
                    paid_count: 0,
                    salesData: []
                })
            }
        })
    }
    , [ userID])

    const welcomename = userData.firstName ? userData.firstName : "Partner";
    const [visible, setVisible] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const baseAmount = 5;
    const calcluatedEarning = baseAmount * userData.count;
    const calculatedPaid = baseAmount * userData.paid_count;
   

  


  return (
    <>

    <Nav />

    <div className="side-bar-closed-container bg-white">
    <div className="bg-white fs-3 p-3 text-bold">
        Welcome <span style={{ color: "orange", textTransform: "capitalize" }}>{welcomename}!</span>
      </div>
          <Button icon="pi pi-arrow-right" className='mb-3' onClick={() => setVisible(true)} />
        </div>
        <CustomSideBar
          items={userSidebarItems}
          setActiveIndex={setActiveIndex}
          visible={visible}
          setVisible={setVisible}
        />
        
        <div className="">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel>
              <Home userData={userData} calcluatedEarning={calcluatedEarning} calculatedPaid={calculatedPaid} />
            </TabPanel>
            <TabPanel >
                <RequestPayout userData={userData} calcluatedEarning={calcluatedEarning} calculatedPaid={calculatedPaid} />
            </TabPanel>
          </TabView>
        </div>

        {/* <AdminDashboard /> */}
    

    
    </>
  )
}

export default Dashboard