// src/components/admin/ManageUsers.js

import React, { useState, useEffect } from 'react';
import AllServices from '../../../Services/usersService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const toast = React.useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AllServices.getAllPartners();
        setUsers(response.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await AllServices.deletePartner(id);
      setUsers(users.filter(user => user.id !== id));
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'User deleted', life: 3000 });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete user', life: 3000 });
    }
  };

  const confirmDeleteUser = (id) => {
    confirmDialog({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteUser(id)
    });
  };



  return (
    <div className="p-m-3">
      <Toast ref={toast} />
      <h5 style={{ fontWeight: 'normal' }}>Manage Sales Partners</h5>
        <DataTable value={users} paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="p-datatable-gridlines" >
          <Column field="firstName" header="First Name" sortable />
          <Column field="lastName" header="Last Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="partner_code" header="Partner Code" sortable />
            <Column field="count" header="No. of Sales" sortable />
          <Column
            body={(rowData) => (
              <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-rounded"
                onClick={() => confirmDeleteUser(rowData.id)}
              />
            )}
            header="Actions"
          />
        </DataTable>
    </div>
  );
};

export default ManageUsers;
