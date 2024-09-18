/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from "primereact/dialog";
import React, { useMemo, useState } from "react";
import { textureValues } from "./arrays/neededArrays";

import alternateTexture from "./textures/tie_and_dye/10 medofo - Copy.jpg";
import queensAlternate from "./textures/diaspora/queens_LE_auto_x2 - Copy.jpg"
import repuAlternate from "./textures/diaspora/repo_LE_auto_x2 - Copy.jpg"
import otumfuoAlternate from "./textures/commemorative/otumfuo - Copy.jpg"
import contiAlternate from "./textures/diaspora/conti_LE_auto_x2 - Copy.jpg";
import africaAlternate from "./textures/diaspora/africa_LE_auto_x2 - Copy.jpg";
import katangaAlternate from "./textures/diaspora/kat_LE_auto_x2 - Copy.jpg"
 import AsanteheneAnniversaryAlternate from "./textures/commemorative/1-imageonline.co-merged - Copy.jpeg"
import AsanteheneAnniversaryAlternate2 from "./textures/commemorative/gfsdg-imageonline.co-merged (1) - Copy.jpeg"

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


  const needsAlternate =
    texture === "/static/media/10 medofo.84aa9ed3bbc49733e1bd.jpg";

  const isRepu = texture === "/static/media/repo_LE_auto_x2.f50cd599f567fcdf3d85.jpg";
  const isQueens = texture === "/static/media/A.d9379b965b715f313603.png";

  const isOtumfuo = texture === "/static/media/otumfuo.46a2fea2de6a31c52a17.jpg";
  const isConti = texture === "/static/media/conti_LE_auto_x2.bdf93a21d9fe17700452.jpg";
  const isAfrica = texture === "/static/media/africa_LE_auto_x2.e33124ba711b85535cd5.jpg";
  const isKatanga = texture === "/static/media/kat_LE_auto_x2.027d8f3b120fd32985ad.jpg";
  const isAsanteheneAnniversary  = texture  === "/static/media/1-imageonline.co-merged.6daa3b6a171f9f9c0242.jpeg"
  const isAsanteheneAnniversary2  = texture  === "/static/media/gfsdg-imageonline.co-merged (1).ed8bdf12e1c96c823397.jpeg"

  

  const masterTexture = useMemo(() => {
    if (isRepu) {
      return repuAlternate;
    } else if (isQueens) {
      return queensAlternate;
    } else if (needsAlternate) {
      return alternateTexture;
    } 
    else if (isOtumfuo) {
      return otumfuoAlternate;
    }
    else if (isConti) {
      return contiAlternate;
    }
    else if (isAfrica) {
      return africaAlternate;
    }
    else if (isKatanga) {
      return katangaAlternate;
    }
    else if (isAsanteheneAnniversary) {
      return AsanteheneAnniversaryAlternate;
    }
    else if (isAsanteheneAnniversary2) {
      return AsanteheneAnniversaryAlternate2;
    }
    else {
      return texture;
    }
  }, [texture])

  return (
    <div className="texture-item" >
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
        className="bi bi-info-circle texture-item-info"
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
              src={masterTexture}
              height="150px"
              width="250px"
              style={{ alignSelf: "center", WebkitTouchCallout: "none", objectFit: "cover" }}
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
          <p style={{fontWeight: "bold"}}>
            { subTextureDescriptions[textureIndex]?.disclaimer}
          </p>

          <p >
            { subTextureDescriptions[textureIndex]?.footNote}
          </p>

        </div>
      </Dialog>
    </div>
  );
}

export default TextureItem;
