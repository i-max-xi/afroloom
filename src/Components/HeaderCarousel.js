import React from "react";
import Carousel from "react-bootstrap/Carousel";

import s1 from "../Assets/carousel/s1.jpg";
import s2 from "../Assets/carousel/s2.jpg";
import s3 from "../Assets/carousel/s3.jpg";
import s4 from "../Assets/carousel/s4.jpg";
import s5 from "../Assets/carousel/s5.jpg";
import s6 from "../Assets/carousel/s6.jpg";
import s7 from "../Assets/carousel/s7.jpg";
import s8 from "../Assets/carousel/s8.jpg";

const HeaderCarousel = () => {
  return (
    <>

      <Carousel
        className="mx-2 mt-5"
        style={{
          position: "absolute",
          top: "3rem",
          left: "2rem",
          width: "50%",
        }}
        role="listbox"
      >
        <Carousel.Item>
          <img
            className="d-block"
            src={s1}
            alt="First slide"
            height="450px"
            width="100%"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block" src={s2} alt="Second slide" height="450px" width="100%"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block" src={s3} alt="Third slide" height="450px" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block" src={s4} alt="Fourth slide" height="450px" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block" src={s5} alt="Fourth slide" height="450px" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block" src={s6} alt="Fourth slide" height="450px" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block" src={s7} alt="Fourth slide" height="450px" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block" src={s8} alt="Fourth slide" height="450px" />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HeaderCarousel;
