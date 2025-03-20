import React, { useState,  useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import AllServices from "../../../Services/usersService";
import {  deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Image } from 'primereact/image';
import EditProductDialog from "./components/EditComponent";
import { useAllProducts } from "../../shop/hooks/useAllProducts";
        

const LoomStore = () => {
  const { data: allProducts, isLoading: allProductsLoading, error, refetch } = useAllProducts();
  const products = allProducts?.pages?.flatMap(page => page.products) || [];

  const [searchQuery, setSearchQuery] = useState("");

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const toast = useRef(null);

   // Filter products based on search query
    const filteredProducts = products?.filter((product) =>
      product?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  
 

  const openEditDialog = (product) => {
    setEditDialog(true)
    setSelectedProduct(product);
  };

  const updateItem = (e, field) => {
    if (!selectedProduct) {
      console.error("Error: selectedProduct is undefined");
      return;
    }
  
    const value = e?.target?.value ?? e; // Ensure correct event handling
    setSelectedProduct((prev) => ({ ...prev, [field]: value }));
  };
  

  const saveProduct = async (updatedProduct) => {
    setIsLoading(true);
    try {
      await AllServices.updateProduct(updatedProduct.id, updatedProduct);
      setEditDialog(false);
      refetch(); // Refresh products list
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
      <Column
          header="Actions"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => openEditDialog(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
          )}
        />
      <Column  header="Images" body={(rowData) => <p className="flex flex-col gap-1">{rowData?.images.map((image, index) => (
          <Image preview key={index} src={image} alt={` ${index}`} className="w-8 h-8 rounded-lg object-cover shadow-md" />))}</p>}  />
        <Column field="name" header="Name" />
        <Column  header="Price" body={(rowData) => <span>{currencySymbol}{(rowData?.price * currencyFactor).toFixed(0)}</span>}  />
        <Column  header="Discount" body={(rowData) => <span>{currencySymbol}{(rowData?.discount * currencyFactor).toFixed(0)}</span>}  />
        <Column field="parent_category" header="Category" />
        <Column field="child_category" header="Child Category" />
        <Column field="ready_in" header="Ready In" />
        <Column header="Description" body={(rowData) => (<textarea>{rowData?.description}</textarea>)} />
        <Column  header="Sizes" body={(rowData) => <div className="flex  gap-1">{rowData?.sizes?.map((item, index) => (
          <p key={index} className="text-sm">
            {item?.name}: {currencySymbol}{(item?.value * currencyFactor).toFixed(0)}
          </p>
          ))}
          </div>}
        />

        
      </DataTable>

      <Dialog visible={deleteDialog} header="Confirm Deletion" modal footer={
        <div>
          <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialog(false)} className="p-button-text" />
          <Button label="Yes" icon="pi pi-check" onClick={deleteProduct} className="p-button-danger" loading={isLoading} />
        </div>
      } onHide={() => setDeleteDialog(false)}>
        <p>Are you sure you want to delete this product?</p>
      </Dialog>

      {editDialog && (
        <EditProductDialog 
          isLoading={isLoading} 
          onHide={() => {
            setSelectedProduct(null)
            setEditDialog(false)
          }} 
          saveProduct={saveProduct} 
          selectedProduct={selectedProduct} 
          updateItem={updateItem} 
        />
      )}

     
    </div>
  );
};

export default LoomStore;
