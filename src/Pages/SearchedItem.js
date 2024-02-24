import React from "react";
import { Card } from "../Components/CardList";
import { useSelector } from "react-redux";
import Nav from "../Components/Nav";
import searchbanner from "../Assets/Headers/search.JPG";

const SearchedItem = () => {
  const Products = useSelector((state) => state.allProducts.searchedArray);
  const keyword = useSelector((state) => state.allProducts.searchKeyDisplay);

  return (
    <>
      <Nav />
      <div
        style={{
          backgroundImage: `url(${searchbanner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "15rem",
          width: "100%",
        }}
        className="page-banner"
      ></div>
      <h3 className="text-center search-header">
        Products matching <span className="text-warning">{keyword}</span>
      </h3>
      <div className="row m-auto p-2">
        {Products.length !== 0 ? (
          Products.map((product, index) => (
            <div className="col-6 col-sm-2 product-card-container">

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
                discount={product.discount}
              />
              </div>
          ))
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center p-5 text-center no-search">
            <h1>Sorry!</h1>
            <h4>Your search did not match anything in our current inventory</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchedItem;
