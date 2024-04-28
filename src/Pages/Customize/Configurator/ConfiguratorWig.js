import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
import Confirmation from "./Confirmation";
import html2canvas from "html2canvas";
import { Dropdown } from "primereact/dropdown";

import Nav from "../../../Components/Nav";
import "./styles.css";
import { useParams } from "react-router";

import { useSelector } from "react-redux";

import { Toast } from "primereact/toast";
import { mainUnisex } from "../../../Data/CustomizeDataUnisex";
import { braidOptions } from "../../../utils/constants";

const ConfiguratorWig = () => {
  const { Id } = useParams();
  const selectedClothing = mainUnisex.find((item) => item.name === Id);

  const [displayImage, setDisplayImage] = useState(
    selectedClothing.colorVariants[0]
  );

  //questions
  const [colorPreference, setColorPreference] = useState(
    braidOptions.colors[0]
  );
  const [curlyendstyle, setCurlyEndStyle] = useState(null);
  const [capSize, setCapSize] = useState(null);
  const [braidLength, setBraidLength] = useState(null);

  const handleColorPreference = (selectedColor) => {
    const index = braidOptions.colors.findIndex(
      (option) => option === selectedColor
    );
    setColorPreference(selectedColor);
    setDisplayImage(selectedClothing.colorVariants[index]);
  };

  const canvasRef = useRef();
  // toast
  const toastRef = useRef(null);

  // currency conversion
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [partPrices, setPartPrices] = useState(0);

  //total price
  const total = (
    (partPrices + selectedClothing.price) *
    currencyFactor
  ).toFixed(2);

  // Confrimation or not
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [stateImage, setStateImage] = useState("");

  const captureCanvasAsImage = async () => {
    const canvas = canvasRef.current;

    const canvasImage = await html2canvas(canvas);
    const dataUrl = canvasImage.toDataURL();

    setStateImage(dataUrl); // Save the data URL to state

    setShowConfirmation(true); // Show confirmation
  };

  //size guide popup
  const [visible, setVisible] = useState(false);

  // Create a state object to store the form field values

  // Welcome
  const [showTourPopup, setShowTourPopup] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [, setHideText] = useState(false);

  const handleTourStart = () => {
    setShowTourPopup(false);
    setShowTour(true);
  };

  const handleTourLater = () => {
    setShowTourPopup(false);
  };

  const handleTourClose = () => {
    setShowTour(false);
    localStorage.setItem("tourCompleted", "true"); // Save tour completion status
  };

  useEffect(() => {
    const tourCompleted = localStorage.getItem("tourCompleted");
    if (tourCompleted === "true") {
      setShowTourPopup(false); // If tour completed, don't show it
    } else {
      setShowTourPopup(true); // Show the tour for new users
    }
  }, []);

  const handleRetakeTour = () => {
    setShowTour(true);
  };

  return (
    <>
      <Nav />
      <Toast ref={toastRef} />
      {/* {/* <>
        {showTourPopup && (
          <Dialog
            // header="Welcome to the 3D Customization!"
            visible={showTourPopup}
            className="col-12 col-sm-6"
            onHide={handleTourLater}
            dismissableMask={true}
          >
            <div className="tour-popup">
              <h2>Welcome to the 3D customization!</h2>
              <p>Would you like to take a quick tour?</p>
              <button className="btn btn-success m-3" onClick={handleTourStart}>
                Take Tour
              </button>
              <button
                className="btn btn-secondary m-3"
                onClick={handleTourLater}
              >
                Maybe Later
              </button>
            </div>
          </Dialog>
        )}

        {showTour && (
          <WelcomeTour
            isOpen={showTour}
            onRequestClose={handleTourClose}
            steps={tourSteps}
          />
        )}
      </> */}

      {showConfirmation ? (
        <Confirmation
          currencySymbol={currencySymbol}
          total={total}
          readyBy={selectedClothing.readyIn}
          weight={selectedClothing.weight}
          name={selectedClothing.name}
          setShowConfirmation={setShowConfirmation}
          modelImage={stateImage}
        />
      ) : (
        <>
          <div className="main-space">
            <h3 className="text-center pt-3">
              Customizing {selectedClothing.name}
            </h3>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-info text-white mx-3"
                // style={{ float: "right" }}
                onClick={handleRetakeTour}
              >
                Take Tour
              </button>
            </div>

            <div className="configurator-container container">
              <div className="wig-left-panel rounded border shadow">
                <h5>Color Preference</h5>
                <Dropdown
                  value={colorPreference}
                  onChange={(e) => handleColorPreference(e.value)}
                  options={braidOptions.colors}
                  placeholder="Select a color preference"
                  className="wig-dropdown"
                />

                <h5>Specifications</h5>

                <div className="specifications">
                  <span className="p-float-label mt-2">
                    <Dropdown
                      value={braidLength}
                      onChange={(e) => setBraidLength(e.value)}
                      options={braidOptions.length}
                      placeholder="Type or select a preference"
                      className="wig-dropdown"
                      editable
                    />
                    <label htmlFor="inputtext">Braid Length</label>
                  </span>

                  <span className="p-float-label">
                    <Dropdown
                      value={capSize}
                      onChange={(e) => setCapSize(e.value)}
                      options={braidOptions.capSize}
                      placeholder="Select a preference"
                      className="wig-dropdown"
                    />
                    <label htmlFor="inputtext">Cap Size</label>
                  </span>

                  <span className="p-float-label">
                    <Dropdown
                      value={curlyendstyle}
                      onChange={(e) => setCurlyEndStyle(e.value)}
                      options={braidOptions.curlEnd}
                      placeholder="Type or select a preference"
                      className="wig-dropdown"
                      editable
                    />
                    <label htmlFor="inputtext">Curly End Style</label>
                  </span>
                </div>
              </div>
              <div className="right-panel">
                <div
                  ref={canvasRef}
                  className="resize-right-panel d-flex align-items-center justify-content-center"
                >
                  <img width="80%" src={displayImage} alt="display" />
                </div>
              </div>
            </div>
          </div>
          <div className="price w-100 d-flex bg-dark text-white justify-content-between">
            <span className="m-3 expect-to-be-ready">
              Estimated time to make this order:{" "}
              <span className="customize-focus">
                {selectedClothing.readyIn} days{" "}
              </span>
            </span>

            <p className="price-text m-3">
              <span className="expect-to-be-ready">Price:</span>{" "}
              <span className="customize-focus">
                {currencySymbol}
                {total}
              </span>
            </p>

            <p className="complete m-2">
              <button
                className="btn btn-success text-white"
                onClick={captureCanvasAsImage}
              >
                Complete
              </button>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ConfiguratorWig;
