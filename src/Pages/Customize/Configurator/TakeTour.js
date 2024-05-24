import { Dialog } from "primereact/dialog";
import React, { useMemo } from "react";
import { IconError } from "../../../Components/Icons";

const maleVid = "https://www.youtube.com/embed/p0zTzvXzd3Q?si=G8WGqYwNDQg6jg4R";
const femaleVid =
  "https://www.youtube.com/embed/o5Cx3K20gUk?si=r8zkISqEWuLo_Shu";
const hairVid = "https://www.youtube.com/embed/NTqZH6DfQBI?si=qehVE9wMWo9eJPVk";
const bikiniVid =
  "https://www.youtube.com/embed/1OdqOwFrA2U?si=R84KYrKmol0sYO9e";
const bangleVid =
  "https://www.youtube.com/embed/tojo9DBPwng?si=h7Q7blH0V9P1QyQX";
const sashVid = "https://www.youtube.com/embed/oCvH9I3a3lA?si=6iz5mVHGpTkTH4t3";
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
