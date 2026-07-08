import React from 'react';
import LayoutHeaders from '../../Components/LayoutHeaders';

const Top = '/assets/Headers/tnc.jpg';

const Tnc = () => {
  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <div className="page-container">
        <p>
          Welcome to Afroloom, your one-stop destination for customizing and
          creating unique clothing and accessories tailored just for you. By
          using our website, you agree to abide by the following terms and
          conditions:
        </p>
        <p>
          <p>
            Customization Process: Our website allows you to design and
            customize your clothing and accessories to your liking. Once your
            order is placed and confirmed, our talented team will begin the
            process of creating your unique piece. Please note that all
            customization options are final and cannot be altered once
            production begins.
          </p>
          <p>
            Returns: We understand that sometimes a product may not meet your
            expectations. If for any reason you are not satisfied with your
            purchase, you may return the product within 48 hours for a full
            refund or exchange. Please note that the product must be returned in
            its original condition and packaging to be eligible for a refund.
          </p>
          <p>
            Payment: Clients have the option to pay 40% of the total cost price
            upfront and the remaining balance once the product is ready for
            delivery. Alternatively, clients may choose to pay in full at the
            time of purchase. Payment can be made securely through our website
            using various payment methods.
          </p>
          <p>
            Notification: Once your customized product is ready, we will notify
            you via email or phone call to arrange for delivery or pickup.
            Please ensure that your contact information provided is accurate to
            avoid any delays in receiving your order.
          </p>
          <p>
            Intellectual Property: All designs, images, and content on our
            website are the property of Afroloom and are protected by copyright
            laws. Any unauthorized use, reproduction, or distribution of our
            intellectual property is strictly prohibited.
          </p>
        </p>

        <p>
          By using our website, you agree to comply with these terms and
          conditions. We reserve the right to modify or update these terms at
          any time without prior notice. If you have any questions or concerns,
          please contact us at info@afroloom.com
        </p>

        <p>
          Thank you for choosing Afroloom for your custom clothing and accessory
          needs. We look forward to creating something truly special for you!
        </p>
      </div>
    </>
  );
};

export default Tnc;
