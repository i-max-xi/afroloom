import React from "react";
import { Carousel } from "primereact/carousel";
import s1 from "../Assets/carousel/s1.jpg";
import s2 from "../Assets/carousel/s2.jpg";
import s3 from "../Assets/carousel/s3.jpg";
import s4 from "../Assets/carousel/s4.jpg";
import s5 from "../Assets/carousel/s5.jpg";
import s6 from "../Assets/carousel/s6.jpg";
import s7 from "../Assets/carousel/s7.jpg";
import s8 from "../Assets/carousel/s8.jpg";

const HeaderCarousel2 = () => {
  const products = [
    {
      id: 100,
      selectedColor: "white",
      image: s1,
    },

    {
      id: 200,
      selectedColor: "white",
      image: s2,
    },
    {
      id: 300,
      selectedColor: "white",
      image: s3,
    },
    {
      id: 400,
      selectedColor: "white",
      image: s4,
    },
    {
      id: 500,
      selectedColor: "white",
      image: s5,
    },
    {
      id: 600,
      selectedColor: "white",
      image: s6,
    },
    {
      id: 700,
      selectedColor: "white",
      image: s7,
    },
    {
      id: 800,
      selectedColor: "orange",
      image: s8,
    },
  ];

  return (
    <div style={{ width: "110vw" }}>
      <Carousel
        value={products}
        numVisible={4}
        numScroll={1}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={Template}
      />
    </div>
  );
};

export const Template = ({ image, name }) => {
  return (
    <div className="text-decoration-none fs-5">
      <div>
        <img src={image} alt={name} className="w-100" />
      </div>
    </div>
  );
};

export default HeaderCarousel2;
