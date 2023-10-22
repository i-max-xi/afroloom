import React from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const UserDashboard = () => {
  const orders = [
    { id: 1, product: "Product 1", price: 10, status: "Shipped" },
    { id: 2, product: "Product 2", price: 15, status: "Delivered" },
    { id: 3, product: "Product 3", price: 20, status: "Processing" },
  ];

  const handleCancel = (orderId) => {
    // Implement cancel functionality here
    console.log(`Canceling order with ID ${orderId}`);
  };

  const cancelButtonTemplate = (rowData) => {
    return (
      <Button
        label="Cancel"
        className="p-button-danger"
        onClick={() => handleCancel(rowData.id)}
      />
    );
  };

  return (
    <>
      <div className="container">
        <div className="p-grid p-fluid mb-5">
          <div className="p-col-12">
            <Card title="My Orders">
              <DataTable value={orders}>
                <Column field="id" header="ID"></Column>
                <Column field="product" header="Product"></Column>
                <Column field="price" header="Price"></Column>
                <Column field="status" header="Status"></Column>
                <Column body={cancelButtonTemplate}></Column>
              </DataTable>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
