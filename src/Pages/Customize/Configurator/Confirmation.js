import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";

import { app } from "../../../firebase"; // Import your firebase app object
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { set3DItemDetails, setItemDataSheet } from "../../../Redux/store";
import { useDispatch } from "react-redux";

const Confirmation = ({
  total,
  currencySymbol,
  setShowConfirmation,
  readyBy,
  name,
  weight,
  selectedParts,
  selectedSize,
  modelImage,
  customSizeValues,
  height,
}) => {
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state
  const dispatch = useDispatch();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const storage = getStorage(app);

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const image = await html2canvas(componentRef.current, {
        useCORS: true, // Ensure cross-origin images are captured
      });

      // Convert the captured image into a data URL
      const imageDataURL = image.toDataURL("image/png");

      // Upload the captured image to Firebase Storage
      const storageRef = ref(storage, `Order_images/${Date.now()}.png`);
      await uploadString(storageRef, imageDataURL, "data_url");

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Create formData
      const formData = [
        {
          price: total,
          modelImage,
          currencySymbol,
          readyBy,
          weight,
          name,
          selectedSize,
          message: "Please use the link to access the client's order",
          // Other properties specific to your object
        },
      ];

      // Send the formData to Formspree
      // const response = await fetch(process.env.REACT_APP_formSpree, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      dispatch(set3DItemDetails(formData));
      dispatch(setItemDataSheet(downloadURL));

      setIsLoading(false);
      toast.current.show({
        severity: "info",
        summary: "Order Confirmed",
        detail: (
          <div>
            <p>Thank you for your order!</p>
            <p>
              Proceed to{" "}
              <Link to="/customize-checkout" className="btn btn-success">
                Checkout
              </Link>
            </p>
          </div>
        ),
        life: 10000, // Duration in milliseconds
      });

      // else {
      //   setIsLoading(false);
      //   toast.current.show({
      //     severity: "error",
      //     summary: "Order Confirmation Failed",
      //     detail: "Failed to confirm order. Please try again.",
      //     life: 3000,
      //   });
      // }
    } catch (error) {
      setIsLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          "An error occurred while confirming the order. Please try again later.",
        life: 3000,
      });
    }
  };

  return (
    <div className="container confirmation-page">
      <Toast ref={toast} position="center" />{" "}
      {/* Add the Toast component here */}
      <h1 className="mt-4">Order Confirmation</h1>
      <OrderDetail
        total={total}
        currencySymbol={currencySymbol}
        readyBy={readyBy}
        selectedParts={selectedParts}
        selectedSize={selectedSize}
        ref={componentRef}
        modelImage={modelImage}
        customSizeValues={customSizeValues}
        height={height}
      />
      <div className="container justify-content-center">
        <div className="d-flex">
          <button className="btn btn-outline-success" onClick={handlePrint}>
            Download Copy
          </button>
          <button
            disabled={isLoading}
            className="btn btn-success mx-3 position-relative"
            onClick={handleFormSubmit}
          >
            <span className="spinner-container">
              {isLoading && (
                <ProgressSpinner
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  strokeWidth="8"
                  fill="var(--surface-ground)"
                  className="position-absolute top-50 start-50 translate-middle"
                />
              )}
            </span>
            Confirm Order{" "}
          </button>
        </div>

        <p className="h5 mt-4">Thank you for your order!</p>
      </div>
      <div className="d-flex justify-content-center align-items-center m-5">
        Not Done ?{" "}
        <button
          className="btn btn-info text-white mx-3"
          onClick={() => setShowConfirmation(false)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export const OrderDetail = React.forwardRef(
  (
    {
      total,
      currencySymbol,
      readyBy,
      selectedParts,
      selectedSize,
      modelImage,
      customSizeValues,
      height,
    },
    ref
  ) => {
    const [special, setSpecial] = useState("");

    return (
      <div ref={ref} className="row">
        <div className="col-md-6">
          <p className="h5 mt-3 mb-5">
            <img src={modelImage} alt="model img" width="80%" />
          </p>
          <p className="h5 mt-4">
            Selected Size: {selectedSize || "None Selected"}
          </p>
          <p className="h5 mt-3">
            Price: {currencySymbol}
            {total}
          </p>
          <div>
            <div className="custom-size-values">
              <p className="h5 mt-4">Client's custom size values:</p>
              {height && (
                <div>
                  <strong className="text-warning">Your Height:</strong>
                  {height + ""} cm
                </div>
              )}

              <ul>
                {Object.entries(customSizeValues).map(([label, value]) => (
                  <li key={label}>
                    <strong>{label}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p>Estimated time to make this order: {readyBy} days</p>

          <p className="mt-5">
            <span className="p-float-label">
              <InputTextarea
                autoResize
                id="special-request"
                value={special}
                onChange={(e) => setSpecial(e.target.value)}
                rows={5}
                cols={50}
              />
              <label htmlFor="special-request">
                Any special request to your designer?
              </label>
            </span>
          </p>
        </div>
        <div className="col-md-6">
          <div className="mt-4">
            <h2>Information On Parts</h2>
            {selectedParts.map((part, index) => (
              <div key={index} className="mb-4">
                <h4>{part.name}</h4>
                <p>
                  Color:{" "}
                  {part.color ? (
                    <div
                      className="color-display"
                      style={{
                        backgroundColor: part.color,
                        width: "20px",
                        height: "20px",
                        border: "1px solid black",
                        borderRadius: "4rem",
                        display: "inline-block",
                        marginLeft: "1rem",
                      }}
                    ></div>
                  ) : (
                    <span>None Selected</span>
                  )}
                </p>

                <p>
                  Texture:{" "}
                  {part.texture ? (
                    <p>
                      <img
                        src={part.texture}
                        alt="Selected Texture"
                        style={{
                          maxWidth: "70px",
                          maxHeight: "70px",
                          display: "inline-block",
                        }}
                      />
                    </p>
                  ) : (
                    <span>None Selected</span>
                  )}
                </p>

                {index !== selectedParts.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Confirmation;
