import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateOrders } from "../../Redux/store";

import { Link, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import ProductsDataService from "../../Services/products.services";

const ProfessionalsCheckout = ({ professionalType, product }) => {
  const dispatch = useDispatch();
  const toast = useRef(null);

  const cartItems = useSelector((state) => state.cartItems);
  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [tel, setTel] = useState("");
  const [country, setCountry] = useState("");
  const [selectedDuration, setSelectedDuration] = useState();
  const durationsArray = [
    { label: "1hr", value: 1 },
    { label: "6hr", value: 6 },
    { label: "12hr", value: 12 },
    { label: "1 day", value: 24 },
    { label: "2 days", value: 48 },
    { label: "3 days", value: 72 },
    { label: "4 days", value: 96 },
    { label: "5 days", value: 120 },
  ];
  const [totalToPay, setTotalToPay] = useState(null);


  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);
  const oldOrders = useSelector((state) => state.user.currentUser?.orders);
  const user = useSelector((state) => state.user.currentUser);
  const isSignedIn = useSelector((state) => state.user.signedIn);

  const navigate = useNavigate();

  const publicKey = process.env.REACT_APP_paystack_publicKey;
  const totalToPayNumeric = parseFloat(totalToPay); // Convert to a number

  const amount = totalToPayNumeric * 100;
  const email = emailAddress;

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount,
    currency: "GHS",
    metadata: {
      name,
    },
    publicKey,
    text: "Confirm Order",
  };

  const onSuccess = (reference) => {
    const updatedOrders = [...oldOrders, ...cartItems];

    dispatch(updateOrders(updatedOrders));
    ProductsDataService.updateUserOrders(user.id, updatedOrders);

    const userInfo = {
      name: name,
      email: email,
      country: country,
      city: city,
      customer_contact: tel,
      professional_type: professionalType,
      professional_contact: product.phone,
      work_duration: selectedDuration,
      subject: `New Pofessional Book`,
    };
    // Submit to formspree
    fetch(process.env.REACT_APP_formSpree, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  };

  const onClose = () => {
    toast.current.show({
      severity: "info",
      summary: "Payment Cancelled",
    });
  };

  const [isInfoComplete, setIsInfoComplete] = useState(false);

  useEffect(() => {
    if (selectedDuration !== undefined) {
      const isHourDuration = selectedDuration <= 12;

      const newTotalToPay = isHourDuration
        ? selectedDuration * product.hourRate
        : (selectedDuration / 24) * product.dayRate;

      setTotalToPay(newTotalToPay);
    }
  }, [selectedDuration, product.dayRate, product.hourRate]);

  useEffect(() => {
    // Check if all necessary information is provided
    if (name && emailAddress && tel && country && city && selectedDuration) {
      setIsInfoComplete(true);
    } else {
      setIsInfoComplete(false);
    }
  }, [name, emailAddress, tel, city, country, selectedDuration]);

  if (isSignedIn === false) {
    return (
      <>
        <div>
          You need to <Link to={"/signin"}>Login</Link> to continue to Checkout
        </div>
      </>
    );
  } else {
    return (
      <>
        <Toast ref={toast} />

        <div className="container mb-5">
          <div className="d-flex justify-content-around border-bottom pb-4">
            <div className="d-flex justify-content-start align-items-center">
              <div className="col-6 col-sm-2">
                <img
                  width="100%"
                  className="rounded-circle card-img-top"
                  src={product.profile}
                  alt="profile"
                />
              </div>
              <p>
                <h5>{product.name}</h5>
                <h6>
                  {product.city}, {product.country}
                </h6>
              </p>
            </div>
            <div className="d-flex flex-column col-12 col-sm-2">
              <div className=" d-flex flex-column">
                <h6>
                  {currencySymbol}
                  {(currencyFactor * product.dayRate).toFixed(2)} / d
                </h6>
                <h6>
                  {currencySymbol}
                  {(currencyFactor * product.hourRate).toFixed(2)} / hr
                </h6>
              </div>
            </div>
          </div>
          <div className="mt-5 mb-5 text-center">
            <p>Select a duration of working with this {professionalType}</p>
            <Dropdown
              value={selectedDuration}
              options={durationsArray}
              onChange={(e) => setSelectedDuration(e.value)}
              placeholder="Select Duration"
            />
            <h4>
              Total To Pay:
              <span className="fs-5 mx-4">
                {currencySymbol}
                {(totalToPay * currencyFactor).toFixed(2)}
              </span>
            </h4>
          </div>
          {/* Shipping Information */}
          <div className="container bg-white rounded p-4">
            <h4 className="mb-4 text-center">
              <span className="text-warning">Your</span> Information
            </h4>

            <div className="mt-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
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

            <div className="mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="shipping-address"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Location (Country)"
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Location (City)"
                />
              </div>
            </div>

            {/* Dropdown with filtered delivery options */}

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
                Fill in all information to proceed
              </button>
            )}

            <p className="mt-3">
              <span style={{ fontWeight: "bold" }}>Please note</span> that
              travel costs of {professionalType} fall on you as a client. This
              would be based on direct communications with client at the start
              of their service to you.
            </p>

            <p>
              You are encouraged to report to us if any foul-play occurs during
              this period
            </p>

            <p className="mt-3" style={{ fontSize: "0.8rem" }}>
              By booking this {professionalType} order you agree to our
              <Link to="/tnc"> Terms and Conditions</Link> You also consent to
              some of your data being stored by AfroLoom, which may be used to
              make future shopping experiences better for you
            </p>
          </div>
        </div>
      </>
    );
  }
};

export default ProfessionalsCheckout;
