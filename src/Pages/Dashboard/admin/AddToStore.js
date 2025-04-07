import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../../../firebase';
import AllServices from '../../../Services/usersService';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { v4 as uuidv4 } from 'uuid';
import {
  categoriesBreakdown,
  color_variant_options,
  divisionBreakdown,
} from '../../shop/Data/products';
import { generateSearchKeywords } from '../../../utils/functions';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

const division = divisionBreakdown;
const categories = categoriesBreakdown;

export default function AddProduct() {
  const [product, setProduct] = useState({
    id: uuidv4(),
    name: '',
    price: 0,
    ready_in: '7 days',
    color_variants: [],
    custom_sizes: [],
    parts: [],
    images: [],
    description: '',
    parent_category: null,
    child_category: null,
    discount: 0,
    sizes: [
      {
        name: 'S',
        value: 0,
      },
      {
        name: 'M',
        value: 0,
      },
      {
        name: 'L',
        value: 0,
      },
      {
        name: 'XL',
        value: 0,
      },
      {
        name: '2XL',
        value: 0,
      },
      {
        name: '3XL',
        value: 0,
      },
    ],
  });

  const toastRef = useRef(null);
  const [newSize, setNewSize] = useState({ name: '', value: 0 });
  const [newPart, setNewPart] = useState('');
  const [newCustomSize, setNewCustomSize] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  //show hide
  const [showColors, setShowColors] = useState(false);
  const [showParts, setShowParts] = useState(false);
  const [showCustomSize, setShowCustomSizes] = useState(false);

  const handleChange = (e, field) => {
    setProduct({ ...product, [field]: e.value || e.target.value });
  };

  const addSize = () => {
    if (newSize.name && newSize.value >= 0) {
      setProduct({ ...product, sizes: [...product.sizes, newSize] });
      setNewSize({ name: '', value: 0 });
    }
  };

  const removeSize = (index) => {
    setProduct({
      ...product,
      sizes: product.sizes.filter((_, i) => i !== index),
    });
  };

  const addPart = () => {
    if (newPart) {
      setProduct({ ...product, parts: [...product.parts, newPart] });
      setNewPart('');
    }
  };

  const removePart = (index) => {
    setProduct({
      ...product,
      parts: product.parts.filter((_, i) => i !== index),
    });
  };

  const addCustomSize = () => {
    if (newCustomSize) {
      setProduct({
        ...product,
        custom_sizes: [...product.custom_sizes, newCustomSize],
      });
      setNewCustomSize('');
    }
  };

  const removeCustomSize = (index) => {
    setProduct({
      ...product,
      custom_sizes: product.custom_sizes.filter((_, i) => i !== index),
    });
  };

  const addColor = (newColor) => {
    if (newColor.name && newColor.value !== '') {
      setProduct({
        ...product,
        color_variants: [...product.color_variants, newColor],
      });
    }
  };

  const removeColor = (index) => {
    setProduct({
      ...product,
      color_variants: product.color_variants.filter((_, i) => i !== index),
    });
  };

  const uploadImages = async (event) => {
    const files = event.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const storage = getStorage(app);
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `loomstore/${uuidv4()}-${file.name}`); // Unique filename
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
      setProduct((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch (error) {
      console.error('Upload failed:', error);
      toastRef.current?.show({
        severity: 'error',
        summary: 'Image upload failed!',
      });
    }
    setUploading(false);
  };

  const addProduct = async () => {
    setLoading(true);
    try {
      const searchKeywordsFromName = generateSearchKeywords(product.name);
      const searchKeywordsFromParentCategory = generateSearchKeywords(
        product.parent_category,
      );
      const searchKeywordsFromChildCategory = generateSearchKeywords(
        product.child_category,
      );
      const searchKeywords = [
        ...searchKeywordsFromName,
        ...searchKeywordsFromParentCategory,
        ...searchKeywordsFromChildCategory,
      ];
      product.search_keywords = searchKeywords;
      await AllServices.addProduct(product);
      toastRef.current.show({
        severity: 'success',
        summary: 'Product added successfully!',
      });
      setProduct({
        id: uuidv4(),
        name: '',
        price: 0,
        ready_in: '',
        color_variants: [],
        parts: [],
        custom_sizes: [],
        images: [],
        description: '',
        grandparent_category: null,
        parent_category: null,
        child_category: null,
        discount: 0,
        sizes: [],
      });
    } catch (error) {
      setLoading(false);
      console.error('Error adding product:', error);
      toastRef.current.show({
        severity: 'error',
        summary: 'Failed to add product.',
      });
    }
    setLoading(false);
  };

  const deleteImage = async (imageUrl) => {
    try {
      if (!imageUrl) {
        console.error('Invalid image URL');
        return;
      }

      // Remove the image from state after successful deletion
      const newImageArr = product?.images?.filter((img) => img !== imageUrl);
      setProduct({ target: { name: 'images', value: newImageArr } });

      setProduct({
        ...product,
        images: newImageArr,
      });

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

  return (
    <motion.div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <Toast ref={toastRef} />

      <h2 className="text-2xl font-bold mb-4 text-black">Add New Product</h2>
      <div className="flex flex-col gap-3">
        <InputText
          value={product.name}
          onChange={(e) => handleChange(e, 'name')}
          placeholder="Product Name"
          className="p-inputtext w-full"
        />
        <InputText
          value={product.ready_in}
          onChange={(e) => handleChange(e, 'ready_in')}
          placeholder="Ready in... (e.g.7 days)"
          className="p-inputtext w-full"
        />
        <p className="">
          <label>Price</label>
          <InputNumber
            value={product.price}
            onValueChange={(e) => handleChange(e, 'price')}
            placeholder="Price"
            className="w-full"
            prefix="GH₵ "
          />
        </p>
        <p className="">
          <label>Discount</label>
          <InputNumber
            value={product.discount}
            onValueChange={(e) => handleChange(e, 'discount')}
            placeholder="eg. 10"
            className="w-full"
            suffix="%"
          />
        </p>
        <InputTextarea
          value={product.description}
          onChange={(e) => handleChange(e, 'description')}
          placeholder="Product Description"
          className="p-inputtext w-full"
          rows={3}
        />

        <Dropdown
          value={product.grandparent_category}
          options={Object.keys(division)}
          onChange={(e) => handleChange(e, 'grandparent_category')}
          placeholder="Select Category Division"
          className="w-full capitalize"
        />
        <Dropdown
          value={product.parent_category}
          options={
            product.grandparent_category
              ? division[product.grandparent_category]
              : []
          }
          onChange={(e) => handleChange(e, 'parent_category')}
          placeholder="Select Parent Category"
          className="w-full"
        />
        <Dropdown
          value={product.child_category}
          options={
            product.parent_category ? categories[product.parent_category] : []
          }
          onChange={(e) => handleChange(e, 'child_category')}
          placeholder="Select Child Category"
          className="w-full"
          disabled={!product.parent_category}
        />

        <div>
          <h3 className="text-lg font-semibold text-black mt-1">Sizes</h3>
          <p className="text-xs">
            Add sizes and how much it should add on prices
          </p>
          <div className="flex  lg:flex-row flex-col gap-2 ">
            <InputText
              value={newSize.name}
              onChange={(e) => setNewSize({ ...newSize, name: e.target.value })}
              placeholder="Size Name"
            />
            <InputNumber
              value={newSize.value}
              onValueChange={(e) => setNewSize({ ...newSize, value: e.value })}
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
            {product.sizes.map((size, index) => (
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
            Input parameters customers would fill for custom size. eg. Bust. All
            Mesuremnts would be in inches{' '}
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
                    onClick={() => addCustomSize()}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Add
                  </button>
                </div>{' '}
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="mt-4">
            {product.custom_sizes.map((custom, index) => (
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
            <button onClick={() => setShowColors(!showColors)} className="p-2">
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
                  {color_variant_options.map((color, index) => (
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
            {product.color_variants.map((color, index) => (
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
            {product.parts.map((part, index) => (
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
          chooseLabel="Select Images" // Changes "Upload Images" button text
          uploadLabel="Confirm Upload" // Renames "Upload" button
          cancelLabel="Discard All" // Optional: Rename "Cancel" button
          disabled={uploading}
          multiple
          className="mt-2 w-full"
          uploadOptions={{
            style: { backgroundColor: '#16a34a', color: 'white' },
          }} // Green button
          cancelOptions={{
            style: { backgroundColor: '#dc2626', color: 'white' },
          }}
        />

        <div className="flex flex-wrap gap-2 mt-2">
          {product.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                key={index}
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
        onClick={addProduct}
        className="mt-6 w-full p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white "
        disabled={loading}
      >
        {loading ? (
          <ProgressSpinner
            style={{ width: '20px', height: '20px' }}
            strokeWidth="4"
            animationDuration=".5s"
          />
        ) : (
          'Add Product'
        )}
      </button>
    </motion.div>
  );
}
