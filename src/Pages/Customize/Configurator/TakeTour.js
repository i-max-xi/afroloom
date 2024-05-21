import { Dialog } from "primereact/dialog";
import React, { useMemo } from "react";
import { IconError } from "../../../Components/Icons";

const maleVid = "https://www.youtube.com/embed/p0zTzvXzd3Q?si=G8WGqYwNDQg6jg4R";
const femaleVid = "";
const hairVid = "";
const bikiniVid = "";
const bangleVid = "";
const sashVid = "";
const earringVid = "";

const TakeTour = ({ isOpen, onClose, type }) => {
  const videoUrl = useMemo(() => {
    if (type === "male") {
      return maleVid;
    }

    if (type === "female") {
      return femaleVid;
    }

    if (type === "bikini") {
      return bikiniVid;
    }

    if (type === "hair") {
      return hairVid;
    }

    if (type === "nails") {
      return;
    }

    if (type === "bangle") {
      return bangleVid;
    }

    if (type === "earring") {
      return earringVid;
    }

    if (type === "sash") {
      return sashVid;
    }
  }, [type]);

  return (
    <Dialog
      //   header="Welcome to the 3D Customization!"
      visible={isOpen}
      className="col-12 col-sm-6"
      onHide={onClose}
      dismissableMask={true}
    >
      <div className="video-container">
        {videoUrl ? (
          <iframe
            src={videoUrl}
            title="tutorial"
            className="item-video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="d-flex align-items-center justify-content-center flex-column">
            <p>{IconError}</p>
            <p>Sorry, no video available for this item.</p>
          </p>
        )}
      </div>
    </Dialog>
  );
};

export default TakeTour;
