import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clearCart, removeFromCart } from "../Redux/store";

import Top from "../Assets/Headers/Check_Out.jpg";
import LayoutHeaders from "../Components/LayoutHeaders";
import { Link, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { Toast } from "primereact/toast";
import { RadioButton } from "primereact/radiobutton";
import { useReactToPrint } from "react-to-print";
import { parseTitle } from "../utils/functions";
import { Divider } from "primereact/divider";
import AllServices from "../Services/usersService";
import { ProgressSpinner } from "primereact/progressspinner";
 
const CustomizeCheckout = () => {
  const cartItems = useSelector((state) => state.customizedProduct.itemDetails);
  // const customizedItemDataSheet = useSelector(
  //   (state) => state.customizedProduct.itemDataSheet
  // );

  const dispatch = useDispatch();
  const toast = useRef(null);

  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [tel, setTel] = useState("");
  const [referral, setReferral] = useState("");
  const [partnerInfo, setPartnerinfo] = useState(null);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const totalCount = cartItems?.reduce((total, item) => total + item?.quantity, 0)


  const [totalToPay] = useState(
    cartItems?.reduce((total, item) => total + item?.price * item?.quantity, 0).toFixed()
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

  // const sashImages = useMemo(() => {
  //   if (cartItems[0]?.uploadedImageLeft) {
  //     return [
  //       {
  //         SashImageLeft: cartItems[0]?.uploadedImageLeft || "",
  //       },
  //     ];
  //   }
  //   if (cartItems[0].uploadedImageLeft && cartItems[0]?.uploadedImageRight) {
  //     return [
  //       {
  //         SashImageLeft: cartItems[0]?.uploadedImageLeft || "",
  //         SashImageRight: cartItems[0]?.uploadedImageRight || "",
  //       },
  //     ];
  //   }
  //   if (!cartItems[0].uploadedImageLeft && !cartItems[0]?.uploadedImageRight) {
  //     return [null];
  //   }
  // }, [cartItems]);


  const verifyPartner = async () => {
    setIsLoading(true)
    const partnerInfo = await AllServices.getPartnerByField(
      "partner_code",
      referral
    );

    if(partnerInfo.data()){
      setPartnerinfo(partnerInfo.data());
      toast.current.show({
        severity: "success",
        summary: "Verification successful",
        // detail: "You ",
      });
    }
    else{
      toast.current.show({
        severity: "error",
        summary: "Verification failed",
        detail: "Invalid identity code",
      });
    }

    setIsLoading(false)
    
  }

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const matchedMonth = partnerInfo?.salesData.find((data) => data.month === currentMonth);

  const cartItemsData = cartItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    specialRequests: item.specialRequests,
    readyBy: item.readyBy + " days",
    dataSheet: item.dataSheet,
  }));



  const onSuccess = (reference) => {
    handlePrint();


    const updatedSalesData = {
      month: currentMonth,
      count: matchedMonth ? matchedMonth.count + totalCount : totalCount, 
    };

    let updatedSalesDataArray;

    if (matchedMonth) {
      // Update existing salesData for the matched month
      updatedSalesDataArray = partnerInfo.salesData.map((data) =>
        data.month === currentMonth ? { ...data, count: data.count + totalCount } : data
      );
    } else {
      // Append new salesData if no matching month is found
      updatedSalesDataArray = [...partnerInfo.salesData, updatedSalesData];
    }

    const updatedPartnerInfo = {
      ...partnerInfo,
      count: (partnerInfo.count || 0) + totalCount, // Increment count
      salesData: updatedSalesDataArray,
    };
  
    // Update partner document in Firestore
    AllServices.updatePartner(partnerInfo.id, updatedPartnerInfo);


  // Include the structured cart items data in the userInfo object
  const userInfo = {
    firstName,
    lastName,
    email,
    city,
    tel,
    cartItems: cartItemsData,
    ReferedPerson: referral,
  };
    // Submit to formspree


    AllServices.addOrder({...userInfo});

    fetch(process.env.REACT_APP_formSpree, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...userInfo, Subject: "New Product Order"}),
    });

    dispatch(clearCart())
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

  const handleRemoveItem = (name) => {
    dispatch(removeFromCart(name));
  };
  

  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <Toast ref={toast} />

     

      <div className="container mb-5">
        {cartItems.length !== 0 ? (
          <div className="mt-5 mb-5">
            <h2>Customized Item(s)</h2>
            <ul className="list-group">
              {cartItems.map((selectedItem) => (
                <li
                  className=" d-flex justify-content-between align-items-center mt-3"
                  key={selectedItem.name}
                  data-aos="fade-up"
                >
                  <div className="d-flex gap-3 align-items-center list-group-item col">
                    <img
                      src={selectedItem.modelImage}
                      alt=""
                      width="100rem"
                      height="100rem"
                    />
                    <div className="">
                      <span className="fw-bold">Name: </span>{" "}
                      {selectedItem.name} <br />
                      <span className="fw-bold">Quantity: </span> {selectedItem.quantity}
                      <br />
                      <span className="fw-bold">Subtotal:</span>
                      {" "}{currencySymbol}{(selectedItem?.price * selectedItem?.quantity * currencyFactor).toFixed()}
                    </div>
                  </div>
                  <p className="col-1">
                  <i
                    className="pi pi-trash "
                    
                    style={{ color: "red" }}
                    onClick={() => handleRemoveItem(selectedItem.name)}
                  ></i>
                  </p>
                  
                </li>
              ))}
            </ul>

            <p className="d-flex justify-content-center align-items-center w-100 pt-4 pb-1">
              <button className="btn btn-danger" onClick={() => {dispatch(clearCart())}}>Clear Cart</button>

            </p>


            <div className="mt-5 mb-5 text-center"></div>
            <h5>Down Payment</h5>
            <div className="d-flex flex-column gap-1">
              <div
                // style={{ opacity: cartItems[0].name.includes("Wig") ? 0.5 : 1 }}
                className="d-flex aligh-items-center"
              >
                <RadioButton
                  onChange={(e) => setPayPercentage(!payPercenTage)}
                  checked={payPercenTage === true}
                  // disabled={cartItems[0].name.includes("Wig")}
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

            {/* Shipping Information */}

        <div className="mt-5">
          <p>
            Did you find AfroLoom through a friend?, enter their identity code
            to appreciate them
          </p>
          <div className=" d-flex gap-2 align-items-center mb-3">
            <input
              type="text"
              className="form-control"
              id="referral"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              placeholder="6 - digit ID code"
            />
            <div>
            <button disabled={referral.length <6} onClick={verifyPartner} className="btn btn-warning text-white shadow-sm position-relative d-flex align-items-center justify-content-center align-self-center"
                > <span className="spinner-container">
                {isLoading && (
                  <ProgressSpinner
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    className="position-absolute top-50 start-50 translate-middle"
                  />
                )}
              </span>
              Verify</button>
            </div>
            
          </div>
        </div>

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
        ) : (
          <div className="text-center my-5 d-flex flex-column w-100 justify-content-center align-items-center">
            <p>No items in cart </p>
            <button onClick={() => navigate("/start-customize")} className="btn btn-warning text-white">Buy Now</button>
          </div>
        )}

        
      </div>
    </>
  );
};



export default CustomizeCheckout;
