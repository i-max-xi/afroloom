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
import {
  hair_guide_braziian,
  mainUnisex,
} from "../../../Data/CustomizeDataUnisex";
import {
  allowedDensityPrefences,
  bodyWaveOptions,
  boneStrightWigOptions,
  braidOptions,
  hairGuides,
  hairGuidesCapSize,
  hairGuidesDensity,
  hairGuidesFrontal,
  hairGuidesHuman,
  hairGuidesSynthethic,
  hairGuidesTexture,
  deepWaveWigOptions,
  straightHairWigOptions,
  JerryCurlWigOptions,
  pixieCurlWigOptions,
} from "../../../utils/constants";
import WigConfirmation from "./WigConfirmation";
import { Dialog } from "primereact/dialog";
import { colorOptions } from "./arrays/neededArrays";
import TakeTour from "./TakeTour";

const ConfiguratorWig = () => {
  const { Id } = useParams();
  const selectedClothing = mainUnisex.find((item) => item.name === Id);

  const [displayImage, setDisplayImage] = useState(
    selectedClothing.colorVariants[0],
  );

  const hairColorOptions = useMemo(() => {
    if (selectedClothing.name === "Spiral Curls Braids Wig") {
      return braidOptions;
    }
    if (selectedClothing.name === "Body Wave Wig") {
      return bodyWaveOptions;
    }
    if (selectedClothing.name === "Bone Straight Wig") {
      return boneStrightWigOptions;
    }

    if (selectedClothing.name === "Deep Wave Wig") {
      return deepWaveWigOptions;
    }

    if (selectedClothing.name === "Pixie Curl Wig") {
      return pixieCurlWigOptions;
    }

    if (selectedClothing.name === "Straight Hair Wig") {
      return straightHairWigOptions;
    }

    if (selectedClothing.name === "Jerry Curl Wig") {
      return JerryCurlWigOptions;
    }
  }, [selectedClothing.name]);

  //questions
  const [colorPreference, setColorPreference] = useState(
    hairColorOptions?.colors[0] || null,
  );
  const [capSize, setCapSize] = useState(null);
  const [braidLength, setBraidLength] = useState(
    hairColorOptions.length[0] || null,
  );
  const [densityPreference, setDensityPreference] = useState(
    "Standard (200grams)",
  );
  const [laceType, setLaceType] = useState(null);
  const [texture, setTexture] = useState(null);
  const [additional, setAdditional] = useState(null);
  const [type_of_hair, setTypeOfHair] = useState(null);
  const [specific_hair_type, setSpecific_hair_type] = useState(null);
  const [hair_grade, set_hair_grade] = useState(null);
  const [hair_fibre, set_hair_fibre] = useState(null);
  const [hair_quality, set_hair_quality] = useState(null);
  const [hair_styling, set_hair_styling] = useState(null);
  const [hair_closure, set_hair_closure] = useState(
    hairColorOptions.hairClosure[0] || null,
  );

  const [guideVisible, setGuideVisible] = useState(false);

  const handleColorPreference = (selectedColor) => {
    const index = hairColorOptions.colors.findIndex(
      (option) => option === selectedColor,
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

  const [lengthPrice, setLengthPrice] = useState(0);
  const [coloredHairPrice, setcoloredHairPrice] = useState(0);

  const firstLengths = [
    "8 inches",
    "10 inches",
    "12 inches",
    "14 inches",
    "16 inches",
    "18inches",
    "20 inches",
  ];
  const secondLengths = [
    "22 inches",
    "22 inches",
    "24 inches",
    "26 inches",
    "28 inches",
    "30 inches",
  ];

  useEffect(() => {
    if (
      selectedClothing.name !== "Spiral Curls Braids Wig" &&
      colorPreference &&
      colorPreference !== hairColorOptions?.colors[0] &&
      firstLengths.includes(braidLength.title)
    ) {
      setcoloredHairPrice(200);
    } else if (
      selectedClothing.name !== "Spiral Curls Braids Wig" &&
      colorPreference &&
      colorPreference !== hairColorOptions?.colors[0] &&
      secondLengths.includes(braidLength.title)
    ) {
      setcoloredHairPrice(250);
    } else {
      setcoloredHairPrice(0);
    }
  }, [braidLength.title, colorPreference, selectedClothing.name]);

  const additionalOptionPrice = useMemo(() => {
    if (additional !== null) {
      return 50;
    } else {
      return 0;
    }
  }, [additional]);

  //total price
  const total = (
    (lengthPrice +
      selectedClothing.price +
      additionalOptionPrice +
      coloredHairPrice) *
    currencyFactor
  ).toFixed();

  useEffect(() => {
    setBraidLength(hairColorOptions.length[0]);

    if (hairColorOptions.hairQuality) {
      set_hair_quality(hairColorOptions.hairQuality[0]);
    }
  }, []);

  const truelengthOptions = useMemo(() => {
    if (hair_closure === "Closure (4x4)") {
      return hairColorOptions.length;
    }

    if (hair_closure === "Frontal (13 x 4)") {
      return hairColorOptions.frontalLength;
    }
  }, [hairColorOptions.frontalLength, hairColorOptions.length, hair_closure]);

  useEffect(() => {
    const selectedLength = truelengthOptions.find(
      (item) => item.title === braidLength.title,
    );

    if (selectedClothing.name === "Spiral Curls Braids Wig") {
      return setLengthPrice(selectedLength.amount);
    }

    if (
      allowedDensityPrefences.includes(braidLength.title) &&
      selectedClothing.name !== "Spiral Curls Braids Wig"
    ) {
      if (hair_quality === hairColorOptions.hairQuality[0]) {
        densityPreference === "Standard (200grams)"
          ? setLengthPrice(selectedLength.SDamount.standard)
          : setLengthPrice(selectedLength.SDamount.heavy);
      }

      if (hair_quality === hairColorOptions.hairQuality[1]) {
        densityPreference === "Standard (200grams)"
          ? setLengthPrice(selectedLength.DDamount.standard)
          : setLengthPrice(selectedLength.DDamount.heavy);
      }

      if (hair_quality === hairColorOptions.hairQuality[2]) {
        densityPreference === "Standard (200grams)"
          ? setLengthPrice(selectedLength.SDDamount.standard)
          : setLengthPrice(selectedLength.SDDamount.heavy);
      }
    } else {
      if (hair_quality === hairColorOptions.hairQuality[0]) {
        setLengthPrice(selectedLength.SDamount);
      }

      if (hair_quality === hairColorOptions.hairQuality[1]) {
        setLengthPrice(selectedLength.DDamount);
      }

      if (hair_quality === hairColorOptions.hairQuality[2]) {
        setLengthPrice(selectedLength.SDDamount);
      }
    }
  }, [
    braidLength,
    hair_quality,
    densityPreference,
    hairColorOptions.length,
    hairColorOptions.hairQuality,
    selectedClothing.name,
    truelengthOptions,
  ]);

  const handleLengthChange = (selectedLength) => {
    const selectedOption = hairColorOptions.length.find(
      (item) => item.title === selectedLength,
    );
    if (selectedOption) {
      setBraidLength(selectedOption); // Set the title in state
      // setLengthPrice(selectedOption.amount); // Access the amount
    }
  };

  // Confrimation or not
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [stateImage, setStateImage] = useState("");

  const captureCanvasAsImage = async () => {
    if (!capSize) {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please select a cap size",
        life: 3000,
      });
      return;
    }

    setStateImage(displayImage);

    setShowConfirmation(true);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedClothing.name]);

  return (
    <>
      <Nav />
      <Toast ref={toastRef} />
      <>
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
          <TakeTour isOpen={showTour} onClose={handleTourClose} type="hair" />
        )}
      </>

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
              title: "Hair Length",
              value: braidLength.title,
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
            {
              title: "Type of Hair",
              value: type_of_hair,
            },
            {
              title: "Hair Quality",
              value: hair_quality,
            },
            {
              title: "Closure Type",
              value: hair_closure,
            },
            {
              title: "Styling Option",
              value: hair_styling,
            },
            {
              title: `Type of ${type_of_hair} hair`,
              value: specific_hair_type,
            },
            {
              title: "Hair Grade",
              value: hair_grade,
            },
            {
              title: "Hair Fibre",
              value: hair_fibre,
            },
          ]}
        />
      ) : (
        <>
          <div className="main-space pb-10">
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

            <div className="lg:grid grid-cols-1 lg:gap-5 flex flex-col-reverse lg:grid-cols-2 container my-3 lg:h-screen">
              <div className="wig-left-panel rounded border lg:h-hull">
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
                  header="Guide"
                  visible={guideVisible}
                  className="col-12 col-sm-6"
                  onHide={() => setGuideVisible(false)}
                  dismissableMask={true}
                >
                  <div className="d-flex flex-column align-items-center">
                    <p className="mb-3">
                      <span className="fw-bold">Hair Length</span>
                      <img
                        src={selectedClothing.sizeGuide}
                        width="100%"
                        alt="size-guide"
                      />
                    </p>
                    <p className="mb-3">
                      <span className="fw-bold">Cap Size</span>
                      {hairGuidesCapSize.map((guide) => (
                        <img src={guide} width="100%" alt="size-guide" />
                      ))}
                    </p>
                    {/* <p className="mb-3">
                      <span className="fw-bold">Human Hair</span>
                      {hairGuidesHuman.map((guide) => (
                        <img src={guide} width="100%" alt="size-guide" />
                      ))}
                    </p> */}
                    {/* <p className="mb-3">
                      <span className="fw-bold">Synthetic Hair</span>
                      {hairGuidesSynthethic.map((guide) => (
                        <img src={guide} width="100%" alt="size-guide" />
                      ))}
                    </p> */}
                    <p className="mb-3">
                      <span className="fw-bold">
                        Frontal | Closure | Seal Out
                      </span>
                      {hairGuidesFrontal.map((guide) => (
                        <img
                          className="mt-2"
                          src={guide}
                          width="100%"
                          alt="size-guide"
                        />
                      ))}
                    </p>
                    <p className="mb-3">
                      <span className="fw-bold">Density Preference</span>
                      {hairGuidesDensity.map((guide) => (
                        <img
                          className="mt-2"
                          src={guide}
                          width="100%"
                          alt="size-guide"
                        />
                      ))}
                    </p>

                    <p className="mb-3">
                      <span className="fw-bold">Texture Preference</span>
                      {hairGuidesTexture.map((guide) => (
                        <img
                          className="mt-2"
                          src={guide}
                          width="100%"
                          alt="size-guide"
                        />
                      ))}
                    </p>
                  </div>
                </Dialog>

                <div className="specifications">
                  {hairColorOptions.length && (
                    <>
                      <span className="p-float-label mt-2">
                        <Dropdown
                          value={braidLength.title} // Set value to the title
                          onChange={(e) => handleLengthChange(e.value)}
                          options={hairColorOptions.length.map(
                            (item) => item.title,
                          )}
                          placeholder="Select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Hair Length</label>
                      </span>
                    </>
                  )}

                  {hairColorOptions?.typeOfHair && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={
                            hairColorOptions?.typeOfHair[0] || type_of_hair
                          }
                          onChange={(e) => setTypeOfHair(e.value)}
                          options={hairColorOptions.typeOfHair}
                          placeholder="Select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Type of Hair</label>
                      </span>
                    </>
                  )}

                  {hairColorOptions.hairQuality &&
                    hairColorOptions?.typeOfHair && (
                      <>
                        <span className="p-float-label">
                          <Dropdown
                            value={hair_quality}
                            onChange={(e) => set_hair_quality(e.value)}
                            options={hairColorOptions.hairQuality}
                            placeholder="Select a preference"
                            className="wig-dropdown"
                          />
                          <label htmlFor="inputtext">Hair Quality</label>
                        </span>
                      </>
                    )}

                  {hairColorOptions.densityPreference &&
                    hairColorOptions?.typeOfHair && (
                      <>
                        <span className="p-float-label">
                          <Dropdown
                            value={densityPreference}
                            onChange={(e) => setDensityPreference(e.value)}
                            options={hairColorOptions.densityPreference}
                            placeholder="Select a preference"
                            className="wig-dropdown"
                            disabled={
                              !allowedDensityPrefences.includes(
                                braidLength.title,
                              )
                            }
                          />
                          <label
                            style={{
                              color: !allowedDensityPrefences.includes(
                                braidLength.title,
                              )
                                ? 0.3
                                : 1,
                            }}
                            htmlFor="inputtext"
                          >
                            Density Preference
                          </label>
                        </span>
                      </>
                    )}

                  {hairColorOptions.hairClosure &&
                    hairColorOptions?.typeOfHair && (
                      <>
                        <span className="p-float-label">
                          <Dropdown
                            value={hair_closure}
                            onChange={(e) => set_hair_closure(e.value)}
                            options={hairColorOptions.hairClosure}
                            placeholder="Select a preference"
                            className="wig-dropdown"
                          />
                          <label htmlFor="inputtext">Closure Type</label>
                        </span>
                      </>
                    )}

                  {hairColorOptions.hairStyling &&
                    hairColorOptions?.typeOfHair && (
                      <>
                        <span className="p-float-label">
                          <Dropdown
                            value={hair_styling}
                            onChange={(e) => set_hair_styling(e.value)}
                            options={hairColorOptions.hairStyling}
                            placeholder="Select a preference"
                            className="wig-dropdown"
                            showClear={true}
                          />
                          <label htmlFor="inputtext">Styling Option</label>
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
                          showClear={true}
                        />
                        <label htmlFor="inputtext">Cap Size</label>
                      </span>
                    </>
                  )}

                  {/* {type_of_hair === "Human" && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={hair_grade}
                          onChange={(e) => set_hair_grade(e.value)}
                          options={hairGradeOptions}
                          placeholder="Type or select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Hair Grade</label>
                      </span>
                    </>
                  )} */}

                  {/* {type_of_hair === "Synthetic" && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={hair_fibre}
                          onChange={(e) => set_hair_fibre(e.value)}
                          options={hairFibreOptions}
                          placeholder="Type or select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Hair Fibre</label>
                      </span>
                    </>
                  )} */}

                  {hairColorOptions.additionalOption &&
                    hairColorOptions?.typeOfHair && (
                      <>
                        <span className="p-float-label">
                          <Dropdown
                            value={additional}
                            onChange={(e) => setAdditional(e.value)}
                            options={hairColorOptions.additionalOption}
                            placeholder="Select a preference"
                            className="wig-dropdown"
                            // clearIcon
                            showClear={true}
                          />
                          <label htmlFor="inputtext">
                            Additional Option (+{currencySymbol}
                            {(50 * currencyFactor).toFixed(0)})
                          </label>
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

                <p className="mt-3" style={{ color: "orangered" }}>
                  <i
                    className="pi pi-exclamation-triangle mx-2"
                    style={{ color: "orangered" }}
                  ></i>
                  The wig images displayed are for illustrative purposes only.
                  The actual wig you receive will be customized according to
                  your specified preferences. Please ensure your order
                  accurately reflects the style and specifications you desire.
                </p>
              </div>
              <div className="right-panel h-full">
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
                {total}.00
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
