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
import { useProducts } from "../../shop/hooks/useProducts";
import { Spinner } from "react-bootstrap";


const LoomStore = () => {
  const { data: allProducts, isLoading: allProductsLoading, error, refetch } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const toast = useRef(null);

   // Filter products based on search query
    const filteredProducts = allProducts?.filter((product) =>
      product?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  

 

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
      // setProducts(
      //   products.map((product) =>
      //     product.id === selectedProduct.id ? selectedProduct : product
      //   )
      // );
      refetch()
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
      // setProducts(products.filter((product) => product.id !== selectedProduct.id));
      refetch()
      toast.current.show({ severity: "success", summary: "Success", detail: "Product deleted" });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.current.show({ severity: "error", summary: "Error", detail: "Failed to delete product" });
    }
    setIsLoading(false);
    setDeleteDialog(false);
  };

    
  if (allProductsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading products</div>;
  }

  return (
    <div className="p-m-3">
      <Toast ref={toast} />
      <h5>Manage Products</h5>
      <div id="products" className="my-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      <DataTable value={filteredProducts} paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
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
