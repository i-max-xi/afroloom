import React, { useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import texture2 from "./textures/texture2.jpg";
import texture3 from "./textures/texture3.jpg";
import texture4 from "./textures/batik.jpg";
import texture5 from "./textures/texture5.png";
import whiteTexture from "./textures/whitetxture.jpg";
import kente from "./textures/kente.jpg";
import Nav from "../../../Components/Nav";
import "./styles.css";
import { useParams } from "react-router";
import { maleExtras } from "../../../Data/CustomizeDataMale";
import myModel from "./models/shirt_baked_collapsed.glb";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF(myModel);
  const textureMap = useLoader(TextureLoader, snap.texture);

  return (
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry}>
      <meshStandardMaterial
        attach="material"
        color={snap.color}
        roughness={1}
        map={textureMap}
      />
    </mesh>
  );
};

const Configurator = () => {
  const { Id } = useParams();
  const maleClothing = maleExtras.flatMap((category) => category.items);
  const selectedClothing = maleClothing.find((item) => item.id === Id);

  const [price, setPrice] = useState(selectedClothing.price);

  const handleSizeChange = (factor) => {
    setPrice(selectedClothing.price * factor);
  };

  const handleColorChange = (newColor) => {
    state.color = newColor;
    state.texture = whiteTexture; // Reset the texture value to deactivate it
  };

  const handleTextureChange = (newTexture) => {
    state.texture = newTexture;
    state.color = "#ffffff"; // Reset the color value to deactivate it
  };

  return (
    <>
      <Nav />
      <div className="container mb-5">

        <div className="configurator-container">
          <div className="left-panel">
            <h3>Size</h3>
            <div className="size">
            <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(4)}
              >
                S
              </button>
              <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(1)}
              >
                M
              </button>
              <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(2)}
              >
                L
              </button>
              <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(3)}
              >
                XL
              </button>
              <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(4)}
              >
                2XL
              </button>
              <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(4)}
              >
                3XL
              </button>
              <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(5)}
              >
                4XL
              </button>
              <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(6)}
              >
                5XL
              </button>
              <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(6)}
              >
                6XL
              </button>
              <button
                className="size-button btn btn-outline-dark"
                onClick={() => handleSizeChange(7)}
              >
                7XL
              </button>
            </div>
            <h5>Colors</h5> {/* Add heading for colors */}
            <div className="color-buttons-container">
              <button
                className="color-button red"
                onClick={() => handleColorChange("#ff0000")}
              ></button>
              <button
                className="color-button white"
                onClick={() => handleColorChange("#ffffff")}
              ></button>
              <button
                className="color-button green"
                onClick={() => handleColorChange("#00ff00")}
              ></button>
              <button
                className="color-button blue"
                onClick={() => handleColorChange("#0000ff")}
              ></button>
            </div>
            <h5>Textures</h5> {/* Add heading for textures */}
            <div className="texture-buttons-container">
              <img
                src={kente}
                alt="kente"
                width="30rem"
                className="texture-button texture-1"
                onClick={() => handleTextureChange(kente)}
              />

              <img
                src={texture2}
                alt="texture2"
                width="30rem"
                className="texture-button texture-2"
                onClick={() => handleTextureChange(texture2)}
              />

              <img
                src={texture3}
                alt="texture3"
                width="30rem"
                className="texture-button texture-2"
                onClick={() => handleTextureChange(texture3)}
              />

              <img
                src={texture4}
                alt="texture4"
                width="30rem"
                className="texture-button texture-2"
                onClick={() => handleTextureChange(texture4)}
              />
            </div>
            <h5>Designs</h5> {/* Add heading for textures */}
            <div className="texture-buttons-container">
              <img
                src={texture5}
                alt="texture5"
                width="30rem"
                className="texture-button texture-2"
                onClick={() => handleTextureChange(texture5)}
              />
            </div>
          </div>

          <div className="right-panel">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />

              <Shirt />

              <OrbitControls />
            </Canvas>
          </div>
        </div>
      </div>
      <div className="price w-100 d-flex bg-dark text-white justify-content-end">
        <p className="price-text m-3">
          <span className="fs-6 fw-normal">Price:</span> ${price}
        </p>
        <button className="btn btn-success text-white">Add to Cart</button>
      </div>
    </>
  );
};

export default Configurator;
