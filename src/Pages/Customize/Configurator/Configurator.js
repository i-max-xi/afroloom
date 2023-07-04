import React, { useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import texture2 from "./textures/texture2.jpg";
import texture3 from "./textures/texture3.jpg";
import texture4 from "./textures/batik.jpg";

// import design1 from "./designs/maleClothingExtras/tshirt/2.jpg";
// import texture5 from "./textures/texture5.png";

// import design2 from "./designs/maleClothingExtras/tshirt/3.jpg";

import whiteTexture from "./textures/whitetxture.jpg";
import kente from "./textures/kente.jpg";
import Nav from "../../../Components/Nav";
import "./styles.css";
import { useParams } from "react-router";
import { mainMaleCustomize } from "../../../Data/CustomizeDataMale";
// import myModel from "./models/shortSleeves.glb";

const Shirt = ({ isRotating, selectedClothing, selectedPart }) => {
  const snap = useSnapshot(state);
  // const { nodes } = useGLTF(myModel);
  const { nodes } = useGLTF(selectedClothing.model);
  const textureMap = useLoader(TextureLoader, snap.texture);
  const shirtRef = useRef();

  useFrame(({ clock }) => {
    if (isRotating) {
      shirtRef.current.rotation.y = clock.elapsedTime / 2; // Adjust rotation speed here
    }
  });

  return (
    <>
      {selectedClothing.myNode.map((nodeName, index) => (
        <mesh
          key={index}
          castShadow
          geometry={nodes[nodeName].geometry}
          ref={index === selectedPart ? shirtRef : null}
        >
          <meshStandardMaterial
            attach="material"
            color={index === selectedPart ? snap.color : "#ffffff"}
            roughness={1}
            map={index === selectedPart ? textureMap : null}
          />
        </mesh>
      ))}
    </>
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
  const { Id } = useParams();
  const selectedClothing = mainMaleCustomize.find((item) => item.name === Id);

  const [price, setPrice] = useState(selectedClothing.price);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  const [isRotating, setIsRotating] = useState(false);

  const handleSizeChange = (factor) => {
    setPrice(selectedClothing.price * factor);
    setSelectedSize(factor);
  };

  const handleColorChange = (newColor) => {
    state.color = newColor;
    state.texture = whiteTexture; // Reset the texture value to deactivate it
    setSelectedPrintOn(newColor);
  };

  const handleTextureChange = (newTexture) => {
    state.texture = newTexture;
    state.color = "#ffffff"; // Reset the color value to deactivate it
    setSelectedPrintOn(newTexture);
  };

  const handleRotation = () => {
    setIsRotating((prev) => !prev);
  };

  const [selectedPart, setSelectedPart] = useState(null);


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
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 0.5 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(0.5)}
              >
                S
              </button>
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 1 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(1)}
              >
                M
              </button>
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 2 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(2)}
              >
                L
              </button>
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 3 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(3)}
              >
                XL
              </button>
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 4 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(4)}
              >
                2XL
              </button>
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 5 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(5)}
              >
                3XL
              </button>
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 6 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(6)}
              >
                4XL
              </button>
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 7 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(7)}
              >
                5XL
              </button>
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 8 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(8)}
              >
                6XL
              </button>
              <button
                className={`size-button btn btn-outline-dark ${
                  selectedSize === 9 ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(9)}
              >
                7XL
              </button>
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

export default Configurator;
