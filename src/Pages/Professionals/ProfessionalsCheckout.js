import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateOrders } from "../../Redux/store";

import { Link, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { Toast } from "primereact/toast";
import ProductsDataService from "../../Services/products.services";
import { InputTextarea } from "primereact/inputtextarea";

const ProfessionalsCheckout = ({ professionalType, product }) => {
  const dispatch = useDispatch();
  const toast = useRef(null);

  const [selectedOffer, setSelectedOffer] = useState({
    offer: "",
    priceValue: 0,
  });

  const cartItems = useSelector((state) => state.cartItems);
  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [time, setTime] = useState("");
  // const [projectLocation, setprojectLocation] = useState("");

  const [venue, setVenue] = useState("");
  const [tel, setTel] = useState("");
  const [date, setDate] = useState("");
  const [extraDetails, setExtraDetails] = useState("");

  const totalToPay = selectedOffer.priceValue;

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

  // const cannotCheckout = () => {
  //   toast.current.show({
  //     severity: "error",
  //     summary: "Cannot Proceed",
  //     detail: "Please select one of the offers provided by this professional",
  //   });
  // };

  const onSuccess = (reference) => {
    const updatedOrders = [...oldOrders, ...cartItems];

    dispatch(updateOrders(updatedOrders));
    ProductsDataService.updateUserOrders(user.id, updatedOrders);

    const userInfo = {
      name: name,
      email: email,
      date: date,
      time: time,
      venue: venue,
      customer_contact: tel,
      professional_contact: product.phone,
      professional_type: professionalType,
      selectedOffer: selectedOffer.offer,
      amountPaid: selectedOffer.priceValue || "Not Applicable",
      projectDetails: projectDetails || "Not Applicable",
      // projectDateTime: time || "Not Applicable",
      // projectLocation: projectLocation || "Not Applicable",
      extraDetails: extraDetails,

      subject: `New Pofessional Booking`,
    };
    // Submit to formspree
    fetch(process.env.REACT_APP_formSpree, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    toast.current.show({
      severity: "success",
      summary: `Request for this ${professionalType} is successfull`,
      detail: "We will contact you in 24hours",
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
    // Check if all necessary information is provided
    if (
      name &&
      emailAddress &&
      tel &&
      venue &&
      time &&
      date &&
      (professionalType !== "Model" || selectedOffer.offer !== "")
    ) {
      setIsInfoComplete(true);
    } else {
      setIsInfoComplete(false);
    }
  }, [
    name,
    emailAddress,
    tel,
    selectedOffer,
    professionalType,
    venue,
    time,
    date,
  ]);

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
              <div className="col-6 col-sm-4">
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
          </div>

          {professionalType !== "Model" ? (
            <>
              <div className=" d-flex flex-column justify-content-center align-items-center mt-5">
                <h5>Select from these Packages</h5>
                {product.offers?.map(({ offer, priceValue }) => (
                  <div className="identity-item" key={offer}>
                    <input
                      type="radio"
                      id={offer}
                      checked={selectedOffer.offer === offer}
                      onChange={() =>
                        setSelectedOffer({
                          offer: offer,
                          priceValue: priceValue,
                        })
                      }
                    />
                    <label className="mt-2" htmlFor={offer}>
                      {offer} - {currencySymbol}
                      {(currencyFactor * priceValue).toFixed(2)}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-5 mb-5 text-center">
                <h4>
                  Total To Pay:
                  <span className="fs-5 mx-4">
                    {currencySymbol}
                    {(totalToPay * currencyFactor).toFixed(2)}
                  </span>
                </h4>
              </div>
            </>
          ) : (
            <>
              <h4 className="mb-4 text-center">Project Information</h4>
              <div className="mt-4">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="details"
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    placeholder="Describe your project in detail..."
                    rows={5} // Set the number of rows for multiline textarea
                  />
                </div>
              </div>
              {/* <div className="mt-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Prefered date and time of project"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="proect-location"
                    value={projectLocation}
                    onChange={(e) => setprojectLocation(e.target.value)}
                    placeholder="Location"
                  />
                </div>
              </div> */}
            </>
          )}

          <div className=" container">
            <h4 className="mb-4 text-center">
              <span className="text-warning">Meet Up</span> Details
            </h4>
            <div className="mt-2">
              <label className="fw-bold">Date</label><br/>
              <small>We advice you book outside the range of <b>72hours</b> to account preparation time of this {professionalType}</small>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="shipping-address"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="eg. 26th October, 2024"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="fw-bold">Time</label>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="fw-bold">Venue</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="include landmarks"
                />
              </div>
            </div>
            <div className="form-group d-flex flex-column mt-2">
              <label className="fw-bold">
                Any extra details you need to share with us?
              </label>
              <InputTextarea
                required
                type="text"
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
                rows={2}
                cols={30}
              />
            </div>
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

            {/* Dropdown with filtered delivery options */}

            {isInfoComplete ? (
              professionalType !== "Model" ? (
                <PaystackButton
                  onSuccess={onSuccess}
                  onClose={onClose}
                  className="btn btn-success w-100 text-center mt-4 "
                  {...config}
                />
              ) : (
                <button
                  className="btn btn-success w-100 text-center mt-4 "
                  onClick={onSuccess}
                >
                  Request Model
                </button>
              )
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
