// Home.js
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductsDataService from "../../../Services/products.services";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import { locationOptions } from "../../../Data/SupplierAcceptedCities";
import { Dropdown } from "primereact/dropdown";
import {
  descriptionLimit,
  isMobile,
  titleLimit,
} from "../../../utils/constants";
import { InputTextarea } from "primereact/inputtextarea";
import { Image } from "primereact/image";

const Home = ({ currentSeller }) => {
  const toastRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]); // For filtered products
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const loadProducts = async () => {
    try {
      const response = await ProductsDataService.getProductByField(
        "seller",
        currentSeller
      );
      const productData = response.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setProducts(productData);
    } catch (error) {
      toastRef.current.show({
        severity: "success",
        summary: "Error loading products.",
        detail: error,
      });
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (event) => {
    window.scrollTo(0, 0);
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
        await ProductsDataService.updateProduct(selectedProduct.id, {
          title: selectedProduct.title,
          price: selectedProduct.price,
          discount: selectedProduct.discount,
          weight: selectedProduct.weight,
          description: selectedProduct.description,
          location: selectedProduct.location,
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

      <h2 className="dashboard-home-title">All Products</h2>
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

      <h6 className="p-inputgroup justify-content-center mt-3 mb-3">
        Total: {products.length}
      </h6>
      <DataTable
        value={filteredProducts.length !== 0 ? filteredProducts : products}
        paginator
        rows={4}
        onPage={handlePageChange}
      >
        <Column
          field="item"
          header="Image"
          body={(rowData) => (
            <Image
              src={rowData.item}
              alt={rowData.title}
              width="100%"
              style={{ width: isMobile ? "5rem" : "10rem" }}
              preview
            />
          )}
        />
        <Column field="title" header="Title" />
        <Column
          field="price"
          header={`Price ${currencySymbol}`}
          body={(rowData) => `${(rowData.price * currencyFactor).toFixed(2)}`}
        />
        <Column
          body={(rowData) => (
            <button
              className="btn btn-info edit"
              onClick={() => handleEditClick(rowData)}
            >
              Edit
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

      <Dialog
        header="Edit Product"
        visible={editDialogVisible}
        onHide={handleEditDialogHide}
        className="col-12 col-sm-6"
        dismissableMask={true}
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
                  onChange={(e) => {
                    if (e.target.value.length <= titleLimit) {
                      setSelectedProduct({
                        ...selectedProduct,
                        title: e.target.value,
                      });
                    }
                  }}
                  className="p-inputtext"
                />
                <span style={{ float: "right" }}>
                  {selectedProduct.title.length}/{titleLimit}
                </span>
              </div>
              <div className="p-field">
                <label htmlFor="title">Description</label>
                <InputTextarea
                  required
                  id="description"
                  value={selectedProduct.description}
                  onChange={(e) => {
                    if (e.target.value.length <= descriptionLimit) {
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      });
                    }
                  }}
                  rows={5}
                  cols={30}
                />
                <span style={{ float: "right" }}>
                  {selectedProduct.description.length}/{descriptionLimit}
                </span>
              </div>
              <div className="p-field">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  value={selectedProduct.price}
                  placeholder="Ghana Cedi (₵) equivalent value... 10"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: parseFloat(e.target.value), // Convert input to a floating-point number
                    })
                  }
                  className="p-inputtext"
                />
              </div>
              <div className="p-field">
                <label htmlFor="price">Discount %</label>
                <input
                  id="discount"
                  type="number"
                  placeholder="eg. 10"
                  value={selectedProduct.discount}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      discount: parseFloat(e.target.value),
                    })
                  }
                  className="p-inputtext"
                />
              </div>
              <div className="p-field">
                <label htmlFor="price">Weight (kg) </label>
                <input
                  id="weight"
                  type="number"
                  placeholder="eg. 10"
                  value={selectedProduct.weight}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      weight: parseFloat(e.target.value),
                    })
                  }
                  className="p-inputtext"
                />
              </div>

              <div className="p-field">
                <label className="text-warning" htmlFor="seller">
                  Item Location (City)
                </label>
                <Dropdown
                  id="location"
                  value={selectedProduct.location}
                  options={locationOptions}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      location: e.value,
                    })
                  }
                  placeholder="Select specific city you have this item or closest city"
                />
              </div>
            </div>
            <div className="m-3">
              <Button
                label="Save Changes"
                type="submit"
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
