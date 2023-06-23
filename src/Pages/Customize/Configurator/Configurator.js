import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Color } from "three";
import shirtModel from "./models/shirt_baked_collapsed.glb";
import Nav from "../../../Components/Nav";
import './styles.css';

const Model = () => {
  const gltf = useGLTF(shirtModel);

  // Adjust the scale factor as needed
  const scale = 20;

  return (
    <group scale={[scale, scale, scale]}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const Configurator = () => {
  const [color, setColor] = useState("#0000ff");

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  useEffect(() => {
    // Update the material's color whenever the 'color' state changes
    const materialColor = new Color(color);
    const material = document.querySelector(".model-material");
    if (material) {
      material.color = materialColor;
    }
  }, [color]);

  return (
    <>
      <Nav />
      <div className="container">

      <h1>Customize</h1>

      <div className="container d-flex flex-column-reverse">
        
        <div className="color-buttons-container">
          <button
            className="color-button red"
            onClick={() => handleColorChange("#ff0000")}
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
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Model />
          <mesh>
            <meshStandardMaterial color="hot-pink" className="model-material" />
          </mesh>
          <OrbitControls />
        </Canvas>
</div>
</div>

      </div>
    </>
  );
};

export default Configurator;
