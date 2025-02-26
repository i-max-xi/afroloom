import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../../../firebase";
import { Dialog } from "primereact/dialog";

const categories = {
  "Women's Clothing": ["Formal Wear", "African Print Dresses", "Casual Wear", "Unisex"],
  "Men's Clothing": ["African Print Shirts", "Casual Wear", "Formal Wear", "Unisex"],
  "Children's Clothing": [
    "Boys’ Outfits (Traditional and Casual)",
    "Girls’ Outfits (Traditional and Casual)",
    "Matching Family Sets",
    "School Uniforms",
    "Unisex"
  ],
};

export default function EditProductDialog({ isLoading, onHide, saveProduct, selectedProduct, updateItem }) {
  const toastRef = useRef(null);
  const [uploading, setUploading] = useState(false);

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
    <Dialog header="Edit Product" className="w-[50%]" visible={!!selectedProduct} modal onHide={onHide}>
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
        
        <FileUpload mode="advanced" accept="image/*" customUpload uploadHandler={uploadImages} chooseLabel="Select Images" multiple className="mt-2 w-full" disabled={uploading} />
        
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedProduct.images.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded ${index}`} className="w-24 h-24 rounded-lg object-cover shadow-md" />
          ))}
        </div>
      </div>
      <button onClick={saveProduct} className="mt-6 w-full p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white" disabled={isLoading}>
        {isLoading ? <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" animationDuration=".5s" /> : "Save Changes"}
      </button>
      <button onClick={onHide} className="mt-2 w-full p-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black">Cancel</button>
    </div>
    </Dialog>
  );
}
