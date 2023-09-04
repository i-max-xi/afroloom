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
import batik1 from "./textures/batik1.jpg";
import batik2 from "./textures/batik2.jpg";
import batik3 from "./textures/batik3.jpg";
import batik4 from "./textures/batik4.jpg";
import batik5 from "./textures/batik5.jpg";

import dashiki1 from "./textures/dashiki1.jpg";
import dashiki2 from "./textures/dashiki2.jpg";
import dashiki3 from "./textures/dashiki3.jpg";
import dashiki4 from "./textures/dashiki4.jpg";
import dashiki5 from "./textures/dashiki5.jpg";

import kente1 from "./textures/kente1.jpg";
import kente2 from "./textures/kente2.jpg";
import kente3 from "./textures/kente3.jpg";
import kente4 from "./textures/kente4.jpg";
import kente5 from "./textures/kente5.jpg";

import waxPrint1 from "./textures/waxPrint1.jpg";
import waxPrint2 from "./textures/waxPrint2.jpg";
import waxPrint3 from "./textures/waxPrint3.jpg";
import waxPrint4 from "./textures/waxPrint4.jpg";
import waxPrint5 from "./textures/waxPrint5.jpg";

import smock1 from "./textures/smock1.jpg";
import smock2 from "./textures/smock2.jpg";
import smock3 from "./textures/smock3.jpg";
import smock4 from "./textures/smock4.jpeg";
// import smock5 from "./textures/smock5.jpg";

import lace1 from "./textures/lace1.jpg";
import lace2 from "./textures/lace2.jpg";
import lace3 from "./textures/lace3.jpg";
import lace4 from "./textures/lace4.jpg";
import lace5 from "./textures/lace5.jpg";

import s_fabric1 from "./textures/suit_fabric1.jpeg";
import s_fabric2 from "./textures/suit_fabric2.jpg";
import s_fabric3 from "./textures/suit_fabric3.jpg";
import s_fabric4 from "./textures/suit_fabric4.jpg";
import s_fabric5 from "./textures/suit_fabric5.jpg";

import p_kente1 from "./textures/p_kente1.jpg";
import p_kente2 from "./textures/p_kente2.jpg";
import p_kente3 from "./textures/p_kente3.jpg";
import p_kente4 from "./textures/p_kente4.jpg";

import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import Nav from "../../../Components/Nav";
import "./styles.css";
import { useParams } from "react-router";
import { mainFootwear } from "../../../Data/CustomizeDataFootwear";

