import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const Products = () => {
  const products = [
    { id: 1, name: "Product 1", price: 10, stock: 5 },
    { id: 2, name: "Product 2", price: 15, stock: 10 },
    { id: 3, name: "Product 3", price: 20, stock: 2 },
  ];
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
      <div className="text-center mb-5">
        <h1 className="mb-3">Upload a new Product</h1>
        <input type="file" />
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
    </>
  );
};

export default Products;
