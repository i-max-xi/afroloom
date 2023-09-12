import React, { useState, useRef, useEffect } from "react";
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
import { mainMaleCustomize } from "../../../Data/CustomizeDataMale";

import { useSelector } from "react-redux";

//arrays
import {
  colorOptions,
  textureArrays,
  sizeOptions,
  textureDescriptions,
  textureValues,
  responsiveNess,
  responsiveColor,
} from "./arrays/neededArrays";
import TextureItem from "./TextureItem";

const Shirt = ({
  isRotating,
  selectedClothing,
  selectedPart,
  setSelectedPart,
  selectedTexture,
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
    // Simulate loading for 2 seconds (you can replace this with your actual loading code)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading state to false once model is loaded (replace with your actual model loading logic)
    }, 2000);

    return () => clearTimeout(loadingTimeout); // Cleanup the timeout if component unmounts
  }, []);

  return (
    <group ref={groupRef}>
      {isLoading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        selectedClothing.myNode.map((nodeName, index) => {
          const color = snap.color[index] || "#ffffff";
          const texture = snap.texture[index] || null;

          return (
            <mesh
              key={selectedTexture}
              castShadow
              geometry={nodes[nodeName].geometry}
              onClick={() => handlePartClick(index)}
            >
              <meshStandardMaterial
                attach="material"
                color={color}
                map={texture && new TextureLoader().load(texture)}
                roughness={1}
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

const Configurator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { Id } = useParams();
  const selectedClothing = mainMaleCustomize.find((item) => item.name === Id);

  const [Price, setPrice] = useState(selectedClothing.price);

  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  const [selectedPart, setSelectedPart] = useState(null);

  const [isRotating, setIsRotating] = useState(false);

  const canvasRef = useRef();

  // currency conversion
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const handleSizeChange = (factor) => {
    setPrice(selectedClothing.price * factor);
    setSelectedSize(factor);
  };

  const handleColorChange = (newColor) => {
    state.color[selectedPart] = newColor;
    state.texture[selectedPart] = null;
    setSelectedPrintOn(newColor);
  };

  const [partPrices, setPartPrices] = useState(
    Array(selectedClothing.myNode.length).fill(selectedClothing.price)
  );

  const handleTextureChange = (newTexture) => {
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

      // Update the partPrices array with the new price for the selected part
      setPartPrices((prevPrices) =>
        prevPrices.map((price, index) =>
          index === selectedPart ? newPartPrice : price
        )
      );
    }
  };

  const handleRotation = () => {
    setIsRotating((prev) => !prev);
    setSelectedPart(null); // Deselect the part when rotating the entire model
  };

  // Create an array to store selected parts with their color and texture information
  const selectedParts = selectedClothing.myNode.map((nodeName, index) => ({
    name: nodeName,
    color: state.color[index] || null,
    texture: state.texture[index] || null,
  }));

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
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");

  //total price
  const total = (
    partPrices.reduce((total, price) => total + Price, 0) *
    sizeOptions[selectedSize].value *
    currencyFactor
  ).toFixed(2);

  // description dialogs
  const [selectedTexture, setSelectedTexture] = useState({});

  return (
    <>
      <Nav />

      {showConfirmation ? (
        <Confirmation
          currencySymbol={currencySymbol}
          total={total}
          estimatedShippingTime="2-3 business days"
          readyBy="August 15, 2023"
          selectedParts={selectedParts}
          selectedSize={
            sizeOptions.find((option) => option.value === selectedSize)?.label
          }
          modelImage={stateImage}
          height={height}
          weight={weight}
          chest={chest}
          waist={waist}
        />
      ) : (
        <>
          <div className="main-space">
            <h3 className="text-center">Customizing {selectedClothing.name}</h3>

            <div className="configurator-container container">
              <div className="left-panel mb-2 rounded shadow">
                <h5>Select Part</h5>
                <div className="">
                  {selectedClothing.myNode.map((nodeName, index) => (
                    <button
                      key={index}
                      className={`size-button btn btn-outline-dark ${
                        selectedPart === index ? "selected" : ""
                      }`}
                      onClick={() => setSelectedPart(index)}
                    >
                      {nodeName}
                    </button>
                  ))}
                </div>
                <h5>Choose Size</h5>
                <div className="size w-75">
                  {sizeOptions.map((option) => (
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
                  <p onClick={() => setVisible(true)} className="fit">
                    Fit & Sizing guide
                  </p>
                  <Dialog
                    header="Sizing Guide"
                    visible={visible}
                    style={{ width: "50vw" }}
                    onHide={() => setVisible(false)}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <p className="m-0">
                        <img
                          src={selectedClothing.sizeGuide}
                          width="100%"
                          alt="size-guide"
                        />
                      </p>
                      <p className="mb-2">
                        <img
                          src={selectedClothing.sizePattern}
                          width="100%"
                          alt="size-guide"
                        />
                      </p>
                      <form>
                        <h4 className="mt-3">
                          Customize Your Own Measurements
                        </h4>
                        <div className="d-flex">
                          <div className="m-3">
                            <label className="form-label">Height (cm)</label>
                            <input
                              type="number"
                              className="form-control"
                              value={height}
                              onChange={(e) => setHeight(e.target.value)}
                            />
                          </div>
                          <div className="m-3">
                            <label className="form-label">Weight (kg)</label>
                            <input
                              type="number"
                              className="form-control"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="m-3">
                            <label className="form-label">Chest (cm)</label>
                            <input
                              type="number"
                              className="form-control"
                              value={chest}
                              onChange={(e) => setChest(e.target.value)}
                            />
                          </div>
                          <div className="m-3">
                            <label className="form-label">Waist (cm)</label>
                            <input
                              type="number"
                              className="form-control"
                              value={waist}
                              onChange={(e) => setWaist(e.target.value)}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </Dialog>
                </div>
                <h5>Choose Color</h5> {/* Add heading for colors */}
                <div className="color-buttons-container">
                  <Carousel
                    value={colorOptions}
                    numVisible={7}
                    numScroll={5}
                    showIndicators={false}
                    responsiveOptions={responsiveColor}
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
                        {(currencyFactor * textureValues.batik).toFixed(2)})
                      </h3>
                      <Carousel
                        value={textureArrays.batik}
                        numVisible={4}
                        numScroll={4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture, index) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            Title="batik"
                            selectedTexture={selectedTexture}
                            setSelectedTexture={setSelectedTexture} // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.batik}
                            textureIndex={index}
                          />
                        )}
                      />
                    </div>
                    <div className="texture-category">
                      <h3>
                        Dashiki (+{currencySymbol}
                        {(currencyFactor * textureValues.dashiki).toFixed(2)})
                      </h3>
                      <Carousel
                        value={textureArrays.dashiki}
                        numVisible={4}
                        numScroll={4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            selectedTexture={selectedTexture}
                            setSelectedTexture={setSelectedTexture} // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.dashiki}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="texture-row">
                  <div className="texture-category">
                      <h3>
                        Kente (+{currencySymbol}
                        {(currencyFactor * textureValues.kente).toFixed(2)})
                      </h3>
                      <Carousel
                        value={textureArrays.kente}
                        numVisible={4}
                        numScroll={4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            selectedTexture={selectedTexture}
                            setSelectedTexture={setSelectedTexture} // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.kente}
                          />
                        )}
                      />
                    </div>
                    <div className="texture-category">
                      <h3>
                        waxPrint (+{currencySymbol}
                        {(currencyFactor * textureValues.waxPrint).toFixed(2)})
                      </h3>
                      <Carousel
                        value={textureArrays.waxPrint}
                        numVisible={4}
                        numScroll={4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            selectedTexture={selectedTexture}
                            setSelectedTexture={setSelectedTexture} // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.waxPrint}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="texture-row">
                  <div className="texture-category">
                      <h3>
                        Smock (+{currencySymbol}
                        {(currencyFactor * textureValues.smock).toFixed(2)})
                      </h3>
                      <Carousel
                        value={textureArrays.smock}
                        numVisible={4}
                        numScroll={4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            selectedTexture={selectedTexture}
                            setSelectedTexture={setSelectedTexture} // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.smock}
                          />
                        )}
                      />
                    </div>
                    <div className="texture-category">
                      <h3>
                        Crochet (+{currencySymbol}
                        {(currencyFactor * textureValues.Crochet).toFixed(2)})
                      </h3>
                      <Carousel
                        value={textureArrays.Crochet}
                        numVisible={4}
                        numScroll={4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            selectedTexture={selectedTexture}
                            setSelectedTexture={setSelectedTexture} // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.Crochet}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="texture-row">
                  <div className="texture-category">
                      <h3>
                        Printed Kente (+{currencySymbol}
                        {(currencyFactor * textureValues.printed_kente).toFixed(2)})
                      </h3>
                      <Carousel
                        value={textureArrays.printed_kente}
                        numVisible={4}
                        numScroll={4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            selectedTexture={selectedTexture}
                            setSelectedTexture={setSelectedTexture} // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.printed_kente}
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
                        numVisible={4}
                        numScroll={4}
                        showIndicators={false}
                        responsiveOptions={responsiveNess}
                        itemTemplate={(texture) => (
                          <TextureItem
                            key={texture}
                            texture={texture}
                            selectedTexture={selectedTexture}
                            setSelectedTexture={setSelectedTexture} // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={textureDescriptions.Funerals}
                          />
                        )}
                      />
                    </div>
                  </div>
                  {/* Add more rows of texture categories as needed */}
                </div>
              </div>
              <div className="right-panel d-flex justify-content-between">
                <div className="w-75 h-75">
                  <Canvas
                    ref={canvasRef}
                    camera={{ position: [0, 0, selectedClothing.myZoom] }} // Set the initial camera position
                    gl={{ preserveDrawingBuffer: true }}
                    className="w-100"
                  >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Shirt
                      isRotating={isRotating}
                      selectedClothing={selectedClothing}
                      selectedPart={selectedPart}
                      selectedTexture={state.texture[selectedPart]}
                    />
                    <CameraControls />{" "}
                    {/* Add camera controls for interaction */}
                  </Canvas>
                </div>

                <div className="m-3">
                  <button
                    className={`btn rotation-button text-white m-3 ${
                      isRotating === true ? "btn-danger" : "btn-warning"
                    }`}
                    onClick={handleRotation}
                  >
                    {isRotating ? "Stop" : "Spin"}
                  </button>
                </div>

                {/* parts images start */}
                <div className="part-panel" style={{ width: "10%" }}>
                  <div className="d-flex flex-column">
                    {selectedClothing.parts.map((part, index) => (
                      <img
                        src={part}
                        key={index}
                        alt={`Part ${index}`}
                        width="100%"
                        // className={selectedPart === index ? 'selected-border' : ''}
                        className={`part-image ${
                          selectedPart === index ? "selected-border" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {/* parts images end */}
              </div>
            </div>
          </div>
          <div className="price w-100 d-flex bg-dark text-white justify-content-between">
            <span className="m-3">Expected to be ready by: </span>

            <span className="m-3">Estimated shipping time: </span>

            <p className="price-text m-3">
              <span className="fs-6 fw-normal">Price:</span> {currencySymbol}
              {total}
            </p>

            <button
              className="btn btn-success text-white"
              onClick={captureCanvasAsImage}
            >
              Done
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Configurator;
