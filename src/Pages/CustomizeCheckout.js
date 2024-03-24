import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clear3DInfo } from "../Redux/store";

import Top from "../Assets/Headers/Check_Out.jpg";
import LayoutHeaders from "../Components/LayoutHeaders";
import { Link, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { Toast } from "primereact/toast";
import { RadioButton } from "primereact/radiobutton";

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

  const totalReadyBy = cartItems.reduce(
    (total, item) => total + item.readyBy, // Replace 'weight' with your actual key
    0
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

  const onSuccess = (reference) => {
    // const updatedOrders = [...currentOrders, ...cartItems];

    // // Dispatch action to update orders in the Redux state
    // dispatch(updateOrders(updatedOrders));

    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      // Country: Country,
      city: city,
      tel: tel,
      customizedItemDataSheet: customizedItemDataSheet,
      quantity: count,
      readyBy: totalReadyBy + "- regular/express delivery",
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
              <div className="aligh-items-center">
                <RadioButton
                  onChange={(e) => setPayPercentage(!payPercenTage)}
                  checked={payPercenTage === true}
                />
                <label htmlFor="ingredient1" className="ml-2">
                  Pay 45% of amount
                </label>
              </div>

              <div className="aligh-items-center">
                <RadioButton
                  onChange={(e) => setPayPercentage(!payPercenTage)}
                  checked={payPercenTage === false}
                />
                <label className="ml-2">Pay full amount</label>
              </div>

              <h2 className="text-center mt-3">
                Price To Pay: {currencySymbol}{totalToPayNumeric}
              </h2>
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

export default CustomizeCheckout;
