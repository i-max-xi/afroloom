import { Dialog } from "primereact/dialog";
import React, { useMemo } from "react";

import maleVid from "../../../Assets/Tutorials/male.mp4";
import femaleVid from "../../../Assets/Tutorials/female.mp4";
import hairVid from "../../../Assets/Tutorials/hair.mp4";
import bikiniVid from "../../../Assets/Tutorials/bikini.mp4";
import bangleVid from "../../../Assets/Tutorials/bangles.mp4";
import sashVid from "../../../Assets/Tutorials/sash.mp4";
import earringVid from "../../../Assets/Tutorials/earring.mp4";

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
      <div>
        <video
          src={videoUrl}
          alt="tutorial"
          className="item-video"
          autoPlay
          playsInline
          loop
          muted
        />
      </div>
    </Dialog>
  );
};

export default TakeTour;
