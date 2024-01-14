import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

const MyOrders = () => {
  // const toastRef = useRef(null);

  const products = useSelector((state) => state.user.currentUser.orders);
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

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

      <h2>My Orders</h2>
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
        value={filteredProducts.length !== 0 ? filteredProducts : products}
        paginator
        rows={10}
      >
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
        <Column
          field="price"
          header={`Price ${currencySymbol}`}
          body={(rowData) => `${(rowData.price * currencyFactor).toFixed(2)}`}
        />
      </DataTable>
    </div>
  );
};

export default MyOrders;
