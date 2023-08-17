import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
// import { storage } from '../../../firebase.js'; // Import your 'storage' instance
import html2canvas from "html2canvas";

const Confirmation = ({
  price,
  estimatedShippingTime,
  readyBy,
  selectedParts, // Array containing selected parts with their color and texture information
  selectedSize, // The selected size
}) => {
  
  const [capturedImageURL, setCapturedImageURL] = useState(""); // State to hold the captured image URL


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleFormSubmit = async () => {
    try {
      // ... (existing code)
  
      // Capture the component as an image using html2canvas
      const image = await html2canvas(componentRef.current, {
        useCORS: true, // Ensure cross-origin images are captured
      });
  
      // Convert the captured image into a data URL
      const imageDataURL = image.toDataURL("image/png");
  
      setCapturedImageURL(imageDataURL);

      // Create a reference to the Firebase storage bucket
      // const storageRef = storage.ref();
  
      // // Create a reference to a unique image file in Firebase storage
      // const imageRef = storageRef.child(`orderConfirmation_${Date.now()}.png`);
  
      // // Upload the data URL to Firebase storage
      // const snapshot = await imageRef.putString(imageDataURL, "data_url");
  
      // // Get the download URL of the uploaded image
      // const downloadURL = await snapshot.ref.getDownloadURL();
  
      // Create formData including the downloadURL
      const formData = {
        price,
        estimatedShippingTime,
        readyBy,
        selectedParts,
        selectedSize,
        // downloadURL,
        capturedImageURL,
      };
  
      // Send the formData to Formspree
      const response = await fetch("https://formspree.io/f/xrgwpakw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Order confirmed. Thank you!");
      } else {
        alert("Failed to confirm order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while confirming the order. Please try again later.");
    }
  };
  

  return (
    <div className="container confirmation-page">
      <h1 className="mt-4">Order Confirmation</h1>

      <OrderDetail
        price={price}
        estimatedShippingTime={estimatedShippingTime}
        readyBy={readyBy}
        selectedParts={selectedParts}
        selectedSize={selectedSize}
        ref={componentRef}
      />
      <div className="container justify-content-center">
        <div className="d-flex">
          <button className="btn btn-outline-success" onClick={handlePrint}>
            Download Copy
          </button>
          <button className="btn btn-success" onClick={handleFormSubmit}>
            Confirm Order
          </button>
        </div>

        <p className="h5 mt-4">Thank you for your order!</p>

         {/* Display the captured image */}
        {/* <img
      src={capturedImageURL}
          alt="Captured Order"
          style={{ maxWidth: "100%" }}
        /> */}
      </div>
    </div>
  );
};

export const OrderDetail = React.forwardRef(({ price,
  estimatedShippingTime,
  readyBy,
  selectedParts,
  selectedSize }, ref) => {
  return (
    <div ref={ref} className="row">
    <div className="col-md-6">
      <p className="h5 mt-3 MB-5">CONVERTED 3D INTO IMAGE WILL BE HERE...</p>
      <p className="h5 mt-4">Selected Size: {selectedSize || "N/A"}</p>
      <p className="h5 mt-3">Price: ${price}</p>
      <p>Estimated Shipping Time: {estimatedShippingTime}</p>
      <p>Expected to be Ready By: {readyBy}</p>
    </div>
    <div className="col-md-6">
      <div className="mt-4">
        <h2>Information On Parts</h2>
        {selectedParts.map((part, index) => (
          <div key={index} className="mb-4">
            <h5>{part.name}</h5>
            <p>
              Color:{" "}
              {part.color ? (
                <div
                  className="color-display"
                  style={{
                    backgroundColor: part.color,
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                    marginLeft: "2rem"
                  }}
                ></div>
              ) : (
                <span>N/A</span>
              )}
            </p>

            <p>Texture: {part.texture ? (
              <p>
                <img
                  src={part.texture}
                  alt="Selected Texture"
                  style={{ maxWidth: "70px", maxHeight: "70px" ,display: "inline-block" }}
                />
              </p>
            ) : (
              <span>N/A</span>
            )}</p>
            
            {index !== selectedParts.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
})


export default Confirmation;
