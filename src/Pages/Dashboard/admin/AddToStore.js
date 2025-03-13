import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../../firebase";
import AllServices from "../../../Services/usersService";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";
import { categoriesBreakdown } from "../../shop/Data/products";


const categories = categoriesBreakdown



export default function AddProduct() {
  const [product, setProduct] = useState({
    id: uuidv4(),
    name: "",
    price: 0,
    ready_in: "",
    images: [],
    description: "",
    parent_category: null,
    child_category: null,
    discount: 0,
    sizes: [{
      name: "M",
      value: 0
    }],
  });

  const toastRef = useRef(null);
  const [newSize, setNewSize] = useState({ name: "", value: 0 });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    setProduct({ ...product, [field]: e.value || e.target.value });
  };

  const addSize = () => {
    if (newSize.name && newSize.value >= 0) {
      setProduct({ ...product, sizes: [...product.sizes, newSize] });
      setNewSize({ name: "", value: 0 });
    }
  };

  const removeSize = (index) => {
    setProduct({
      ...product,
      sizes: product.sizes.filter((_, i) => i !== index),
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
                "state_changed",
                null,
                (error) => reject(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    });

    try {
        const urls = await Promise.all(uploadPromises);
        setProduct((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch (error) {
        console.error("Upload failed:", error);
        toastRef.current?.show({ severity: "error", summary: "Image upload failed!" });
    }
    setUploading(false);
};


  const addProduct = async () => {
    setLoading(true);
    try {
      await AllServices.addProduct(product);
      toastRef.current.show({ severity: "success", summary: "Product added successfully!" });
      setProduct({
        id: uuidv4(),
        name: "",
        price: 0,
        ready_in: "",
        images: [],
        description: "",
        parent_category: null,
        child_category: null,
        discount: 0,
        sizes: [],
      })
    } catch (error) {
      setLoading(false);
      console.error("Error adding product:", error);
      toastRef.current.show({ severity: "error", summary: "Failed to add product." });
    }
    setLoading(false);
  };

  const deleteImage = async (imageUrl) => {
    try {
      if (!imageUrl) {
        console.error("Invalid image URL");
        return;
      }
  
    //   const storage = getStorage(app);
    //   const decodedUrl = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]); // Extract correct path
    //   const storageRef = ref(storage, decodedUrl);
  
    //   await deleteObject(storageRef);
  
      // Remove the image from state after successful deletion
      const newImageArr = product?.images?.filter((img) => img !== imageUrl)
      setProduct({ target: { name: "images", value: newImageArr } });

      setProduct({
        ...product,
        images: newImageArr,
      });

  
      toastRef.current?.show({ severity: "success", summary: "Image deleted successfully!" });
    } catch (error) {
      console.error("Error deleting image:", error);
      toastRef.current?.show({ severity: "error", summary: "Failed to delete image." });
    }
  };

  return (
    <motion.div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <Toast ref={toastRef} />
      
      <h2 className="text-2xl font-bold mb-4 text-black">Add New Product</h2>
      <div className="flex flex-col gap-3">
      <InputText value={product.name} onChange={(e) => handleChange(e, "name")} placeholder="Product Name" className="p-inputtext w-full" />
      <InputText value={product.ready_in} onChange={(e) => handleChange(e, "ready_in")} placeholder="Ready in... (e.g.7 days)" className="p-inputtext w-full"  />
      <p className="">
        <label>Price</label>
        <InputNumber value={product.price} onValueChange={(e) => handleChange(e, "price")} placeholder="Price" className="w-full" prefix="GH₵ " />
      </p>
      <p className="">
        <label>Discount</label>
        <InputNumber value={product.discount} onValueChange={(e) => handleChange(e, "discount")} placeholder="eg. 10" className="w-full" suffix="%" />
      </p>
      <InputTextarea value={product.description} onChange={(e) => handleChange(e, "description")} placeholder="Product Description" className="p-inputtext w-full" rows={3} />
      
      <Dropdown value={product.parent_category} options={Object.keys(categories)} onChange={(e) => handleChange(e, "parent_category")} placeholder="Select Parent Category" className="w-full" />
      <Dropdown value={product.child_category} options={product.parent_category ? categories[product.parent_category] : []} onChange={(e) => handleChange(e, "child_category")} placeholder="Select Child Category" className="w-full" disabled={!product.parent_category} />
      
      <h3 className="text-lg font-semibold text-black mt-1">Sizes</h3>
      <p className="text-xs">Add sizes and how much it should add on prices</p>
      <div className="flex  lg:flex-row flex-col gap-2 ">
        <InputText value={newSize.name} onChange={(e) => setNewSize({ ...newSize, name: e.target.value })} placeholder="Size Name" />
        <InputNumber value={newSize.value} onValueChange={(e) => setNewSize({ ...newSize, value: e.value })} placeholder="Size Value" />
        <button onClick={addSize} className="bg-blue-500 text-white p-2 rounded">Add</button>
      </div>
      <ul>
        {product.sizes.map((size, index) => (
          <li key={index} className="flex justify-between">
            {size.name}: {size.value}
            <button onClick={() => removeSize(index)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
      
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
        uploadOptions={{ style: { backgroundColor: "#16a34a", color: "white" } }} // Green button
        cancelOptions={{ style: { backgroundColor: "#dc2626", color: "white" } }}
      />
     
        <div className="flex flex-wrap gap-2 mt-2">
        {product.images.map((image, index) => (
          <div key={index} className="relative">
          <img key={index} src={image} alt={`Uploaded ${index}`} className="w-24 h-24 rounded-lg object-cover shadow-md" />
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
      <button onClick={addProduct} className="mt-6 w-full p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white " disabled={loading}>
        {loading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" animationDuration=".5s" /> : "Add Product"}
      </button>
    </motion.div>
  );
}
