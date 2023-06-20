import React from "react";
import LayoutHeaders from "../Components/LayoutHeaders";
import Top from "../Assets/Headers/aboutus.jpg";


const About = () => {
  return (
    <>
    <LayoutHeaders selectedBg={Top}/>
      <div className="container" style={{padding: '10rem 5rem'}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure asperiores
        recusandae sint accusamus impedit inventore cum voluptatem sit obcaecati
        necessitatibus voluptas voluptates ab provident deleniti, quisquam nobis
        architecto neque et?
      </div>
    </>
  );
};

export default About;
