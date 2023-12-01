import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const TextComponent = ({ textContent, maxWidth, maxLines }) => {
  const textRef = useRef();

  // Function to adjust font size and line breaks to fit within boundaries
  const adjustTextToBoundary = () => {
    const textMesh = textRef.current;

    const fontSize = 0.1; // Initial font size
    textMesh.material.fontSize = fontSize;

    // Calculate width and height of the text mesh
    const textSize = new THREE.Vector3();
    textMesh.geometry.computeBoundingBox();
    textMesh.geometry.boundingBox.getSize(textSize);

    // Calculate number of lines
    const numLines = textSize.y / fontSize;

    // Reduce font size until text fits within width and height boundaries
    while (textSize.x > maxWidth || numLines > maxLines) {
      fontSize -= 0.001; // Adjust this decrement value for finer control
      textMesh.material.fontSize = fontSize;
      textMesh.geometry.computeBoundingBox();
      textMesh.geometry.boundingBox.getSize(textSize);
    }
  };

  // Call adjustTextToBoundary when the component mounts or text content changes
  React.useEffect(() => {
    adjustTextToBoundary();
  }, [textContent, maxWidth, maxLines]);

  return (
    <Text
      ref={textRef}
      position={[0, 0, 0]}
      fontSize={0.1} // Initial font size
      maxWidth={maxWidth}
      lineHeight={1} // You can adjust line height if needed
      letterSpacing={0.02} // You can adjust letter spacing if needed
    >
      {textContent}
    </Text>
  );
};

export default TextComponent;
