// Home.js
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductsDataService from "../../../Services/products.services";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

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
      console.error("Error loading products:", error);
    }
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
        console.log("Product updated successfully.");
        loadProducts();
        setEditDialogVisible(false);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };
  
  

  const deleteProduct = async (id) => {
    try {
      await ProductsDataService.deleteProduct(id);
      // Reload products after deletion
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>All Products</h2>
      <DataTable value={products} paginator rows={10}>
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
