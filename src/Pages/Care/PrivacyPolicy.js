import React from "react";
import Top from "../../Assets/Headers/Privacy_Policy.jpg";
import LayoutHeaders from "../../Components/LayoutHeaders";

const PrivacyPolicy = () => {
  return (
    <>
    <LayoutHeaders selectedBg={Top}/>
      <div className="p-5 m-5">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo cum
        pariatur a impedit, omnis tempore aperiam quos aut consectetur ex,
        facilis rerum. Voluptatem totam nemo quibusdam iste? Magni, placeat
        perspiciatis!
      </div>
    </>
  );
};

export default PrivacyPolicy;
