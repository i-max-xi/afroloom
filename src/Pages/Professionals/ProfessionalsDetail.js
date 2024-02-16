import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { useSelector } from "react-redux";
import Nav from "../../Components/Nav";
import { Dialog } from "primereact/dialog";
import ProfessionalsCheckout from "./ProfessionalsCheckout";
import { Image } from "primereact/image";
import "./styles/ProfessionalStyle.css";
import {
  ProfessionalsListEnum,
  canAccomodate,
} from "../../Data/professionalsList";
import { genderListEnum } from "../../Data/genderAgeList";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";

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
  } else if (professionalName === "TourGuide") {
    Products = TourGuides;
  }

  const product = Products.find((p) => p.id === productId);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [professionalName, productId]);

  //related products

  const relatedProducts = Products.filter(
    (p) => p.id !== product.id && p.approved
  ).slice(0, 5);

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
          <p>
            {currencySymbol}
            {(currencyFactor * product.lowerPrice).toFixed(2)} -{" "}
            {currencySymbol}
            {(currencyFactor * product.UpperPrice).toFixed(2)}
          </p>
        </div>
      </div>
    );
  };

  const isMobile = window.innerWidth <= 767;

  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  const toast = useRef(null);

  const cannotCheckout = () => {
    toast.current.show({
      severity: "error",
      summary: "Cannot Proceed",
      detail: "Please select one of the offers provided by this professional",
    });
  };

  const handleBook = () => {
    if (professionalName === "Model") return setShowCheckoutPopup(true);

    if (selectedOffer.offer !== "") {
      setShowCheckoutPopup(true);
    } else {
      cannotCheckout();
    }
  };

  return (
    <div className="bg-white">
      <Nav />
      <Toast ref={toast} />

      <div className="container d-flex flex-column mt-5">
        <div
          className={`d-flex top-profile-container ${
            isMobile ? "flex-column" : ""
          } justify-content-between border-bottom pb-4`}
        >
          <div
            className={`d-flex ${
              isMobile ? "flex-column" : ""
            } align-items-center col-12 col-sm-6 head-profile`}
            style={{ gap: "1rem" }}
          >
            <Avatar
              className="profile-img"
              image={product.profile}
              size="xlarge"
              shape="circle"
            />
            <p>
              <h5>{product.name}</h5>
              <h6>
                {product.city}, {product.country}
              </h6>
              <h6>
                Can Accommodate: {product.canAccommodate}
              </h6>
            </p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center col-12 col-sm-2">
            <div className=" d-flex flex-column">
              {product.offers?.map(({ offer, priceValue }) => (
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
              className="btn btn-dark text-white  col-12"
              onClick={handleBook}
            >
              Book{" "}
              {professionalName === "TourGuide"
                ? "Tour Guide"
                : professionalName}
            </button>
          </div>
        </div>
        <div
          className="d-flex mt-3 professional-detail-info"
          style={{ justifyContent: "space-evenly" }}
        >
          {product.gender !== genderListEnum.notSpecified && (
            <p>
              <h6>{product.gender}</h6>
              Gender
            </p>
          )}

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
                    Dress
                  </p>
                  <p>
                    <h6>{product.shoeSize}</h6>
                    Shoe
                  </p>
                </>
              )}
              {product.gender === genderListEnum.male && (
                <>
                  <p>
                    <h6>{product.shirtSize}</h6>
                    Shirt
                  </p>
                  <p>
                    <h6>{product.shoeSize}</h6>
                    Shoe
                  </p>
                </>
              )}
            </>
          )}
        </div>
        <hr />
      </div>

      {professionalName !== "TourGuide" && (
        <>
          <div className="container mt-5 mb-5">
            <h4 className="d-flex justify-content-center footer-header">
              Specialties
            </h4>
            <div
              className="d-flex mt-3"
              style={{ justifyContent: "space-evenly" }}
            >
              {product.specialties?.length > 1 ? (
                product.specialties?.map((specialty, index) => (
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
        </>
      )}

      {product?.description && (
        <div className="container professional-detail-blocks">
          <h4 className="footer-header">Profile Description</h4>

          <p>{product.description}</p>
        </div>
      )}

      {product.offers.length > 1 &&
        professionalName !== ProfessionalsListEnum.model && (
          <div className="container professional-detail-blocks">
            <h4 className="footer-header">Packages</h4>

            {product.offers?.map(({ offer, priceValue }) => (
              <p key={offer} className="mt-2">
                {offer} - {currencySymbol}
                {(currencyFactor * priceValue).toFixed(2)}
              </p>
            ))}
          </div>
        )}

      <div className="container portfolio-container ">
        <h4 className="footer-header">Portfolio</h4>
        <div className="row  justify-content-center align-items-center">
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

      {professionalName === "TourGuide" &&
        product.canAccommodate === canAccomodate[0] && (
          <div className="container professional-detail-blocks ">
            <h4 className="footer-header">Accommodation</h4>
            <p className="mb-3">
              Can Accommodate:<b> {product.canAccommodateNumber} individuals</b>
            </p>

            <div className="row  justify-content-center align-items-center">
              {product.residenceImages.map((sample, index) => (
                <div
                  key={index}
                  className="col-12 col-sm-4 mt-1 portfolio-item"
                >
                  <Image
                    src={sample}
                    alt={"portfolio" + index}
   
                    className="portfolio-image"
                    preview
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      <hr />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ marginBottom: "8rem" }}
      >
        <button className="btn btn-dark text-white  col-8" onClick={handleBook}>
          Book{" "}
          {professionalName === "TourGuide" ? "Tour Guide" : professionalName}
        </button>
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
        dismissableMask={true}
      >
        <ProfessionalsCheckout
          product={product}
          professionalType={professionalName}
          selectedOffer={selectedOffer}
        />
      </Dialog>
    </div>
  );
};

export default ProfessionalsDetail;
