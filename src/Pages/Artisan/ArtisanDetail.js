import React from "react";
import Nav from "../../Components/Nav";
import { useParams } from "react-router-dom";
import { TabPanel, TabView } from "primereact/tabview";
import ArtisanData from "../../Data/ArtisanData";

const ArtisanDetail = ({ match }) => {
  const { artisanId } = useParams();

  const artisan = ArtisanData.find((a) => a.id === parseInt(artisanId));

  //related products
  const customizable = artisan.works;

  // const artisanTemplate = ({ image, name }) => {
  //   return (
  //     <div className="border-5 border-white  border-right text-center px-3">
  //       <div>
  //         <img src={image} alt={name} className="shadow-2 w-50" />
  //       </div>
  //       <div>
  //         <h4 className="mt-2 fs-5">{name}</h4>
  //       </div>
  //     </div>
  //   );
  // };

  const stars = [];
  for (let i = 0; i < artisan.rating; i++) {
    stars.push(<i key={i} className="bi bi-star-fill text-warning fs-3"></i>);
  }
  for (let i = artisan.rating; i < 5; i++) {
    stars.push(<i key={i} className="bi bi-star text-warning fs-3"></i>);
  }

  let artisanImage = null;
  if (Array.isArray(artisan.image)) {
    artisanImage = (
      <div
        id="productCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {artisan.image.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={image}
                alt={`Img ${index + 1}`}
                className="d-block w-100"
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  } else {
    artisanImage = (
      <img src={artisan.image} alt={artisan.name} className="img-fluid w-50" />
    );
  }

  return (
    <>
      <Nav />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">{artisanImage}</div>
          <div className="col-md-6">
            <h3 className="mb-3">{artisan.name}</h3>
            <p className="mb-3">Skill: {artisan.skill}</p>
            <p className="mb-3">Specialty: {artisan.specialty}</p>
            <hr />
            <div className="d-flex">{stars}</div>
            <div className="mb-3">
              {artisan.rating.toFixed(1)} ({artisan.reviews} reviews)
            </div>

            <div>
              <a
                href="#customize"
                className="btn bg-lg mt-3 bg-success text-white view-products"
              >
                Customize
              </a>
            </div>

            {/* <div className="mt-5">
              <h4>Seller</h4>
              <p>{product.seller} </p>
            </div> */}
          </div>
        </div>
      </div>
      <hr />

      <div className="container">
        <TabView className="mt-5">
          <TabPanel header="Description">{artisan.description}</TabPanel>
          <TabPanel header="Reviews">
            {artisan.rating} reviews for this artisan
          </TabPanel>
          {/* <TabPanel header="Sold By"> </TabPanel> */}
        </TabView>
      </div>

      {customizable ? (
        <div className="container mt-2" id="customize">
          <h4 className="text-center mb-5">Customize Artisan's Work</h4>

          <div className="row">
            {customizable.map((Item) => (
              // <div className="w-50">
              //   <img className="w-50" src={item.image} alt="" />
              //   <h4 className="">{item.name}</h4>
              // </div>
              // <Card item = {Item.image} title={Item.name} />
              <div className="col-3">
                <div className="card" data-aos="fade-up">
                  <img
                    className="card-img-top"
                    src={Item.image}
                    alt={Item.name}
                  />
                  <div className="card-body m-0 d-flex justify-content-center flex-column">
                    <h5 className="text-center">{Item.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <Carousel
            value={customizable}
            numVisible={3}
            numScroll={1}
            className="custom-carousel"
            circular
            // autoplayInterval={3000}
            itemTemplate={artisanTemplate}
          /> */}
        </div>
      ) : (
        <div className="mt-5"></div>
      )}
    </>
  );
};

export default ArtisanDetail;
