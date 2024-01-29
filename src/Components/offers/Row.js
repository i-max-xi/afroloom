import React, { useEffect, useState } from "react";
import "../../Styles/Offers.css";
import FourInACard from "./Fours";
import OfferCard from "./Singles";
import { useSelector } from "react-redux";
import { differenceInDays, fromUnixTime } from "date-fns"; // Import the functions

const spinvid = require("../../Assets/vid/vid.mp4");
const crop = require("../../Assets/vid/crop.MP4");
const booty = require("../../Assets/vid/booty.MP4");

const Row = ({ mainItems, offerFix }) => {
  const Products = useSelector((state) => state.allProducts.products);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor );


  const [selectedmaleUnder10, setselectedmaleUnder10] = useState([]);

  const [selectedFemaleUnder10, setselectedFemaleUnder10] = useState([]);

  const [selectedFashionAccessories, setselectedFashionAccessories] = useState(
    []
  );

  const [selectedFeet, setselectedFeet] = useState([]);

  const [selectednewThisWeek, setselectednewThisWeek] = useState([]);

  const [selectedPopular, setselectedPopular] = useState("");

  const [selectedLowest, setselectedLowest] = useState("");

  useEffect(() => {
    // male underten
    const maleUnder10 = Products.filter((item) => item.gender === "Male" && item.price <= 10);
    setselectedmaleUnder10(
      maleUnder10.slice(0, 2).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

    // female underten
    const femaleUnder10 = Products.filter((item) => item.gender === "Female" && item.price <= 10);
    setselectedFemaleUnder10(
      femaleUnder10.slice(0, 2).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

    // fashion accessories
    const fashionAccessories = Products.filter((item) => item.category === "Accessories");
    setselectedFashionAccessories(
      fashionAccessories.slice(0, 4).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

    // Footwear
    const feet = Products.filter((item) => item.category === "Footwear");
    setselectedFeet(
      feet.slice(0, 4).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

    // New This week
      // new products this week
  const newProductsThisWeek = Products.filter((item) => {
    if (item.createdAt?.seconds) {
      // Use optional chaining to safely access 'seconds'
      const createdAtTimestamp = item.createdAt.seconds;
      const currentTimestamp = Date.now() / 1000; // Convert to seconds

      // Calculate the difference in days
      const daysDifference = differenceInDays(
        fromUnixTime(currentTimestamp),
        fromUnixTime(createdAtTimestamp)
      );

      // Check if the product was created within the last 7 days
      return daysDifference <= 7;
    }
    // Handle the case where 'createdAt' or 'seconds' is undefined
    return false;
  });

    setselectednewThisWeek(
      newProductsThisWeek.slice(0, 4).map((item) => ({
        imageUrl: item.item,
        id: item.id,
      }))
    );

    // Pouplar
    const popularProduct = Products.find((item) => item.rating >= 4);
    setselectedPopular(popularProduct);
    // setselectedPopularImage(popularProduct.item ? popularProduct.item : "");

    // Lowest
    const lowestProduct = Products.find((item) => item.price < 10);
    setselectedLowest(lowestProduct);
    // setselectedLowestImage(lowestProduct.item)
  }, [Products]);

  const rowProfessionals = [
    {
      // title: "Tour Guide",
      imageUrl: "https://cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/PEVTJACBCUI6VG3Z2NTLW2NO4E.jpg",
      linkTo: "professional/Tour Guide",
      action: "Book A Tour Guide"
    },
    {
      // title: "Photographer",
      imageUrl: "https://www.adorama.com/alc/wp-content/uploads/2021/04/photography-camera-types-feature.jpg",
      linkTo: "professional/Photographer",
      action: "Book A Photographer / Videographer"
    },
    {
      // title: "Model",
      imageUrl: require("../../Assets/model.png"),
      linkTo: "professional/Model",
      action: "Book A Model"
    },

  ];

  const rowOne = [
    {
      headTitle: `Men Clothing Under ${currencySymbol + (currencyFactor * 10/0.088).toFixed(0)}`,
      linkTo: "/offers/men clothing under $10",
      array: selectedmaleUnder10,
    },
    {
      title: "Design Your Own Products With Quality African Fabrics",
      videoUrl: spinvid,
      linkTo: "/customize",
    },
    {
      title: "Find the Perfect Gift",
      imageUrl: require("../../Assets/Offers/gift/1.jpg"),
      linkTo: "/category/Accessories",
    },

    {
      headTitle: `Women Clothing Under ${currencySymbol + (currencyFactor * 10/0.088).toFixed(0)}`,
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
      imageUrl: selectedLowest ? selectedLowest.item : "",
      itemID: selectedLowest ? selectedLowest.id : '',
      linkTo: "/offers/Lowest Prices in 60 Days",
    },

    {
      title: "Most Popular",
      imageUrl: selectedPopular ? selectedPopular.item : "",
      itemID: selectedPopular ? selectedPopular.id : '',
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
      array: selectednewThisWeek,
    },
  ];

  if (offerFix === "One") {
    mainItems = rowOne;
  } 
  else if (offerFix === "Professionals") {
    mainItems = rowProfessionals;
  }else if (offerFix === "Nine") {
    mainItems = rowNine;
  } else if (offerFix === "Six") {
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
          itemID={item.itemID}
          action={item.action}
        />
      );
    }
  });

  return <div className="offer-container ">{renderedItems}</div>;
};

export default Row;
