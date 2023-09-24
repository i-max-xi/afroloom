import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import { useParams } from "react-router-dom";
import { TabPanel, TabView } from "primereact/tabview";
import { Carousel } from "primereact/carousel";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Redux/store";

const ItemDetail = ({ match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const Products = useSelector((state)=> state.allProducts.products);

  const { productId } = useParams();
  const product = Products.find((p) => p.id === productId);

  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Redux
  const dispatch = useDispatch();


  //related products
  // const relatedProducts = Products.filter(p => p.category !== parseInt(productId)).slice(0, 5);
  const relatedProducts = Products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const productTemplate = (relatedProduct) => {
    return (
      <div className="border-5 border-white  border-right text-center px-3">
        <div>
          <img
            src={relatedProduct.image}
            alt={relatedProduct.name}
            className="shadow-2 rounded-circle w-50"
          />
        </div>
        <div>
          <h4 className="text-white fs-5">{relatedProduct.name}</h4>
        </div>
      </div>
    );
  };

  const stars = [];
  for (let i = 0; i < product.rating; i++) {
    stars.push(<i key={i} className="bi bi-star-fill text-warning fs-3"></i>);
  }
  for (let i = product.rating; i < 5; i++) {
    stars.push(<i key={i} className="bi bi-star text-warning fs-3"></i>);
  }

  let productImage = null;
  if (Array.isArray(product.item)) {
    productImage = (
      <div
        id="productCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {product.item.map((image, index) => (
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
    productImage = (
      <img src={product.item} alt={product.title} className="img-fluid w-50" />
    );
  }

  const augmentedPrice = product.price * count;

  return (
    <>
      <Nav />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">{productImage}</div>
          <div className="col-md-6">
            <h3 className="mb-3">{product.title}</h3>
            <p className="mb-3">{product.description}</p>
            <hr />
            <div className="d-flex">{stars}</div>
            <div className="mb-3">
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </div>

            <div className="d-flex mb-3">
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="mx-2">{count}</span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <p className="h3">${augmentedPrice}</p>
            <button
              className="btn btn-lg mt-3 bg-warning text-white"
              onClick={(
                id = product.id,
                title = product.title,
                item = product.item,
                price = augmentedPrice
              ) => {
                dispatch(addItem({ id, title, item, price }));
                // show();
              }}
            >
              Add to Cart
            </button>
            <div className="mt-5">
              <h4>Seller</h4>
              <p>{product.seller} </p>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="container">
        <TabView className="mt-2">
          <TabPanel header="Description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Laboriosam, voluptatem perferendis consequuntur hic, facere,
            voluptatum amet exercitationem commodi architecto reprehenderit
            dolore. Eius provident placeat quia facere sit eligendi voluptatibus
            veniam?
          </TabPanel>
          <TabPanel header="Reviews">
            {product.rating} reviews for this product
          </TabPanel>
          <TabPanel header="Sold By"></TabPanel>
        </TabView>
      </div>
      <div className="container mt-5">
        <h4 className="text-center">Related Products</h4>
        <Carousel
          value={relatedProducts}
          numVisible={3}
          numScroll={1}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplate}
        />
      </div>
    </>
  );
};

export default ItemDetail;
