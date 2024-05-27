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

const WigConfirmation = ({
  total,
  currencySymbol,
  setShowConfirmation,
  readyBy,
  name,
  modelImage,
  customSizeValues,
  selectedColor,
  allSpecifications,
}) => {
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [special, setSpecial] = useState("");

  const [readyByCount, setReadyByCount] = useState(readyBy);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setReadyByCount((prevCount) => prevCount + 3);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      setReadyByCount((prevCount) => prevCount - 3);
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
          quantity: count,
          customSizeValues: customSizeValues,
          selectedColor: selectedColor,
          specialRequests: special,
          allSpecifications,

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
        ref={componentRef}
        modelImage={modelImage}
        customSizeValues={customSizeValues}
        allSpecifications={allSpecifications}
        name={name}
        count={count}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        special={special}
        setSpecial={setSpecial}
        selectedColor={selectedColor}
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
      allSpecifications,
      modelImage,
      name,
      count,
      handleDecrement,
      handleIncrement,
      special,
      setSpecial,

      selectedColor,
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
            <li className="list-group-item d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex">
                <div className="m-1">
                  <span className="fw-bold">Name: </span> {name} <br />
                  <span className="fw-bold">Selected Color: </span>
                  {selectedColor || "None Selected"}
                  {/* <span className="fw-bold">
                    Price: {currencySymbol}
                    {total}
                  </span> */}
                  <br />
                  <span className="fw-bold">Price: </span>
                  {currencySymbol + (currencyFactor * total * count).toFixed()}
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

            <li className="list-group-item d-flex flex-column justify-content-between mt-3 rounded">
              <h5 className="text-center">Details</h5>
              <div className="d-flex flex-column gap-2">
                {allSpecifications.map(
                  (item, index) =>
                    item.value && (
                      <div key={index}>
                        <div className="d-flex justify-content-between">
                          <span className="text-capitalize fw-bold">
                            {item.title}:
                          </span>
                          <span>{item.value}</span>
                        </div>

                        {index !== allSpecifications.length - 1 && <Divider />}
                      </div>
                    )
                )}
              </div>
            </li>
          </ul>

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
                Any scalp sensitivity and/or other issues we should know about?
              </label>
            </span>
          </p>
        </div>
      </div>
    );
  }
);

export default WigConfirmation;
