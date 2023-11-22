import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  removeItem,
  clearCart,
  // setShippingAddress,
  setEmailAddress,
  setFirstName,
  setLastName,
  setCity,
  // setApartment,
  updateOrders,
  // setPaymentMethod,
} from "../Redux/store";

import Top from "../Assets/Headers/Check_Out.jpg";
import LayoutHeaders from "../Components/LayoutHeaders";
import { Link, useNavigate } from "react-router-dom";
// import PaymentForm from "../Components/PaymentForm";
import { PaystackButton } from "react-paystack";
import { Dialog } from "primereact/dialog";
import Nav from "../Components/Nav";
import { Dropdown } from "primereact/dropdown";
import { AllDeliveries } from "../Data/DeliveryServiceData";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const emailAddress = useSelector((state) => state.emailAddress);
  const firstName = useSelector((state) => state.firstName);
  const lastName = useSelector((state) => state.lastName);
  const city = useSelector((state) => state.city);
  // const apartment = useSelector((state) => state.apartment);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);
  const currentOrders = useSelector((state) => state.user.currentUser?.orders);
  const isSignedIn = useSelector((state) => state.user.signedIn);
  const [showDecison, setshowDecision] = useState(!isSignedIn);

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("Ghana"); // State for shipping country input
  const [selectedDelivery, setSelectedDelivery] = useState(null); // State for selected delivery

  const navigate = useNavigate();

  // const paymentMethod = useSelector((state) => state.paymentMethod);

  // function handleAddItem(item) {
  //   dispatch(addItem(item));
  // }

  function handleRemoveItem(item) {
    dispatch(removeItem(item));
  }

  function handleClearCart() {
    dispatch(clearCart());
  }

  // function handleSetShippingAddress(address) {
  //   dispatch(setShippingAddress(address));
  // }

  function handleSetEmailAddress(address) {
    dispatch(setEmailAddress(address));
  }

  function handleSetFirstName(name) {
    dispatch(setFirstName(name));
  }

  function handleSetLastName(name) {
    dispatch(setLastName(name));
  }

  function handleSetCity(city) {
    dispatch(setCity(city));
  }

  // function handleSetApartment(apartment) {
  //   dispatch(setApartment(apartment));
  // }

  // Fetch delivery services and set the options in state
  useEffect(() => {
    const fetchDeliveryServices = async () => {
      const allDeliveries = await AllDeliveries();
      setDeliveryOptions(allDeliveries);
    };

    fetchDeliveryServices();
  }, []);

  // Function to filter delivery options based on shipping country
  const filteredOptions = deliveryOptions.filter(
    (delivery) =>
      delivery.country &&
      shippingCountry &&
      delivery.country.toLowerCase() === shippingCountry.toLowerCase()
  );

  const handleDropdownChange = (value) => {
    setSelectedDelivery(value); // Set the selected delivery
    // You can perform actions based on the selected delivery here
    console.log("Selected Delivery:", value);
  };

  const [dummyWeight, setDummyWeight] = useState(4); // Example dummy weight
  const [selectedPrice, setSelectedPrice] = useState(0); // State to track the selected price

  // Function to calculate the selected prices based on the selected delivery and dummy weight
  const calculatePrices = (delivery) => {
    const pricePerKg = delivery.pricePerKg || 0;
    const expressExtra = delivery.expressExtra || 0;

    const priceWithWeight = pricePerKg * dummyWeight;
    const priceWithWeightAndExtra = priceWithWeight + expressExtra;

    return [priceWithWeight, priceWithWeightAndExtra];
  };

  // Function to handle radio selection
  const handlePriceSelection = (price) => {
    setSelectedPrice(price);
  };

  const publicKey = process.env.REACT_APP_paystack_publicKey;
  const amount = 1000;
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
    const updatedOrders = [...currentOrders, ...cartItems];

    // Dispatch action to update orders in the Redux state
    dispatch(updateOrders(updatedOrders));

    // Clear the cart after successful payment
    dispatch(clearCart());
  };

  // const onClose = () => {
  //   // Handle when the Paystack dialog is closed
  //   console.log("Payment closed");
  // };

  if (isSignedIn === false) {
    return (
      <>
        <Nav />
        <Dialog
          header="Checkout"
          visible={showDecison}
          style={{ width: "50vw", height: "50vh" }}
          onHide={() => {
            navigate("/");
            setshowDecision(false);
          }}
        >
          You need to <Link to={"/signin"}>Login</Link> to continue to Checkout
        </Dialog>
      </>
    );
  } else {
    return (
      <>
        <LayoutHeaders selectedBg={Top} />

        <div className="container mb-5">
          {cartItems.length !== 0 ? (
            <div className="mt-5 mb-5">
              <h2>Items in Cart</h2>
              <ul className="list-group">
                {cartItems.map((selectedItem) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center mt-3"
                    key={selectedItem.id}
                    data-aos="fade-up"
                  >
                    <div className="d-flex">
                      <img
                        src={selectedItem.item}
                        alt=""
                        width="100rem"
                        height="100rem"
                      />
                      <div className="mt-2 mx-5">
                        <span className="fs-5 fw-bold">Item: </span>{" "}
                        {selectedItem.title} <br />
                        <span className="fw-bold">
                          Quantity: {selectedItem.count}{" "}
                        </span>{" "}
                        <br />
                        <span className="fw-bold">Subtotal: </span>{" "}
                        {currencySymbol +
                          (currencyFactor * selectedItem.price).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      {/* <button className="btn btn-primary mr-2" onClick={() => handleAddItem(selectedItem)}>Add</button> */}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveItem(selectedItem)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                className="btn btn-warning mt-3 text-white"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>

              <div className="mt-5 mb-5 text-center">
                <h2>
                  Total To Pay:
                  <span className="fs-5 mx-4">
                    {currencySymbol}
                    {cartItems
                      .reduce(
                        (total, item) => total + item.price * currencyFactor,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </h2>
              </div>
            </div>
          ) : (
            <div className="text-center m-5">No items Added Yet </div>
          )}

          {/* Shipping Information */}

          <div className="container bg-white rounded w-50 p-5 shadow">
            <h4 className="mb-4 text-center">
              <span className="text-warning">Delivery</span> Information
            </h4>

            <div className="mt-4">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={emailAddress || ""}
                    onChange={(e) => handleSetEmailAddress(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </form>
            </div>

            <div className="mt-4 mb-4">
              {/* <h5>Shipping Address</h5> */}
              <form onSubmit={(e) => e.preventDefault()}>
                <div class="row">
                  <div class="form-group col-md-5">
                    <input
                      type="text"
                      class="form-control"
                      id="First Name"
                      placeholder="First Name"
                      value={firstName || ""}
                      onChange={(e) => handleSetFirstName(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-md-5">
                    <input
                      type="text"
                      class="form-control"
                      id="Last Name"
                      placeholder="Last Name"
                      value={lastName || ""}
                      onChange={(e) => handleSetLastName(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-2">
              <h6>Location (Country)</h6>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="shipping-address"
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                  placeholder="Enter shipping country"
                />
              </div>
            </div>

            <div className="mt-3">
              <h6>City</h6>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={city || ""}
                  onChange={(e) => handleSetCity(e.target.value)}
                />
              </div>
            </div>

            {/* Dropdown with filtered delivery options */}
            <div className="mt-2">
              <Dropdown
                options={filteredOptions.map((delivery) => ({
                  label: delivery.name, // Display name in the dropdown
                  value: delivery, // Entire delivery object as the value
                }))}
                placeholder={
                  shippingCountry
                    ? "Select Delivery Service"
                    : "Enter country first"
                }
                value={selectedDelivery}
                onChange={(e) => handleDropdownChange(e.value)} // Handle dropdown change
                disabled={!shippingCountry} // Disable dropdown until a country is entered
              />
            </div>

            <div className="mt-3">
              <h6>Prices</h6>
              <div>
                {selectedDelivery && (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="priceOption"
                        value={calculatePrices(selectedDelivery)[0]}
                        checked={
                          selectedPrice === calculatePrices(selectedDelivery)[0]
                        }
                        onChange={() =>
                          handlePriceSelection(
                            calculatePrices(selectedDelivery)[0]
                          )
                        }
                      />
                      {`Regular: ${
                        calculatePrices(selectedDelivery)[0]
                      } GHC`}
                    </label>
                  </div>
                )}
                {selectedDelivery && (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="priceOption"
                        value={calculatePrices(selectedDelivery)[1]}
                        checked={
                          selectedPrice === calculatePrices(selectedDelivery)[1]
                        }
                        onChange={() =>
                          handlePriceSelection(
                            calculatePrices(selectedDelivery)[1]
                          )
                        }
                      />
                      {`Express: ${
                        calculatePrices(selectedDelivery)[1]
                      } GHC`}
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* <div className="mt-2">
              <h6>Apartment (Optional)</h6>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="apartment"
                    value={apartment || ""}
                    onChange={(e) => handleSetApartment(e.target.value)}
                  />
                </div>
              </form>
            </div> */}

            {/* <div className="mt-4">
              <h5>Payment Method</h5>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <select
                    className="form-control"
                    id="payment-method"
                    value={paymentMethod || ""}
                    onChange={(e) => handleSetPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="paypal">PayPal</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>
              </form>
            </div> */}
            {/* <button className="btn btn-success w-100 text-center mt-4 ">
              Place Order
            </button> */}
            <PaystackButton
              onSuccess={onSuccess}
              className="btn btn-success w-100 text-center mt-4 "
              {...config}
            />

            <p className="mt-3" style={{ fontSize: "0.8rem" }}>
              By placing your order you agree to our
              <Link to="/tnc"> Terms and Conditions</Link> and <br />
              <Link to="/returnPolicy"> Return Policies</Link>. You also consent
              to some of your data being stored by AfroLoom, which may be used
              to make future shopping experiences better for you
            </p>
          </div>
        </div>
      </>
    );
  }
};

export default Checkout;
