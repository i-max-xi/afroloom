import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import { Link, useParams } from "react-router-dom";
import { TabPanel, TabView } from "primereact/tabview";
import { Carousel } from "primereact/carousel";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Redux/store";

const ItemDetail = ({ match }) => {
  const { productId } = useParams();

  const Products = useSelector((state) => state.allProducts.products);

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

  const stars = [];
  for (let i = 0; i < product.rating; i++) {
    stars.push(<i key={i} className="bi bi-star-fill text-warning fs-3"></i>);
  }
  for (let i = product.rating; i < 5; i++) {
    stars.push(<i key={i} className="bi bi-star text-warning fs-3"></i>);
  }

  // Create a state variable to store extras, including the initial product.item

  const [extras, setExtras] = useState([
    product.item,
    ...(product.extras ? product.extras : []),
  ]);

  const [selectedImage, setSelectedImage] = useState(product.item); // Initially set to product.item
  const handleExtraClick = (extraImage) => {
    setSelectedImage(extraImage);
  };

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const augmentedPrice = currencyFactor * product.price * count;

  let discountedPrice = product.price; // Default to the original price

  if (product.discount && product.discount > 0) {
    const discountPercentage = product.discount / 100;
    discountedPrice =
      (1 - discountPercentage) * currencyFactor * product.price * count;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(product.item);
    setExtras([product.item, ...(product.extras ? product.extras : [])]);
  }, [product.extras, product.item, productId]);

  //related products
  // const relatedProducts = Products.filter(p => p.category !== parseInt(productId)).slice(0, 5);
  const relatedProducts = Products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 5);

  const productTemplate = (relatedProduct) => {
    const relatedPrice = currencyFactor * relatedProduct.price;

    let relatedDiscountedPrice = relatedProduct.price; // Default to the original price

    if (relatedProduct.discount && relatedProduct.discount > 0) {
      const discountPercentage = relatedProduct.discount / 100;
      relatedDiscountedPrice =
        (1 - discountPercentage) * currencyFactor * product.price * count;
    }
    return (
      <div className="text-center p-3">
        <Link to={`/product/${relatedProduct.id}`}>
          <img
            src={relatedProduct.item}
            alt={relatedProduct.title}
            className="shadow-2 mt-3 w-50 h-50"
          />
        </Link>
        <div>
          <p>{relatedProduct.title}</p>
          <p className="h3">
            {relatedProduct.discount ? (
              <div>
                <h6>
                  <del>{currencySymbol + relatedPrice.toFixed(2)}</del>
                </h6>
                <h5>{currencySymbol + relatedDiscountedPrice.toFixed(2)}</h5>
              </div>
            ) : (
              <h5>{currencySymbol + relatedPrice.toFixed(2)} </h5>
            )}
          </p>
        </div>
      </div>
    );
  };

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
              {product.discount ? (
                <div>
                  <span className="original-price">
                    {currencySymbol + augmentedPrice.toFixed(2)}
                  </span>
                  <span className="discounted-price mx-3">
                    {currencySymbol + discountedPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span>{currencySymbol + augmentedPrice.toFixed(2)} </span>
              )}
            </p>
            <button
              className="btn btn-lg mt-3 bg-warning text-white"
              onClick={(
                id = product.id,
                title = product.title,
                item = product.item,
                weight = product.weight,
                price = product.discount ? discountedPrice : augmentedPrice,
                seller = product.seller
              ) => {
                dispatch(addItem({ id, title, item, price, count, weight, seller }));
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
