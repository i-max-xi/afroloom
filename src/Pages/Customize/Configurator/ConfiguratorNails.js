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
import { allNailOptions, isMobile } from "../../../utils/constants";
import uuid from "react-uuid";
import PrintItem from "./PrintItem";

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
              ? "#6e4b35"
              : specialNodeNames.includes(nodeName) && nodeName !== "nailHands"
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
                roughness={shiny3Ds.includes(selectedClothing.name) ? 0.2 : 1}
                metalness={node === "Brass" && 1}
                // metalnessMap={}
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

  const [selectedPart, setSelectedPart] = useState(
    notAll.includes(selectedClothing.name) ? 0 : null
  );

  const [isRotating, setIsRotating] = useState(false);

  const canvasRef = useRef(null);
  // toast
  const toastRef = useRef(null);
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [partPrices, setPartPrices] = useState(0);
  const [colorPrice, setColorPrice] = useState(
    colorBasePrice * selectedClothing.myNode[0].yardNeeded
  );

  //total price
  const total = useMemo(() => {
    return (
      (partPrices + selectedClothing.price + colorPrice) *
      currencyFactor
    ).toFixed(2);
  }, [selectedClothing.name]);

  const [showGlow, setShowGlow] = useState(false);

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleColorChange = (newColor) => {
    state.color[selectedPart] = newColor;
    state.texture[selectedPart] = null;
    setSelectedPrintOn(newColor);

    setPartPrices(0);
    setShowGlow(false);
  };

  const handlePrintsChange = (newTexture) => {
    if (selectedPart !== null) {
      state.texture[selectedPart] = newTexture;
      state.color[selectedPart] = null;
      setSelectedPrintOn(newTexture);
      setSelectedTexture(newTexture); // needed to transfer to size

      // const textureCategory = Object.keys(textureArrays).find((category) =>
      //   textureArrays[category].includes(newTexture)
      // );

      // const yardNeeded = selectedClothing.myNode[selectedPart].yardNeeded;
      // const yardPrice = textureValues[textureCategory].price;
      // const yardStart = textureValues[textureCategory].yardStart;

      // const newPartPrice =
      //   yardStart === 2 ? yardNeeded * (yardPrice / 2) : yardNeeded * yardPrice;

      // setPartPrices(newPartPrice);
    }

    setShowGlow(false);
  };

  const handleRotation = () => {
    setIsRotating((prev) => !prev);
    // setSelectedPart(null);
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

  // Handle changes in the size form fields

  // description dialogs
  const [selectedTexture, setSelectedTexture] = useState({});

  const nailOptions = useMemo(() => {
    if (selectedClothing.name === "Box Braids With Curly End") {
      return;
    }
    if (selectedClothing.name === "Body Wave Wig") {
      return;
    }
    if (selectedClothing.name === "Bob Wig") {
      return;
    }
    return allNailOptions;
  }, [selectedClothing.name]);

  const [nailLength, setNailLength] = useState(null);
  const [nailSize, setNailSize] = useState(null);
  const [nailWidth, setNailWidth] = useState(null);
  const [nailMaterial, setNailMaterial] = useState(null);

  return (
    <>
      <Nav />
      <Toast ref={toastRef} />

      {showConfirmation ? (
        <Confirmation
          currencySymbol={currencySymbol}
          total={total}
          readyBy={selectedClothing.readyIn}
          weight={selectedClothing.weight}
          name={selectedClothing.name}
          selectedParts={
            notAll.includes(selectedClothing.name) ? null : selectedParts
          }
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
        />
      ) : (
        <>
          <div className="main-space">
            <h3 className="text-center pt-3">
              Customizing {selectedClothing.name}
            </h3>
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

              {/* <button
                className="btn btn-info text-white mx-3"
                // style={{ float: "right" }}
                onClick={handleRetakeTour}
              >
                Take Tour
              </button> */}
            </div>
            <div className="configurator-container container">
              <div className="left-panel rounded shadow">
                <h5>Apply Color</h5>
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

                <h5>Apply Prints</h5>
                <div className="color-buttons-container">
                  {/* <Carousel
                    value={colorOptions}
                    numVisible={isMobile ? 4 : 7}
                    numScroll={isMobile ? 2 : 5}
                    showIndicators={false}
                    itemTemplate={(printsOption, index) => (
                      <div key={index} className="color-item">
                        <button
                          className={`color-button ${
                            selectedPrintOn === printsOption
                              ? "selected-border"
                              : ""
                          }`}
                          onClick={() => handlePrintsChange(printsOption)}
                        ></button>
                      </div>
                    )}
                  /> */}
                  <Carousel
                    value={textureArrays.batik}
                    numVisible={4}
                    numScroll={2}
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

                <h5>Specifications</h5>

                <div className="specifications">
                  {nailOptions.length && (
                    <>
                      <span className="p-float-label mt-2">
                        <Dropdown
                          value={nailLength}
                          onChange={(e) => setNailLength(e.value)}
                          options={nailOptions.length}
                          placeholder="Type or select a preference, eg. 25cm"
                          className="wig-dropdown"
                          editable
                        />
                        <label htmlFor="inputtext">Nail Length</label>
                      </span>
                    </>
                  )}

                  {nailOptions.size && (
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
                  )}

                  {nailOptions.width && (
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
                  )}

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
                        <label htmlFor="inputtext">Nail Material</label>
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="right-panel">
                <div className="resize-right-panel">
                  <div ref={canvasRef}>
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
                      />
                      {!noSpinFor.includes(selectedClothing.name) && (
                        <CameraControls />
                      )}
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

export default ConfiguratorUnisex;
