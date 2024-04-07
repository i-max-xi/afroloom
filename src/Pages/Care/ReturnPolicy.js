import React from "react";
import Top from "../../Assets/Headers/Return_Policy.jpg";
import LayoutHeaders from "../../Components/LayoutHeaders";

const ReturnPolicy = () => {
  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <div className="page-container">
        {/* <h3>
          Return Policy for{" "}
          <span className="text-warning">AfroLoom.com</span>
        </h3> */}
        <p>
          At Afroloom, we're dedicated to ensuring your complete satisfaction
          with every purchase. That's why we offer our 'retouch Policy': if your
          customized clothing or accessories don't meet your expectations,
          simply return them within 48 hours for us to make it right and return
          them to you. However, please be aware that if you cancel your order
          after the second day, we'll refund only 50% of your payment. We want
          you to cherish every piece you buy from us, and if you're not
          completely satisfied, we'll go above and beyond to fix it – whether
          it's a refund or a store credit for your next purchase. Your happiness
          is our priority, so shop confidently at {" "}
          <span className="text-warning">Afroloom.com</span>
        </p>
        <p>Thank you for shopping Afroloom!</p>
      </div>
    </>
  );
};

export default ReturnPolicy;
