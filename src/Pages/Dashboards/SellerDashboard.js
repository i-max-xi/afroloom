import React from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";



const SellerDashboard = () => {
  const products = [
    { id: 1, name: "Product 1", price: 10, stock: 5 },
    { id: 2, name: "Product 2", price: 15, stock: 10 },
    { id: 3, name: "Product 3", price: 20, stock: 2 },
  ];

  // Dummy data for total sales and new orders
  const totalSales = 1500;
  const newOrders = 5;

  const handleDelete = (productId) => {
    // Implement delete functionality here
    console.log(`Deleting product with ID ${productId}`);
  };

  const deleteButtonTemplate = (rowData) => {
    return (
      <Button
        label="Delete"
        className="p-button-danger p-button-sm"
        onClick={() => handleDelete(rowData.id)}
      />
    );
  };



  return (
    <>
        <div className="container">
          <div className="d-flex">
            <div className="col-3 m-3">
              <Card title="Total Sales" subTitle="This Month" className="bg-primary text-white">
                <div className="p-text-center">
                  <h2>{totalSales}</h2>
                </div>
              </Card>
            </div>
            <div className="col-3 m-3">
              <Card title="New Orders" subTitle="Today" className="bg-warning text-white">
                <div className="p-text-center">
                  <h2>{newOrders}</h2>
                </div>
              </Card>
            </div>
            <div className="col-3 m-3">
              <Card title="Visits" subTitle="Today" className="bg-info text-white">
                <div className="p-text-center">
                  <h2>{newOrders}</h2>
                </div>
              </Card>
            </div>
          </div>

          <div className="p-grid p-fluid">
            <div className="p-col-12">
              <Card title="Products">
                <DataTable value={products}>
                  <Column field="id" header="ID"></Column>
                  <Column field="name" header="Name"></Column>
                  <Column field="price" header="Price"></Column>
                  <Column field="stock" header="Stock"></Column>
                  <Column body={deleteButtonTemplate}></Column>
                </DataTable>
              </Card>
            </div>
          </div>
        </div>
    </>
  );
};

export default SellerDashboard;
