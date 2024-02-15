// Home.js
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductsDataService from "../../../Services/products.services";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const AllModels = () => {
  const toastRef = useRef(null);

  const [models, setModels] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]); // For filtered products
  const [searchTerm, setSearchTerm] = useState(""); // For search input

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await ProductsDataService.getAllModels();
      const modelData = [];
      response.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        modelData.push(data);
      });
      setModels(modelData);
    } catch (error) {
      console.error("Error loading sellers:", error);
    }
  };

  // Function to filter products based on the search term
  const filterProducts = () => {
    const filtered = models.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const deleteProduct = async (id) => {
    try {
      await ProductsDataService.deleteModel(id);
      toastRef.current.show({
        severity: "success",
        summary: `Successfully deleted model`,
      });
      loadProducts();
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error deleting model: ${error}`,
      });
    }
  };

  const approveModel = async (id) => {
    try {
      await ProductsDataService.updateSellerApproval(id, true);
      toastRef.current.show({
        severity: "success",
        summary: `Successfully approved model`,
      });
      loadProducts();
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error approving model: ${error}`,
      });
    }
  };

  return (
    <div>
      <Toast ref={toastRef} position="top-right" />

      <h4 className="text-warning dashboard-home-title">All Models</h4>
      {/* Search input field */}
      <div className="p-inputgroup justify-content-center mt-3 mb-3">
        <input
          type="text"
          className="dashboard-home-search rounded"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button icon="pi pi-search" onClick={filterProducts} />
      </div>
      <DataTable
        value={filteredProducts.length !== 0 ? filteredProducts : models}
        paginator
        rows={10}
      >
        <Column
          field="item"
          header="Image"
          body={(rowData) => (
            <img
              src={rowData.profile}
              alt={rowData.name}
              style={{ width: "5rem", aspectRatio: 1/1 }}
            />
          )}
        />
        <Column field="name" header="Name" />
        <Column field="email" header="Email" />
        <Column field="number" header="Phone" />
        <Column
          field="specialties"
          header="Specialties"
          body={(rowData) => (
            <div>
              {rowData.specialties?.map((specialty, index) => (
                <div key={index}>{specialty}</div>
              ))}
            </div>
          )}
        />
        <Column
          body={(rowData) => (
            <button
              className={`btn text-white ${rowData.approved ? "btn-success" : "btn-info" } btn-success edit`}
              onClick={() => approveModel(rowData.id)}
              >
              {rowData.approved ? "Approved" : "Approve"}
            </button>
          )}
        />
        <Column
          body={(rowData) => (
            <button
              className="btn btn-danger remove"
              onClick={() => deleteProduct(rowData.id)}
            >
              Delete
            </button>
          )}
        />
      </DataTable>
    </div>
  );
};

export default AllModels;
