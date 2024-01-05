import React from "react";

import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";

const CategorySwipe = () => {
  const products = [
    // {
    //   id: "1000",
    //   name: "Home Decor",
    //   selectedColor: "white",
    //   image:
    //     "https://www.thetrentonline.com/wp-content/uploads/2021/04/mbg_living_room_30_d3f00eab-99b1-4f5a-a236-5dd9404a0942.jpg",
    // },

    {
      id: "2000",
      name: "Accessories",
      selectedColor: "white",
      description: "Product Description",
      image:
        "https://pictures-ghana.jijistatic.com/16234874_MTUwMC0xNDY0LWI5ZjczZmY0MDM.jpg",
    },
    {
      id: "200",
      name: "Textiles",
      selectedColor: "white",
      description: "Product Description",
      image:
        "https://cdn.shopify.com/s/files/1/0558/3725/products/Kente-Nylon-Ripstop-_PU_-Group-Image-242-1X1_540x.jpg?v=1664668135",
    },
    {
      id: "3000",
      name: "Furniture",
      selectedColor: "white",
      description: "Product Description",
      image:
        "https://i.pinimg.com/736x/61/f3/ea/61f3ea932eb9f32df5869b8b7d61f573.jpg",
    },
    {
      id: "4000",
      name: "Clothing",
      selectedColor: "white",
      description: "Product Description",
      image: "https://demandafrica.com/wp-content/uploads/2018/07/Dashiki.jpg",
    },
    // {
    //   id: "5000",
    //   name: "Bags",
    //   selectedColor: "white",
    //   description: "Product Description",
    //   image:
    //     "https://cdn.shopify.com/s/files/1/1257/5497/products/UbuntuB01167WEB.jpg?v=1670336335&width=512",
    // },
    {
      id: "6000",
      name: "Footwear",
      selectedColor: "white",
      description: "Product Description",
      image:
        "https://www.africablooms.com/wp-content/uploads/2020/01/Best-African-Print-Sneakers-Store-1-Ankara-Shoes-Sandals-for-Sale-AFRICA-BLOOMS-2.png",
    },
    {
      id: "6000",
      name: "See All",
      selectedColor: "#ffc107",
      description: "Product Description",
      image:
        "https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045__340.png",
    },
  ];

  return (
    <div className="bg-dark d-flex flex-column p-1 mb-5 category-banner">
      <h4 className="text-white align-self-center fs-3 mb-3 mt-2">Search By Category</h4>

      <Carousel
        value={products}
        numVisible={4}
        numScroll={1}
        className="custom-carousel"
        circular
        autoplayInterval={4000}
        itemTemplate={CategoryTemplate}
      />
    </div>
  );
};

export const CategoryTemplate = ({
  image,
  name,
  width,
  margin,
  selectedColor,
}) => {
  return (
    <Link
      className="text-decoration-none fs-5 category-template"
      to={name === "See All" ? "/category-page" : `/category/${name}`}
      style={{ color: selectedColor }}
    >
      <div
        className="text-center"
        style={{ width: width, margin: margin }}
      >
        <div>
          <img
            src={image}
            alt={name}
            width="35%"
            className="shadow-2 rounded-circle mt-2"
          />
        </div>
        <div>
          <h4>{name}</h4>
        </div>
      </div>
    </Link>
  );
};

export default CategorySwipe;
