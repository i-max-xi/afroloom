// Home.js
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductsDataService from "../../../Services/products.services";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

const MyOrders = () => {
  // const toastRef = useRef(null);

  const products = useSelector((state) => state.user.currentUser.orders);
  // const [products, setProducts] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  const [filteredProducts, setFilteredProducts] = useState([]); // For filtered products
  const [searchTerm, setSearchTerm] = useState(""); // For search input


  // Function to filter products based on the search term
  const filterProducts = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  // const deleteProduct = async (id) => {
  //   try {
  //     await ProductsDataService.deleteProduct(id);
  //     toastRef.current.show({
  //       severity: "success",
  //       summary: `Successfully deleted product`,
  //     });
  //     loadProducts();
  //   } catch (error) {
  //     toastRef.current.show({
  //       severity: "error",
  //       summary: `Error deleting product: ${error}`,
  //     });
  //   }
  // };

  return (
    <div>
      {/* <Toast ref={toastRef} position="top-right" /> */}

      <h2>All Products</h2>
      {/* Search input field */}
      <div className="p-inputgroup justify-content-center mt-3 mb-3">
        <input
          type="text"
          className="w-50 rounded"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button icon="pi pi-search" onClick={filterProducts} />
      </div>
      <DataTable value={filteredProducts.length !== 0 ? filteredProducts : products} paginator rows={10}>
        <Column
          field="item"
          header="Image"
          body={(rowData) => (
            <img
              src={rowData.item}
              alt={rowData.title}
              style={{ width: "100px" }}
            />
          )}
        />
        <Column field="title" header="Title" />
        <Column field="price" header="Price ($)" />
        <Column field="" header="Status" />
      </DataTable>


    </div>
  );
};

export default MyOrders;
