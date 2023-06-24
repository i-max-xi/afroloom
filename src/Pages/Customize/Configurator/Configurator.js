import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import shirtModel from "./models/shirt_baked_collapsed.glb";
import texture2 from "./textures/texture2.jpg";
import texture3 from "./textures/texture3.jpg";
import texture4 from "./textures/batik.jpg";
import whiteTexture from "./textures/whitetxture.jpg";
import kente from "./textures/kente.jpg";
import Nav from "../../../Components/Nav";
import "./styles.css";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF(shirtModel);
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
        <h1>Customize</h1>

        <div className="container d-flex flex-column-reverse">
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

          <div className="canvas-container">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />

              <Shirt />

              <OrbitControls />
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configurator;
