import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { app } from '../../../../firebase';
import { Dialog } from 'primereact/dialog';
import { Spinner } from '../../../shop/components/spinner';
import {
  categoriesBreakdown,
  divisionBreakdown,
} from '../../../shop/Data/products';

const division = divisionBreakdown;
const categories = categoriesBreakdown;

export default function EditProductDialog({
  isLoading,
  onHide,
  saveProduct,
  selectedProduct,
}) {
  const toastRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [editedProduct, setEditedProduct] = useState(selectedProduct || {}); // Local state
  const [newSize, setNewSize] = useState({ name: '', value: 0 });

  // Update local state instead of global state
  const updateItem = (field, value) => {
    setEditedProduct((prev) => {
      const updatedProduct = { ...prev, [field]: value };

      // Reset child_category when parent_category changes
      if (field === 'parent_category') {
        updatedProduct.child_category = '';
      }

      return updatedProduct;
    });
  };

  const addSize = () => {
    if (newSize.name && newSize.value >= 0) {
      const updatedSizes = [...(editedProduct.sizes || []), newSize];
      updateItem('sizes', updatedSizes);
      setNewSize({ name: '', value: 0 });
    }
  };

  const removeSize = (index) => {
    const updatedSizes = editedProduct.sizes.filter((_, i) => i !== index);
    updateItem('sizes', updatedSizes);
  };

  const handleSave = () => {
    saveProduct(editedProduct); // Pass local state to save function
    onHide(); // Close the dialog
  };

  const deleteImage = async (imageUrl) => {
    try {
      if (!imageUrl) {
        console.error('Invalid image URL');
        return;
      }

      // Uncomment to actually delete from Firebase
      // const storage = getStorage(app);
      // const decodedUrl = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]);
      // const storageRef = ref(storage, decodedUrl);
      // await deleteObject(storageRef);

      // Correct update logic
      const newImageArr = editedProduct.images.filter(
        (img) => img !== imageUrl,
      );
      updateItem('images', newImageArr);

      toastRef.current?.show({
        severity: 'success',
        summary: 'Image deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toastRef.current?.show({
        severity: 'error',
        summary: 'Failed to delete image.',
      });
    }
  };

  const uploadImages = async (event) => {
    const files = event.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const storage = getStorage(app);
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `loomstore/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          },
        );
      });
    });

    try {
      const urls = await Promise.all(uploadPromises);
      // updateItem({ target: { value: [...editedProduct.images, ...urls] } }, "images");
      updateItem('images', [...editedProduct.images, ...urls]);
    } catch (error) {
      console.error('Upload failed:', error);
      toastRef.current?.show({
        severity: 'error',
        summary: 'Image upload failed!',
      });
    }
    setUploading(false);
  };

  return (
    <Dialog
      header="Edit Product"
      className="w-[90%] lg:w-[50%]"
      visible={!!editedProduct}
      modal
      onHide={onHide}
    >
      <div className="  ">
        <Toast ref={toastRef} />
        <div className="flex flex-col gap-3">
          <InputText
            value={editedProduct.name}
            onChange={(e) => updateItem('name', e.target.value)}
          />
          <InputText
            value={editedProduct.ready_in}
            onChange={(e) => updateItem('ready_in', e.target.value)}
            placeholder="Ready in..."
          />
          <InputNumber
            value={editedProduct.price}
            onValueChange={(e) => updateItem('price', e.value)}
          />
          <InputNumber
            value={editedProduct.discount}
            onValueChange={(e) => updateItem('discount', e.value)}
            placeholder="Discount"
            suffix="%"
          />
          <InputTextarea
            value={editedProduct.description}
            onChange={(e) => updateItem(e, 'description')}
            placeholder="Product Description"
            rows={3}
          />
          {/* <Dropdown
            value={editedProduct.parent_category}
            options={Object.keys(categories)}
            onChange={(e) => updateItem('parent_category', e.value)}
            placeholder="Select Parent Category"
          /> */}

          {/* <Dropdown
            value={editedProduct.child_category}
            options={
              editedProduct.parent_category
                ? categories[editedProduct.parent_category]
                : []
            }
            onChange={(e) => updateItem('child_category', e.value)}
            placeholder="Select Child Category"
            disabled={!editedProduct.parent_category}
          /> */}

          <Dropdown
            value={editedProduct.grandparent_category}
            options={Object.keys(division)}
            onChange={(e) => updateItem('grandparent_category', e.value)}
            placeholder="Select Category Division"
            className="w-full capitalize"
          />
          <Dropdown
            value={editedProduct.parent_category}
            options={
              editedProduct.grandparent_category
                ? division[editedProduct.grandparent_category]
                : []
            }
            onChange={(e) => updateItem('parent_category', e.value)}
            placeholder="Select Parent Category"
            className="w-full"
            disabled={!editedProduct.grandparent_category}
          />
          <Dropdown
            value={editedProduct.child_category}
            options={
              editedProduct.parent_category
                ? categories[editedProduct.parent_category]
                : []
            }
            onChange={(e) => updateItem('child_category', e.value)}
            placeholder="Select Child Category"
            className="w-full"
            disabled={!editedProduct.parent_category}
          />

          <div>
            <h3 className="text-lg font-semibold text-black mt-1">Sizes</h3>
            <p className="text-xs">
              Add sizes and how much it should add on prices
            </p>
            <div className="flex flex-col gap-2 lg:flex-row">
              <InputText
                value={newSize.name}
                onChange={(e) =>
                  setNewSize({ ...newSize, name: e.target.value })
                }
                placeholder="Size Name"
              />
              <InputNumber
                value={newSize.value}
                onValueChange={(e) =>
                  setNewSize({ ...newSize, value: e.value })
                }
                placeholder="Size Value"
              />
              <button
                onClick={addSize}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add
              </button>
            </div>
            <ul>
              {editedProduct?.sizes?.map((size, index) => (
                <li key={index} className="flex justify-between">
                  {size.name}: {size.value}
                  <button
                    onClick={() => removeSize(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <FileUpload
            mode="advanced"
            accept="image/*"
            customUpload
            uploadHandler={uploadImages}
            chooseLabel={
              uploading ? <span>{<Spinner />}</span> : 'Select Images'
            }
            uploadLabel={
              uploading ? <span>{<Spinner />}</span> : 'Confirm Upload'
            }
            cancelLabel="Discard All"
            multiple
            className="mt-2 w-full"
            disabled={uploading}
            uploadOptions={{
              style: { backgroundColor: '#16a34a', color: 'white' },
            }} // Green button
            cancelOptions={{
              style: { backgroundColor: '#dc2626', color: 'white' },
            }}
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {editedProduct.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="w-24 h-24 rounded-lg object-cover shadow-md"
                />
                <button
                  onClick={() => deleteImage(image)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-6 w-full p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
          disabled={isLoading || uploading}
        >
          {isLoading ? (
            <ProgressSpinner
              style={{ width: '20px', height: '20px' }}
              strokeWidth="4"
              animationDuration=".5s"
            />
          ) : (
            'Save Changes'
          )}
        </button>
        <button
          onClick={onHide}
          className="mt-2 w-full p-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
        >
          Cancel
        </button>
      </div>
    </Dialog>
  );
}
