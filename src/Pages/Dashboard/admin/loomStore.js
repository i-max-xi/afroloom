import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import AllServices from '../../../Services/usersService';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Image } from 'primereact/image';
import EditProductDialog from './components/EditComponent';
import { useAllProducts } from '../../shop/hooks/useAllProducts';
import { FaFilter } from 'react-icons/fa';
import { categories } from '../../shop/Data/products';

const LoomStore = () => {
  const {
    data: allProducts,
    isLoading: allProductsLoading,
    error,
    refetch,
    isFetching,
  } = useAllProducts();
  const products = allProducts?.pages?.flatMap((page) => page.products) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChildCategory, setSelectedChildCategory] = useState(''); // Child category
  const [childCategories, setChildCategories] = useState([]);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const toast = useRef(null);

  // Filter products based on search query
  const filteredProducts = products?.filter((product) =>
    product?.name?.toLowerCase().includes(searchQuery?.toLowerCase()),
  );

  const openEditDialog = (product) => {
    setEditDialog(true);
    setSelectedProduct(product);
  };

  const updateItem = (e, field) => {
    if (!selectedProduct) {
      console.error('Error: selectedProduct is undefined');
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
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Product updated',
      });
    } catch (error) {
      console.error('Error updating product:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update product',
      });
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
      await deleteDoc(doc(db, 'loomStore', selectedProduct.id));
      // setProducts(products.filter((product) => product.id !== selectedProduct.id));
      refetch();
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Product deleted',
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete product',
      });
    }
    setIsLoading(false);
    setDeleteDialog(false);
  };

  const handleParentCategoryChange = (e) => {
    const parent = e.target.value;
    setSelectedCategory(parent);
    setSelectedChildCategory(''); // Reset child category

    // Find corresponding child categories
    const selectedParentCategory = categories.find(
      (cat) => cat.name === parent,
    );
    setChildCategories(
      selectedParentCategory ? selectedParentCategory.children || [] : [],
    );
  };

  if (allProductsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading products</div>
    );
  }

  return (
    <div className="px-4">
      <Toast ref={toast} />
      <h5>Manage Products</h5>
      {/* Search & Filter Bar */}
      <div className="w-full flex flex-col gap-3 justify-center items-center my-6">
        <h3 className="capitalize">total: {products.length}</h3>

        <div
          id="products"
          className="relative w-full max-w-lg flex items-center justify-between bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm"
        >
          {/* Search Input */}

          <input
            type="text"
            placeholder="Search products..."
            className="w-full border-none outline-none p-2 text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <p className="relative flex items-center mt-2">
            {isFetching && (
              <Spinner className="absolute right-28 top-1/2 transform -translate-y-1/2 " />
            )}
          </p>
          <div className="flex items-center gap-1 text-xs w-[60%] justify-end">
            {/* Parent Category Filter */}
            <select
              className=" bg-transparent border-none outline-none text-gray-700 cursor-pointer max-w-[55%]"
              value={selectedCategory}
              onChange={handleParentCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Child Category Filter (Only visible when a parent category is selected) */}
            {childCategories.length > 0 && (
              <select
                className=" bg-transparent border-none outline-none text-gray-700 cursor-pointer max-w-[40%]"
                value={selectedChildCategory}
                onChange={(e) => setSelectedChildCategory(e.target.value)}
              >
                <option value="">All</option>
                {childCategories.map((child) => (
                  <option key={child} value={child}>
                    {child}
                  </option>
                ))}
              </select>
            )}

            {/* Filter Icon */}
            <FaFilter className="text-gray-500 ml-2 w-[5%]" />
          </div>
        </div>
      </div>

      <DataTable
        value={filteredProducts}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
      >
        <Column
          header="Actions"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success"
                onClick={() => openEditDialog(rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => confirmDeleteProduct(rowData)}
              />
            </div>
          )}
        />
        {/* <Column
          header="Images"
          body={(rowData) => (
            <p className="flex flex-col gap-1">
              {rowData?.images.map((image, index) => (
                <Image
                  preview
                  key={index}
                  src={image}
                  alt={` ${index}`}
                  className="w-8 h-8 rounded-lg object-cover shadow-md"
                />
              ))}
            </p>
          )}
        /> */}
        <Column
          header="Images"
          body={(rowData) => (
            <div className="flex flex-col gap-1">
              {rowData?.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Image
                    preview
                    src={image}
                    alt={`Product ${index}`}
                    className="w-8 h-8 rounded-lg object-cover shadow-md"
                  />
                  <a
                    href={image}
                    download={`product-image-${index}.jpg`}
                    className="text-xs text-blue-500 underline"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        />

        <Column field="name" header="Name" />
        <Column
          header="Price"
          body={(rowData) => (
            <span>
              {currencySymbol}
              {(rowData?.price * currencyFactor).toFixed(0)}
            </span>
          )}
        />
        <Column
          header="Discount"
          body={(rowData) => (
            <span>
              {currencySymbol}
              {(rowData?.discount * currencyFactor).toFixed(0)}
            </span>
          )}
        />
        {/* <Column
          header="Division"
          body={(rowData) => {
            const isOrderToSew =
              rowData?.grandparent_category === 'order to sew';
            const icon = isOrderToSew ? '🧵' : '👗';
            const color = isOrderToSew ? 'text-red-500' : 'text-green-500';

            return (
              <p className={`flex items-center gap-2 font-medium ${color}`}>
                <span>{icon}</span>
                <span className="capitalize">
                  {rowData?.grandparent_category}
                </span>
              </p>
            );
          }}
        /> */}

        <Column
          field="grandparent_category"
          header="Division"
          sortable
          body={(rowData) => {
            const isOrderToSew =
              rowData?.grandparent_category === 'order to sew';
            const icon = isOrderToSew ? '🧵' : '👗';
            const color = isOrderToSew ? 'text-red-500' : 'text-green-500';

            return (
              <p className={`flex items-center gap-2 font-medium ${color}`}>
                <span>{icon}</span>
                <span className="capitalize">
                  {rowData?.grandparent_category}
                </span>
              </p>
            );
          }}
        />

        <Column field="parent_category" header="Category" />
        <Column field="child_category" header="Child Category" />
        <Column field="ready_in" header="Ready In" />
        <Column
          header="Color Variants"
          body={(rowData) => {
            return (
              <div className="max-h-10 overflow-y-auto">
                {rowData?.color_variants?.map((color, index) => (
                  <li key={index} className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <p
                        className="rounded-full h-4 w-4 border"
                        style={{ backgroundColor: color.value }}
                      ></p>{' '}
                      <p className="text-xs">{color.name}</p>
                    </div>
                  </li>
                ))}
              </div>
            );
          }}
        />
        <Column
          header="Parts"
          body={(rowData) => {
            return (
              <div className="max-h-10 overflow-y-auto">
                {rowData?.parts?.map((part, index) => (
                  <li key={index} className="flex justify-between">
                    <div className="flex items-center gap-2">
                      {part?.name}-{part?.type}-{part?.allows}
                    </div>
                  </li>
                ))}
              </div>
            );
          }}
        />
        <Column
          header="Description"
          body={(rowData) => <textarea>{rowData?.description}</textarea>}
        />
        <Column
          header="Sizes"
          body={(rowData) => (
            <div className="flex  gap-1">
              {rowData?.sizes?.map((item, index) => (
                <p key={index} className="text-sm">
                  {item?.name}: {currencySymbol}
                  {(item?.value * currencyFactor).toFixed(0)}
                </p>
              ))}
            </div>
          )}
        />
      </DataTable>

      <Dialog
        visible={deleteDialog}
        header="Confirm Deletion"
        modal
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setDeleteDialog(false)}
              className="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={deleteProduct}
              className="p-button-danger"
              loading={isLoading}
            />
          </div>
        }
        onHide={() => setDeleteDialog(false)}
      >
        <p>Are you sure you want to delete this product?</p>
      </Dialog>

      {editDialog && (
        <EditProductDialog
          isLoading={isLoading}
          onHide={() => {
            setSelectedProduct(null);
            setEditDialog(false);
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
