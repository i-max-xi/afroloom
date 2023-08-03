import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";

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


// import smock1 from "./textures/smock1.jpg";
// import smock2 from "./textures/smock2.jpg";
// import smock3 from "./textures/smock3.jpg";
// import smock4 from "./textures/smock4.jpg";
// import smock5 from "./textures/smock5.jpg";

import Nav from "../../../Components/Nav";
import "./styles.css";
import { useParams } from "react-router";
import { mainFootwear } from "../../../Data/CustomizeDataFootwear";

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
        const texture = snap.texture[index] || null  ;

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

const ConfiguratorFootwear = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const { Id } = useParams();
  const selectedClothing = mainFootwear.find((item) => item.name === Id);

  const [price, setPrice] = useState(selectedClothing.price);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  const [selectedPart, setSelectedPart] = useState(null);

  const [isRotating, setIsRotating] = useState(false);

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

  const handleSizeChange = (factor) => {
    setPrice(selectedClothing.price * factor);
    setSelectedSize(factor);
  };

  const handleColorChange = (newColor) => {
    state.color[selectedPart] = newColor;
    state.texture[selectedPart] = null;
    setSelectedPrintOn(newColor);
  };
  
  const handleTextureChange = (newTexture) => {
    state.texture[selectedPart] = newTexture;
    state.color[selectedPart] = null;
    setSelectedPrintOn(newTexture);
  };
  
  

  const handleRotation = () => {
    setIsRotating((prev) => !prev);
    setSelectedPart(null); // Deselect the part when rotating the entire model
  };

  return (
    <>
      <Nav />
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
            </div>
            <h5>Choose Color</h5> {/* Add heading for colors */}
          <div className="color-buttons-container">
  <button
    className={`color-button red ${selectedPrintOn === "#ff0000" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#ff0000")}
  ></button>
  <button
    className={`color-button white ${selectedPrintOn === "#ffffff" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#ffffff")}
  ></button>
  <button
    className={`color-button green ${selectedPrintOn === "#00ff00" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#00ff00")}
  ></button>
  <button
                className={`color-button blue ${
                  selectedPrintOn === "#0000ff" ? "selected-border" : ""
                }`}
                onClick={() => handleColorChange("#0000ff")}
              ></button>
              <button
                className={`color-button seablue ${
                  selectedPrintOn === "#87ceeb" ? "selected-border" : ""
                }`}
                onClick={() => handleColorChange("#87ceeb")}
              ></button>
              <button
  className={`color-button coral ${
    selectedPrintOn === "#ff7f50" ? "selected-border" : ""
  }`}
  onClick={() => handleColorChange("#ff7f50")}
></button>

<button
  className={`color-button teal ${
    selectedPrintOn === "#008080" ? "selected-border" : ""
  }`}
  onClick={() => handleColorChange("#008080")}
></button>

<button
  className={`color-button olive ${
    selectedPrintOn === "#808000" ? "selected-border" : ""
  }`}
  onClick={() => handleColorChange("#808000")}
></button>

<button
  className={`color-button mauve ${
    selectedPrintOn === "#e0b0ff" ? "selected-border" : ""
  }`}
  onClick={() => handleColorChange("#e0b0ff")}
></button>

<button
  className={`color-button silver ${
    selectedPrintOn === "#c0c0c0" ? "selected-border" : ""
  }`}
  onClick={() => handleColorChange("#c0c0c0")}
></button>
  <button
    className={`color-button black ${selectedPrintOn === "#000000" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#000000")}
  ></button>
  <button
    className={`color-button yellow ${selectedPrintOn === "#ffff00" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#ffff00")}
  ></button>
  <button
    className={`color-button orange ${selectedPrintOn === "#ffa500" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#ffa500")}
  ></button>
  <button
    className={`color-button purple ${selectedPrintOn === "#800080" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#800080")}
  ></button>
  <button
    className={`color-button pink ${selectedPrintOn === "#ff69b4" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#ff69b4")}
  ></button>
  <button
    className={`color-button brown ${selectedPrintOn === "#a52a2a" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#a52a2a")}
  ></button>
  <button
    className={`color-button gray ${selectedPrintOn === "#808080" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#808080")}
  ></button>
  <button
    className={`color-button cyan ${selectedPrintOn === "#00ffff" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#00ffff")}
  ></button>
  <button
    className={`color-button magenta ${selectedPrintOn === "#ff00ff" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#ff00ff")}
  ></button>
  <button
    className={`color-button gold ${selectedPrintOn === "#ffd700" ? "selected-border" : ""}`}
    onClick={() => handleColorChange("#ffd700")}
  ></button>
  {/* Add more colors here */}
</div>

            <h5>Choose Textile</h5> {/* Add heading for textures */}
            <div className="texture-buttons-container">
  
  <div className="d-flex justify-content-between w-100">
    <div>
      <h3>Batik</h3>
      <img
        src={batik1}
        alt="Batik 1"
        width="25rem"
        className={`texture-button texture-1 ${selectedPrintOn === batik1 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(batik1)}
      />
      <img
        src={batik2}
        alt="Batik 2"
        width="25rem"
        className={`texture-button texture-1 ${selectedPrintOn === batik2 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(batik2)}
      />
      <img
        src={batik3}
        alt="Batik 3"
        width="25rem"
        className={`texture-button texture-1 ${selectedPrintOn === batik3 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(batik3)}
      />
      <img
        src={batik4}
        alt="Batik 4"
        width="25rem"
        className={`texture-button texture-1 ${selectedPrintOn === batik4 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(batik4)}
      />
      <img
        src={batik5}
        alt="Batik 5"
        width="25rem"
        className={`texture-button texture-1 ${selectedPrintOn === batik5 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(batik5)}
      />
    </div>
  
    <div>
      <h3>Dashiki</h3>
      <img
        src={dashiki1}
        alt="Dashiki 1"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === dashiki1 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(dashiki1)}
      />
      <img
        src={dashiki2}
        alt="Dashiki 2"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === dashiki2 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(dashiki2)}
      />
      <img
        src={dashiki3}
        alt="Dashiki 3"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === dashiki3 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(dashiki3)}
      />
      <img
        src={dashiki4}
        alt="Dashiki 4"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === dashiki4 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(dashiki4)}
      />
      <img
        src={dashiki5}
        alt="Dashiki 5"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === dashiki5 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(dashiki5)}
      />
    </div>
  
    </div>
  
    <div className="d-flex justify-content-between w-100">
    <div>
      <h3>Kente</h3>
      <img
        src={kente1}
        alt="Kente 1"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === kente1 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(kente1)}
      />
      <img
        src={kente2}
        alt="Kente 2"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === kente2 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(kente2)}
      />
      <img
        src={kente3}
        alt="Kente 3"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === kente3 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(kente3)}
      />
      <img
        src={kente4}
        alt="Kente 4"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === kente4 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(kente4)}
      />
      <img
        src={kente5}
        alt="Kente 5"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === kente5 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(kente5)}
      />
    </div>
  
    <div>
      <h3>Wax Print</h3>
      <img
        src={waxPrint1}
        alt="Wax Print 1"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === waxPrint1 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(waxPrint1)}
      />
      <img
        src={waxPrint2}
        alt="Wax Print 2"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === waxPrint2 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(waxPrint2)}
      />
      <img
        src={waxPrint3}
        alt="Wax Print 3"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === waxPrint3 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(waxPrint3)}
      />
      <img
        src={waxPrint4}
        alt="Wax Print 4"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === waxPrint4 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(waxPrint4)}
      />
      <img
        src={waxPrint5}
        alt="Wax Print 5"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === waxPrint5 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(waxPrint5)}
      />
    </div>
    </div>
  
  
    <div className="d-flex justify-content-between w-100">
    <div>
      <h3>Smock</h3>
       {/* <img
        src={smock1}
        alt="Smock 1"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === smock1 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(smock1)}
      />
      <img
        src={smock2}
        alt="Smock 2"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === smock2 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(smock2)}
      />
      <img
        src={smock3}
        alt="Smock 3"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === smock3 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(smock3)}
      />
      <img
        src={smock4}
        alt="Smock 4"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === smock4 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(smock4)}
      />
      <img
        src={smock5}
        alt="Smock 5"
        width="25rem"
        className={`texture-button texture-2 ${selectedPrintOn === smock5 ? "selected-border" : ""}`}
        onClick={() => handleTextureChange(smock5)}
      /> */}
    </div>
    </div>
  </div>


          </div>

          <div className="right-panel border-left">
            <Canvas
              camera={{ position: [0, 0, selectedClothing.myZoom] }} // Set the initial camera position
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
          <span className="fs-6 fw-normal">Price:</span> ${price}
        </p>
        <button className="btn btn-success text-white">Add to Cart</button>
      </div>
    </>
  );
};

export default ConfiguratorFootwear;
