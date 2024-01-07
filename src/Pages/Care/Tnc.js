import React from "react";
import Top from "../../Assets/Headers/tnc.jpg";
import LayoutHeaders from "../../Components/LayoutHeaders";

const Tnc = () => {
  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <div className="page-container">
        {/* <h4>
          Welcome to <span className="text-warning">AfroLoom.com,</span> an
          e-commerce platform specializing in African products.
        </h4> */}
        <p>
          By accessing and using our website, you agree to be bound by the
          following terms and conditions. Please read them carefully before
          making a purchase or using our services.
        </p>
        <h5>Definitions</h5>
        <ul>
          <li>
            "Website" refers to AfroLoom.com and all its associated pages
            and content.
          </li>
          <li>
            "User" refers to any individual or entity accessing and using our
            website.
          </li>
          <li>
            "Customer" refers to a user who makes a purchase through our
            website.
          </li>
          <li>
            "Product(s)" refers to any item available for purchase on our
            website.
          </li>
          <li>
            "Seller" refers to the individual or company selling their products
            on our website.
          </li>
        </ul>
        <h5>Acceptance of Terms</h5>
        <p>
          By accessing and using our website, you confirm that you have read,
          understood, and agreed to comply with these terms and conditions. If
          you do not agree with any aspect of these terms, please refrain from
          using our website.
        </p>
        <h5>Registration and Account</h5>
        <p>
          In order to make a purchase and access certain features of our
          website, you may be required to create an account. When creating an
          account, you agree to provide accurate and up-to-date information. You
          are solely responsible for maintaining the confidentiality of your
          account details and any activities performed using your account.
        </p>
        <h5>Product Listings and Descriptions</h5>
        <p>
          We strive to provide accurate and detailed product listings and
          descriptions. However, we do not warrant the accuracy, completeness,
          or reliability of any product information. It is the customer's
          responsibility to review and verify all product details before making
          a purchase.
        </p>
        <h5>Ordering and Payment</h5>
        <p>
          By placing an order, you agree to purchase the selected product(s) at
          the listed price, including any applicable taxes, shipping fees, and
          handling charges. Payment must be made in full at the time of purchase
          using one of our accepted payment methods.
        </p>
        <h5>Shipping and Delivery</h5>
        <p>
          We aim to provide accurate shipping and delivery information, but
          cannot guarantee specific delivery dates or times. Any estimated
          delivery times provided are for reference purposes only. Customers are
          responsible for providing accurate delivery information during the
          checkout process. Any additional customs duties, taxes, or fees
          imposed by the customer's country are the customer's responsibility.
        </p>
        <h5>Returns and Refunds</h5>
        <p>
          We accept returns and provide refunds in accordance with our Returns
          and Refunds Policy. Please review this policy before making a
          purchase.
        </p>
        <h5>Intellectual Property</h5>
        <p>
          All content, including but not limited to images, logos, text, and
          graphics, on our website are the intellectual property of
          AfroLoom.com or its sellers. You are prohibited from using,
          reproducing, or distributing any content without obtaining explicit
          permission from the respective owner(s).
        </p>
        <h5>Limitation of Liability</h5>
        <p>
          Under no circumstances shall AfroLoom.com be liable for any
          direct, indirect, incidental, consequential, or punitive damages
          arising from the use of our website or the purchase of any product.
          This limitation of liability applies to the fullest extent permitted
          by applicable law law.
        </p>
        <h5>Governing Law and Jurisdiction</h5>
        <p>
          These terms and conditions shall be governed by and construed in
          accordance with the laws of Ghana. Any disputes arising from these
          terms shall be subject to the exclusive jurisdiction of the courts
          located within Ghana.
        </p>
        <h5>Modifications</h5>
        <p>
          AfroLoom.com reserves the right to modify, update, or remove
          portions of these terms and conditions at any time without prior
          notice. It is your responsibility to regularly review these terms for
          any changes. Continued use of our website after any modifications
          constitutes acceptance of the updated terms and conditions.
        </p>
        <p>
          By using our website and making a purchase, you indicate that you have
          read, understood, and agreed to these terms and conditions. If you
          have any questions or concerns, please don't hesitate to contact our
          customer service team.
        </p>
        <p>Thank you for shopping with us!</p>
      </div>
    </>
  );
};

export default Tnc;
