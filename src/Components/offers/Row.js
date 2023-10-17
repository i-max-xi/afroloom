import React, { useEffect, useState } from "react";
import "../../Styles/Offers.css";
import FourInACard from "./Fours";
import OfferCard from "./Singles";
import { useSelector } from "react-redux";
// import spinvid from "../../../Assets/vid/vid.mp4";

const spinvid = require("../../Assets/vid/vid.mp4");

const Row = ({ mainItems, offerFix }) => {
  const Products = useSelector((state) => state.allProducts.products);
  const [maleUnder10, setMaleUnder10] = useState([]);
  const [selectedmaleUnder10, setselectedmaleUnder10] = useState([]);

  const [femaleUnder10, setFemaleUnder10] = useState([]);
  const [selectedFemaleUnder10, setselectedFemaleUnder10] = useState([]);

  useEffect(() => {
   
    // male underten
    setMaleUnder10(Products.filter(
      (item) => item.gender === "Male" && item.price <= 10
    ))

    setselectedmaleUnder10(
      maleUnder10.slice(0, 2).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

    // female underten
    setFemaleUnder10(Products.filter(
      (item) => item.gender === "Female" && item.price <= 10
    ))

    setselectedFemaleUnder10(
      femaleUnder10.slice(0, 2).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

  }, [Products, femaleUnder10, maleUnder10]);

  const rowOne = [
    {
      headTitle: "Men Clothing Under $10",
      linkTo: "/offers/men clothing under $10",
      array: selectedmaleUnder10,
    },
    {
      title: "Design Your Own Products With Quality African Fabric",
      videoUrl: spinvid,
      linkTo: "/customize",
    },
    {
      title: "Find the Perfect Gift",
      imageUrl: require("../../Assets/Offers/gift/1.jpg"),
      linkTo: "/category/Accessories",
    },

    {
      headTitle: "Women Clothing Under $10",
      linkTo: "/offers/women clothing under $10",
      array: selectedFemaleUnder10,
    },
  ];

  if(offerFix === "One"){
    mainItems = rowOne;
  }

  // Initialize an array to store the rendered items
  const renderedItems = [];

  // Iterate through the mainItems prop array
  mainItems.forEach((item) => {
    if (item.array) {
      renderedItems.push(
        <FourInACard
          key={item.headTitle}
          headTitle={item.headTitle}
          items={item.array}
          linkTo={item.linkTo}
        />
      );
    } else {
      // If the item doesn't have an array property, render it as an OfferCard
      renderedItems.push(
        <OfferCard
          key={item.title}
          title={item.title}
          imageUrl={item.imageUrl}
          linkTo={item.linkTo}
          videoUrl={item.videoUrl}
        />
      );
    }
  });

  return <div className="offer-container">{renderedItems}</div>;
};

export default Row;
