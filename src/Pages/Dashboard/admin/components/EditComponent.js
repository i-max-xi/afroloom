import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from "../../../../firebase";
import { Dialog } from "primereact/dialog";
import { Spinner } from "../../../shop/components/spinner";
import { categoriesBreakdown } from "../../../shop/Data/products";



const categories = categoriesBreakdown

export default function EditProductDialog({ isLoading, onHide, saveProduct, selectedProduct, updateItem }) {
  const toastRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const [newSize, setNewSize] = useState({ name: "", value: 0 });

  const addSize = () => {
    if (newSize.name && newSize.value >= 0) {
      updateItem({ ...selectedProduct, sizes: [...selectedProduct.sizes, newSize] });
      setNewSize({ name: "", value: 0 });
    }
  };

  const removeSize = (index) => {
    updateItem({ sizes: selectedProduct.sizes.filter((_, i) => i !== index) });
  };

  const deleteImage = async (imageUrl) => {
    console.log({imageUrl})
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
      const newImageArr = selectedProduct?.images?.filter((img) => img !== imageUrl)
      console.log({newImageArr})
      updateItem({ target: { name: "images", value: newImageArr } });

  
      toastRef.current?.show({ severity: "success", summary: "Image deleted successfully!" });
    } catch (error) {
      console.error("Error deleting image:", error);
      toastRef.current?.show({ severity: "error", summary: "Failed to delete image." });
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
      updateItem({ target: { value: [...selectedProduct.images, ...urls] } }, "images");
    } catch (error) {
      console.error("Upload failed:", error);
      toastRef.current?.show({ severity: "error", summary: "Image upload failed!" });
    }
    setUploading(false);
  };

  return (
    <Dialog header="Edit Product" className="w-[90%] lg:w-[50%]" visible={!!selectedProduct} modal onHide={onHide}>
    <div className="  ">
      <Toast ref={toastRef} />
      <div className="flex flex-col gap-3">
        <InputText value={selectedProduct.name} onChange={(e) => updateItem(e, "name")} placeholder="Product Name" />
        <InputText value={selectedProduct.ready_in} onChange={(e) => updateItem(e, "ready_in")} placeholder="Ready in..." />
        <InputNumber value={selectedProduct.price} onValueChange={(e) => updateItem(e, "price")} placeholder="Price" prefix="GH₵ " />
        <InputNumber value={selectedProduct.discount} onValueChange={(e) => updateItem(e, "discount")} placeholder="Discount" suffix="%" />
        <InputTextarea value={selectedProduct.description} onChange={(e) => updateItem(e, "description")} placeholder="Product Description" rows={3} />
        <Dropdown value={selectedProduct.parent_category} options={Object.keys(categories)} onChange={(e) => updateItem(e, "parent_category")} placeholder="Select Parent Category" />
        <Dropdown value={selectedProduct.child_category} options={selectedProduct.parent_category ? categories[selectedProduct.parent_category] : []} onChange={(e) => updateItem(e, "child_category")} placeholder="Select Child Category" disabled={!selectedProduct.parent_category} />
        
    
        <div>
            <h3 className="text-lg font-semibold text-black mt-1">Sizes</h3>
            <p className="text-xs">Add sizes and how much it should add on prices</p>
            <div className="flex flex-col gap-2 lg:flex-row">
                <InputText value={newSize.name} onChange={(e) => setNewSize({ ...newSize, name: e.target.value })} placeholder="Size Name" />
                <InputNumber value={newSize.value} onValueChange={(e) => setNewSize({ ...newSize, value: e.value })} placeholder="Size Value" />
                <button onClick={addSize} className="bg-blue-500 text-white p-2 rounded">Add</button>
            </div>
            <ul>
                {selectedProduct.sizes.map((size, index) => (
                <li key={index} className="flex justify-between">
                    {size.name}: {size.value}
                    <button onClick={() => removeSize(index)} className="text-red-500">Remove</button>
                </li>
                ))}
            </ul>
        </div>
        <FileUpload
        mode="advanced" 
        accept="image/*" 
        customUpload uploadHandler={uploadImages}
        chooseLabel={uploading ? <span>{<Spinner />}</span> : "Select Images"}
        uploadLabel={uploading ? <span>{<Spinner />}</span> : "Confirm Upload" }
        cancelLabel="Discard All" 
        multiple
        className="mt-2 w-full"
        disabled={uploading}  
        uploadOptions={{ style: { backgroundColor: "#16a34a", color: "white" } }} // Green button
        cancelOptions={{ style: { backgroundColor: "#dc2626", color: "white" } }} />
        
        <div className="flex flex-wrap gap-2 mt-2">
        {selectedProduct.images.map((image, index) => (
        <div key={index} className="relative">
            <img src={image} alt={`Uploaded ${index}`} className="w-24 h-24 rounded-lg object-cover shadow-md" />
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
      <button onClick={saveProduct} className="mt-6 w-full p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white" disabled={isLoading || uploading}>
        {isLoading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" animationDuration=".5s" /> : "Save Changes"}
      </button>
      <button onClick={onHide} className="mt-2 w-full p-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black">Cancel</button>
    </div>
    </Dialog>
  );
}
