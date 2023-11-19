import React from "react";
import Top from "../../Assets/Headers/Return_Policy.jpg";
import LayoutHeaders from "../../Components/LayoutHeaders";

const ReturnPolicy = () => {
  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <div className="p-5 m-5">
        {/* <h3>
          Return Policy for{" "}
          <span className="text-warning">AfroLoom.com</span>
        </h3> */}
        <p>
          Thank you for choosing AfroLoom.com. We appreciate your patronage
          and are committed to providing you with the highest quality products
          and exceptional customer service.
        </p>
        <h4 className="text-warning">Return Policy:</h4>
        <p>
          <h5>Eligibility for Returns:</h5>
          <ul>
            <li>
              Items must be returned within 30 days of the purchase date.
            </li>
            <li>
              The product must be in its original condition, unused, and with
              all the original packaging and tags intact.
            </li>
            <li>
              We do not accept returns on perishable goods, custom-made
              products, or items that are explicitly mentioned as
              non-returnable.
            </li>
          </ul>
          <h5>Return Process:</h5>
          <ul>
            <li>
              To initiate a return, please contact our customer service team via
              email or phone within 7 days of receiving the product
            </li>
            <li>
              Our representative will guide you through the return process and
              provide a Return Merchandise Authorization (RMA) number.
            </li>
            <li>
              Ensure that the RMA number is clearly marked on the package to
              facilitate smooth processing
            </li>
            <li>
              Return shipping costs are the responsibility of the customer
              unless the return is due to an error on our part.
            </li>
            <li>
              We recommend using a trackable shipping method to ensure the safe
              return of the product
            </li>
          </ul>
          <h5>Refunds and Exchanges:</h5>
          <ul>
            <li>
              Once we receive the returned item and verify its condition, we
              will process the refund within 2 business days
            </li>
            <li>
              The refund will be issued to the original payment method used
              during the purchase
            </li>
            <li>
              Exchanges can be arranged for eligible items based on
              availability. If the desired item is out of stock, a refund will
              be issued instead
            </li>
          </ul>
          <h5>Damaged or Defective Products:</h5>
          <ul>
            <li>
              If you receive a damaged or defective product, please contact our
              customer service team immediately.
            </li>
            <li>
              Provide clear photographs or videos of the damaged or defective
              item for our investigation
            </li>
            <li>
              We will arrange for a replacement or issue a refund based on the
              nature of the product and availability.
            </li>
          </ul>
          <h6>
            Please note that our return policy may be subject to change or
            modification based on specific product categories or promotions. Any
            such changes will be clearly communicated on our website or during
            the purchase process.
          </h6>
          <p>
            We value your satisfaction and are committed to resolving any issues
            or concerns you may have regarding your purchase. For further
            assistance or questions, please don't hesitate to contact our
            customer service team.
          </p>
          <p>Thank you for shopping with us!</p>
        </p>
      </div>
    </>
  );
};

export default ReturnPolicy;
