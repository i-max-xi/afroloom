import React, { useEffect } from "react";
import { Card } from "../Components/CardList";
import { useSelector } from "react-redux";
import Nav from "../Components/Nav";
import { useParams } from "react-router";

const OffersDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { offerType } = useParams();
  const Products = useSelector((state) => state.allProducts.products);

  let selectedProducts = [];

  switch (offerType) {
    case "popular":
      selectedProducts = Products.filter((item) => item.rating >= 5);
      break;
    case "New Products this Week":
      // Add logic to filter by new products
      break;
    case "Lowest Prices in 60 Days":
      selectedProducts = Products.filter((item) => item.price < 20);
      break;
    case "men clothes under $3":
      selectedProducts = Products.filter(
        (item) => item.gender === "Male" && item.price <= 3
      );
      break;
    case "women clothes under $3":
      // Add logic to filter by lowest prices in 60 days
      break;
    case "discounts":
      // Add logic to filter by lowest prices in 60 days
      break;
    default:
      selectedProducts = Products;
      break;
  }

  return (
    <>
      <Nav />
      <div
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "10rem",
          width: "100%",
        }}
      ></div>
      <div className="row p-5">
        {selectedProducts.length !== 0 ? (
          selectedProducts.map((product, index) => (
            <div
              className="mt-1 text-decoration-none text-black"
              style={{ width: product.Width || "20%" }}
            >
              <Card
                key={index}
                title={product.title}
                description={product.description}
                rating={product.rating}
                price={product.price}
                item={product.item}
                flag={product.flag}
                id={product.id}
                Height={product.height}
                TextAlign={product.TextAlign}
                Button={product.Button}
                linkless={product.linkless}
              />
            </div>
          ))
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <h4>No results found</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default OffersDetail;
