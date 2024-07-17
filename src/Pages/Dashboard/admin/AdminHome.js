import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AllServices from '../../../Services/usersService';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await AllServices.getAllOrders();
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { field: 'id', header: 'Order ID' },
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'email', header: 'Email' },
    { field: 'city', header: 'City' },
    { field: 'tel', header: 'Phone' },
    { field: 'timestamp', header: 'Timestamp' },
    { field: 'totalToPay', header: 'Total Amount' },
    // Add more fields as needed
  ];

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div className="card">
          <h1>Admin Dashboard - Orders</h1>
          <DataTable value={orders}>
            {columns.map(col => (
              <Column key={col.field} field={col.field} header={col.header} />
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
