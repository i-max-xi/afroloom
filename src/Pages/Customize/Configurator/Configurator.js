import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Color } from "three";
import shirtModel from "./models/shirt_baked_collapsed.glb";
import Nav from "../../../Components/Nav";

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
        <h1>Configurator</h1>
        
        <div className="container d-flex justify-content-center mt-5">
          <button onClick={() => handleColorChange("#ff0000")}>Red</button>
          <button onClick={() => handleColorChange("#00ff00")}>Green</button>
          <button onClick={() => handleColorChange("#0000ff")}>Blue</button>
        </div>

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
    </>
  );
};

export default Configurator;
