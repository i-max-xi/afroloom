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

  const Products = useSelector((state) => state.allProducts.products);

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

  // Create a state variable to store extras, including the initial product.item

  const [extras] = useState([
    product.item,
    ...(product.extras ? product.extras : []),
  ]);

  const [selectedImage, setSelectedImage] = useState(product.item); // Initially set to product.item
  const handleExtraClick = (extraImage) => {
    setSelectedImage(extraImage);
  };

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const augmentedPrice = (currencyFactor * product.price * count).toFixed(2);

  return (
    <div className="bg-white">
      <Nav />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 d-flex mb-5">
            {extras ? (
              <div className="d-flex flex-column mx-1" style={{ width: "10%" }}>
                {extras.map((extra, index) => (
                  <img
                    className="mb-1"
                    src={extra}
                    key={index}
                    alt={extra + " " + index}
                    onClick={() => handleExtraClick(extra)}
                  />
                ))}
              </div>
            ) : (
              ""
            )}

            <div>
              <img src={selectedImage} alt={product.title} width="80%" />
            </div>
          </div>
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
            <p className="h3">
              {currencySymbol}
              {augmentedPrice}
            </p>
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
          <TabPanel header="Sold By">{product.seller} </TabPanel>
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
    </div>
  );
};

export default ItemDetail;
