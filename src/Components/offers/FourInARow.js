import React from "react";
import "../../Styles/Offers.css";
import FourInACard from "./FourInACard";
import OfferCard from "./OfferCard";

const FourInARow = () => {
  const fourInCardiItems = [
    {
      title: "Watches",
      imageUrl: "https://themesberg.com/docs/pixel-bootstrap/assets/img/shop/item-1.png",
    //   link: "/item-1-link",
    },
    {
      title: "Bags",
      imageUrl: "https://www.pngmart.com/files/22/Hobo-Bag-PNG-HD.png",
    },
    {
      title: "Scarf",
      imageUrl: "https://day-et.com/cdn/shop/products/WEB-3235490300-05029-1_1608914a-360c-4a71-9eb6-955c36d36253_1200x1200.png?v=1690599948",
    //   link: "/item-3-link",
    },
    {
    //   title: "Item 4",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/009/847/891/non_2x/3d-best-seller-text-bubble-for-marketing-ecommerce-icon-free-png.png",
    },
  ];

  const offerCards = [
    {
      title: "Get Your Dream Shoes",
      imageUrl:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9ce48468365529.60d4c7e73538d.jpg",
      linkTo: "/category/Footwear",
    },
    {
      title: "Stylish gift for less",
      imageUrl: "https://assets.mgimgs.com/mgimgs/rk/images/dp/wcm/202302/0008/mark-graham-x-steele-waterproof-medium-and-large-tote-set-t.jpg",
      linkTo: "/category/Accessories",
    },
    {
      title: "Discover fashion trends",
      imageUrl: "https://ionicsupplies.com/cdn/shop/collections/COLLECTION_46334398-c2b6-49c6-b4cd-332ca169d08b_1200x1200.jpg?v=1575444827",
      linkTo: "/category/Clothing"
    },
  ];

  return (
    <div className="offer-container">
      <FourInACard items={fourInCardiItems} />

      {offerCards.map((card, index) => (
        <OfferCard
          key={index}
          title={card.title}
          imageUrl={card.imageUrl}
          linkTo={card.linkTo}
        />
      ))}
    </div>
  );
};

export default FourInARow;
