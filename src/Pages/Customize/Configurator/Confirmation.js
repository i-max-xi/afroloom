import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { parseTitle } from "../../../utils/functions";
import { Divider } from "primereact/divider";

const Confirmation = ({
  total,
  currencySymbol,
  setShowConfirmation,
  readyBy,
  name,
  selectedParts,
  selectedSize,
  modelImage,
  customSizeValues,
  height,
}) => {
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [special, setSpecial] = useState("");

  const [readyByCount, setReadyByCount] = useState(readyBy)


  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setReadyByCount((prevCount) => prevCount + 3);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      setReadyByCount((prevCount) => prevCount + 3);
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          readyBy: readyByCount,
          name,
          selectedSize,
          quantity: count,
          selectedParts: selectedParts,
          customSizeValues: customSizeValues,
          height: height,
          specialRequests: special,
          // Other properties specific to your object
        },
      ];

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
        sticky: true,
      });
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
        readyBy={readyByCount}
        selectedParts={selectedParts}
        selectedSize={selectedSize}
        ref={componentRef}
        modelImage={modelImage}
        customSizeValues={customSizeValues}
        height={height}
        name={name}
        count={count}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        special={special}
        setSpecial={setSpecial}
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
            Confirm Order
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
      // currencySymbol,
      readyBy,
      selectedParts,
      selectedSize,
      modelImage,
      customSizeValues,
      height,
      name,
      count,
      handleDecrement,
      handleIncrement,
      special,
      setSpecial
    },
    ref
  ) => {

    const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
    const currencyFactor = useSelector((state) => state.currencySymbol.factor);

    return (
      <div ref={ref} className="row all-confirmation-info">
        <div className="col-md-6">
          <p className="h5 mt-3 mb-5 model-confirm-image">
            <img src={modelImage} alt="model img" width="80%" />
          </p>
          <ul className="list-group">
            <li
              className="list-group-item d-flex justify-content-between align-items-center mt-3"
              data-aos="fade-up"
            >
              <div className="d-flex">
                <div className="m-1">
                  <span className="fw-bold">Name: </span> {name} <br />
                  <span className="fw-bold">Selected Size: </span>
                  {selectedSize || "None Selected"}
                  {/* <span className="fw-bold">
                    Price: {currencySymbol}
                    {total}
                  </span> */}
                  <br />
                  <span className="fw-bold">Price: </span>
                  {currencySymbol + (currencyFactor * total * count).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="d-flex mb-3">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <span className="mx-2">{count}</span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
                <span className="fw-bold">Quantity: {count}</span>
              </div>
            </li>
          </ul>

          <div>
            <div className="custom-size-values">
              <p className="h5 mt-4">Client's custom size values:</p>
              {!height && Object.entries(customSizeValues).length === 0 ? (
                <span>N/A</span>
              ) : (
                <>
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
                </>
              )}
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
                placeholder="This may attract extra cost"
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
            {selectedParts.map(
              (part, index) =>
                // Check if the part has color or texture before rendering
                (part.color || part.texture) && (
                  <div key={index} className="mb-4">
                    <h4 className="text-capitalize">{parseTitle(part.name)}</h4>
                    <p>
                      {part.color && (
                        <>
                          Color
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
                        </>
                      )}
                    </p>

                    <p>
                      {part.texture && (
                        <>
                          Texture:
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
                        </>
                      )}
                    </p>

                    {index !== selectedParts.length - 1 && <Divider />}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Confirmation;
