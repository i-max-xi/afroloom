// Home.js
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductsDataService from "../../../Services/products.services";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";

const Home = () => {
  const toastRef = useRef(null);
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]); // For filtered products
  const [searchTerm, setSearchTerm] = useState(""); // For search input

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await ProductsDataService.getAllProducts();
      const productData = [];
      response.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        productData.push(data);
      });
      setProducts(productData);
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error loading products:",
        error,
      });
    }
  };

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

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditDialogVisible(true);
  };

  const handleEditDialogHide = () => {
    setEditDialogVisible(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      if (selectedProduct) {
        console.log("Updating product...");
        await ProductsDataService.updateProduct(selectedProduct.id, {
          title: selectedProduct.title,
          price: selectedProduct.price,
          // Update other fields as needed
        });
        toastRef.current.show({
          severity: "success",
          summary: `Product updated successfully.`,
        });
        loadProducts();
        setEditDialogVisible(false);
      }
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error editing product: ${error}`,
      });
    }
  };

  const deleteProduct = async (id) => {
    try {
      await ProductsDataService.deleteProduct(id);
      toastRef.current.show({
        severity: "success",
        summary: `Successfully deleted product`,
      });
      loadProducts();
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: `Error deleting product: ${error}`,
      });
    }
  };

  return (
    <div>
      <Toast ref={toastRef} position="top-right" />

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
          body={(rowData) =>
            `${(rowData.price * currencyFactor).toFixed(2)}`
          }
        />
        <Column
          body={(rowData) => (
            <button
              className="btn btn-info"
              onClick={() => handleEditClick(rowData)}
            >
              Edit
            </button>
          )}
        />
        <Column
          body={(rowData) => (
            <button
              className="btn btn-danger"
              onClick={() => deleteProduct(rowData.id)}
            >
              Delete
            </button>
          )}
        />
      </DataTable>

      <Dialog
        header="Edit Product"
        visible={editDialogVisible}
        onHide={handleEditDialogHide}
        style={{ width: "50vw" }}
      >
        {selectedProduct && (
          <form onSubmit={handleEditSubmit}>
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={selectedProduct.title}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      title: e.target.value,
                    })
                  }
                  className="p-inputtext"
                />
              </div>
              <div className="p-field">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                  className="p-inputtext"
                />
              </div>
            </div>
            <div className="p-mt-2">
              <Button
                label="Save Changes"
                type="submit"
                // onClick={handleEditSubmit}
                className="p-button p-component"
              />
            </div>
          </form>
        )}
      </Dialog>
    </div>
  );
};

export default Home;
