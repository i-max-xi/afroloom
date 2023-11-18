import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  removeItem,
  clearCart,
  setShippingAddress,
  setEmailAddress,
  setFirstName,
  setLastName,
  setCity,
  setApartment,
  updateOrders,
  // setPaymentMethod,
} from "../Redux/store";

import Top from "../Assets/Headers/Check_Out.jpg";
import LayoutHeaders from "../Components/LayoutHeaders";
import { Link } from "react-router-dom";
// import PaymentForm from "../Components/PaymentForm";
import { PaystackButton } from "react-paystack";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const emailAddress = useSelector((state) => state.emailAddress);
  const firstName = useSelector((state) => state.firstName);
  const lastName = useSelector((state) => state.lastName);
  const city = useSelector((state) => state.city);
  const apartment = useSelector((state) => state.apartment);
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

  function handleSetShippingAddress(address) {
    dispatch(setShippingAddress(address));
  }

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

  function handleSetApartment(apartment) {
    dispatch(setApartment(apartment));
  }

  // function handleSetPaymentMethod(method) {
  //   dispatch(setPaymentMethod(method));
  // }

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);
  const currentOrders = useSelector((state) => state.user.currentUser.orders);

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
  }


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
                      <span className="fw-bold">Quantity: {selectedItem.count} </span> <br />
                      <span className="fw-bold">Subtotal: </span> {currencySymbol + (currencyFactor * selectedItem.price).toFixed(2)}
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
                    .reduce((total, item) => total + (item.price * currencyFactor), 0)
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
            <span className="text-warning">Shipping</span> Information
          </h4>

          <div className="mt-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="shipping-address"
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
            <h6>Shipping Address</h6>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="shipping-address"
                  value={shippingAddress || ""}
                  onChange={(e) => handleSetShippingAddress(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="mt-3">
            <h6>City</h6>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={city || ""}
                  onChange={(e) => handleSetCity(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="mt-2">
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
          </div>

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
          <PaystackButton onSuccess={onSuccess} className="btn btn-success w-100 text-center mt-4 " {...config} />

          <p className="mt-3" style={{ fontSize: "0.8rem" }}>
            By placing your order you agree to our
            <Link to="/tnc"> Terms and Conditions</Link> and <br />
            <Link to="/returnPolicy"> Return Policies</Link>. You also consent
            to some of your data being stored by AfroLoom, which may be
            used to make future shopping experiences better for you
          </p>
        </div>
      </div>
    </>
  );
};

export default Checkout;
