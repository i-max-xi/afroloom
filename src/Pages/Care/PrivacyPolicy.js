import React from "react";
import Top from "../../Assets/Headers/Privacy_Policy.jpg";
import LayoutHeaders from "../../Components/LayoutHeaders";

const PrivacyPolicy = () => {
  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <div className="p-5 m-5">
        <h3>
          Privacy Policy for
          <span className="text-warning"> Shopinafrica.com</span>
        </h3>
        <p>
          At Shopinafrica.com, we are committed to protecting the privacy and
          security of our customers. This Privacy Policy explains how we
          collect, use, and safeguard your personal data when you access or use
          our website.
        </p>
        <h5>Information We Collect</h5>
        <p>
          We may collect personal information, including but not limited to your
          name, email address, phone number, shipping address, and payment
          information when you register for an account, make a purchase, or
          interact with our site. We also collect non-personal information, such
          as your IP address, browser details, and browsing habits.
        </p>
        <h5>Use of Collected Information</h5>
        <p>
          We use the information you provide to process your orders, personalize
          your shopping experience, communicate with you about your account and
          orders, and improve our services. We may also use your information to
          send you promotional offers, subject to your preferences.
        </p>
        <h5>Information Confidentiality and Security</h5>
        <p>
          We implement industry-standard security measures to ensure the
          confidentiality and integrity of your personal information. However,
          please note that no data transmission over the internet or storage
          system can be guaranteed to be 100% secure.
        </p>
        <h5>Sharing Information with Third Parties</h5>
        <p>
          We may share your personal information with trusted third parties,
          such as payment processors and shipping providers, to fulfill your
          orders. We will not sell, rent, or share your personal information
          with any other third parties without your consent, except as required
          by law or to protect our rights.
        </p>
        <h5>Cookies and Similar Technologies</h5>
        <p>
          We use cookies and similar technologies to enhance your browsing
          experience and collect information about how you use our site. You can
          manage your cookie preferences through your browser settings.
        </p>
        <h5>External Links</h5>
        <p>
          Our website may contain links to third-party websites. We have no
          control over the content and practices of these websites and therefore
          cannot be responsible for their privacy policies. We recommend
          reviewing the privacy policies of any third-party websites you visit.
        </p>
        <h5>Children's Privacy</h5>
        <p>
          Our website is not intended for use by children under the age of 13.
          We do not knowingly collect personal information from children. If you
          are a parent or guardian and believe your child has provided us with
          personal information, please contact us, and we will delete the
          information from our records.
        </p>
        <h5>Changes to the Privacy Policy</h5>
        <p>
          We reserve the right to modify this Privacy Policy at any time. Any
          changes will be effective immediately upon posting on our website.
          Your continued use of our site constitutes your acceptance of the
          updated Privacy Policy.
        </p>
        <p>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at{" "}
          <a href="mailto:email@example.com">[email@example.com]</a>.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
