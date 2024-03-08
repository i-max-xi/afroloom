// Home.js
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductsDataService from "../../../Services/products.services";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

const AllSellers = () => {
  const toastRef = useRef(null);

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]); // For filtered products
  const [searchTerm, setSearchTerm] = useState(""); // For search input

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await ProductsDataService.getAllSellers();
      const sellerData = [];
      response.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        sellerData.push(data);
      });
      setSellers(sellerData);
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error loading sellers: ${error}`,
      });
    }
  };

  // Function to filter products based on the search term
  const filterProducts = () => {
    const filtered = sellers.filter((product) =>
      product.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteSeller = async (id, name) => {
    setLoading(true);
    try {
      await ProductsDataService.deleteProductsByField("seller", name);

      await ProductsDataService.deleteSeller(id);
      toastRef.current.show({
        severity: "success",
        summary: `Successfully deleted seller`,
      });
      loadProducts();
      setLoading(false);
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error deleting seller: ${error}`,
      });
    }
  };

  const approveSeller = async (id) => {
    try {
      await ProductsDataService.updateSellerApproval(id, true);
      toastRef.current.show({
        severity: "success",
        summary: `Successfully approved seller`,
      });
      loadProducts();
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error approving seller: ${error}`,
      });
    }
  };

  return (
    <div>
      <Toast ref={toastRef} position="top-right" />

      <h2 className="text-warning dashboard-home-title">All Sellers</h2>
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
        value={filteredProducts.length !== 0 ? filteredProducts : sellers}
        paginator
        rows={10}
      >
        {/* <Column
          field="item"
          header="Image"
          body={(rowData) => (
            <img
              src={rowData.item}
              alt={rowData.title}
              style={{ width: "100px" }}
            />
          )}
        /> */}
        <Column field="companyName" header="Brand Name" />
        <Column field="email" header="Email" />
        <Column field="number" header="Phone" />
        <Column field="country" header="Country" />
        <Column
          field="supplyCategories"
          header="Supply"
          body={(rowData) => (
            <div>
              {rowData.supplyCategories?.map((category, index) => (
                <div key={index}>{category}</div>
              ))}
            </div>
          )}
        />
        <Column
          body={(rowData) => (
            <button
              className={`btn text-white ${
                rowData.approved ? "btn-success" : "btn-info"
              } btn-success edit`}
              onClick={() => approveSeller(rowData.id)}
            >
              {rowData.approved ? "Approved" : "Approve"}
            </button>
          )}
        />
        <Column
          body={(rowData) => (
            <button
              className="btn btn-danger remove"
              onClick={() => deleteSeller(rowData.id, rowData.companyName)}
            >
              <span className="spinner-container">
                {loading && (
                  <ProgressSpinner
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    className="position-absolute top-50 start-50 translate-middle"
                  />
                )}
              </span>
              Delete
            </button>
          )}
        />
      </DataTable>
    </div>
  );
};

export default AllSellers;