import { useSelector } from "react-redux";

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

  return (
    <group ref={groupRef}>
      {selectedClothing.myNode.map((nodeName, index) => {
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
      })}
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
  const selectedClothing = mainFootwear.find((item) => item.name === Id);

   const [Price, setPrice] = useState(selectedClothing.price);

  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  const [selectedPart, setSelectedPart] = useState(null);

  const [isRotating, setIsRotating] = useState(false);

  const canvasRef = useRef();

  // currency conversion
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const sizeOptions = [
    { label: "S", value: 0.5 },
    { label: "M", value: 1 },
    { label: "L", value: 2 },
    { label: "XL", value: 3 },
    { label: "2XL", value: 4 },
    { label: "3XL", value: 5 },
    { label: "4XL", value: 6 },
    { label: "5XL", value: 7 },
    { label: "6XL", value: 8 },
    { label: "7XL", value: 9 },
  ];

  const colorOptions = [
    { color: "#ff0000", label: "Red" },
    { color: "#ffffff", label: "White" },
    { color: "#00ff00", label: "Green" },
    { color: "#0000ff", label: "Blue" },
    { color: "#87ceeb", label: "Seablue" },
    { color: "#ff7f50", label: "Coral" },
    { color: "#008080", label: "Teal" },
    { color: "#808000", label: "Olive" },
    { color: "#e0b0ff", label: "Mauve" },
    { color: "#c0c0c0", label: "Silver" },
    { color: "#000000", label: "Black" },
    { color: "#ffff00", label: "Yellow" },
    { color: "#ffa500", label: "Orange" },
    { color: "#800080", label: "Purple" },
    { color: "#ff69b4", label: "Pink" },
    { color: "#a52a2a", label: "Brown" },
    { color: "#808080", label: "Gray" },
    { color: "#00ffff", label: "Cyan" },
    { color: "#ff00ff", label: "Magenta" },
    { color: "#ffd700", label: "Gold" },
  ];

  const textureArrays = {
    batik: [batik1, batik2, batik3, batik4, batik5],
    dashiki: [dashiki1, dashiki2, dashiki3, dashiki4, dashiki5],
    kente: [kente1, kente2, kente3, kente4, kente5],
    waxPrint: [waxPrint1, waxPrint2, waxPrint3, waxPrint4, waxPrint5],
    smock: [smock1, smock2, smock3, smock4], // Uncomment if needed
    lace: [lace1, lace2, lace3, lace4, lace5],
    printed_kente: [p_kente1, p_kente2, p_kente3, p_kente4],
    suit_fabric: [s_fabric1, s_fabric2, s_fabric3, s_fabric4, s_fabric5],
  };

  const handleSizeChange = (factor) => {
    setPrice(selectedClothing.price * factor);
    setSelectedSize(factor);
  };

  const handleColorChange = (newColor) => {
    state.color[selectedPart] = newColor;
    state.texture[selectedPart] = null;
    setSelectedPrintOn(newColor);
  };

  const textureValues = {
    batik: 10,
    dashiki: 15,
    kente: 20,
    waxPrint: 25,
    smock: 30,
    lace: 35,
    printed_kente: 40,
    suit_fabric: 45,
    // Add values for other texture categories if needed
  };

  const textureDescriptions = {
    batik: [
      "Description for batik1",
      "Description for batik2",
      "Description for batik3",
      "Description for batik4",
      "Description for batik5",
    ],
    dashiki: [
      "Description for dashiki1",
      "Description for dashiki2",
      "Description for dashiki3",
      "Description for dashiki4",
      "Description for dashiki5",
    ],
    kente: [
      "Description for kente1",
      "Description for kente2",
      "Description for kente3",
      "Description for kente4",
      "Description for kente5",
    ],
    waxPrint: [
      "Description for waxPrint1",
      "Description for waxPrint2",
      "Description for waxPrint3",
      "Description for waxPrint4",
      "Description for waxPrint5",
    ],
    smock: [
      "Description for smock1",
      "Description for smock2",
      "Description for smock3",
      "Description for smock4",
    ],
    lace: [
      "Description for lace1",
      "Description for lace2",
      "Description for lace3",
      "Description for lace4",
      "Description for lace5",
    ],
    printed_kente: [
      "Description for p_kente1",
      "Description for p_kente2",
      "Description for p_kente3",
      "Description for p_kente4",
    ],
    suit_fabric: [
      "Description for s_fabric1",
      "Description for s_fabric2",
      "Description for s_fabric3",
      "Description for s_fabric4",
      "Description for s_fabric5",
    ],
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
  const total= (partPrices.reduce((total, price) => total + Price, 0) * sizeOptions[selectedSize].value * currencyFactor).toFixed(2)

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
                    numVisible={12}
                    numScroll={1}
                    showIndicators={false}
                    responsiveOptions={[
                      {
                        breakpoint: "1024px",
                        numVisible: 3,
                        numScroll: 1,
                      },
                      {
                        breakpoint: "768px",
                        numVisible: 2,
                        numScroll: 1,
                      },
                      {
                        breakpoint: "576px",
                        numVisible: 1,
                        numScroll: 1,
                      },
                    ]}
                    itemTemplate={(colorOption) => (
                      // <div key={colorOption.color} className="color-item">
                        <button
                          className={`color-button ${
                            selectedPrintOn === colorOption.color
                              ? "selected-border"
                              : ""
                          }`}
                          onClick={() => handleColorChange(colorOption.color)}
                          style={{ backgroundColor: colorOption.color }}
                        ></button>
                      // </div>
                    )}
                  />
                </div>
                <h5>Choose Textile</h5> {/* Add heading for textures */}
                {/* ... */}
                <div className="texture-buttons-container">
                  <div className="texture-row">
                    <div className="texture-category ">
                      <h3>
                        Batik (+{currencySymbol}
                        {(currencyFactor * 10).toFixed(2)})
                      </h3>

                      <div className="texture-images">
                        <Carousel
                          value={textureArrays.batik}
                          numVisible={4}
                          numScroll={1}
                          showIndicators={false} // Set this to false to deactivate the indicators
                          responsiveOptions={[
                            {
                              breakpoint: "1024px",
                              numVisible: 3,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "768px",
                              numVisible: 2,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "576px",
                              numVisible: 1,
                              numScroll: 1,
                            },
                          ]}
                          itemTemplate={(texture) => (
                            <div key={texture} className="texture-item">
                              <Tooltip target={`.batik-${textureArrays.batik.indexOf(texture)}`}>
                                <div className="d-flex flex-column">
                                  <img
                                    alt={`Batik`}
                                    src={texture}
                                    data-pr-tooltip="PrimeReact-Logo"
                                    height="80px"
                                  />
                                  <p>
                                    {
                                      textureDescriptions.batik[
                                        textureArrays.batik.indexOf(texture)
                                      ]
                                    }
                                  </p>
                                </div>
                              </Tooltip>
                              <img
                                src={texture}
                                alt={`Batik`}
                                className={`texture-button batik-${textureArrays.batik.indexOf(texture)} ${
                                  selectedPrintOn === texture
                                    ? "selected-border"
                                    : ""
                                }`}
                                onClick={() => handleTextureChange(texture)}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <div className="texture-category ">
                      <h3>
                        Dashiki (+{currencySymbol}
                        {(currencyFactor * 15).toFixed(2)})
                      </h3>
                      <div className="texture-images">
                        <Carousel
                          value={textureArrays.dashiki}
                          numVisible={4}
                          numScroll={1}
                          showIndicators={false}
                          responsiveOptions={[
                            {
                              breakpoint: "1024px",
                              numVisible: 3,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "768px",
                              numVisible: 2,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "576px",
                              numVisible: 1,
                              numScroll: 1,
                            },
                          ]}
                          itemTemplate={(texture) => (
                            <div
                              key={texture}
                              className="texture-item"
                            >
                              <Tooltip target={`.dashiki-${textureArrays.dashiki.indexOf(texture)}`}>
                                <div className="d-flex flex-column">
                                  <img
                                    alt={`dashiki`}
                                    src={texture}
                                    data-pr-tooltip="PrimeReact-Logo"
                                    height="80px"
                                  />
                                  <p>
                                    {
                                      textureDescriptions.dashiki[
                                        textureArrays.dashiki.indexOf(texture)
                                      ]
                                    }
                                  </p>
                                </div>
                              </Tooltip>
                              <img
                                src={texture}
                                alt={`dashiki`}
                                className={`texture-button dashiki-${textureArrays.dashiki.indexOf(texture)} ${
                                  selectedPrintOn === texture
                                    ? "selected-border"
                                    : ""
                                }`}
                                onClick={() => handleTextureChange(texture)}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="texture-row">
                    <div className="texture-category ">
                      <h3>
                        Kente (+{currencySymbol}
                        {(currencyFactor * 20).toFixed(2)})
                      </h3>
                      <div className="texture-images">
                        <Carousel
                          value={textureArrays.kente}
                          numVisible={4}
                          numScroll={1}
                          showIndicators={false} // Set this to false to deactivate the indicators
                          responsiveOptions={[
                            {
                              breakpoint: "1024px",
                              numVisible: 3,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "768px",
                              numVisible: 2,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "576px",
                              numVisible: 1,
                              numScroll: 1,
                            },
                          ]}
                          itemTemplate={(texture) => (
                            <div key={texture} className="texture-item">
                              <Tooltip target={`.kente-${textureArrays.kente.indexOf(texture)}`}>
                                <div className="d-flex flex-column">
                                  <img
                                    alt={`Kente`}
                                    src={texture}
                                    data-pr-tooltip="PrimeReact-Logo"
                                    height="80px"
                                  />
                                  <p>
                                    {
                                      textureDescriptions.kente[
                                        textureArrays.kente.indexOf(texture)
                                      ]
                                    }
                                  </p>
                                </div>
                              </Tooltip>
                              <img
                                src={texture}
                                alt={`Kente`}
                                className={`texture-button kente-${textureArrays.kente.indexOf(texture)} ${
                                  selectedPrintOn === texture
                                    ? "selected-border"
                                    : ""
                                }`}
                                onClick={() => handleTextureChange(texture)}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <div className="texture-category ">
                      <h3>
                        Wax Print (+{currencySymbol}
                        {(currencyFactor * 25).toFixed(2)})
                      </h3>
                      <div className="texture-images">
                        <Carousel
                          value={textureArrays.waxPrint}
                          numVisible={4}
                          numScroll={1}
                          showIndicators={false} // Set this to false to deactivate the indicators
                          responsiveOptions={[
                            {
                              breakpoint: "1024px",
                              numVisible: 3,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "768px",
                              numVisible: 2,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "576px",
                              numVisible: 1,
                              numScroll: 1,
                            },
                          ]}
                          itemTemplate={(texture) => (
                            <div key={texture} className="texture-item">
                              <Tooltip target={`.waxPrint-${textureArrays.waxPrint.indexOf(texture)}`}>
                                <div className="d-flex flex-column">
                                  <img
                                    alt={`waxPrint`}
                                    src={texture}
                                    data-pr-tooltip="PrimeReact-Logo"
                                    height="80px"
                                  />
                                  <p>
                                    {
                                      textureDescriptions.waxPrint[
                                        textureArrays.waxPrint.indexOf(texture)
                                      ]
                                    }
                                  </p>
                                </div>
                              </Tooltip>
                              <img
                                src={texture}
                                alt={`waxPrint`}
                                className={`texture-button waxPrint-${textureArrays.waxPrint.indexOf(texture)} ${
                                  selectedPrintOn === texture
                                    ? "selected-border"
                                    : ""
                                }`}
                                onClick={() => handleTextureChange(texture)}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="texture-row">
                    <div className="texture-category ">
                      <h3>
                        Smock (+{currencySymbol}
                        {(currencyFactor * 30).toFixed(2)})
                      </h3>
                      <div className="texture-images">
                        <Carousel
                          value={textureArrays.smock}
                          numVisible={4}
                          numScroll={1}
                          showIndicators={false} // Set this to false to deactivate the indicators
                          responsiveOptions={[
                            {
                              breakpoint: "1024px",
                              numVisible: 3,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "768px",
                              numVisible: 2,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "576px",
                              numVisible: 1,
                              numScroll: 1,
                            },
                          ]}
                          itemTemplate={(texture) => (
                            <div key={texture} className="texture-item">
                              <Tooltip target={`.smock-${textureArrays.smock.indexOf(texture)}`}>
                                <div className="d-flex flex-column">
                                  <img
                                    alt={`smock`}
                                    src={texture}
                                    data-pr-tooltip="PrimeReact-Logo"
                                    height="80px"
                                  />
                                  <p>
                                    {
                                      textureDescriptions.smock[
                                        textureArrays.smock.indexOf(texture)
                                      ]
                                    }
                                  </p>
                                </div>
                              </Tooltip>
                              <img
                                src={texture}
                                alt={`smock`}
                                className={`texture-button smock-${textureArrays.smock.indexOf(texture)} ${
                                  selectedPrintOn === texture
                                    ? "selected-border"
                                    : ""
                                }`}
                                onClick={() => handleTextureChange(texture)}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <div className="texture-category ">
                      <h3>
                        Lace (+{currencySymbol}
                        {(currencyFactor * 35).toFixed(2)})
                      </h3>
                      <div className="texture-images">
                        <Carousel
                          value={textureArrays.lace}
                          numVisible={4}
                          numScroll={1}
                          showIndicators={false} // Set this to false to deactivate the indicators
                          responsiveOptions={[
                            {
                              breakpoint: "1024px",
                              numVisible: 3,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "768px",
                              numVisible: 2,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "576px",
                              numVisible: 1,
                              numScroll: 1,
                            },
                          ]}
                          itemTemplate={(texture) => (
                            <div key={texture} className="texture-item">
                              <Tooltip target={`.lace-${textureArrays.lace.indexOf(texture)}`}>
                                <div className="d-flex flex-column">
                                  <img
                                    alt={`lace`}
                                    src={texture}
                                    data-pr-tooltip="PrimeReact-Logo"
                                    height="80px"
                                  />
                                  <p>
                                    {
                                      textureDescriptions.lace[
                                        textureArrays.lace.indexOf(texture)
                                      ]
                                    }
                                  </p>
                                </div>
                              </Tooltip>
                              <img
                                src={texture}
                                alt={`lace`}
                                className={`texture-button lace-${textureArrays.lace.indexOf(texture)} ${
                                  selectedPrintOn === texture
                                    ? "selected-border"
                                    : ""
                                }`}
                                onClick={() => handleTextureChange(texture)}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="texture-row">
                    <div className="texture-category ">
                      <h3>
                        Printed Kente (+{currencySymbol}
                        {(currencyFactor * 40).toFixed(2)})
                      </h3>
                      <div className="texture-images">
                        <Carousel
                          value={textureArrays.printed_kente}
                          numVisible={4}
                          numScroll={1}
                          showIndicators={false} // Set this to false to deactivate the indicators
                          responsiveOptions={[
                            {
                              breakpoint: "1024px",
                              numVisible: 3,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "768px",
                              numVisible: 2,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "576px",
                              numVisible: 1,
                              numScroll: 1,
                            },
                          ]}
                          itemTemplate={(texture) => (
                            <div key={texture} className="texture-item">
                              <Tooltip target={`.printed_kente-${textureArrays.printed_kente.indexOf(texture)}`}>
                                <div className="d-flex flex-column">
                                  <img
                                    alt={`printed_kente`}
                                    src={texture}
                                    data-pr-tooltip="PrimeReact-Logo"
                                    height="80px"
                                  />
                                  <p>
                                    {
                                      textureDescriptions.printed_kente[
                                        textureArrays.printed_kente.indexOf(texture)
                                      ]
                                    }
                                  </p>
                                </div>
                              </Tooltip>
                              <img
                                src={texture}
                                alt={`printed_kente`}
                                className={`texture-button printed_kente-${textureArrays.printed_kente.indexOf(texture)} ${
                                  selectedPrintOn === texture
                                    ? "selected-border"
                                    : ""
                                }`}
                                onClick={() => handleTextureChange(texture)}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <div className="texture-category ">
                      <h3>
                        Suit Fabric (+{currencySymbol}
                        {(currencyFactor * 45).toFixed(2)})
                      </h3>
                      <div className="texture-images">
                        <Carousel
                          value={textureArrays.suit_fabric}
                          numVisible={4}
                          numScroll={1}
                          showIndicators={false} // Set this to false to deactivate the indicators
                          responsiveOptions={[
                            {
                              breakpoint: "1024px",
                              numVisible: 3,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "768px",
                              numVisible: 2,
                              numScroll: 1,
                            },
                            {
                              breakpoint: "576px",
                              numVisible: 1,
                              numScroll: 1,
                            },
                          ]}
                          itemTemplate={(texture) => (
                            <div key={texture} className="texture-item">
                              <Tooltip target={`.suit_fabric-${textureArrays.suit_fabric.indexOf(texture)}`}>
                                <div className="d-flex flex-column">
                                  <img
                                    alt={`suit_fabric`}
                                    src={texture}
                                    data-pr-tooltip="PrimeReact-Logo"
                                    height="80px"
                                  />
                                  <p>
                                    {
                                      textureDescriptions.suit_fabric[
                                        textureArrays.suit_fabric.indexOf(texture)
                                      ]
                                    }
                                  </p>
                                </div>
                              </Tooltip>
                              <img
                                src={texture}
                                alt={`Suit Fabric`}
                                className={`texture-button suit_fabric-${textureArrays.suit_fabric.indexOf(texture)} ${
                                  selectedPrintOn === texture
                                    ? "selected-border"
                                    : ""
                                }`}
                                onClick={() => handleTextureChange(texture)}
                              />
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Add more rows of texture categories as needed */}
                </div>
              </div>

              <div className="right-panel border-left">
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
                  />
                  <CameraControls /> {/* Add camera controls for interaction */}
                </Canvas>

                <button
                  className={`btn rotation-button text-white m-3 ${
                    isRotating === true ? "btn-danger" : "btn-warning"
                  }`}
                  onClick={handleRotation}
                >
                  {isRotating ? "Stop" : "Spin"}
                </button>
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
