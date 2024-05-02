import React from "react";

function PrintItem({ texture, selectedTexture, handleTextureChange }) {
  return (
    <div className="texture-item">
      <img
        src={texture}
        alt={`Texture`}
        className={`texture-button ${
          selectedTexture === texture ? "selected-border" : ""
        }`}
        onClick={() => handleTextureChange(texture)}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}

export default PrintItem;
