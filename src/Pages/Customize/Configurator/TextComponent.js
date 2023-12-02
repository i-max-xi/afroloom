import React, { useRef } from "react";
import { Text, } from "@react-three/drei";

const TextComponent = ({ textContent, maxWidth, maxLines, textPosition, textColor }) => {
  const textRef = useRef();
  let fontSize = 0.05; // Initial font size
  


  // Function to adjust font size and line breaks to fit within boundaries


  return (
    <Text
      ref={textRef}
      position={textPosition} // Set the text position
      fontSize={fontSize} // Adjust font size as needed
      color={textColor}
      anchorX="center" // Adjust text alignment as needed
      anchorY="middle" // Adjust text alignment as needed
      maxWidth={maxWidth}
      lineHeight={1} // You can adjust line height if needed
      letterSpacing={0.02} // You can adjust letter spacing if needed
    >
      {textContent}
    </Text>
  );
};

export default TextComponent;
