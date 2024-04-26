import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { textureValues } from "./arrays/neededArrays";

import alternateTexture from "./textures/tie_and_dye/10 medofo - Copy.jpg";

function TextureItem({
  texture,
  selectedTexture,
  handleTextureChange,
  subTextureDescriptions,
  textureIndex,
}) {
  const [displayDialog, setDisplayDialog] = useState(false);

  const handleOpenDialog = (e) => {
    setDisplayDialog(true);
    // setHideText(true)
  };

  const handleCloseDialog = () => {
    setDisplayDialog(false);
    // setHideText(false)
  };

  // console.log({ texture });

  const needsAlternate =
    texture === "/static/media/10 medofo.84aa9ed3bbc49733e1bd.jpg";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        className="bi bi-info-circle"
        viewBox="0 0 16 16"
        onClick={(e) => {
          handleOpenDialog(e);
        }}
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />{" "}
      </svg>

      <Dialog
        header={
          subTextureDescriptions[textureIndex]?.textureName !== ""
            ? subTextureDescriptions[textureIndex]?.textureName
            : "Title N/A"
        }
        visible={displayDialog}
        onHide={handleCloseDialog}
        className="col-12 col-sm-4"
        dismissableMask={true}
      >
        <div className="d-flex flex-column">
          <div className="d-flex flex-column" style={{ position: "relative" }}>
            <img
              alt={`Texture`}
              src={needsAlternate ? alternateTexture : texture}
              height="150px"
              width="250px"
              style={{ alignSelf: "center", WebkitTouchCallout: "none" }}
              onContextMenu={(e) => e.preventDefault()}
            />

            <div class="text-block-container">
              <div class="text-block">
                <p>Afroloom</p>
              </div>
            </div>
          </div>

          <p style={{ paddingTop: "1rem" }}>
            {subTextureDescriptions[textureIndex]?.textureDescription !== ""
              ? subTextureDescriptions[textureIndex]?.textureDescription
              : "Description N/A"}
          </p>
        </div>
      </Dialog>
    </div>
  );
}

export default TextureItem;
