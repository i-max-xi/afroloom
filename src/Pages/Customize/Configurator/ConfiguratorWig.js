import React, { useState, useRef, useEffect, useMemo } from "react";
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
import {
  boxWaveOptions,
  boxWigOptions,
  braidOptions,
} from "../../../utils/constants";
import WigConfirmation from "./WigConfirmation";
import { Dialog } from "primereact/dialog";

const ConfiguratorWig = () => {
  const { Id } = useParams();
  const selectedClothing = mainUnisex.find((item) => item.name === Id);

  const [displayImage, setDisplayImage] = useState(
    selectedClothing.colorVariants[0]
  );

  const hairColorOptions = useMemo(() => {
    if (selectedClothing.name === "Spiral Curls Braid Wig") {
      return braidOptions;
    }
    if (selectedClothing.name === "Body Wave Wig") {
      return boxWaveOptions;
    }
    if (selectedClothing.name === "Bob Wig") {
      return boxWigOptions;
    }
  }, [selectedClothing.name]);

  //questions
  const [colorPreference, setColorPreference] = useState(
    hairColorOptions.colors[0]
  );
  const [curlyendstyle, setCurlyEndStyle] = useState(null);
  const [capSize, setCapSize] = useState(null);
  const [braidLength, setBraidLength] = useState(null);
  const [densityPreference, setDensityPreference] = useState(null);
  const [laceType, setLaceType] = useState(null);
  const [texture, setTexture] = useState(null);
  const [additional, setAdditional] = useState(null);

  const [guideVisible, setGuideVisible] = useState(false);

  const handleColorPreference = (selectedColor) => {
    const index = hairColorOptions.colors.findIndex(
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
    setStateImage(displayImage); // Save the data URL to state

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
        <WigConfirmation
          currencySymbol={currencySymbol}
          total={total}
          readyBy={selectedClothing.readyIn}
          // weight={selectedClothing.weight}
          name={selectedClothing.name}
          setShowConfirmation={setShowConfirmation}
          modelImage={stateImage}
          allSpecifications={[
            {
              title: "Braid Length",
              value: braidLength,
            },
            {
              title: "Cap Size",
              value: capSize,
            },

            // {
            //   title: "Curly End Style",
            //   value: curlyendstyle,
            // },
            {
              title: "Density Preference",
              value: densityPreference,
            },
            {
              title: "Lace Type",
              value: laceType,
            },
            {
              title: "Texture",
              value: texture,
            },
            {
              title: "Additional Option",
              value: additional,
            },
          ]}
        />
      ) : (
        <>
          <div className="main-space">
            <h3 className="text-center pt-3">
              Customizing {selectedClothing.name}
            </h3>

            <div className="configurator-container container">
              <div className="wig-left-panel rounded border shadow">
                <h5>Color Preference</h5>
                <Dropdown
                  value={colorPreference}
                  onChange={(e) => handleColorPreference(e.value)}
                  options={hairColorOptions.colors}
                  placeholder="Select a color preference"
                  className="wig-dropdown"
                />

                <div className="d-flex justify-content-between w-100 mt-3">
                  <span
                    style={{
                      fontSize: "1rem",
                      display: "block",
                      fontWeight: "500",
                    }}
                  >
                    Specifications
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      display: "block",
                      fontWeight: "600",
                      color: "orangered",
                    }}
                    onClick={() => {
                      setGuideVisible(true);
                    }}
                  >
                    Guide
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="bi bi-info-circle d-inline m-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />{" "}
                    </svg>
                  </span>
                </div>

                <Dialog
                  header="Sizing Guide"
                  visible={guideVisible}
                  className="col-12 col-sm-6"
                  onHide={() => setGuideVisible(false)}
                  dismissableMask={true}
                >
                  <div className="d-flex flex-column align-items-center">
                    <p className="mb-1">
                      <img
                        src={selectedClothing.sizeGuide}
                        width="100%"
                        alt="size-guide"
                      />
                    </p>
                  </div>
                </Dialog>

                <div className="specifications">
                  {hairColorOptions.length && (
                    <>
                      <span className="p-float-label mt-2">
                        <Dropdown
                          value={braidLength}
                          onChange={(e) => setBraidLength(e.value)}
                          options={hairColorOptions.length}
                          placeholder="Type or select a preference"
                          className="wig-dropdown"
                          editable
                        />
                        <label htmlFor="inputtext">Braid Length</label>
                      </span>
                    </>
                  )}

                  {hairColorOptions.capSize && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={capSize}
                          onChange={(e) => setCapSize(e.value)}
                          options={hairColorOptions.capSize}
                          placeholder="Type or select a preference"
                          className="wig-dropdown"
                          editable
                        />
                        <label htmlFor="inputtext">Cap Size</label>
                      </span>
                    </>
                  )}

                  {/* {hairColorOptions.curlEnd && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={curlyendstyle}
                          onChange={(e) => setCurlyEndStyle(e.value)}
                          options={hairColorOptions.curlEnd}
                          placeholder="Type or select a preference"
                          className="wig-dropdown"
                          editable
                        />
                        <label htmlFor="inputtext">Curly End Style</label>
                      </span>
                    </>
                  )} */}

                  {hairColorOptions.densityPreference && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={densityPreference}
                          onChange={(e) => setDensityPreference(e.value)}
                          options={hairColorOptions.densityPreference}
                          placeholder="Select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Density Preference</label>
                      </span>
                    </>
                  )}

                  {hairColorOptions.texture && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={texture}
                          onChange={(e) => setTexture(e.value)}
                          options={hairColorOptions.texture}
                          placeholder="Type or select a preference"
                          className="wig-dropdown"
                          editable
                        />
                        <label htmlFor="inputtext">Texture Preference</label>
                      </span>
                    </>
                  )}
                  {hairColorOptions.additionalOption && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={additional}
                          onChange={(e) => setAdditional(e.value)}
                          options={hairColorOptions.additionalOption}
                          placeholder="Select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Additional Option</label>
                      </span>
                    </>
                  )}
                  {hairColorOptions.laceType && additional === "Frontal" && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={laceType}
                          onChange={(e) => setLaceType(e.value)}
                          options={hairColorOptions.laceType}
                          placeholder="Select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Lace Type</label>
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="right-panel">
                <div
                  ref={canvasRef}
                  className="resize-right-panel d-flex align-items-center justify-content-center mt-2 mb-2"
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
