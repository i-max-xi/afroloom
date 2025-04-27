import React from 'react';
import LayoutHeaders from '../../Components/LayoutHeaders';
const Top = '/assets/Headers/shipping.jpg';

const ShippingPolicy = () => {
  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <div className="page-container">
        {/* <h3>
          Welcome to <span className="text-warning">AfroLoom.com,</span> an
          e-commerce platform specializing in African products.
        </h3> */}
        <p>Thank you for your interest in AfroLoom.com</p>

        <h5>Shipping Methods</h5>
        <p>
          We offer various shipping methods to deliver your African products to
          your desired destination. The available shipping methods may include
          standard shipping, expedited shipping, and international shipping.
        </p>
        <h5>Shipping Time</h5>
        <p>
          The estimated delivery time varies depending on the shipping method
          chosen, the destination, and any potential customs clearance delays.
          We strive to process and dispatch orders within 2 business days from
          the date of purchase. Please note that delivery timeframes provided
          are estimated and not guaranteed.
        </p>
        <h5>Shipping Cost</h5>
        <p>
          The shipping costs are calculated based on the size, weight, and
          destination of your order. Shipping costs will be displayed during the
          checkout process before finalizing your purchase.
        </p>
        <h5>Customs and Duties</h5>
        <p>
          For international shipments, please note that customs fees, import
          duties, and taxes may be applicable upon arrival in the destination
          country. Any additional fees or charges are the responsibility of the
          buyer and not included in the product or shipping costs.
        </p>
        <h5>Tracking</h5>
        <p>
          We provide tracking numbers for all shipped orders. Once your order is
          shipped, you will receive a confirmation email with the tracking
          details. You can use this tracking number to monitor the progress of
          your shipment online.
        </p>
        <h5>Order Processing and Fulfillment</h5>
        <p>
          We strive to process and fulfill orders in a timely manner. However,
          please note that order processing times may be subject to delays
          during peak seasons, holidays, or unforeseen circumstances. In such
          cases, we will provide updates regarding any potential delays
        </p>
        <h5>Order Modification and Cancellations</h5>
        <p>
          If you would like to modify or cancel your order after it has been
          placed, please contact our customer support team as soon as possible.
          We will do our best to accommodate your request, but please note that
          we cannot guarantee order modifications or cancellations once the
          order is processed or shipped.
        </p>
        <h5>Returns and Refunds</h5>
        <p>
          Please refer to our dedicated returns and refunds policy for detailed
          information on how to initiate returns, eligibility criteria, and the
          refund process.
        </p>
        <p>
          If you have any questions or concerns, please don't hesitate to
          contact our customer service team.
        </p>
        <p>Thank you for shopping with us!</p>
      </div>
    </>
  );
};

export default ShippingPolicy;
