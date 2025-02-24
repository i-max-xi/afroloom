import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import AllServices from "../../../Services/usersService";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const shopCollectionRef = collection(db, "loomStore");

const LoomStore = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AllServices.getAllProducts();
        setProducts(
          response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const openEditDialog = (product) => {
    setSelectedProduct(product);
  };

  const updateItem = (e, field) => {
    setSelectedProduct({ ...selectedProduct, [field]: e.target.value });
  };

  const saveProduct = async () => {
    setIsLoading(true);
    try {
      await AllServices.updateProduct(selectedProduct.id, selectedProduct);
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product
        )
      );
      setSelectedProduct(null);
      toast.current.show({ severity: "success", summary: "Success", detail: "Product updated" });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.current.show({ severity: "error", summary: "Error", detail: "Failed to update product" });
    }
    setIsLoading(false);
  };

  const confirmDeleteProduct = (product) => {
    setSelectedProduct(product);
    setDeleteDialog(true);
  };

  const deleteProduct = async () => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "loomStore", selectedProduct.id));
      setProducts(products.filter((product) => product.id !== selectedProduct.id));
      toast.current.show({ severity: "success", summary: "Success", detail: "Product deleted" });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.current.show({ severity: "error", summary: "Error", detail: "Failed to delete product" });
    }
    setIsLoading(false);
    setDeleteDialog(false);
  };

  return (
    <div className="p-m-3">
      <Toast ref={toast} />
      <h5>Manage Products</h5>
      <DataTable value={products} paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
        <Column field="name" header="Name" />
        <Column field="price" header="Price" />
        <Column field="parent_category" header="Category" />
        <Column
          header="Actions"
          body={(rowData) => (
            <div>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => openEditDialog(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
          )}
        />
      </DataTable>

      {selectedProduct && (
        <Dialog header="Edit Product" visible={!!selectedProduct} modal onHide={() => setSelectedProduct(null)}>
          <div className="p-field">
            <label>Name</label>
            <InputText value={selectedProduct.name} onChange={(e) => updateItem(e, "name")} />
          </div>
          <div className="p-field">
            <label>Price</label>
            <InputText value={selectedProduct.price} onChange={(e) => updateItem(e, "price")} />
          </div>
          <Button label="Save" onClick={saveProduct} loading={isLoading} className="p-button-warning" />
        </Dialog>
      )}

      <Dialog visible={deleteDialog} header="Confirm Deletion" modal footer={
        <div>
          <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialog(false)} className="p-button-text" />
          <Button label="Yes" icon="pi pi-check" onClick={deleteProduct} className="p-button-danger" loading={isLoading} />
        </div>
      } onHide={() => setDeleteDialog(false)}>
        <p>Are you sure you want to delete this product?</p>
      </Dialog>
    </div>
  );
};

export default LoomStore;
