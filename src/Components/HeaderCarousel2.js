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
      image: "https://www.ahwenepa.com/wp-content/uploads/2019/06/Update-Your-Furniture-with-African-Prints-600x600.jpg",
    },

    {
      id: 200,
      selectedColor: "white",
      image: "https://demandafrica.com/wp-content/uploads/2018/07/Dashiki.jpg",
    },
    {
      id: 300,
      selectedColor: "white",
      image: "https://pictures-ghana.jijistatic.com/16234874_MTUwMC0xNDY0LWI5ZjczZmY0MDM.jpg",
    },
    {
      id: 400,
      selectedColor: "white",
      image: "https://demandafrica.com/wp-content/uploads/2018/07/Dashiki.jpg",
    },
    {
      id: 500,
      selectedColor: "white",
      image: "https://pictures-ghana.jijistatic.com/16234874_MTUwMC0xNDY0LWI5ZjczZmY0MDM.jpg",
    },
    {
      id: 600,
      selectedColor: "white",
      image: "https://www.ahwenepa.com/wp-content/uploads/2019/06/Update-Your-Furniture-with-African-Prints-600x600.jpg",
    },
    {
      id: 700,
      selectedColor: "white",
      image: "https://pictures-ghana.jijistatic.com/16234874_MTUwMC0xNDY0LWI5ZjczZmY0MDM.jpg",
    },
    {
      id: 800,
      selectedColor: "orange",
      image: "https://demandafrica.com/wp-content/uploads/2018/07/Dashiki.jpg",
    },
  ];

  return (
    <div style={{ width: "110vw" }}>
      <Carousel
        value={products}
        numVisible={1}
        numScroll={1}
        className="custom-carousel"
        autoplayInterval={1000}
        circular
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
