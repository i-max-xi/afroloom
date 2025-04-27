import React from 'react';
import LayoutHeaders from '../Components/LayoutHeaders';
const Top = '/assets/Headers/aboutus.jpg';

const About = () => {
  return (
    <>
      <LayoutHeaders selectedBg={Top} />
      <div className="page-container">
        <p>Welcome to AfroLoom where style meets craftsmanship.</p>
        <p>
          At Afroloom, we believe that every individual is unique and deserves
          to express themselves through their clothing and accessories. That's
          why we offer a one-of-a-kind experience for our customers to customize
          their pieces and have them expertly sewn to perfection
        </p>
        {/* <h5>Our Vision:</h5> */}
        <p>
          Whether you're looking to make a bold statement with a vibrant print
          or keep it classic with a timeless design, Afroloom has you covered.
          Our team of skilled artisans will bring your vision to life, creating
          pieces that are not only stylish but also made with the highest
          quality materials.
        </p>
        {/* <h5>Our Products:</h5> */}
        <p>
          So why settle for off-the-rack when you can have a custom-made
          masterpiece? Join us at Afroloom and let your creativity shine through
          in every stitch.
        </p>
        {/* <h5>Sustainable and Ethical Practices:</h5> */}
      </div>
    </>
  );
};

export default About;
