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

import { Dialog } from "primereact/dialog";
import Nav from "../../../Components/Nav";
import "./styles.css";
import { useParams } from "react-router";
import { mainFootwear } from "../../../Data/CustomizeDataFootwear";

import { useSelector } from "react-redux";

import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";

//arrays
import {
  colorOptions,
  textureArrays,
  textureDescriptions,
  textureValues,
  responsiveNess,
  specialNodeNames,
  displayInplaceFor,
  colorBasePrice,
} from "./arrays/neededArrays";
import TextureItem from "./TextureItem";
import PartImages from "./PartImages";
import WelcomeTour, { tourSteps } from "./WelcomeTour";
import { InputNumber } from "primereact/inputnumber";

import { Toast } from "primereact/toast";
import { isMobile } from "../../../utils/constants";
import uuid from "react-uuid";
const Shirt = ({
  isRotating,
  selectedClothing,
  selectedPart,
  setSelectedPart,
  selectedTexture,
  showGlow,
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

  const handlePartClick = (index) => {
    if (index === selectedPart) {
      setSelectedPart(null); // Deselect the part if it is clicked again
    } else {
      setSelectedPart(index);
    }
  };

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate loading for 2 seconds (you can replace this with your actual loading code)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading state to false once model is loaded (replace with your actual model loading logic)
    }, 2000);

    for (let i = 0; i < state.color.length; i++) {
      state.color[i] = "#ffffff";
    }

    for (let i = 0; i < state.texture.length; i++) {
      state.texture[i] = null;
    }

    return () => clearTimeout(loadingTimeout); // Cleanup the timeout if component unmounts
  }, []);

  return (
    <group ref={groupRef}>
      {isLoading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        selectedClothing.myNode.map((node, index) => {
          const nodeName = node?.name; // Access the name property of the node object
          const color = specialNodeNames.includes(nodeName)
            ? snap.color[index] || "#333333"
            : snap.color[index] || "#ffffff";

          const texture = snap.texture[index] || null;

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
                roughness={1}
                emissive={selectedPart === index ? "#FF8C00" : null} // Apply golden glow if part is selected
                emissiveIntensity={showGlow && selectedPart === index ? 2 : 0} // Adjust glow intensity
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

const ConfiguratorFootwear = () => {
  const { Id } = useParams();
  const selectedClothing = mainFootwear.find((item) => item.name === Id);

  // const [Price, setPrice] = useState(selectedClothing.price);

  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  const [selectedPart, setSelectedPart] = useState(0);

  const [isRotating, setIsRotating] = useState(false);

  const canvasRef = useRef();
  // toast
  const toastRef = useRef(null);
  // currency conversion
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [partPrices, setPartPrices] = useState(0);
  const [colorPrice, setColorPrice] = useState(
    colorBasePrice * selectedClothing.myNode[0].yardNeeded
  );
  //total price
  const total = (
    (partPrices + selectedClothing.price) *
    currencyFactor
  ).toFixed(2);

  const handleSizeChange = (factor, priceValue) => {
    // let newPartPrice;
    setSelectedSize(factor);

    const textureCategory = Object.keys(textureArrays).find((category) =>
      textureArrays[category].includes(selectedTexture)
    );

    if (textureCategory === "waxPrint" || !textureCategory) {
      return;
    }

    const yardPrice = textureValues[textureCategory].price;

    const newPartPrice = yardPrice + priceValue;

    setPartPrices(newPartPrice);
  };

  const [showGlow, setShowGlow] = useState(false);

  const handleColorChange = (newColor) => {
    // if (selectedPart === "all") {
    //   state.texture = Array(selectedClothing.myNode.length).fill(null);
    //   state.color = Array(selectedClothing.myNode.length).fill(newColor);
    //   setSelectedPrintOn(newColor);
    //   return;
    // }

    state.color[selectedPart] = newColor;
    state.texture[selectedPart] = null;
    setSelectedPrintOn(newColor);

    setPartPrices(0);
    setShowGlow(false);
  };

  const handleTextureChange = (newTexture) => {
    if (selectedPart !== null) {
      state.texture[selectedPart] = newTexture;
      state.color[selectedPart] = null;
      setSelectedPrintOn(newTexture);
      setSelectedTexture(newTexture); // needed to transfer to size

      const textureCategory = Object.keys(textureArrays).find((category) =>
        textureArrays[category].includes(newTexture)
      );

      const sizeValue = selectedClothing.sizeOptions.find(
        (size) => size.value === selectedSize
      );

      console.log({ sizeValue });

      const yardPrice = textureValues[textureCategory].price;

      // const newPartPrice =
      //   yardStart === 2 ? yardNeeded * (yardPrice / 2) : yardNeeded * yardPrice;

      let newPartPrice;
      if (textureCategory === "waxPrint") {
        newPartPrice = yardPrice;
      } else {
        newPartPrice = yardPrice + sizeValue.priceValue;
      }

      setPartPrices(newPartPrice);
    }

    setShowGlow(false);
  };

  const handleRotation = () => {
    setIsRotating((prev) => !prev);
    // setSelectedPart(null);
  };

  // Create an array to store selected parts with their color and texture information
  // Create an array to store selected parts with their color and texture information
  // const selectedParts = selectedClothing.myNode.map((nodeName, index) => ({
  //   name: nodeName.name,
  //   color: state.color[index] || null,
  //   texture: state.texture[index] || null,
  // }));

  // Confrimation or not
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [stateImage, setStateImage] = useState("");

  const captureCanvasAsImage = async () => {
    const requiresHeight = displayInplaceFor.includes(selectedClothing.name);
    const heightProvided = height !== "";

    if (requiresHeight && !heightProvided) {
      // Prevent completing if height is required but not provided
      toastRef.current.show({
        severity: "error",
        summary: "Cannot continue",
        detail: "Please input your height for accurate design",
      });
      return;
    }

    const canvas = canvasRef.current;

    const canvasImage = await html2canvas(canvas);
    const dataUrl = canvasImage.toDataURL();

    setStateImage(dataUrl); // Save the data URL to state

    setShowConfirmation(true); // Show confirmation
  };

  //size guide popup
  const [visible, setVisible] = useState(false);

  // Create a state object to store the form field values
  const [sizeFormValues, setSizeFormValues] = useState(
    selectedClothing.sizeForms?.reduce((acc, formField) => {
      acc[formField.label] = formField.value;
      return acc;
    }, {})
  );

  // Handle changes in the size form fields
  const handleSizeFormChange = (label, value) => {
    setSizeFormValues((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));
  };

  // description dialogs
  const [selectedTexture, setSelectedTexture] = useState({});

  // parse part title
  const parseTitle = (title) => {
    const split = title.split("_");
    return split.join(" ");
  };

  // Welcome
  const [showTourPopup, setShowTourPopup] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [, setHideText] = useState(false);

  const handleTourStart = () => {
    setShowTour(true);
    setShowTourPopup(false);
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

  // customer height
  const [height, setHeight] = useState("");

  const handleAllPartsClick = () => {
    setSelectedPart("all");
  };

  const handleSelectPart = (index) => {
    if (selectedPart === index) {
      setShowGlow(false);
      setSelectedPart(null);
      return;
    }
    setSelectedPart(index);
    setShowGlow(true);
  };

  // const masterSelectionPartOptions = useMemo(() => {
  //   return (
  //     <>
  //       {selectedClothing.myNode.map((nodeName, index) => (
  //         <button
  //           key={index}
  //           className={`size-button btn btn-outline-dark ${
  //             selectedPart === index ? "selected" : ""
  //           }`}
  //           onClick={() => handleSelectPart(index)}
  //         >
  //           {nodeName.name === "hands"
  //             ? parseTitle("sleeves")
  //             : parseTitle(nodeName.name)}
  //         </button>
  //       ))}
  //     </>
  //   );
  // }, [selectedClothing]);

  return (
    <>
      <Nav />
      <Toast ref={toastRef} />
      {/* <>
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
          // selectedParts={selectedClothing.myNode[0]}
          selectedPrintOn={{
            isColor: state.texture[selectedPart] === null,
            item: selectedPrintOn,
          }}
          setShowConfirmation={setShowConfirmation}
          selectedSize={
            selectedClothing.sizeOptions.find(
              (option) => option.value === selectedSize
            )?.label
          }
          modelImage={stateImage}
          customSizeValues={sizeFormValues}
          height={height}
        />
      ) : (
        <>
          <div className="main-space">
            <h3 className="text-center pt-3">
              Customizing {selectedClothing.name}
            </h3>
            <div className="d-flex justify-content-center">
              <button
                className={`btn rotation-button text-white  ${
                  isRotating === true ? "btn-danger" : "btn-warning"
                }`}
                onClick={handleRotation}
              >
                {isRotating ? (
                  <span>
                    Stop <i className="pi pi-ban"></i>
                  </span>
                ) : (
                  <span>
                    Take a Spin <i className="pi pi-sync"></i>
                  </span>
                )}
              </button>

              <button
                className="btn btn-info text-white mx-3"
                // style={{ float: "right" }}
                onClick={handleRetakeTour}
              >
                Take Tour
              </button>
            </div>
            <div className="configurator-container container">
              <div className="left-panel rounded shadow">
                {/* <h5>Select Part</h5>
                <div className="select-part-container">
                  {masterSelectionPartOptions}
                </div> */}
                <h5>Choose Size</h5>
                <div className="size w-75">
                  <p className="size-button-container">
                    {selectedClothing.sizeOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`size-button btn btn-outline-dark ${
                          selectedSize === option.value ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleSizeChange(option.value, option.priceValue)
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </p>
                  <p className="fit">
                    <span onClick={() => setVisible(true)}>
                      Customize Your Size &#8594;
                    </span>
                    {displayInplaceFor.includes(selectedClothing.name) && (
                      <Inplace className="text-black" closable>
                        <InplaceDisplay>
                          {height || "Click to input height "}
                          <span
                            style={{
                              color: "red",
                              fontWeight: "bolder",
                              textTransform: "lowercase",
                            }}
                          >
                            (cm*)
                          </span>
                        </InplaceDisplay>
                        <InplaceContent>
                          <InputNumber
                            value={height}
                            onValueChange={(e) => setHeight(e.target.value)}
                            suffix="cm"
                          />
                        </InplaceContent>
                      </Inplace>
                    )}
                  </p>
                  <Dialog
                    header="Sizing Guide"
                    visible={visible}
                    className="col-12 col-sm-6"
                    onHide={() => setVisible(false)}
                    dismissableMask={true}
                  >
                    <div className="d-flex flex-column align-items-center">
                      {selectedClothing.sizeModels ? (
                        <p className="mb-1">
                          <img
                            src={selectedClothing.sizeModels}
                            width="100%"
                            alt="size-models"
                          />
                        </p>
                      ) : (
                        ""
                      )}
                      <p className="mb-1">
                        <img
                          src={selectedClothing.sizeGuide}
                          width="100%"
                          alt="size-guide"
                        />
                      </p>
                      <form>
                        <h4 className="mt-3">
                          Customize Your Own Measurements
                        </h4>
                        {selectedClothing.sizeForms?.map((formField) => (
                          <div className="m-3" key={formField.label}>
                            <label className="form-label">
                              {formField.label}
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              value={sizeFormValues[formField.label]}
                              onChange={(e) =>
                                handleSizeFormChange(
                                  formField.label,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                      </form>
                    </div>
                  </Dialog>
                </div>
                <h5>Choose Color</h5>
                <div className="color-buttons-container">
                  <Carousel
                    value={colorOptions}
                    numVisible={isMobile ? 4 : 7}
                    numScroll={isMobile ? 2 : 5}
                    showIndicators={false}
                    // responsiveOptions={responsiveColor}
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
                <h5>Choose Textile</h5> {/* Add heading for textures */}
                {/* ... */}
                <div className="texture-buttons-container">
                  <div className="texture-row">
                    <div className="texture-category">
                      <h3>
                        Batik (+{currencySymbol}
                        {(currencyFactor * textureValues.batik.price).toFixed(
                          2
                        )}
                        )
                      </h3>
                      <Carousel
                        value={textureArrays.batik}
                        numVisible={4}
                        numScroll={2}
                        showIndicators={false}
                        itemTemplate={(texture, index) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            setHideText={setHideText}
                            Title="batik"
                            selectedTexture={selectedPrintOn}
                            // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.batik}
                            textureIndex={textureArrays.batik.indexOf(texture)}
                          />
                        )}
                      />
                    </div>
                    {/* <div className="texture-category">
                      <h3>
                        Dashiki (+{currencySymbol}
                        {(currencyFactor * textureValues.dashiki).toFixed(2)})
                      </h3>
                      <Carousel
                        value={textureArrays.dashiki}
                        numVisible={isMobile ? 1 : 4}
                        numScroll={isMobile ? 1 : 4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            setHideText={setHideText}
                            Title="dashiki"
                            selectedTexture={selectedPrintOn}
                             // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.dashiki}
                            textureIndex={textureArrays.dashiki.indexOf(
                              texture
                            )}
                          />
                        )}
                      />
                    </div> */}
                    {/* <div className="texture-category">
                    <h3>
                      Crochet (+{currencySymbol}
                      {(currencyFactor * textureValues.Crochet.price).toFixed(2)})
                    </h3>
                    <Carousel
                      value={textureArrays.Crochet}
                      numVisible={2}
                      numScroll={2}
                      showIndicators={false}
                      itemTemplate={(texture) => (
                        <TextureItem
                          key={texture}
                          texture={texture}
                          setHideText={setHideText}
                          Title="Crochet"
                          selectedTexture={selectedPrintOn}
                           // Pass setSelectedTexture as a prop
                          handleTextureChange={handleTextureChange}
                          
                          subTextureDescriptions={textureDescriptions.Crochet}
                          textureIndex={textureArrays.Crochet.indexOf(texture)}
                        />
                      )}
                    />
                  </div> */}
                  </div>
                  <div className="texture-row">
                    <div className="texture-category">
                      <h3>
                        waxPrint (+{currencySymbol}
                        {(
                          currencyFactor * textureValues.waxPrint.price
                        ).toFixed(2)}
                        )
                      </h3>
                      <Carousel
                        value={textureArrays.waxPrint}
                        numVisible={4}
                        numScroll={2}
                        showIndicators={false}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            setHideText={setHideText}
                            Title="waxPrint"
                            selectedTexture={selectedPrintOn}
                            // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={
                              textureDescriptions.waxPrint
                            }
                            textureIndex={textureArrays.waxPrint.indexOf(
                              texture
                            )}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="texture-row">
                    {/* <div className="texture-category">
                    <h3>
                      Crochet (+{currencySymbol}
                      {(currencyFactor * textureValues.Crochet.price).toFixed(2)})
                    </h3>
                    <Carousel
                      value={textureArrays.Crochet}
                      numVisible={2}
                      numScroll={2}
                      showIndicators={false}
                      itemTemplate={(texture) => (
                        <TextureItem
                          key={texture}
                          texture={texture}
                          setHideText={setHideText}
                          Title="Crochet"
                          selectedTexture={selectedPrintOn}
                           // Pass setSelectedTexture as a prop
                          handleTextureChange={handleTextureChange}
                          
                          subTextureDescriptions={textureDescriptions.Crochet}
                          textureIndex={textureArrays.Crochet.indexOf(texture)}
                        />
                      )}
                    />
                  </div> */}
                  </div>
                  {/*<div className="texture-row">
                    <div className="texture-category">
                      <h3>
                        Printed Kente (+{currencySymbol}
                        {(currencyFactor * textureValues.printed_kente).toFixed(
                          2
                        )}
                        )
                      </h3>
                      <Carousel
                        value={textureArrays.printed_kente}
                        numVisible={isMobile ? 1 : 4}
                        numScroll={isMobile ? 1 : 4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            setHideText={setHideText}
                            Title="printed_kente"
                            selectedTexture={selectedPrintOn}
                            
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={
                              textureDescriptions.printed_kente
                            }
                            textureIndex={textureArrays.printed_kente.indexOf(
                              texture
                            )}
                          />
                        )}
                      />
                    </div>
                    <div className="texture-category">
                      <h3>
                        Funerals (+{currencySymbol}
                        {(currencyFactor * textureValues.Funerals).toFixed(2)})
                      </h3>
                      <Carousel
                        value={textureArrays.Funerals}
                        numVisible={isMobile ? 1 : 4}
                        numScroll={isMobile ? 1 : 4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            setHideText={setHideText}
                            Title="Funerals"
                            selectedTexture={selectedPrintOn}
                            
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={
                              textureDescriptions.Funerals
                            }
                            textureIndex={textureArrays.Funerals.indexOf(
                              texture
                            )}
                          />
                        )}
                      />
                    </div>
                            </div> */}
                  {/* Add more rows of texture categories as needed */}
                </div>
              </div>
              <div className="right-panel">
                <div className="resize-right-panel">
                  <Canvas
                    ref={canvasRef}
                    camera={{ position: [0, 0, selectedClothing.myZoom] }} // Set the initial camera position
                    gl={{ preserveDrawingBuffer: true }}
                  >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Shirt
                      isRotating={isRotating}
                      selectedClothing={selectedClothing}
                      selectedPart={selectedPart}
                      selectedTexture={state.texture[selectedPart]}
                      showGlow={showGlow}
                    />
                    <CameraControls />{" "}
                    {/* Add camera controls for interaction */}
                  </Canvas>
                </div>

                {/* {/* <div className="m-3">
                  <button
                    className={`btn rotation-button text-white m-3 ${
                      isRotating === true ? "btn-danger" : "btn-warning"
                    }`}
                    onClick={handleRotation}
                  >
                    {isRotating ? (
                  <span>
                    Stop <i className="pi pi-ban"></i>
                  </span>
                ) : (
                  <span>
                    Take a Spin <i className="pi pi-sync"></i>
                  </span>
                )}
                  </button>
                </div> */}
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

export default ConfiguratorFootwear;
