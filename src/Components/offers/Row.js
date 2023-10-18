import React, { useEffect, useState } from "react";
import "../../Styles/Offers.css";
import FourInACard from "./Fours";
import OfferCard from "./Singles";
import { useSelector } from "react-redux";

const spinvid = require("../../Assets/vid/vid.mp4");
const crop = require("../../Assets/vid/crop.MP4");
const booty = require("../../Assets/vid/booty.MP4");

const Row = ({ mainItems, offerFix }) => {
  const Products = useSelector((state) => state.allProducts.products);
  const [maleUnder10, setMaleUnder10] = useState([]);
  const [selectedmaleUnder10, setselectedmaleUnder10] = useState([]);

  const [femaleUnder10, setFemaleUnder10] = useState([]);
  const [selectedFemaleUnder10, setselectedFemaleUnder10] = useState([]);

  const [fashionAccessories, setFashionAccessories] = useState([]);
  const [selectedFashionAccessories, setselectedFashionAccessories] = useState(
    []
  );

  const [feet, setFeet] = useState([]);
  const [selectedFeet, setselectedFeet] = useState([]);

  useEffect(() => {
    // male underten
    setMaleUnder10(
      Products.filter((item) => item.gender === "Male" && item.price <= 10)
    );

    setselectedmaleUnder10(
      maleUnder10.slice(0, 2).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

    // female underten
    setFemaleUnder10(
      Products.filter((item) => item.gender === "Female" && item.price <= 10)
    );

    setselectedFemaleUnder10(
      femaleUnder10.slice(0, 2).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

    // fashion accessories
    setFashionAccessories(
      Products.filter((item) => item.category === "Accessories")
    );

    setselectedFashionAccessories(
      fashionAccessories.slice(0, 4).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

    // Footwear
    setFeet(Products.filter((item) => item.category === "Footwear"));

    setselectedFeet(
      feet.slice(0, 4).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );
  }, [Products, fashionAccessories, feet, femaleUnder10, maleUnder10]);

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

  const rowNine = [
    {
      headTitle: "Fashion Accessories Made Perfect",
      linkTo: "/category/Accessories",
      array: selectedFashionAccessories,
    },
    {
      title: "Discover Fashion Trends",
      imageUrl: require("../../Assets/Offers/fashion_trend/cd664fd6d9e14b009b2657e27345a94b.jpg"),
      linkTo: "/category/Clothing",
    },
    {
      title: "We get it done like you design it",
      videoUrl: booty,
      linkTo: "/customize",
    },
    {
      headTitle: "Get Value for your Feet",
      linkTo: "/category/Footwear",
      array: selectedFeet,
    },
  ];

  const rowSix = [
    {
      title: "Lowest Prices in 60 Days",
      imageUrl: require("../../Assets/Offers/lowest/fad8186bb3f502194ae34274a7727066--charleston-gardens-charleston-sc.jpg"),
      linkTo: "/offers/Lowest Prices in 60 Days",
    },
  
    {
      title: "Most Popular",
      imageUrl: require("../../Assets/Offers/popular/royal-blue-maasai-earrings.jpg"),
      linkTo: "/offers/popular",
    },
    {
      title: "We make your thoughts into reality",
      videoUrl: crop,
      linkTo: "/customize",
    },
    {
      headTitle: "New Products this Week",
      linkTo: "/offers/New Products this Week",
      array: [
        {
          title: "Pouf",
          imageUrl: require("../../Assets/Offers/this_week/215c79eaf1c3f53f0fa798617be97ba8.jpg"),
        },
        {
          title: "Purse",
          imageUrl: require("../../Assets/Offers/this_week/OIP.jpg"),
        },
        {
          title: "Bikini",
          imageUrl: require("../../Assets/Offers/this_week/R (1).jpg"),
        },
        {
          title: "Straw Hat",
          imageUrl: require("../../Assets/Offers/this_week/il_1588xN.3179152889_30w3.webp"),
        },
      ],
    },
  ];

  if (offerFix === "One") {
    mainItems = rowOne;
  } else if (offerFix === "Nine") {
    mainItems = rowNine;
  }else if (offerFix === "Six") {
    mainItems = rowSix;
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
