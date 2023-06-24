import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import shirtModel from "./models/shirt_baked_collapsed.glb";
import texture2 from './textures/PavingStones092_1K_Color.jpg';
import kente from './textures/kente.png';
import Nav from "../../../Components/Nav";
import "./styles.css";


const Shirt = () => {
  const snap = useSnapshot(state);
  // const { nodes, materials } = useGLTF(shirtModel);
  const { nodes, } = useGLTF(shirtModel);
  const colorMap = useLoader(TextureLoader, kente)

  return (
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry}>
      <meshStandardMaterial
        attach="material"
        color={snap.color}
        roughness={1}
        map={colorMap}
      />
    </mesh>
  );
};

const Configurator = () => {
  const handleColorChange = (newColor) => {
    state.color = newColor;
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
