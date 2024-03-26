import React from "react";

const DesktopDevicePrompt = () => {
  return (
    <div
      className="mobile-prompt"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>
        To enjoy the optimal experience, we highly recommend accessing this
        website from a mobile device. Please note that access is restricted to
        mobile devices only.
      </p>
    </div>
  );
};

export default DesktopDevicePrompt;
