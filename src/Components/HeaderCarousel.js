import React from "react";
import Carousel from "react-bootstrap/Carousel";

import s1 from "../Assets/carousel/new/afro/FLYERS 2 copy.jpg";
import s2 from "../Assets/carousel/new/afro/FLYERS 3 copy.jpg";
import s3 from "../Assets/carousel/new/afro/FLYERS 4 copy.jpg";
import s4 from "../Assets/carousel/new/afro/FLYERS 5.jpg";
import s5 from "../Assets/carousel/new/afro/FLYERS 7.jpg";
import s6 from "../Assets/carousel/new/afro/FLYERS 8.jpg";
// import s7 from "../Assets/carousel/new/afro/s7.jpg";
import s8 from "../Assets/carousel/new/afro/FLYERS 9.jpg";
import s9 from "../Assets/carousel/new/afro/new .jpg";
import s10 from "../Assets/carousel/new/afro/new 2.jpg";
// import s11 from "../Assets/carousel/new/afro/s11.jpg";
import { Link } from "react-router-dom";

const HeaderCarousel = () => {
  return (
    <>
      <Carousel
        className="mx-2 mb-3 w-100"
        // style={{
        //   position: "absolute",
        //   top: "3rem",
        //   left: "2rem",
        //   width: "50%",
        // }}
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
          <Link to="/category/Clothing">
            <img
              className="d-block"
              src={s2}
              alt="Second slide"
              height="450px"
              width="100%"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
        <Link to="/category/Textiles">
            <img
              className="d-block"
              src={s3}
              alt="Third slide"
              height="450px"
              width="100%"
            />
          </Link>
        </Carousel.Item>

        <Carousel.Item>
          <Link to="/category/Footwear">
            <img
              className="d-block"
              src={s4}
              alt="Fourth slide"
              height="450px"
              width="100%"
            />
          </Link>
        </Carousel.Item>

        <Carousel.Item>
          <Link to="/category/Pottery">
            <img
              className="d-block"
              src={s5}
              alt="Fourth slide"
              height="450px"
              width="100%"
            />
          </Link>
        </Carousel.Item>

        <Carousel.Item>
          <Link to="/category/Furniture">
            <img
              className="d-block"
              src={s6}
              alt="Fourth slide"
              height="450px"
              width="100%"
            />
          </Link>
        </Carousel.Item>

        {/* <Carousel.Item>
          <Link to="/category/Pottery">
            <img
              className="d-block"
              src={s7}
              alt="Fourth slide"
              height="450px"
              width="100%"
            />
          </Link>
        </Carousel.Item> */}

        <Carousel.Item>
          <Link to="/category/Handicrafts">
            <img
              className="d-block"
              src={s8}
              alt="Fourth slide"
              height="450px"
              width="100%"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/customize">
            <img
              className="d-block"
              src={s9}
              alt="Fourth slide"
              height="450px"
              width="100%"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
            <img
              className="d-block"
              src={s10}
              alt="Fourth slide"
              height="450px"
              width="100%"
            />
        </Carousel.Item>
        {/* <Carousel.Item>
          <img
            className="d-block"
            src={s11}
            alt="Fourth slide"
            height="450px"
            width="100%"
          />
        </Carousel.Item> */}
      </Carousel>
    </>
  );
};

export default HeaderCarousel;
