import React, { useEffect } from "react";
import Nav from "./Nav";
// import { useOutlet } from "react-router-dom";


function LayoutHeaders({selectedBg}) {
  // const outlet = useOutlet();
  // let selectedBg = "";

  // switch ((outlet && outlet.props && outlet.props.path) || "") {
  //   case "/tnc":
  //     selectedBg = `url(${aboutTop})`;
  //     break;
  //   case "/shippingPolicy":
  //     selectedBg = "url(/shipping-policy-bg.jpg)";
  //     break;
  //   case "/returnPolicy":
  //     selectedBg = "url(/return-policy-bg.jpg)";
  //     break;
  //   case "/privacyPolicy":
  //     selectedBg = "url(/privacy-policy-bg.jpg)";
  //     break;
  //   case "/contact":
  //     selectedBg = "url(/contact-bg.jpg)";
  //     break;
  //   default:
  //     selectedBg = "url(/default-bg.jpg)";
  //     break;
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Nav />
    <div
    style={{
      backgroundImage: `url(${selectedBg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "10rem",
      width: '100%'
    }}
  ></div>
    </>
    
  );
}

export default LayoutHeaders;
