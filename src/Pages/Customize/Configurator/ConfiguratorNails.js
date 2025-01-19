import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";

// import { Link } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import Confirmation from "./Confirmation";
import html2canvas from "html2canvas";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import LoadingAnimation from "./LoadingAnimation";

import Nav from "../../../Components/Nav";
import "./styles.css";
import { useParams } from "react-router";
import { mainUnisex } from "../../../Data/CustomizeDataUnisex";

import { useSelector } from "react-redux";

//arrays
import {
  colorOptions,
  textureArrays,
  textureValues,
  specialNodeNames,
  noSpinFor,
  notAll,
  colorBasePrice,
  shiny3Ds,
} from "./arrays/neededArrays";
import { Dropdown } from "primereact/dropdown";

import { Toast } from "primereact/toast";
import {
  allNailOptions,
  isMobile,
  nailGuidesType,
  skinTone,
} from "../../../utils/constants";
import uuid from "react-uuid";
import PrintItem from "./PrintItem";
import { Dialog } from "primereact/dialog";
import TakeTour from "./TakeTour";
import WigConfirmation from "./WigConfirmation";

const Shirt = ({
  isRotating,
  selectedClothing,
  selectedPart,
  setSelectedPart,
  selectedTexture,
  showGlow,
  isLoading,
  setIsLoading,
}) => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF(selectedClothing.model);

  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (isRotating) {
      const rotationSpeed = 0.01;
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  useEffect(() => {
    if (!isRotating) {
      groupRef.current.rotation.y = 0;
    }
  }, [isRotating]);

  const handlePartClick = (index) => {
    if (index === selectedPart) {
      setSelectedPart(null); // Deselect the part if it is clicked again
    } else {
      setSelectedPart(index);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate loading for 2 seconds (you can replace this with your actual loading code)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading state to false once model is loaded (replace with your actual model loading logic)
    }, 2500);

    for (let i = 0; i < state.color.length; i++) {
      state.color[i] = "#ffffff";
    }

    for (let i = 0; i < state.texture.length; i++) {
      state.texture[i] = null;
    }

    // state.texture[1] = skinTexture;

    state.color[1] = "#6e4b35";

    return () => clearTimeout(loadingTimeout); // Cleanup the timeout if component unmounts
  }, [selectedClothing.name]);

  return (
    <group ref={groupRef}>
      {isLoading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        selectedClothing.myNode?.map((node, index) => {
          const nodeName = node?.name; // Access the name property of the node object
          const color =
            specialNodeNames.includes(nodeName) && nodeName === "nailHands"
              ? snap.color[1]
              : specialNodeNames.includes(nodeName) && nodeName !== "nailHands"
                ? snap.color[index] || "#333333"
                : snap.color[index] || "#ffffff";

          const texture = snap.texture[index] || null;
          // const texture = skinTexture;

          return (
            <mesh
              key={uuid()}
              castShadow
              geometry={nodes[nodeName]?.geometry}
              // onClick={() => handlePartClick(index)}
            >
              <meshStandardMaterial
                attach="material"
                color={color}
                map={texture && new TextureLoader().load(texture)}
                roughness={node === "nails" ? 0 : 1}
                normalMap={texture && new TextureLoader().load(texture)} // Add normal map for additional detail
                normalScale={[1, 2]}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
};

const CameraControls = () => {
  const controlsRef = useRef();

  useFrame(() => {
    controlsRef.current.update();
  });

  return <OrbitControls ref={controlsRef} />;
};

const ConfiguratorUnisex = () => {
  const { Id } = useParams();
  const selectedClothing = mainUnisex.find((item) => item.name === Id);

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // const [Price, setPrice] = useState(selectedClothing.price);

  const [selectedPrintOn, setSelectedPrintOn] = useState("#ffffff");

  const [selectedPart, setSelectedPart] = useState(0);

  const [isRotating, setIsRotating] = useState(false);

  const canvasRef = useRef(null);
  // toast
  const toastRef = useRef(null);
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [partPrices, setPartPrices] = useState(0);

  const [selectedTone, setSelectedTone] = useState("Dark");
  const [guideVisible, setGuideVisible] = useState(false);

  //total price
  const total = useMemo(() => {
    return ((partPrices + selectedClothing.price) * currencyFactor).toFixed();
  }, [selectedClothing.name, partPrices]);

  const [showGlow, setShowGlow] = useState(false);

  const handleColorChange = (newColor) => {
    state.color[selectedPart] = newColor;
    state.texture[selectedPart] = null;
    setSelectedPrintOn(newColor);

    // setPartPrices(0);
    setShowGlow(false);
  };

  const handlePrintsChange = (newTexture) => {
    if (selectedPart !== null) {
      state.texture[selectedPart] = newTexture;
      state.color[selectedPart] = null;
      // setSelectedPrintOn(newTexture);
      // setSelectedTexture(newTexture); // needed to transfer to size
    }

    setShowGlow(false);
  };

  const handleSkinToneChange = (title, color) => {
    setSelectedTone(title);
    setIsLoading(true);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(loadingTimeout);
  };

  const handleRotation = () => {
    setIsRotating((prev) => !prev);
  };

  // Create an array to store selected parts with their color and texture information
  const selectedParts = selectedClothing.myNode?.map((nodeName, index) => ({
    name: nodeName.name,
    color: state.color[index] || null,
    texture: state.texture[index] || null,
  }));

  // Confrimation or not
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [stateImage, setStateImage] = useState("");

  const captureCanvasAsImage = async () => {
    setIsRotating(false);
    if (!canvasRef.current) {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Complete action failed, please try again",
      });
      return;
    }

    const canvasImage = await html2canvas(canvasRef.current);
    const dataUrl = canvasImage.toDataURL();

    setStateImage(dataUrl);

    setShowConfirmation(true);
  };

  const shareCanvasImage = async () => {
    setIsRotating(false);
  
    if (!canvasRef.current) {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Complete action failed, please try again",
      });
      return;
    }
  
    try {
      const canvasImage = await html2canvas(canvasRef.current);
      const dataUrl = canvasImage.toDataURL("image/png");
  
      setStateImage(dataUrl);
  
      // Trigger download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "canvas-image.png"; // Default filename for the download
      document.body.appendChild(link); // Append link to the DOM
      link.click(); // Trigger download
      document.body.removeChild(link); // Clean up
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Image generation failed, please try again",
      });
    }
  };
  

  const nailOptions = useMemo(() => {
    // if (selectedClothing.name.contains("Wig")) {
    //   return;
    // }
    // if (selectedClothing.name === "Body Wave Wig") {
    //   return;
    // }
    // if (selectedClothing.name === "Bone Straight Wig") {
    //   return;
    // }
    return allNailOptions;
  }, [selectedClothing.name]);

  const [nailLength, setNailLength] = useState(null);

  // const [nailSize, setNailSize] = useState(null);
  // const [nailWidth, setNailWidth] = useState(null);
  const [nailMaterial, setNailMaterial] = useState(null);

  useEffect(() => {
    console.log({ nailLength, nailMaterial });

    if (nailMaterial === "Standard Press-on Nails") {
      if (nailLength === "S") {
        setPartPrices(25);
      }
      if (nailLength === "M") {
        setPartPrices(25);
      }
      if (nailLength === "L") {
        setPartPrices(30);
      }
      if (nailLength === "XL") {
        setPartPrices(35);
      }
    }
    if (nailMaterial === "Gel Press-on Nails") {
      if (nailLength === "S") {
        setPartPrices(30);
      }
      if (nailLength === "M") {
        setPartPrices(40);
      }
      if (nailLength === "L") {
        setPartPrices(60);
      }
      if (nailLength === "XL") {
        setPartPrices(80);
      }
    }
    if (nailMaterial === "Acrylic Press-on Nails") {
      if (nailLength === "S") {
        setPartPrices(70);
      }
      if (nailLength === "M") {
        setPartPrices(80);
      }
      if (nailLength === "L") {
        setPartPrices(110);
      }
      if (nailLength === "XL") {
        setPartPrices(140);
      }
    }
  }, [nailLength, nailMaterial]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setNailMaterial("Standard Press-on Nails");
    setNailLength("S");
  }, [selectedClothing.name]);

  const handleClear = () => {
    state.texture[selectedPart] = null;
    state.color[selectedPart] = null;
  };

  const nailBg = useMemo(() => {
    const selectedSkinTone = skinTone.find(
      (tone) => tone.title === selectedTone,
    );
    return selectedSkinTone ? selectedSkinTone.image : null;
  }, [selectedTone]);

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
          <TakeTour isOpen={showTour} onClose={handleTourClose} type="nails" />
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
              title: "Nail Length",
              value: nailLength,
            },

            {
              title: "Nail Type",
              value: nailMaterial,
            },
          ]}
        />
      ) : (
        // <Confirmation
        //   currencySymbol={currencySymbol}
        //   total={total}
        //   readyBy={selectedClothing.readyIn}
        //   weight={selectedClothing.weight}
        //   name={selectedClothing.name}
        //   selectedParts={
        //     notAll.includes(selectedClothing.name) ? null : selectedParts
        //   }
        //   selectedPrintOn={{
        //     isColor: state.texture[selectedPart] === null,
        //     item: selectedPrintOn,
        //   }}
        //   setShowConfirmation={setShowConfirmation}
        //   selectedSize={nailLength}
        //   modelImage={stateImage}
        // />
        <>
          <div className="main-space pb-10">
            <h3 className="text-center text-sm lg:text-2xl mt-3 mb-2 capitalize font-normal text-gray-600 pt-3">
              Customizing {selectedClothing.name}
              <p className="text-xs ">This item is only on display currently</p>

            </h3>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-info text-white mx-3"
                onClick={handleRetakeTour}
              >
                Take Tour
              </button>
            </div>
            <div className="lg:grid grid-cols-1 lg:gap-5 flex flex-col-reverse lg:grid-cols-2 container my-3 lg:h-screen">
              <div className="left-panel rounded border lg:h-hull">
                <h5>Skin</h5>
                <span
                  style={{
                    fontSize: "0.8rem",
                    display: "block",
                    fontWeight: "500",
                  }}
                >
                  Apply Skin Tone
                </span>

                {skinTone.map(({ title, color }) => {
                  return (
                    <button
                      key={title}
                      className={`size-button btn btn-outline-dark ${
                        selectedTone === title ? "selected" : ""
                      }`}
                      onClick={() => handleSkinToneChange(title, color)}
                    >
                      {title}
                    </button>
                  );
                })}

                <div className="d-flex justify-content-between w-100 align-items-center mt-2 lg:pt-5">
                  <h6 style={{ fontWeight: "500", fontSize: "1rem" }}>Nails</h6>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      display: "block",
                      fontWeight: "600",
                      color: "orangered",
                      textTransform: "capitalize",
                    }}
                    onClick={handleClear}
                    className="cursor-pointer"
                  >
                    Clear
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-x-circle d-inline m-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    display: "block",
                    fontWeight: "500",
                  }}
                >
                  Apply Color
                </span>

                <div className="color-buttons-container mt-3">
                  <Carousel
                    value={colorOptions}
                    numVisible={isMobile ? 4 : 7}
                    numScroll={isMobile ? 3 : 5}
                    showIndicators={false}
                    // // responsiveOptions={responsiveColor}
                    itemTemplate={(colorOption) => (
                      <div key={colorOption.color} className="color-item">
                        <button
                          className={`color-button ${
                            selectedPrintOn === colorOption.color
                              ? "selected-border"
                              : ""
                          }`}
                          onClick={() => handleColorChange(colorOption.color)}
                          style={{ backgroundColor: colorOption.color }}
                        ></button>
                      </div>
                    )}
                  />
                </div>

                <span
                  style={{
                    fontSize: "0.8rem",
                    display: "block",
                    fontWeight: "500",
                  }}
                >
                  Apply Design
                </span>
                {/* <div className="d-flex justify-content-between w-100">
                  <span
                    style={{
                      fontSize: "0.8rem",
                      display: "block",
                      fontWeight: "500",
                    }}
                  >
                    Apply Designs
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      display: "block",
                      fontWeight: "600",
                      color: "orangered",
                      textTransform: "capitalize",
                    }}
                    onClick={handleClearDesign}
                  >
                    Clear
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-x-circle d-inline m-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </span>
                </div> */}
                <div className="color-buttons-container mt-3">
                  <Carousel
                    value={textureArrays.nailDesigns}
                    numVisible={4}
                    numScroll={3}
                    showIndicators={false}
                    itemTemplate={(texture, index) => (
                      <PrintItem
                        key={texture}
                        texture={texture}
                        selectedTexture={selectedPrintOn}
                        handleTextureChange={handlePrintsChange}
                      />
                    )}
                  />
                </div>

                <div className="d-flex justify-content-between w-100 lg:mt-8">
                  <span
                    style={{
                      fontSize: "0.8rem",
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
                    onClick={() => setGuideVisible(true)}
                    className="cursor-pointer"
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
                      <span className="fw-bold">Nail Length</span>

                      <img
                        src={selectedClothing.sizeGuide}
                        width="100%"
                        alt="size-guide"
                      />
                    </p>

                    <p className="mb-3">
                      <span className="fw-bold">Nail Type</span>
                      {nailGuidesType.map((guide) => (
                        <img src={guide} width="100%" alt="size-guide" />
                      ))}
                    </p>
                  </div>
                </Dialog>

                <div className="specifications lg:pt-4">
                  {nailOptions.material && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={nailMaterial}
                          onChange={(e) => setNailMaterial(e.value)}
                          options={nailOptions.material}
                          placeholder="Select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Nail Type</label>
                      </span>
                    </>
                  )}

                  {nailOptions.length && (
                    <>
                      <span className="p-float-label mt-2">
                        <Dropdown
                          value={nailLength}
                          onChange={(e) => setNailLength(e.value)}
                          options={nailOptions.length}
                          placeholder="Select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Nail Length</label>
                      </span>
                    </>
                  )}

                  {/* {nailOptions.size && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={nailSize}
                          onChange={(e) => setNailSize(e.value)}
                          options={nailOptions.size}
                          placeholder="Type or select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Nail Size</label>
                      </span>
                    </>
                  )} */}

                  {/* {nailOptions.width && (
                    <>
                      <span className="p-float-label">
                        <Dropdown
                          value={nailWidth}
                          onChange={(e) => setNailWidth(e.value)}
                          options={nailOptions.width}
                          placeholder="Type or select a preference"
                          className="wig-dropdown"
                        />
                        <label htmlFor="inputtext">Nail Width</label>
                      </span>
                    </>
                  )} */}
                </div>
              </div>
              <div className="right-panel h-full">
                <div className="resize-right-panel h-full">
                  <div
                    style={{
                      backgroundImage: !isLoading ? `url(${nailBg})` : null,
                      height:  "80%" ,

                    }}
                    className="lg:bg-[length:29.5rem_52rem]  bg-[length:24.5rem_42rem] bg-no-repeat bg-center"
                    // className="nail-bg"
                    ref={canvasRef}
                  >
                    <Canvas
                      camera={{ position: [0, 0, selectedClothing.myZoom] }}
                      gl={{ preserveDrawingBuffer: true }}
                      className="main-canvas"
                    >
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />

                      <Shirt
                        isRotating={isRotating}
                        selectedClothing={selectedClothing}
                        selectedPart={selectedPart}
                        selectedTexture={state.texture[selectedPart]}
                        showGlow={showGlow}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    </Canvas>
                  </div>

                  {noSpinFor.includes(selectedClothing.name) && (
                    <div className="px-2 pt-2 w-100 text-image-imprint">
                      {/* test text inprinting */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="price w-100 d-flex bg-dark text-white justify-content-between">
            {/* <span className="m-3 expect-to-be-ready">
              Estimated time to make this order:{" "}
              <span className="customize-focus">
                {selectedClothing.readyIn} days{" "}
              </span>
            </span> */}

            <p className="price-text m-3">
              <span className="expect-to-be-ready">Price:</span>{" "}
              <span className="customize-focus line-through">
                {currencySymbol}
                {total}.00
              </span>
              <p className="text-xs ">This item is only on display currently</p>
            </p>

            <p className="complete m-2">
              <button
                className="btn btn-success text-white"
                onClick={shareCanvasImage}
              >
                Share Your Design
              </button>
            </p>
            {/* <p className="complete m-2">
              <button
                className="btn btn-success text-white"
                onClick={captureCanvasAsImage}
              >
                Complete
              </button>
            </p> */}
          </div>
        </>
      )}
    </>
  );
};

export default ConfiguratorUnisex;
