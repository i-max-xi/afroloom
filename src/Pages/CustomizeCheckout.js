import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clear3DInfo } from "../Redux/store";

import Top from "../Assets/Headers/Check_Out.jpg";
import LayoutHeaders from "../Components/LayoutHeaders";
import { Link, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { Toast } from "primereact/toast";
import { RadioButton } from "primereact/radiobutton";
import { useReactToPrint } from "react-to-print";
import { parseTitle } from "../utils/functions";
import { Divider } from "primereact/divider";

const CustomizeCheckout = () => {
  const cartItems = useSelector((state) => state.customizedProduct.itemDetails);
  const customizedItemDataSheet = useSelector(
    (state) => state.customizedProduct.itemDataSheet
  );

  const dispatch = useDispatch();
  const toast = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [tel, setTel] = useState("");
  // const [Country, setCountry] = useState(""); // State for shipping country input

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const navigate = useNavigate();

  const count = cartItems[0].quantity;

  const [totalToPay] = useState(
    cartItems.reduce((total, item) => total + item.price * count, 0).toFixed(2)
  );

  const publicKey = process.env.REACT_APP_paystack_publicKey;
  const [payPercenTage, setPayPercentage] = useState(false);

  const totalToPayNumeric = useMemo(() => {
    if (payPercenTage) return parseFloat(0.45 * totalToPay);
    if (!payPercenTage) return parseFloat(totalToPay);
  }, [totalToPay, payPercenTage]);

  const amount = totalToPayNumeric * 100;
  const email = emailAddress;

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount,
    currency: "GHS",
    metadata: {
      firstName,
      lastName,
    },
    publicKey,
    text: "Place Order",
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const sashImages = useMemo(() => {
    if (cartItems[0].uploadedImageLeft) {
      return [
        {
          SashImageLeft: cartItems[0].uploadedImageLeft,
        },
      ];
    }
    if (cartItems[0].uploadedImageLeft && cartItems[0].uploadedImageRight) {
      return [
        {
          SashImageLeft: cartItems[0].uploadedImageLeft,
          SashImageRight: cartItems[0].uploadedImageRight,
        },
      ];
    }
    if (!cartItems[0].uploadedImageLeft && !cartItems[0].uploadedImageRight) {
      return [null];
    }
  }, [cartItems]);

  const onSuccess = (reference) => {
    handlePrint();

    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      // Country: Country,
      city: city,
      tel: tel,
      customizedItemDataSheet: customizedItemDataSheet,
      quantity: count,
      readyBy: cartItems[0].readyBy + "days",
      ...sashImages,
      specialRequest: cartItems[0].specialRequests,
      subject: `New 3D Product Order`,
    };
    // Submit to formspree
    fetch(process.env.REACT_APP_formSpree, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    // Clear the cart after successful payment
  };

  const onClose = () => {
    // Handle when the Paystack dialog is closed
    toast.current.show({
      severity: "info",
      summary: "Payment Cancelled",
      // detail: "Click on cart to checkout item",
    });
  };

  const [isInfoComplete, setIsInfoComplete] = useState(false);

  useEffect(() => {
    // Check if all necessary information is provided
    if (firstName && lastName && emailAddress && tel && city) {
      setIsInfoComplete(true);
    } else {
      setIsInfoComplete(false);
    }
  }, [firstName, lastName, emailAddress, tel, city]);

  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <Toast ref={toast} />

      <div style={{ display: "none" }}>
        <OrderDetail
          total={totalToPayNumeric}
          actualTotal={totalToPay}
          currencySymbol={currencySymbol}
          readyBy={cartItems[0].readyBy}
          selectedParts={cartItems[0].selectedParts}
          selectedSize={cartItems[0].selectedSize}
          ref={componentRef}
          modelImage={cartItems[0].modelImage}
          customSizeValues={cartItems[0].customSizeValues}
          height={cartItems[0].height}
          name={cartItems[0].name}
          count={cartItems[0].quantity}
          specialRequest={cartItems[0].specialRequests}
        />
      </div>

      <div className="container mb-5">
        {cartItems.length !== 0 ? (
          <div className="mt-5 mb-5">
            <h2>Customized Item</h2>
            <ul className="list-group">
              {cartItems.map((selectedItem) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center mt-3"
                  key={selectedItem.id}
                  data-aos="fade-up"
                >
                  <div className="d-flex">
                    <img
                      src={selectedItem.modelImage}
                      alt=""
                      width="100rem"
                      height="100rem"
                    />
                    <div className="mt-2 mx-5">
                      <span className="fw-bold">Name: </span>{" "}
                      {selectedItem.name} <br />
                      <span className="fw-bold">Quantity: </span> {count}
                      <br />
                      <span className="fw-bold">Total Price:</span>
                      {(totalToPay * currencyFactor).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 mb-5 text-center"></div>
            <h5>Down Payment</h5>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex aligh-items-center">
                <RadioButton
                  onChange={(e) => setPayPercentage(!payPercenTage)}
                  checked={payPercenTage === true}
                />
                <label className="ml-2">Pay 45% of amount</label>
              </div>

              <div className="d-flex aligh-items-center">
                <RadioButton
                  onChange={(e) => setPayPercentage(!payPercenTage)}
                  checked={payPercenTage === false}
                />
                <label className="ml-2 ">Pay full amount</label>
              </div>

              <h3 className="text-center mt-3">
                Price To Pay: {currencySymbol}
                {totalToPayNumeric}
                <p className="fs-6">
                  We will contact you when your product is ready
                </p>
              </h3>
            </div>
          </div>
        ) : (
          <div className="text-center m-5">No items Added Yet </div>
        )}

        {/* Shipping Information */}

        <div className="container bg-white rounded col-12 col-sm-6 p-5 shadow">
          <h4 className="mb-4 text-center">
            <span className="text-warning">Your</span> Information
          </h4>

          <div className="mt-4 mb-4">
            <div class="row">
              <div class="form-group col-md-5">
                <input
                  type="text"
                  class="form-control"
                  id="First Name"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div class="form-group col-md-5">
                <input
                  type="text"
                  class="form-control"
                  id="last-name"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="form-group">
              <input
                type="tel"
                className="form-control"
                id="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* <div className="mt-2">
            <h6>Location (Country)</h6>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="shipping-address"
                value={Country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter shipping country"
              />
            </div>
          </div> */}

          <div className="mt-3">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
          </div>

          {isInfoComplete ? (
            <PaystackButton
              onSuccess={onSuccess}
              onClose={onClose}
              className="btn btn-success w-100 text-center mt-4 "
              {...config}
            />
          ) : (
            <button
              disabled
              className="btn btn-success w-100 text-center mt-4 "
            >
              Fill in all information to place order
            </button>
          )}

          <p className="mt-3" style={{ fontSize: "0.8rem" }}>
            By placing your order you agree to our
            <Link to="/tnc"> Terms and Conditions</Link> and <br />
            <Link to="/returnPolicy"> Return Policies</Link>. You also consent
            to some of your data being stored by AfroLoom, which may be used to
            make future shopping experiences better for you
          </p>
        </div>
      </div>
    </>
  );
};

export const OrderDetail = React.forwardRef(
  (
    {
      total,
      actualTotal,
      // currencySymbol,
      readyBy,
      selectedParts,
      selectedSize,
      modelImage,
      customSizeValues,
      height,
      name,
      count,
      specialRequest,
    },
    ref
  ) => {
    const currencySymbol = useSelector((state) => state.currencySymbol.symbol);

    return (
      <div ref={ref} className="row all-confirmation-info">
        <div className="col-md-6">
          <p className="h5 mt-3 mb-5 model-confirm-image">
            <img src={modelImage} alt="model img" width="80%" />
          </p>
          <div className=" d-flex justify-content-center align-items-center mt-3">
            <div className="d-flex">
              <div className="m-1">
                <span className="fw-bold">Name: </span> {name} <br />
                <span className="fw-bold">Quantity: </span> {count} <br />
                <span className="fw-bold">Selected Size: </span>
                {selectedSize || "None Selected"}
                {/* <span className="fw-bold">
                    Price: {currencySymbol}
                    {total}
                  </span> */}
                <br />
                <span className="fw-bold">Amount Paid: </span>
                {currencySymbol} {total}
                <br />
                <span className="fw-bold">Amount Left: </span>
                {currencySymbol} {actualTotal - total}
                <br />
                <span className="fw-bold">
                  Estimated time to make this order: {readyBy} days
                </span>
                <br />
                <span span className="fw-bold">
                  {specialRequest}
                </span>
              </div>
            </div>
          </div>

          {/* <div>
            <div className="custom-size-values">
              <p className="h5 mt-4">Client's custom size values:</p>
              {!height && Object.entries(customSizeValues)?.length === 0 ? (
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
                    {Object.entries(customSizeValues)?.map(([label, value]) => (
                      <li key={label}>
                        <strong>{label}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div> */}
        </div>
        <div className="col-md-6 px-5">
          <div className="mt-4">
            <h2>Information On Parts</h2>
            {selectedParts?.map(
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
      // <div ref={ref}>
      //   <h1>Hi</h1>
      // </div>
    );
  }
);

export default CustomizeCheckout;
