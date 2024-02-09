import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import Nav from "../../Components/Nav";
import { Dialog } from "primereact/dialog";
import ProfessionalsCheckout from "./ProfessionalsCheckout";
import { Image } from "primereact/image";
import "./styles/ProfessionalStyle.css";
import { ProfessionalsListEnum } from "../../Data/professionalsList";
import { genderListEnum } from "../../Data/genderAgeList";
import { Divider } from "primereact/divider";

const ProfessionalsDetail = ({ match }) => {
  const { professionalName, productId } = useParams();

  const [selectedOffer, setSelectedOffer] = useState({
    offer: "",
    priceValue: 0,
  });

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
            className="mt-3 related-image"
          />
        </Link>
        <div className="p-2">
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

  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  return (
    <div className="bg-white">
      <Nav />

      <div className="container d-flex flex-column mt-5">
        <div className="d-flex justify-content-around border-bottom pb-4">
          <div className="d-flex justify-content-start align-items-center">
            <div className="col-12 col-sm-6">
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
            <div
              className=" d-flex flex-row"
              style={{ justifyContent: "space-evenly" }}
            >
              {currencySymbol}
              {(currencyFactor * product.lowerPrice).toFixed(2)} -{" "}
              {currencySymbol}
              {(currencyFactor * product.UpperPrice).toFixed(2)}
            </div>
            <div className=" d-flex flex-column">
              {product.offers.map(({ offer, priceValue }) => (
                <div className="identity-item" key={offer}>
                  <input
                    type="radio"
                    id={offer}
                    checked={selectedOffer.offer === offer}
                    onChange={() =>
                      setSelectedOffer({ offer: offer, priceValue: priceValue })
                    }
                  />
                  <label className="mt-2" htmlFor={offer}>
                    {offer} - {currencySymbol}
                    {(currencyFactor * priceValue).toFixed(2)}
                  </label>
                </div>
              ))}
            </div>
            <button
              className="btn btn-dark text-white view-products"
              onClick={() => setShowCheckoutPopup(true)}
            >
              Book {professionalName}
            </button>
          </div>
        </div>
        <div className="d-flex mt-3" style={{ justifyContent: "space-evenly" }}>
          {/* <p>
            <h6>{product.gender}</h6>
            Gender
          </p> */}
          {professionalName === ProfessionalsListEnum.model && (
            <>
              <p>
                <h6>{product.age}</h6>
                Age
              </p>
              <p>
                <h6>{product.height}</h6>
                Height
              </p>
              <p>
                <h6>{product.waist}</h6>
                Waist
              </p>
            </>
          )}
          {product.gender === genderListEnum.female && (
            <>
              <p>
                <h6>{product.hips}</h6>
                Hips
              </p>
              <p>
                <h6>{product.bust}</h6>
                Bust
              </p>
              <p>
                <h6>{product.dressSize}</h6>
                Dress Size
              </p>
              <p>
                <h6>{product.shoeSize}</h6>
                Shoe Size
              </p>
            </>
          )}
          {product.gender === genderListEnum.male && (
            <>
              <p>
                <h6>{product.shirtSize}</h6>
                Shirt Size
              </p>
              <p>
                <h6>{product.shoeSize}</h6>
                Shoe Size
              </p>
            </>
          )}
        </div>
      </div>
      <hr />

      <div className="container mt-5 mb-5">
        <h3 className="d-flex justify-content-center footer-header">
          Specialties
        </h3>
        <div className="d-flex mt-3" style={{ justifyContent: "space-evenly" }}>
          {product.specialties.length !== 0 ? (
            product.specialties.map((specialty, index) => (
              <React.Fragment key={index}>
                <h5>{specialty}</h5>
                {index !== product.specialties.length - 1 && (
                  <Divider layout="vertical" />
                )}
              </React.Fragment>
            ))
          ) : (
            <p className="m-5">No specialties available to show</p>
          )}
        </div>
      </div>

      <div className="container portfolio-container">
        <h3 className="footer-header">Portfolio</h3>
        <div className="row">
          {product.portfolio.length !== 0 ? (
            product.portfolio.map((sample, index) => (
              <div key={index} className="col-12 col-sm-4 mt-1 portfolio-item">
                <Image
                  src={sample}
                  alt={"portfolio" + index}
                  className="portfolio-image"
                  preview
                />
              </div>
            ))
          ) : (
            <p className="m-5">No portfolio available to show</p>
          )}
        </div>
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
        <ProfessionalsCheckout
          product={product}
          professionalType={professionalName}
        />
      </Dialog>
    </div>
  );
};

export default ProfessionalsDetail;
