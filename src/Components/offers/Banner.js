import React, { useEffect, useState } from "react";
import "../../Styles/Offers.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isMobile } from "../../utils/constants";

const Banner = ({ items, headTitle, seeMore, linkTo, bannerFix }) => {
  // currency conversion
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const Products = useSelector((state) => state.allProducts.products);

  const [selectedFabric, setselectedFabric] = useState([]);
  const [selectedDiscount, setselectedDiscount] = useState([]);
  const [selectedHandicraft, setselectedHandicraft] = useState([]);
  const [selectedFurniture, setselectedFurniture] = useState([]);

  useEffect(() => {
    const handicraft = Products.filter(
      (item) => item.category === "Handicrafts"
    );

    handicraft.sort((a, b) => {
      const createdAtTimestampA = a?.createdAt?.seconds || 0;
      const createdAtTimestampB = b?.createdAt?.seconds || 0;
      return createdAtTimestampB - createdAtTimestampA;
    });

    setselectedHandicraft(
      handicraft.slice(0, isMobile ? 4 : 5).map((item) => {
        const discountPercentage = item.discount / 100;

        const discountedPrice = (1 - discountPercentage) * item.price; // Calculate the discounted price
        return {
          imageUrl: item.item,
          id: item.id,
          price: item.price,
          discount: item.discount,
          discountedPrice: discountedPrice,
        };
      })
    );

    const discount = Products.filter((item) => item.discount > 0);
    discount.sort((a, b) => {
      const createdAtTimestampA = a?.createdAt?.seconds || 0;
      const createdAtTimestampB = b?.createdAt?.seconds || 0;
      return createdAtTimestampB - createdAtTimestampA;
    });

    setselectedDiscount(
      discount.slice(0, isMobile ? 4 : 5).map((item) => {
        const discountPercentage = item.discount / 100;

        const discountedPrice = (1 - discountPercentage) * item.price; // Calculate the discounted price

        return {
          imageUrl: item.item,
          id: item.id,
          discount: item.discount,
          price: item.price,
          discountedPrice: discountedPrice,
        };
      })
    );

    const fabric = Products.filter((item) => item.category === "Textiles");
    fabric.sort((a, b) => {
      const createdAtTimestampA = a?.createdAt?.seconds || 0;
      const createdAtTimestampB = b?.createdAt?.seconds || 0;
      return createdAtTimestampB - createdAtTimestampA;
    });

    setselectedFabric(
      fabric.slice(0, isMobile ? 4 : 5).map((item) => {
        const discountPercentage = item.discount / 100;

        const discountedPrice = (1 - discountPercentage) * item.price; // Calculate the discounted price
        return {
          imageUrl: item.item,
          id: item.id,
          price: item.price,
          discount: item.discount,
          discountedPrice: discountedPrice,
        };
      })
    );

    const furniture = Products.filter((item) => item.category === "Furniture");
    furniture.sort((a, b) => {
      const createdAtTimestampA = a?.createdAt?.seconds || 0;
      const createdAtTimestampB = b?.createdAt?.seconds || 0;
      return createdAtTimestampB - createdAtTimestampA;
    });

    setselectedFurniture(
      furniture.slice(0, isMobile ? 4 : 5).map((item) => {
        const discountPercentage = item.discount / 100;

        const discountedPrice = (1 - discountPercentage) * item.price; // Calculate the discounted price
        return {
          imageUrl: item.item,
          id: item.id,
          price: item.price,
          discount: item.discount,
          discountedPrice: discountedPrice,
        };
      })
    );
  }, [Products]);

  if (bannerFix === "One") {
    items = selectedHandicraft;
  } else if (bannerFix === "Five") {
    items = selectedDiscount;
  } else if (bannerFix === "Eight") {
    items = selectedFabric;
  } else if (bannerFix === "Ten") {
    items = selectedFurniture;
  }

  return (
    <div className="clickable-banner-container">
      <h3 className="headTitle">
        {headTitle}{" "}
        {/* {seeMore ? <span className="more-deals"> - {seeMore}</span> : ""} */}
        {seeMore ? (
          seeMore === "See More" ? (
            <Link to={linkTo} className="more-deals">
              - See More
            </Link>
          ) : (
            <span className="more-deals"> - {seeMore}</span>
          )
        ) : (
          ""
        )}
      </h3>
      <div className="clickable-banner">
        {items.map((item, index) => (
          <div className="clickable-item" key={index}>
            <div className="image-space">
              {item.videoUrl ? (
                <video
                  src={item.videoUrl}
                  alt={item.title}
                  className="item-video"
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="item-image"
                  />
                </Link>
              )}
            </div>
            <div className="price-space">
              {item.discount && item.discount > 0 ? (
                <>
                  <div className="original-price">
                    {currencySymbol}
                    {(currencyFactor * item.price).toFixed(2)}
                  </div>
                  <div className="price">
                    {currencySymbol}
                    {(currencyFactor * item.discountedPrice).toFixed(2)}
                  </div>
                </>
              ) : (
                // If no discount, display the regular price
                <div className="price">
                  {currencySymbol}
                  {(currencyFactor * item.price).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
