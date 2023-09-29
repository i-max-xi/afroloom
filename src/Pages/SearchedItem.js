import React from "react";
import { Card } from "../Components/CardList";
import { useSelector } from "react-redux";
import Nav from "../Components/Nav";

const SearchedItem = () => {
  const Products = useSelector((state) => state.allProducts.searchedArray);

  return (
    <>
      <Nav />
      {Products.length !== 0 ? (
        Products.map((product, index) => (
          <div
            className="row p-5 d-flex"
            style={{ padding: "10rem" }}
            key={index}
          >
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
          </div>
        ))
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
          <h1>Sorry!</h1>
          <h4>Product Not Found Among Our Current Inventory</h4>
        </div>
      )}
    </>
  );
};

export default SearchedItem;
