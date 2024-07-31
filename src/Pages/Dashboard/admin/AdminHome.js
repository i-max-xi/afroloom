// src/components/admin/AdminDashboard.js

import React, { useState } from 'react';
import { TabPanel, TabView } from 'primereact/tabview';
import CustomSideBar from '../CustomSidebar';
import ManageUsers from './ManageUsers';
import ManagePrices from './ManagePrices';
import Nav from '../../../Components/Nav';
import { Button } from 'primereact/button';
import ManageFabrics from './ManageFabrics';

const adminSidebarItems = [
  { label: 'Manage Users' },
  { label: 'Manage Prices' },
  { label: 'Manage Fabrics' }
];

const AdminDashboard = () => {
  const [visible, setVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Nav />

      <div className="side-bar-closed-container bg-white">
        <div className="fs-3 p-3 text-bold">
          Welcome <span className='text-warning'>Admin!</span>
        </div>
        <Button icon="pi pi-arrow-right" className='mb-3' onClick={() => setVisible(true)} />

      </div>

      <CustomSideBar
        items={adminSidebarItems}
        setActiveIndex={setActiveIndex}
        visible={visible}
        setVisible={setVisible}
      />

      <div className="">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel  header="Manage Sales Partners">
          <ManageUsers />
          </TabPanel>
          <TabPanel header="Manage Prices">
            <ManagePrices />
          </TabPanel>
          <TabPanel header="Manage Fabrics">
            <ManageFabrics />
          </TabPanel>

          
        </TabView>
      </div>
    </>
  );
};

export default AdminDashboard;
