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
import { mainUnisex } from "../../../Data/CustomizeDataUnisex";

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
  noSpinFor,
} from "./arrays/neededArrays";
import TextureItem from "./TextureItem";
import PartImages from "./PartImages";
import WelcomeTour, { tourSteps } from "./WelcomeTour";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ImageUpload from "./ImageUpload";
import HtmlComponent from "./HtmlComponent";
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
        selectedClothing.myNode?.map((node, index) => {
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
                emissiveIntensity={showGlow && selectedPart === index ? 5 : 0} // Adjust glow intensity
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

  // const [Price, setPrice] = useState(selectedClothing.price);

  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  const [selectedPart, setSelectedPart] = useState(null);

  const [isRotating, setIsRotating] = useState(false);

  const canvasRef = useRef();
  // toast
  const toastRef = useRef(null);
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const handleSizeChange = (factor) => {
    setSelectedSize(factor);
  };

  const [showGlow, setShowGlow] = useState(false);

  // Declare state for entered text and generated texture
  const [enteredTextLeft, setEnteredTextLeft] = useState("");
  const [enteredTextRight, setEnteredTextRight] = useState("");

  // const [textPosition] = useState([-0.65, -0.15, 0.05]); // Initialize text position
  const [textColor, setTextColor] = useState("black");
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily] = useState("Arial");
  const [hideText, setHideText] = useState(false);

  // const fonts = [
  //   "Arial",
  //   "Verdana",
  //   "Courier New",
  //   "Roboto",
  //   "Comic Sans MS",
  //   "Book Antiqua",
  // ];
  // const [currentFontIndex, setCurrentFontIndex] = useState(0);

  // const handleChangeFont = (increment) => {
  //   let newIndex = currentFontIndex + increment;

  //   // Loop back to the start or end of the array if needed
  //   if (newIndex < 0) {
  //     newIndex = fonts.length - 1;
  //   } else if (newIndex >= fonts.length) {
  //     newIndex = 0;
  //   }
  //   setCurrentFontIndex(newIndex);
  //   setFontFamily(fonts[newIndex]);
  // };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 1); // Increase font size by 0.01
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 1); // Decrease font size by 0.01
  };

  // Image imprint
  const [uploadedImageLeft, setUploadedImageLeft] = useState(null); // State to store the uploaded image
  const [uploadedImageRight, setUploadedImageRight] = useState(null); // State to store the uploaded image
  const imageLeftRef = useRef();
  const imageRightRef = useRef();

  const handleImageUploadLeft = (file) => {
    setUploadedImageLeft(URL.createObjectURL(file)); // Set the uploaded image
  };

  const handleImageUploadRight = (file) => {
    setUploadedImageRight(URL.createObjectURL(file)); // Set the uploaded image
  };

  const handleColorChange = (newColor) => {
    if (selectedPart === "all") {
      state.texture = Array(selectedClothing.myNode.length).fill(null);
      state.color = Array(selectedClothing.myNode.length).fill(newColor);
      setSelectedPrintOn(newColor);
      return;
    }

    state.color[selectedPart] = newColor;
    state.texture[selectedPart] = null;
    setSelectedPrintOn(newColor);

    setShowGlow(false);
  };

  const [partPrices, setPartPrices] = useState(
    Array(selectedClothing.myNode.length).fill(0)
  );

  const semitotal = partPrices.reduce((total, price) => total + price, 0);

  const selectedSizeIndex = selectedSize !== 0.5 ? selectedSize : 0;

  //total price
  const total = (
    (semitotal + selectedClothing.price) *
    selectedClothing.sizeOptions[selectedSizeIndex].value *
    currencyFactor
  ).toFixed(2);

  const handleTextureChange = (newTexture) => {
    if (selectedPart === "all") {
      state.texture = Array(selectedClothing.myNode.length).fill(newTexture);
      state.color = Array(selectedClothing.myNode.length).fill(null);
      setSelectedPrintOn(newTexture);

      const textureCategory = Object.keys(textureArrays).find((category) =>
        textureArrays[category].includes(newTexture)
      );

      const newPartPrice = textureValues[textureCategory];

      setPartPrices(Array(selectedClothing.myNode.length).fill(newPartPrice));
      return;
    }

    if (selectedPart !== null) {
      state.texture[selectedPart] = newTexture;
      state.color[selectedPart] = null;
      setSelectedPrintOn(newTexture);

      // Get the texture category based on the newTexture
      const textureCategory = Object.keys(textureArrays).find((category) =>
        textureArrays[category].includes(newTexture)
      );
      // Calculate the new price for the selected part
      const newPartPrice =
        selectedClothing.price + textureValues[textureCategory];

      setPartPrices((prevPrices) =>
        prevPrices.map((price, index) =>
          index === selectedPart ? newPartPrice : price
        )
      );
    }

    setShowGlow(false);
  };

  const handleRotation = () => {
    setIsRotating((prev) => !prev);
    setSelectedPart(null); // Deselect the part when rotating the entire model
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
    selectedClothing.sizeForms.reduce((acc, formField) => {
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
    const split = title?.split("_");
    return split?.join(" ");
  };

  // Welcome
  const [showTourPopup, setShowTourPopup] = useState(true);
  const [showTour, setShowTour] = useState(false);

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

  const masterSelectionPartOptions = useMemo(() => {
    if (selectedClothing.myNode.length === 1) {
      return (
        <button
          className={`size-button btn btn-outline-dark ${
            selectedPart === "all" ? "selected" : ""
          }`}
          onClick={handleAllPartsClick}
        >
          All
        </button>
      );
    } else {
      return (
        <>
          <button
            className={`size-button btn btn-outline-dark ${
              selectedPart === "all" ? "selected" : ""
            }`}
            onClick={handleAllPartsClick}
          >
            All
          </button>
          {selectedClothing.myNode.map((nodeName, index) => (
            <button
              key={index}
              className={`size-button btn btn-outline-dark ${
                selectedPart === index ? "selected" : ""
              }`}
              onClick={() => handleSelectPart(index)}
            >
              {nodeName.name === "hands"
                ? parseTitle("sleeves")
                : parseTitle(nodeName.name)}
            </button>
          ))}
        </>
      );
    }
  }, [selectedClothing]);

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
          <WelcomeTour
            isOpen={showTour}
            onRequestClose={handleTourClose}
            steps={tourSteps}
          />
        )}
      </>

      {showConfirmation ? (
        <Confirmation
          currencySymbol={currencySymbol}
          total={total}
          readyBy={selectedClothing.readyIn}
          weight={selectedClothing.weight}
          name={selectedClothing.name}
          selectedParts={selectedParts}
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
            <h3 className="text-center">Customizing {selectedClothing.name}</h3>
            <div className="d-flex justify-content-center">
              {noSpinFor.includes(selectedClothing.name) ? null : (
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
              )}

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
                <h5>Select Part</h5>
                <div className="select-part-container">
                  {masterSelectionPartOptions}
                </div>
                <h5>Choose Size</h5>
                <div className="size w-75">
                  <p className="size-button-container">
                    {selectedClothing.sizeOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`size-button btn btn-outline-dark ${
                          selectedSize === option.value ? "selected" : ""
                        }`}
                        onClick={() => handleSizeChange(option.value)}
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
                          {height || "Click to input your height "}
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
                          <InputText
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            autoFocus
                            tooltip="we need this for accurate design"
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
                        {selectedClothing.sizeForms.map((formField) => (
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
                <h5>
                  Choose Color (+{currencySymbol}
                  {(currencyFactor * 35).toFixed(2)})
                </h5>
                <div className="color-buttons-container">
                  <Carousel
                    value={colorOptions}
                    numVisible={isMobile ? 4 : 7}
                    numScroll={isMobile ? 2 : 5}
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
                        // responsiveOptions={responsiveNess}
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
                </div>
              </div>
              <div className="right-panel">
                <div className="resize-right-panel">
                  <div
                    ref={canvasRef}
                    style={
                      {
                        // height: selectedClothing.name !== "Sash" ? "100%" : "81%",
                      }
                    }
                  >
                    <Canvas
                      camera={{ position: [0, 0, selectedClothing.myZoom] }} // Set the initial camera position
                      gl={{ preserveDrawingBuffer: true }}
                    >
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      {selectedClothing.name === "Sash" &&
                        hideText === false && (
                          <HtmlComponent
                            textLeft={enteredTextLeft}
                            textRight={enteredTextRight}
                            textColor={textColor}
                            textSize={fontSize}
                            fontFamily={fontFamily}
                          />
                        )}
                      <Shirt
                        isRotating={isRotating}
                        selectedClothing={selectedClothing}
                        selectedPart={selectedPart}
                        selectedTexture={state.texture[selectedPart]}
                        showGlow={showGlow}
                      />
                      {selectedClothing.name !== "Sash" && <CameraControls />}
                    </Canvas>
                    {uploadedImageLeft && (
                      <img
                        ref={imageLeftRef}
                        src={uploadedImageLeft}
                        alt="Uploaded Texture"
                        // width={"3%"}
                        className="uploaded-image"
                        id="uploaded-image-left"
                      />
                    )}
                    {uploadedImageRight && (
                      <img
                        ref={imageRightRef}
                        src={uploadedImageRight}
                        alt="Uploaded Texture"
                        // width={"3%"}
                        className="uploaded-image"
                        id="uploaded-image-right"
                      />
                    )}
                  </div>

                  {selectedClothing.name === "Sash" && (
                    <div className="px-2 pt-2 w-100 text-image-imprint">
                      {/* test text inprinting */}
                      <h5>Imprint text on model</h5>
                      <div className="d-flex text-image-imprint-wrapper">
                        <div className="inputs">
                          <input
                            type="text"
                            placeholder="imprint on left side..."
                            value={enteredTextLeft}
                            onChange={(e) => setEnteredTextLeft(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="imprint on right side..."
                            value={enteredTextRight}
                            onChange={(e) =>
                              setEnteredTextRight(e.target.value)
                            }
                          />
                        </div>
                        <h5>Font color and size</h5>

                        <div className="d-flex imprint-options">
                          <div className="flex-column">
                            <div className="d-flex">
                              {colorOptions.slice(0, 6).map((colorOption) => (
                                <div
                                  key={colorOption.color}
                                  className="color-item mx-2"
                                >
                                  <button
                                    className={`imprint-text-color-button ${
                                      textColor === colorOption.color
                                        ? "selected-border"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      setTextColor(colorOption.label)
                                    }
                                    style={{
                                      backgroundColor: colorOption.color,
                                    }}
                                  ></button>
                                </div>
                              ))}
                            </div>
                            <div className="d-flex justify-content-center fs-button">
                              <button
                                className="btn btn-secondary btn-sm mx-2"
                                onClick={decreaseFontSize}
                              >
                                -
                              </button>
                              <span className="font-size">{fontSize}</span>
                              <button
                                className="btn btn-secondary btn-sm mx-2"
                                onClick={increaseFontSize}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <h5>Imprint images or Logos</h5>

                        <div className="image-uploads">
                          <ImageUpload
                            labelLeft={"Upload for left"}
                            labelRight={"Upload for right"}
                            onImageUploadLeft={handleImageUploadLeft}
                            onImageUploadRight={handleImageUploadRight}
                            toastRef={toastRef}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="price w-100 d-flex bg-dark text-white justify-content-between">
            <span className="m-3 expect-to-be-ready">
              Estimated time to make this order: {selectedClothing.readyIn} days{" "}
            </span>

            <p className="price-text m-3">
              <span className="expect-to-be-ready">Price:</span>{" "}
              {currencySymbol}
              {total}
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

export default ConfiguratorUnisex;
