import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearCart,
  clearShopCart,
  removeFromCart,
  removeFromShopCart,
  updateCustomzedItemQuantity,
  updateShopItemQuantity,
} from '../Redux/store';
import Top from '../Assets/Headers/Check_Out.jpg';
import LayoutHeaders from '../Components/LayoutHeaders';
import { Link, useNavigate } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import { useReactToPrint } from 'react-to-print';
import AllServices from '../Services/usersService';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';
import html2canvas from 'html2canvas';
import { storage } from '../firebase';

const CustomizeCheckout = () => {
  const cartItems = useSelector((state) => state.customizedProduct.itemDetails);
  const shopCart = useSelector((state) => state.shopCart);

  // const customizedItemDataSheet = useSelector(
  //   (state) => state.customizedProduct.itemDataSheet
  // );

  const dispatch = useDispatch();
  const toast = useRef(null);

  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [tel, setTel] = useState('');
  const [referral, setReferral] = useState('');
  const [partnerInfo, setPartnerinfo] = useState(null);
  const [showAfterPrint, setShowAfterPrint] = useState(false);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const totalCount = cartItems?.reduce(
    (total, item) => total + item?.quantity,
    0,
  );

  const customizedTotal = cartItems
    ?.reduce((total, item) => total + item?.price * item?.quantity, 0)
    .toFixed();

  const shopTotal = shopCart
    ?.reduce((total, item) => total + item?.price * item?.quantity, 0)
    .toFixed();

  const totalToPay = parseFloat(customizedTotal) + parseFloat(shopTotal);

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
    currency: 'GHS',
    metadata: {
      firstName,
      lastName,
    },
    publicKey,
    text: 'Place Order',
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onSuccess: () => {
      onClearCart();
      resetInfos();
    },
  });

  const onClearCart = () => {
    resetInfos();
    dispatch(clearShopCart());
    dispatch(clearCart());
  };

  const resetInfos = () => {
    setEmailAddress('');
    setFirstName('');
    setLastName('');
    setCity('');
    setTel('');
    setReferral('');
    setPartnerinfo(null);
  };

  const verifyPartner = async () => {
    setIsLoading(true);
    const partnerInfo = await AllServices.getPartnerByField(
      'partner_code',
      referral,
    );

    if (partnerInfo.data()) {
      setPartnerinfo(partnerInfo.data());
      toast.current.show({
        severity: 'success',
        summary: 'Verification successful',
        // detail: "You ",
      });
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Verification failed',
        detail: 'Invalid identity code',
      });
    }

    setIsLoading(false);
  };

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const matchedMonth = partnerInfo?.salesData.find(
    (data) => data.month === currentMonth,
  );

  const cartItemsData = cartItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    specialRequests: item.specialRequests,
    readyBy: item.readyBy + ' days',
    dataSheet: item.dataSheet,
  }));

  const updatedSalesData = {
    month: currentMonth,
    count: matchedMonth ? matchedMonth.count + totalCount : totalCount,
  };

  const updatePartnerInfo = () => {
    let updatedSalesDataArray;
    if (matchedMonth) {
      // Update existing salesData for the matched month
      updatedSalesDataArray = partnerInfo.salesData.map((data) =>
        data.month === currentMonth
          ? { ...data, count: data.count + totalCount }
          : data,
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

    AllServices.updatePartner(partnerInfo.id, updatedPartnerInfo);
  };

  const onSuccess = async (reference) => {
    if (!componentRef.current) {
      console.error('componentRef is null');
      return;
    }

    try {
      const image = await html2canvas(componentRef.current, {
        useCORS: true, // Ensure cross-origin images are captured
      });

      // Convert the captured image into a data URL
      const imageDataURL = image.toDataURL('image/png');

      // Upload the captured image to Firebase Storage
      const storageRef = ref(storage, `Order_images/${Date.now()}.png`);
      await uploadString(storageRef, imageDataURL, 'data_url');

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Include the structured cart items data in the userInfo object
      const userInfo = {
        firstName,
        lastName,
        email,
        city,
        tel,
        customizedProducts:
          cartItemsData.length > 0
            ? JSON.stringify(cartItemsData, null, 2)
            : 'N/A',
        shopItems:
          shopCart.length > 0
            ? shopCart
                .map((item, index) => {
                  const formattedSizes = item?.customizedSizes?.length
                    ? item.customizedSizes
                        .map(
                          (el) =>
                            `${el.name}: ${el.value.replace('inches', '″')}`,
                        )
                        .join('\n')
                    : item.selectedSize;

                  const formattedParts = item?.partsFabrics?.length
                    ? item.partsFabrics
                        .map(
                          (el) =>
                            `${el.name}: ${el.value || 'Designer Discretion'}`,
                        )
                        .join('\n')
                    : null;

                  // Conditionally include Textile and Color only if they have values
                  const textileLine = item.selectedTextile
                    ? `- Textile: ${item.selectedTextile}`
                    : '';
                  const colorLine = item.selectedColor
                    ? `- Color: ${item.selectedColor}`
                    : '';

                  return `Item ${index + 1}:
          - Name: ${item.name}
          - Image: ${item.image}
          - Quantity: ${item.quantity}
          - Price: ${currencySymbol}${(item.price * currencyFactor).toFixed()}
          - Size:
          ${formattedSizes}
          ${textileLine ? textileLine + '\n' : ''}${
                    colorLine ? colorLine + '\n' : ''
                  }${formattedParts ? `- Parts:\n${formattedParts}` : ''}`;
                })
                .join('\n\n')
            : 'N/A',

        summary: downloadURL || 'No summary image provided',
        ReferedPerson: referral,
        subject: 'New Product Order',
        dateTime: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true, // Shows AM/PM format
        }),
        total: currencySymbol + totalToPayNumeric.toFixed(),
        balanceToPay: parseFloat(totalToPay) - totalToPayNumeric,
      };

      const response = await fetch(process.env.REACT_APP_formSpree, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error('Failed to send order data');
      }

      AllServices.addOrder(userInfo);

      if (partnerInfo !== null) {
        updatePartnerInfo();
      }

      setShowAfterPrint(true);
    } catch (error) {
      console.error('Error processing order:', error);
      toast.current.show({
        severity: 'error',
        summary:
          'Error processing order, please contact us at info@afroloom.com',
      });
    }
  };

  const onClose = () => {
    // Handle when the Paystack dialog is closed
    toast.current.show({
      severity: 'info',
      summary: 'Payment Cancelled',
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

  const handleShopRemoveItem = (item) => {
    dispatch(
      removeFromShopCart({ id: item.id, selectedSize: item.selectedSize }),
    );
  };

  const handleshopItemQuantityChange = (id, selectedSize, type) => {
    const existingItem = shopCart.find(
      (item) => item.id === id && item.selectedSize === selectedSize,
    );

    if (!existingItem) return;

    let newQuantity = existingItem.quantity;

    if (type === 'plus') {
      newQuantity += 1;
    } else if (type === 'minus' && newQuantity > 1) {
      newQuantity -= 1;
    }

    dispatch(
      updateShopItemQuantity({ id, selectedSize, quantity: newQuantity }),
    );
  };

  const handlecustomizedItemQuantityChange = (id, selectedSize, type) => {
    const existingItem = cartItems.find(
      (item) => item.id === id && item.selectedSize === selectedSize,
    );

    if (!existingItem) return;

    let newQuantity = existingItem.quantity;

    if (type === 'plus') {
      newQuantity += 1;
    } else if (type === 'minus' && newQuantity > 1) {
      newQuantity -= 1;
    }

    dispatch(
      updateCustomzedItemQuantity({ id, selectedSize, quantity: newQuantity }),
    );
  };

  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <Toast ref={toast} />

      <div className="container mb-5">
        {cartItems.length === 0 && shopCart.length === 0 ? (
          <div className="text-center my-5 d-flex flex-column w-100 justify-content-center align-items-center">
            <p>No items in cart </p>
            <button
              onClick={() => navigate('/start-customize')}
              className="btn btn-warning text-white"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <>
            <div className="mt-5 mb-5">
              <section ref={componentRef}>
                {cartItems.length > 0 && (
                  <>
                    <h2 className="text-lg lg:text-xl">Customized Item(s)</h2>
                    <ul className="list-group">
                      {cartItems.map((selectedItem) => (
                        <li
                          className=" flex rounded-md justify-content-between items-center mt-3"
                          key={selectedItem.name}
                        >
                          <div className="flex gap-3 justify-between items-center w-full bg-white p-4">
                            <div className="flex gap-1 items-center justify-center">
                              <img
                                src={selectedItem.modelImage}
                                alt=""
                                width="100rem"
                                height="100rem"
                              />
                              <p className="">
                                <span className="fw-bold">Name: </span>{' '}
                                {selectedItem.name} <br />
                                <span className="fw-bold">Quantity: </span>{' '}
                                {selectedItem.quantity}
                                <br />
                                <span className="fw-bold">Subtotal:</span>{' '}
                                {currencySymbol}
                                {(
                                  selectedItem?.price *
                                  selectedItem?.quantity *
                                  currencyFactor
                                ).toFixed()}
                              </p>
                            </div>
                            <div className="  flex-col items-center gap-4 p-2 hidden">
                              <button
                                onClick={() =>
                                  handlecustomizedItemQuantityChange(
                                    selectedItem.id,
                                    selectedItem.selectedSize,
                                    'minus',
                                  )
                                }
                                className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
                              >
                                -
                              </button>
                              <span className="text-sm font-bold">
                                {selectedItem?.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handlecustomizedItemQuantityChange(
                                    selectedItem.id,
                                    selectedItem.selectedSize,
                                    'plus',
                                  )
                                }
                                className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <p className="col-1">
                            <i
                              className="pi pi-trash "
                              style={{ color: 'red' }}
                              onClick={() =>
                                handleRemoveItem(selectedItem.name)
                              }
                            ></i>
                          </p>
                        </li>
                      ))}
                    </ul>

                    <p className="d-flex justify-content-center align-items-center w-100 pt-4 pb-1">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          dispatch(clearCart());
                        }}
                      >
                        Clear Cart
                      </button>
                    </p>
                  </>
                )}
                {shopCart.length > 0 && (
                  <>
                    <h2 className="text-lg lg:text-xl">Cart Item(s)</h2>
                    <ul className="list-group">
                      {shopCart?.map((selectedItem) => (
                        <li
                          className=" flex flex-col gap-0 rounded-md  mt-3 bg-white p-3"
                          key={selectedItem.name}
                        >
                          <p className="flex items-end justify-end">
                            <p className="flex items-center justify-center cursor-pointer bg-red-200 hover:bg-red-300 rounded-full p-2 ml-1">
                              <i
                                className="pi pi-trash "
                                style={{ color: 'red' }}
                                onClick={() =>
                                  handleShopRemoveItem(selectedItem)
                                }
                              ></i>
                            </p>
                          </p>
                          <section className="flex gap-3 flex-col w-full  text-sm">
                            <div className="flex items-center justify-between md:justify-start md:gap-8">
                              <img
                                src={selectedItem.image}
                                alt={selectedItem.image}
                                className="rounded-md w-[3rem] h-[3rem] object-cover"
                              />
                              <div className="flex justify-between gap-5 text-sm ">
                                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                                  <div className="flex flex-col  gap-1">
                                    <span className="font-normal">Name: </span>
                                    <span className="font-semibold ">
                                      {selectedItem?.name}
                                    </span>
                                  </div>
                                  <div className="flex flex-col  gap-1">
                                    <span className="font-normal">
                                      Unit Price:{' '}
                                    </span>{' '}
                                    <span className="font-semibold ">
                                      {currencySymbol}
                                      {(
                                        selectedItem.price * currencyFactor
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                                  <div className="flex flex-col items-start gap-1">
                                    <span className="font-normal">
                                      Subtotal:
                                    </span>
                                    <span className="font-semibold">
                                      {currencySymbol}
                                      {(
                                        selectedItem?.price *
                                        selectedItem?.quantity *
                                        currencyFactor
                                      ).toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-start gap-1">
                                    {selectedItem?.selectedColor && (
                                      <p className="flex items-center md:items-start gap-3">
                                        <p className="font-normal">Color:</p>{' '}
                                        <div className="flex items-center md:items-start gap-1">
                                          <p
                                            className="rounded-full h-4 w-4 border"
                                            style={{
                                              backgroundColor:
                                                selectedItem?.selectedColor
                                                  .value,
                                            }}
                                          ></p>{' '}
                                          <p className="text-xs">
                                            {selectedItem?.selectedColor?.name}
                                          </p>
                                        </div>
                                      </p>
                                    )}
                                    {selectedItem?.selectedTextile && (
                                      <p className="flex flex-col items-start gap-1">
                                        <span className="font-medium">
                                          Textile:
                                        </span>{' '}
                                        <img
                                          src={selectedItem?.selectedTextile}
                                          alt=""
                                          className="texture-button-checkout"
                                        />
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 justify-start">
                              <div className="flex flex-col  gap-1">
                                <span className="font-medium">Quantity:</span>
                                <div className=" flex items-center gap-4 p-2">
                                  <button
                                    onClick={() =>
                                      handleshopItemQuantityChange(
                                        selectedItem.id,
                                        selectedItem.selectedSize,
                                        'plus',
                                      )
                                    }
                                    className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
                                  >
                                    +
                                  </button>
                                  <span className="text-xs font-bold">
                                    {selectedItem?.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleshopItemQuantityChange(
                                        selectedItem.id,
                                        selectedItem.selectedSize,
                                        'minus',
                                      )
                                    }
                                    className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1 h-fit">
                                <span className="font-medium">Size: </span>{' '}
                                <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-1 h-fit md:max-w-[80%]">
                                  {selectedItem?.customizedSizes?.length > 0
                                    ? selectedItem?.customizedSizes?.map(
                                        (el, index) => (
                                          <div
                                            key={index}
                                            className="leading-none text-xs flex items-center justify-between p-2 rounded-md bg-gray-800 text-white"
                                          >
                                            {el.name}:{' '}
                                            {el.value.replace('inches', '″')}{' '}
                                          </div>
                                        ),
                                      )
                                    : selectedItem.selectedSize}
                                </div>
                              </div>
                              {selectedItem?.partsFabrics && (
                                <div className="flex flex-col gap-1 h-fit">
                                  <span className="font-medium">Parts: </span>{' '}
                                  <div className="grid grid-cols-2 md:grid-cols-5  gap-1 h-fit md:max-w-[80%]">
                                    {selectedItem?.partsFabrics?.map(
                                      (el, index) => (
                                        <div
                                          key={index}
                                          className="leading-none text-xs flex flex-col gap-1 p-2 rounded-md"
                                        >
                                          {el.name}:{' '}
                                          {el?.type === 'textile' ? (
                                            <img
                                              src={el.value}
                                              alt={el.value}
                                              className="w-8 h-8 rounded-md"
                                            />
                                          ) : el?.type === 'color' ? (
                                            <div className="flex items-center md:items-start gap-1">
                                              <p
                                                className="rounded-full h-6 w-6 border"
                                                style={{
                                                  backgroundColor: el?.value,
                                                }}
                                              ></p>
                                            </div>
                                          ) : (
                                            <p className="bg-yellow-500 rounded-full px-2 py-1 text-xs text-center">
                                              Designer Discretion
                                            </p>
                                          )}
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </section>
                        </li>
                      ))}
                    </ul>

                    <p className="d-flex justify-content-center align-items-center w-100 pt-4 pb-1">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          dispatch(clearShopCart());
                        }}
                      >
                        Clear Cart
                      </button>
                    </p>
                  </>
                )}

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
                    {totalToPayNumeric.toLocaleString()}
                    <p className="fs-6">
                      We will contact you when your product is ready
                    </p>
                  </h3>
                </div>
              </section>

              {/* Shipping Information */}

              <div className="mt-5 ">
                <p>
                  Did you find AfroLoom through a friend?, enter their identity
                  code to appreciate them
                </p>
                <div className=" d-flex gap-2 align-items-center mb-3 max-w-[40%]">
                  <input
                    type="text"
                    className="form-control"
                    id="referral"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                    placeholder="6 - digit ID code"
                  />
                  <div>
                    <button
                      disabled={referral.length < 6}
                      onClick={partnerInfo !== null ? '' : verifyPartner}
                      className={
                        partnerInfo !== null
                          ? 'btn btn-success'
                          : 'btn btn-warning text-white shadow-sm position-relative d-flex align-items-center justify-content-center align-self-center'
                      }
                    >
                      {' '}
                      <span className="spinner-container">
                        {isLoading && (
                          <ProgressSpinner
                            style={{ width: '1.5rem', height: '1.5rem' }}
                            strokeWidth="8"
                            fill="var(--surface-ground)"
                            className="position-absolute top-50 start-50 translate-middle"
                          />
                        )}
                      </span>
                      {partnerInfo !== null ? (
                        <i className="pi pi-check"></i>
                      ) : (
                        'Verify'
                      )}
                    </button>
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
                    onSuccess={(reference) => onSuccess(reference)} // Ensures it's a function
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

                <p className="mt-3" style={{ fontSize: '0.8rem' }}>
                  By placing your order you agree to our
                  <Link to="/tnc"> Terms and Conditions</Link> and <br />
                  <Link to="/returnPolicy"> Return Policies</Link>. You also
                  consent to some of your data being stored by AfroLoom, which
                  may be used to make future shopping experiences better for you
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <Dialog
        header="Order has been processed successfully"
        visible={showAfterPrint}
        className="col-12 col-sm-6"
        onHide={() => setShowAfterPrint(false)}
        dismissableMask={true}
      >
        <div className="tour-popup">
          <p>
            We will reach out to you upon completion. Thank you for your order!
          </p>
          <div className="flex  gap-4 ">
            <p className="mb-5">
              <button
                className="px-4 py-2 rounded-md border border-yellow-500"
                onClick={() => {
                  onClearCart();

                  resetInfos();
                  navigate('/shop');
                }}
              >
                Close
              </button>
            </p>
            <p>
              <button
                className="px-4 py-2 rounded-md bg-yellow-500 text-white"
                onClick={() => {
                  handlePrint();
                }}
              >
                Download Copy
              </button>
              <p style={{ fontSize: '0.7rem' }}>For effective transparency</p>
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CustomizeCheckout;
