import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../Components/Nav";
import { Dialog } from "primereact/dialog";
import ProfessionalsCheckout from "./ProfessionalsCheckout";

const ProfessionalsDetail = ({ match }) => {
  const { professionalName, productId } = useParams();

  const Models = useSelector((state) => state.allModels.products);
  const Photographers = useSelector((state) => state.allPhotographers.products);
  const TourGuides = useSelector((state) => state.allTourGuides.products);

  let Products;

  if (professionalName === "Model") {
    Products = Models;
  } else if (professionalName === "Photographer") {
    Products = Photographers;
  } else if (professionalName === "Tour Guide") {
    Products = TourGuides;
  }

  const product = Products.find((p) => p.id === productId);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //related products

  const relatedProducts = Products.filter((p) => p.id !== product.id).slice(
    0,
    5
  );

  const productTemplate = (relatedProduct) => {
    return (
      <div className="text-center p-3 related-products col-12">
        <Link to={`/professional/${professionalName}/${relatedProduct.id}`}>
          <img
            src={relatedProduct.profile}
            alt={relatedProduct.name}
            className="shadow-2 mt-3"
            width="30%"
            height="30%"
            style={{ aspectRatio: 1 / 1 }}
          />
        </Link>
        <div>
          <h5>{relatedProduct.name}</h5>
          <p className="h3">
            <h6>
              {currencySymbol}
              {(currencyFactor * relatedProduct.hourRate).toFixed(2)}/hr
            </h6>
            <h6>
              {currencySymbol}
              {(currencyFactor * relatedProduct.dayRate).toFixed(2)}/day
            </h6>
          </p>
        </div>
      </div>
    );
  };

  const isMobile = window.innerWidth <= 767;

  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false)

  return (
    <div className="bg-white">
      <Nav />

      <div className="container d-flex flex-column mt-5">
          <div className="d-flex justify-content-around border-bottom pb-4">
            <div className="d-flex justify-content-start align-items-center">
              <div className="col-6 col-sm-2">
                <img
                  width="100%"
                  className="rounded-circle card-img-top"
                  src={product.profile}
                  alt="profile"
                />
              </div>
              <p>
                <h5>{product.name}</h5>
                <h6>
                  {product.city}, {product.country}
                </h6>
              </p>
            </div>
            <div className="d-flex flex-column col-12 col-sm-2">
              <div className=" d-flex flex-row" style={{justifyContent: "space-evenly"}}>
                <p>
                  <h6>
                    {currencySymbol}
                    {(currencyFactor * product.dayRate).toFixed(2)}
                  </h6>
                  Per Day
                </p>
                <p>
                  <h6>
                    {currencySymbol}
                    {(currencyFactor * product.hourRate).toFixed(2)}
                  </h6>
                  Per Hour
                </p>
              </div>
              <button className="btn btn-dark text-white view-products" onClick={() => setShowCheckoutPopup(true)}>
                Book {professionalName}
              </button>
            </div>
          </div>
        <div className="d-flex mt-3" style={{justifyContent: "space-evenly"}}>
          <p>
            <h6>{product.gender}</h6>
            Gender
          </p>
          <p>
            <h6>{product.height}</h6>
            Height
          </p>
          <p>
            <h6>{product.age}</h6>
            Age
          </p>
          <p>
            <h6>{product.experience}</h6>
            Experience
          </p>
        </div>
      </div>
      <hr />

      <div className="container">
        <h1>Portfolio</h1>
        {product.portfolio.length !== 0 ? (
          product.portfolio.map((sample, index) => (
            <img
              key={index}
              src={sample}
              className="col-6 col-sm-4 mt-1"
              alt={"portfolio" + index}
              height={isMobile ? "100rem" : "300rem"}
              style={{ aspectRatio: 1 / 1 }}
            />
          ))
        ) : (
          <p>No portfolio currently available</p>
        )}
      </div>
      <div className="container mt-5">
        <h5 className="text-center">You May Be Interested In</h5>
        <Carousel
          value={relatedProducts}
          numVisible={isMobile ? 1 : 3}
          numScroll={1}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplate}
        />
      </div>
      <Dialog
        header="Confirm checkout"
        visible={showCheckoutPopup}
        className="col-12 col-sm-6"
        onHide={() => setShowCheckoutPopup(false)}
      >
        <ProfessionalsCheckout product={product} professionalType={professionalName}/>
      </Dialog>
    </div>
  );
};

export default ProfessionalsDetail;
