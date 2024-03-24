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
          At Afroloom, we want you to love every piece you purchase from us. If
          for any reason you are not satisfied with your customized clothing or
          accessories, you can return them within 48 hours of receiving your
          order. We will gladly refund your money or offer you a store credit to
          use towards your next purchase. Your satisfaction is our top priority!
          Shop with confidence at{" "}
          <span className="text-warning">Afroloom.com</span>
        </p>
        <p>Thank you for shopping with us!</p>
      </div>
    </>
  );
};

export default ReturnPolicy;
