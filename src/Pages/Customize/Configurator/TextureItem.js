import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { textureValues } from "./arrays/neededArrays";

function TextureItem({
  texture,
  selectedTexture,
  handleTextureChange,
  currencySymbol,
  currencyFactor,
  subTextureDescriptions,
  setSelectedTexture,
  Title, textureIndex
}) {
  const [displayDialog, setDisplayDialog] = useState(false);


  return (
    <div className="texture-item">
      <img
        src={texture}
        alt={`Texture`}
        className={`texture-button ${
          selectedTexture === texture ? "selected-border" : ""
        }`}
        onClick={() => handleTextureChange(texture)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-info-circle"
        viewBox="0 0 16 16"

        onClick={(e) => {
          const description = subTextureDescriptions[e.target.childElementCount]
          setSelectedTexture((prevSelectedTexture) => ({
            ...prevSelectedTexture,
            name: texture,
            price: `${currencySymbol}${(currencyFactor * textureValues[texture]).toFixed(2)}`,
            description: description,
          }));
          setDisplayDialog(true);
        }}
        
        
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />{" "}
      </svg>

      <Dialog
        // header={`Texture Details: ${selectedTexture.name}`}
        visible={displayDialog}
        onHide={() => setDisplayDialog(false)}
        style={{ width: "30vw" }} // Adjust the width as needed
      >
        <div className="d-flex flex-column">
          <img alt={`Texture`} src={texture} height="150px" width='250px' style={{alignSelf: 'center'}}/>
          <p style={{paddingBottom: '5rem', paddingTop: '1rem'}}>{selectedTexture.description}</p>
        </div>
      </Dialog>
    </div>
  );
}

export default TextureItem;
