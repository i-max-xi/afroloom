import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  color_variant_options,
  divisionBreakdown,
} from '../../../shop/Data/products';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

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
  const [newPart, setNewPart] = useState('');
  const [newCustomSize, setNewCustomSize] = useState('');

  //show hide
  const [showColors, setShowColors] = useState(false);
  const [showParts, setShowParts] = useState(false);
  const [showCustomSize, setShowCustomSizes] = useState(false);

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

  const addPart = () => {
    if (newPart) {
      const updatedParts = [...(editedProduct.parts || []), newPart];
      updateItem('parts', updatedParts);
      setNewPart('');
    }
  };

  const removePart = (index) => {
    const updatedPart = editedProduct.parts.filter((_, i) => i !== index);
    updateItem('parts', updatedPart);
  };

  const addCustomize = () => {
    if (newCustomSize) {
      const updatedCustomSize = [
        ...(editedProduct.custom_sizes || []),
        newCustomSize,
      ];
      updateItem('custom_sizes', updatedCustomSize);
      setNewCustomSize('');
    }
  };

  const removeCustomSize = (index) => {
    const updatedCustomSize = editedProduct.custom_sizes.filter(
      (_, i) => i !== index,
    );
    updateItem('custom_sizes', updatedCustomSize);
  };

  const addColor = (newColor) => {
    if (newColor) {
      const updatedNewColor = [
        ...(editedProduct.color_variants || []),
        newColor,
      ];
      updateItem('color_variants', updatedNewColor);
      // setNewCustomSize("");
    }
  };

  const removeColor = (index) => {
    const updatedColor = editedProduct.color_variants.filter(
      (_, i) => i !== index,
    );
    updateItem('color_variants', updatedColor);
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

          <Dropdown
            value={editedProduct?.grandparent_category}
            options={Object.keys(division)}
            onChange={(e) => updateItem('grandparent_category', e.value)}
            placeholder="Select Category Division"
            className="w-full capitalize"
          />
          <Dropdown
            value={editedProduct?.parent_category}
            options={
              editedProduct?.grandparent_category
                ? division[editedProduct?.grandparent_category]
                : []
            }
            onChange={(e) => updateItem('parent_category', e.value)}
            placeholder="Select Parent Category"
            className="w-full"
            disabled={!editedProduct.grandparent_category}
          />
          <Dropdown
            value={editedProduct?.child_category}
            options={
              editedProduct?.parent_category
                ? categories[editedProduct?.parent_category]
                : []
            }
            onChange={(e) => updateItem('child_category', e.value)}
            placeholder="Select Child Category"
            className="w-full"
            disabled={!editedProduct?.parent_category}
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

          <section>
            <div className="flex justify-between w-full">
              <h3 className="text-lg font-semibold text-black mt-1">
                Custom Sizes
              </h3>
              <button
                onClick={() => setShowCustomSizes(!showCustomSize)}
                className="p-2"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {showCustomSize ? (
                    <motion.div
                      key="up"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiChevronUp />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="down"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiChevronDown />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <p className="text-xs">
              Input parameters customers would fill for custom size. eg. Bust.
              All Mesuremnts would be in inches{' '}
            </p>
            <AnimatePresence initial={false}>
              {showCustomSize && (
                <motion.div
                  key="customsize"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className=""
                >
                  <div className="flex  lg:flex-row flex-col gap-2 ">
                    <InputText
                      value={newCustomSize}
                      onChange={(e) => setNewCustomSize(e.target.value)}
                      placeholder="parameter name"
                    />

                    <button
                      onClick={() => addCustomize()}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      Add
                    </button>
                  </div>{' '}
                </motion.div>
              )}
            </AnimatePresence>

            <ul className="mt-4">
              {editedProduct?.custom_sizes?.map((custom, index) => (
                <li key={index} className="flex justify-between">
                  <p>{custom}</p>
                  <button
                    onClick={() => removeCustomSize(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex justify-between w-full">
              <h3 className="text-lg font-semibold text-black mt-1">
                Color Variants
              </h3>
              <button
                onClick={() => setShowColors(!showColors)}
                className="p-2"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {showColors ? (
                    <motion.div
                      key="up"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiChevronUp />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="down"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiChevronDown />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <p className="text-xs">Select or add color variants</p>
            <AnimatePresence initial={false}>
              {showColors && (
                <motion.div
                  key="colors"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-y-auto max-h-[20rem]"
                >
                  <div className="grid grid-cols-4 gap-4">
                    {color_variant_options?.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => addColor(color)}
                        className="flex flex-col items-center space-y-1"
                      >
                        <div
                          className="rounded-full h-10 w-10 border"
                          style={{ backgroundColor: color.value }}
                        ></div>
                        <p className="text-sm">{color.name}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <ul className="mt-4">
              {editedProduct?.color_variants?.map((color, index) => (
                <li key={index} className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <p
                      className="rounded-full h-4 w-4 border"
                      style={{ backgroundColor: color.value }}
                    ></p>{' '}
                    <p>{color.name}</p>
                  </div>
                  <button
                    onClick={() => removeColor(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex justify-between w-full">
              <h3 className="text-lg font-semibold text-black mt-1">
                Parts of clothing
              </h3>
              <button onClick={() => setShowParts(!showParts)} className="p-2">
                <AnimatePresence mode="wait" initial={false}>
                  {showParts ? (
                    <motion.div
                      key="up"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiChevronUp />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="down"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiChevronDown />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <p className="text-xs">Input parts of clothing. eg. Hands, Body </p>
            <AnimatePresence initial={false}>
              {showParts && (
                <motion.div
                  key="parts"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className=""
                >
                  <div className="flex  lg:flex-row flex-col gap-2 ">
                    <InputText
                      value={newPart}
                      onChange={(e) => setNewPart(e.target.value)}
                      placeholder="Part Name"
                    />

                    <button
                      onClick={() => addPart()}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      Add
                    </button>
                  </div>{' '}
                </motion.div>
              )}
            </AnimatePresence>

            <ul className="mt-4">
              {editedProduct?.parts?.map((part, index) => (
                <li key={index} className="flex justify-between">
                  <p>{part}</p>
                  <button
                    onClick={() => removePart(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>

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
