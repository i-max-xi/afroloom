import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TabPanel, TabView } from "primereact/tabview";
import { Carousel } from "primereact/carousel";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../Components/Nav";
// import { addItem } from "../Redux/store";

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

  const [count] = useState(1);

  // Redux
  const dispatch = useDispatch();

  // Create a state variable to store extras, including the initial product.item

  const [selectedImage, setSelectedImage] = useState(product.item); // Initially set to product.item
  const handleExtraClick = (extraImage) => {
    setSelectedImage(extraImage);
  };

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  // const augmentedPrice = currencyFactor * product.price * count;

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

  return (
    <div className="bg-white">
      <Nav />

      <div className="container d-flex flex-column mt-5">
        <div className="border-bottom pb-3">
          <div className="d-flex justify-content-around">
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
            <div className="d-flex flex-column">
              <div className=" d-flex flex-row justify-content-between">
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
              <Link className="btn btn-dark text-white view-products">
                Book {professionalName}
              </Link>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <p>
            <h6>{product.gender}</h6>
            Gender
          </p>
          <p className="mx-3">
            <h6>{product.height}</h6>
            Height
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
        <h4 className="text-center">You May Be Interested In</h4>
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
    </div>
  );
};

export default ProfessionalsDetail;
