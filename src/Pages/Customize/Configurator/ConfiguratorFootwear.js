import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import texture2 from "./textures/texture2.jpg";
import texture3 from "./textures/texture3.jpg";
import texture4 from "./textures/batik.jpg";

// import whiteTexture from "./textures/whitetxture.jpg";
import kente from "./textures/kente.jpg";
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
                className={`color-button red ${
                  selectedPrintOn === "#ff0000" ? "selected-border" : ""
                }`}
                onClick={() => handleColorChange("#ff0000")}
              ></button>
              <button
                className={`color-button white ${
                  selectedPrintOn === "#ffffff" ? "selected-border" : ""
                }`}
                onClick={() => handleColorChange("#ffffff")}
              ></button>
              <button
                className={`color-button green ${
                  selectedPrintOn === "#00ff00" ? "selected-border" : ""
                }`}
                onClick={() => handleColorChange("#00ff00")}
              ></button>
              <button
                className={`color-button blue ${
                  selectedPrintOn === "#0000ff" ? "selected-border" : ""
                }`}
                onClick={() => handleColorChange("#0000ff")}
              ></button>
            </div>
            <h5>Choose Textile</h5> {/* Add heading for textures */}
            <div className="texture-buttons-container">
              <img
                src={kente}
                alt="kente"
                width="30rem"
                className={`texture-button texture-1 ${
                  selectedPrintOn === kente ? "selected-border" : ""
                }`}
                onClick={() => handleTextureChange(kente)}
              />

              <img
                src={texture2}
                alt="texture2"
                width="30rem"
                className={`texture-button texture-2 ${
                  selectedPrintOn === texture2 ? "selected-border" : ""
                }`}
                onClick={() => handleTextureChange(texture2)}
              />

              <img
                src={texture3}
                alt="texture3"
                width="30rem"
                className={`texture-button texture-2 ${
                  selectedPrintOn === texture3 ? "selected-border" : ""
                }`}
                onClick={() => handleTextureChange(texture3)}
              />

              <img
                src={texture4}
                alt="texture4"
                width="30rem"
                className={`texture-button texture-2 ${
                  selectedPrintOn === texture4 ? "selected-border" : ""
                }`}
                onClick={() => handleTextureChange(texture4)}
              />
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
